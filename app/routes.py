from datetime import datetime, timedelta
import os
from flask import flash, jsonify, redirect, render_template, request, send_file, url_for
from flask_login import current_user,login_required, login_user, logout_user
import numpy_financial as npf
from app import app, db, s
from app.metodos import send_email_amazon
from app.models import Administradores, Auditoria, Creditos, EstadosDeuda, ModalidadesPago, Pagos, Usuarios
from sqlalchemy import text
from functools import wraps
from werkzeug.utils import secure_filename


# Ruta base del directorio actual
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Ruta de la carpeta donde se guardarán los PDFs
UPLOAD_FOLDER = os.path.join(BASE_DIR, '..', 'pdfs')

# Asegurarse de que la carpeta exista
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def check_db_connection(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            # Intentar una consulta trivial usando text
            db.session.execute(text('SELECT 1'))
        except Exception as e:
            app.logger.error(f"Database connection lost: {e}")
            db.session.rollback()
        return f(*args, **kwargs)
    return decorated_function

@app.route("/login", methods=["GET", "POST"])
@check_db_connection
def login():
    if current_user.is_authenticated:
        return redirect(url_for("list_users"))
    
    mostrar_alerta = False

    if request.method == "POST":      
        email = request.form.get("email")
        password = request.form.get("password")
  
        user = Administradores.query.filter_by(correo=email).first()
        if user and user.check_password(password):
            login_user(user)
            # logging.info(f"Inicio de sesión exitoso: usuario {user.correo}")
            return redirect(url_for("list_users"))
            
        else:
            # logging.info(f"Inicio de sesión fallido, credenciales invalidas: usuario {user.correo}")
            mostrar_alerta = True
            return render_template(
                "login.html",
                mostrar_alerta=mostrar_alerta,
            )

    elif request.method == "GET":
        return render_template("login.html")
    

@app.route('/reset_password', methods=['GET', 'POST'])
@check_db_connection
def reset_password():
    mostrar_alerta = False
    mostrar_exito = False

    if request.method == 'POST':
        email = request.form['email']
        user = Administradores.query.filter_by(correo=email).first()
        if not user:
            mostrar_alerta = True
        else:

            token = s.dumps(email, salt='password-reset-salt')
            link = url_for('reset_with_token', token=token, _external=True)
            
            subject = "Solicitud de restablecimiento de contraseña"
            body_text = f"Su enlace para restablecer su contraseña es {link}"

            if send_email_amazon(email, subject, body_text):
                mostrar_exito = True
                    

    return render_template('reset_password.html',mostrar_exito=mostrar_exito, mostrar_alerta=mostrar_alerta)

@app.route('/reset/<token>', methods=['GET', 'POST'])
@check_db_connection
def reset_with_token(token):
    try:
        email = s.loads(token, salt='password-reset-salt', max_age=3600)
    except:
        flash('The reset link is invalid or has expired', 'danger')
        return redirect(url_for('reset_password'))

    if request.method == 'POST':
        password = request.form['password']
        user = Administradores.query.filter_by(correo=email).first()
        user.set_password(password)
        db.session.commit()

        flash('Your password has been updated!', 'success')
        return redirect(url_for('login'))

    return render_template('reset_with_token.html', token=token)




@app.route("/payment/<int:id>", methods=["GET", "POST"])
@check_db_connection
@login_required
def payment(id):
    pago = Pagos.query.filter_by(id_pago=id).first()
    
    if not pago:
        return "Pago no encontrado", 404
    
    usuario = (
        db.session.query(Usuarios.id_usuario, Usuarios.nombre_completo, Creditos.id_credito)
        .join(Creditos, Creditos.id_usuario == Usuarios.id_usuario)  # Relación Usuarios -> Creditos
        .join(Pagos, Pagos.id_credito == Creditos.id_credito)  # Relación Creditos -> Pagos
        .filter(Pagos.id_pago == id)  # Filtrar por id_pago
        .first()
    )
    
    nombre_completo = usuario.nombre_completo
    id_usuario = usuario.id_usuario
    id_credito = usuario.id_credito

    variable = ""
    
    mostrar_exito = False
    
    if request.method == "POST":
        fecha_pago_real = request.form.get("fecha_pago_real")

        if fecha_pago_real:  # Asegurarse de que se envió una fecha
           

            fecha_pago_programada = pago.fecha_pago_programada
            fecha_pago_real_date = datetime.strptime(fecha_pago_real, "%Y-%m-%d").date()
            dias_mora = max((fecha_pago_real_date - fecha_pago_programada).days, 0)
            # Actualizar en la base de datos
            
            if pago.fecha_pago_real:
                variable = "Actualizar"
            else:
                variable = "Agregar"
                
            pago.fecha_pago_real = fecha_pago_real
            pago.dias_mora = dias_mora
            pago.id_estado_deuda = 2
            db.session.commit()
            
             
            cambios = {
                "id credito": id_credito,
                "id pago": id,
                "Fecha de pago": fecha_pago_real
            }
            
            auditoria = Auditoria(
                id_administrador=current_user.id_administrador,  # El ID del administrador que está registrado en la sesión
                tabla_afectada="Pagos",
                id_usuario= id_usuario,
                cambios=cambios,
                tipo_operacion=variable
            )
            db.session.add(auditoria)
            db.session.commit()
            
            
            mostrar_exito = True
        return render_template("payment.html", pago=pago, nombre_completo=nombre_completo,mostrar_exito=mostrar_exito)

        
    elif request.method == "GET":
        return render_template("payment.html", pago=pago,nombre_completo=nombre_completo)
    
    

@app.route("/register_credito/<int:id>", methods=["GET", "POST"])
@check_db_connection
def register_credito(id):    
    mostrar_exito = False
    # Obtener el nombre completo del usuario usando el id
    usuario = Usuarios.query.filter_by(id_usuario=id).first()
    if not usuario:
        return "Usuario no encontrado", 404  # Manejo de error si no existe el usuario

    nombre_completo = usuario.nombre_completo  # Asegúrate de que `nombre_completo` sea un atributo válido
    query = ModalidadesPago.query
    modalidades = query.all()

    if request.method == "POST":
        amount = int(request.form.get("amount").replace('.', ''))  # Monto del crédito
        monthly_interest_rate = float(request.form.get("interest_rate").replace(',', '.'))  # Tasa de interés mensual
        installments = int(request.form.get("installments"))  # Número de cuotas
        modalidad = int(request.form.get("modalidad"))  # Modalidad de pago
        date_start = request.form.get("date_start")  # Fecha de inicio
        fecha_date = request.form.get("date_start")

        # Verifica si `date_start` ya es un objeto datetime
        if isinstance(date_start, str):  # Si date_start es una cadena, conviértelo
            date_start = datetime.strptime(date_start, '%Y-%m-%d')  # Suponiendo formato YYYY-MM-DD
        elif isinstance(date_start, datetime):  # Si ya es un objeto datetime, usarlo directamente
            pass
        else:
            return "Formato de fecha no válido", 400  # Si date_start no es ni cadena ni datetime

        try:
            # Cálculo de la cuota fija
            cuota = round(-npf.pmt(monthly_interest_rate / 100, installments, amount))  # Cuota fija calculada con PMT
            total_ganancia = round((cuota * installments) - amount)  # Ganancia total
            # Inicialización de variables para el desglose

            nuevo_credito = Creditos(
                id_usuario=id,
                monto_credito=amount,
                tasa_interes=monthly_interest_rate,
                numero_cuotas=installments,
                id_modalidad_pago=modalidad,
                fecha_credito=date_start,
                ganancia_total=total_ganancia
            )
            db.session.add(nuevo_credito)
            db.session.commit()
            db.session.refresh(nuevo_credito)

            saldo = amount

            for i in range(1, installments + 1):
                # Abono a intereses: saldo pendiente * tasa mensual
                abono_intereses = round(saldo * (monthly_interest_rate / 100))  

                # Abono a capital: cuota total - abono a intereses
                abono_capital = round(cuota - abono_intereses)  

                # Actualiza saldo restante
                saldo -= abono_capital  

                # Ajustar el saldo restante en la última cuota para que sea exactamente 0
                if i == installments:
                    abono_capital += saldo  # Asegura que el saldo final sea 0
                    saldo = 0

                # Calcular la fecha programada de pago según la modalidad
                if modalidad == 1:  # Diario
                    fecha_programada = date_start + timedelta(days=i)
                elif modalidad == 2:  # Semanal
                    fecha_programada = date_start + timedelta(weeks=i)
                elif modalidad == 3:  # Quincenal
                    fecha_programada = date_start + timedelta(weeks=2 * i)
                elif modalidad == 4:  # Mensual
                    fecha_programada = date_start + timedelta(weeks=4 * i)

                # Registrar el pago en la base de datos
                pagos = Pagos(
                    id_credito=nuevo_credito.id_credito,
                    numero_cuota=i,
                    fecha_pago_programada=fecha_programada,
                    monto_cuota=cuota,
                    abono_capital=abono_capital,
                    abono_intereses=abono_intereses,
                    saldo_restante=saldo,
                    id_estado_deuda=1  # Estado de deuda "Pagado"
                )
                db.session.add(pagos)

            modalidad_seleccionada = ModalidadesPago.query.get(modalidad)
            nombre_modalidad = modalidad_seleccionada.nombre_modalidad 

            # Registrar el cambio en la tabla Auditoria
            cambios = {
                "id credito": nuevo_credito.id_credito,
                "Nombre completo": nombre_completo,
                "Monto": amount,
                "Tasa de interes": monthly_interest_rate,
                "Número de cuotas": installments,
                "Modalidad": nombre_modalidad,
                "Fecha de credito": fecha_date
            }

            auditoria = Auditoria(
                id_administrador=current_user.id_administrador,  # El ID del administrador que está registrado en la sesión
                tabla_afectada="Creditos",
                id_usuario=id,
                cambios=cambios,
                tipo_operacion="Agregar"
            )
            db.session.add(auditoria)
            db.session.commit()
            mostrar_exito = True

        except Exception as error:
            print("Error al insertar datos en la tabla usuarios:", error)

        return render_template(
            "register_credito.html",
            mostrar_exito=mostrar_exito,
            modalidades=modalidades, 
            id_usuario=id, 
            nombre_completo=nombre_completo
        )
    else:  # Si es un GET
        return render_template("register_credito.html", modalidades=modalidades, id_usuario=id, nombre_completo=nombre_completo)


@app.route("/update_credito/<int:id>", methods=["GET", "POST"])
@check_db_connection
def update_credito(id):
    mostrar_exito = False
    mostrar_alerta = False
    credito = Creditos.query.filter_by(id_credito=id).first()
    if not credito:
        return "Credito no encontrado", 404
    
    id_usuario = credito.id_usuario
    usuario = Usuarios.query.filter_by(id_usuario=id_usuario).first()
    nombre_usuario = usuario.nombre_completo

    if request.method == "POST":
        # Obtener los nuevos valores del formulario
        amount = int(request.form.get("amount").replace('.', ''))
        monthly_interest_rate = float(request.form.get("interest_rate").replace(',', '.'))
        installments = int(request.form.get("installments"))
        modalidad = int(request.form.get("modalidad"))
        date_start = request.form.get("date_start")
        fecha_date = request.form.get("date_start")

        # Verifica si la fecha de inicio es válida
        if isinstance(date_start, str):
            date_start = datetime.strptime(date_start, '%Y-%m-%d')
        elif isinstance(date_start, datetime):
            pass
        else:
            return "Formato de fecha no válido", 400

        try:
            # Calcular valores del crédito
            cuota = round(-npf.pmt(monthly_interest_rate / 100, installments, amount))
            total_ganancia = round((cuota * installments) - amount)

            # Actualizar el crédito
            credito.monto_credito = amount
            credito.tasa_interes = monthly_interest_rate
            credito.numero_cuotas = installments
            credito.id_modalidad_pago = modalidad
            credito.fecha_credito = date_start
            credito.ganancia_total = total_ganancia
            db.session.commit()

            # Preparar variables para cálculos de pagos
            saldo = amount
            # Obtenemos TODOS los pagos, incluso los deshabilitados
            pagos_actuales = Pagos.query.filter_by(id_credito=credito.id_credito).order_by(Pagos.numero_cuota.asc()).all()
            fecha_inicio = date_start

            # Función auxiliar para calcular fecha programada
            def calcular_fecha_programada(i):
                if modalidad == 1:  # Diario
                    return fecha_inicio + timedelta(days=i)
                elif modalidad == 2:  # Semanal
                    return fecha_inicio + timedelta(weeks=i)
                elif modalidad == 3:  # Quincenal
                    return fecha_inicio + timedelta(weeks=2 * i)
                else:  # Mensual
                    return fecha_inicio + timedelta(weeks=4 * i)

           
            def calcular_detalles_pago(saldo, es_ultima_cuota=False):
                abono_intereses = round(saldo * (monthly_interest_rate / 100))
                abono_capital = round(cuota - abono_intereses)
                nuevo_saldo = saldo - abono_capital

                if es_ultima_cuota:
                    # Ajustamos el abono a capital en la última cuota para que el saldo sea exactamente 0
                    abono_capital = saldo
                    nuevo_saldo = 0

                return abono_intereses, abono_capital, nuevo_saldo

            # Función auxiliar para actualizar un pago existente o crear uno nuevo
            def actualizar_o_crear_pago(numero_cuota, saldo, es_ultima_cuota):
                # Buscamos primero si existe un pago para esta cuota (habilitado o no)
                pago = next((p for p in pagos_actuales if p.numero_cuota == numero_cuota), None)
                abono_intereses, abono_capital, nuevo_saldo = calcular_detalles_pago(saldo, es_ultima_cuota)
                
                if not pago:
                    pago = Pagos(
                        id_credito=credito.id_credito,
                        numero_cuota=numero_cuota,
                        id_estado_deuda=1,
                        habilitado=True
                    )
                    db.session.add(pago)
                else:
                    # Si el pago existe, lo habilitamos
                    pago.habilitado = True
                
                pago.fecha_pago_programada = calcular_fecha_programada(numero_cuota)
                pago.monto_cuota = cuota
                pago.abono_capital = abono_capital
                pago.abono_intereses = abono_intereses
                pago.saldo_restante = nuevo_saldo
                
                return nuevo_saldo

            # CASO 1: El número de cuotas aumentó
            if installments > len([p for p in pagos_actuales if p.habilitado]):
                # Primero recalculamos todas las cuotas existentes y habilitadas
                for i in range(1, installments + 1):
                    saldo = actualizar_o_crear_pago(i, saldo, i == installments)

            # CASO 2: El número de cuotas disminuyó
            elif installments < len([p for p in pagos_actuales if p.habilitado]):
                # Deshabilitamos las cuotas que sobran
                for pago in pagos_actuales:
                    if pago.numero_cuota > installments:
                        pago.habilitado = False
                
                # Recalculamos las cuotas que quedan
                for i in range(1, installments + 1):
                    saldo = actualizar_o_crear_pago(i, saldo, i == installments)

            # CASO 3: El número de cuotas es igual
            else:
                # Recalculamos todas las cuotas
                for i in range(1, installments + 1):
                    saldo = actualizar_o_crear_pago(i, saldo, i == installments)

            # Registrar auditoría
            cambios = {
                "id credito": credito.id_credito,
                "Nombre completo": nombre_usuario,
                "Monto": amount,
                "Tasa de interes": monthly_interest_rate,
                "Número de cuotas": installments,
                "Modalidad": ModalidadesPago.query.get(modalidad).nombre_modalidad,
                "Fecha de credito": fecha_date
            }

            auditoria = Auditoria(
                id_administrador=current_user.id_administrador,
                tabla_afectada="Creditos",
                id_usuario=id_usuario,
                cambios=cambios,
                tipo_operacion="Actualizar"
            )
            db.session.add(auditoria)
            db.session.commit()

            mostrar_exito = True

        except Exception as error:
            print("Error al actualizar el crédito:", error)
            db.session.rollback()

        return render_template(
            "update_credito.html",
            nombre_usuario=nombre_usuario,
            credito=credito,
            mostrar_alerta=mostrar_alerta,
            mostrar_exito=mostrar_exito,
        )

    return render_template(
        "update_credito.html",
        nombre_usuario=nombre_usuario,
        credito=credito,
        mostrar_alerta=mostrar_alerta,
        mostrar_exito=mostrar_exito,
    )
        

@app.route("/register_user", methods=["GET", "POST"])
@check_db_connection
@login_required
def register_user():
    mostrar_alerta = False
    mostrar_exito = False
    mostrar_alerta2 = False

    if request.method == "POST":
        cedula = request.form.get("cedula")
        correo = request.form.get("correo")

        usuario_existente = Usuarios.query.filter((Usuarios.cedula == cedula) | (Usuarios.correo == correo)).first() 
        if usuario_existente: 
            mostrar_alerta = usuario_existente.cedula == cedula 
            mostrar_alerta2 = usuario_existente.correo == correo
        else:
            try:

                nuevo_usuario = Usuarios(
                    nombre_completo=request.form.get("nombre_completo"),
                    cedula=cedula,
                    direccion=request.form.get("direccion"),
                    celular=request.form.get("celular"),
                    correo=request.form.get("correo")
                )
                db.session.add(nuevo_usuario)
                db.session.commit()
                db.session.refresh(nuevo_usuario) 
                
                # Verificar si se ha subido un archivo
                if 'file' in request.files:
                    file = request.files['file']
                    if file.filename != '':
                        # Asegurarse de que el nombre del archivo sea seguro
                        filename = secure_filename(file.filename)
                        # Guardar el archivo con el nombre ID_USUARIO.pdf
                        filepath = os.path.join('pdfs', f"{nuevo_usuario.id_usuario}.pdf")
                        file.save(filepath)
                        
                # Registrar el cambio en la tabla Auditoria
                cambios = {
                    "Nombre completo": nuevo_usuario.nombre_completo,
                    "Cedula": nuevo_usuario.cedula,
                    "Direccion": nuevo_usuario.direccion,
                    "Celular": nuevo_usuario.celular,
                    "Correo": nuevo_usuario.correo
                }
                
                auditoria = Auditoria(
                    id_administrador=current_user.id_administrador,  # El ID del administrador que está registrado en la sesión
                    tabla_afectada="Usuarios",
                    id_usuario=nuevo_usuario.id_usuario,
                    cambios=cambios,
                    tipo_operacion="Agregar"
                )
                db.session.add(auditoria)
                db.session.commit()
                mostrar_exito = True
                
            except Exception as error:
                print("Error al insertar datos en la tabla usuarios:", error)

    
        # logging.info(f"Resultado del registro por excel: usuario {current_user.correo}")
        return render_template(
            "register_user.html",
            mostrar_alerta=mostrar_alerta,
            mostrar_exito=mostrar_exito,
            mostrar_alerta2=mostrar_alerta2
        )
    elif request.method == "GET":
        # logging.info(f"Ingreso al registro por excel: usuario {current_user.correo}")
        return render_template("register_user.html")



@app.route("/register_employee", methods=["GET", "POST"])
@check_db_connection
@login_required
def register_employee():
    
    if current_user.id_rol == 1:
        return "No tienes permiso para ver los empleados", 403
        
        
    mostrar_alerta = False
    mostrar_exito = False

    if request.method == "POST":
        correo = request.form.get("email")

        usuario_existente = Administradores.query.filter(Administradores.correo == correo).first() 
        if usuario_existente: 
            mostrar_alerta = usuario_existente.correo == correo 
        else:
            try:

                nuevo_empleado = Administradores(
                    correo=request.form.get("email"),
                    id_rol=1
                )
                nuevo_empleado.set_password(request.form.get("password"))
                db.session.add(nuevo_empleado)
                db.session.commit()                
                mostrar_exito = True
                
            except Exception as error:
                print("Error al insertar datos en la tabla usuarios:", error)

    
        # logging.info(f"Resultado del registro por excel: usuario {current_user.correo}")
        return render_template(
            "register_employee.html",
            mostrar_alerta=mostrar_alerta,
            mostrar_exito=mostrar_exito,
        )
    elif request.method == "GET":
        # logging.info(f"Ingreso al registro por excel: usuario {current_user.correo}")
        return render_template("register_employee.html")

@app.route("/logout")
@check_db_connection
@login_required
def logout():
    logout_user()
    flash("Has cerrado sesión", "success")
    return redirect(url_for("login"))



@app.route("/list_users", methods=["GET"])
@check_db_connection
@login_required
def list_users():
    filtro = request.args.get("filtro", "")
    pagina_actual = request.args.get("pagina", default=1, type=int)
    usuarios_por_pagina = 10

    try:
        
        query = Usuarios.query.filter_by(habilitado=1)
        
        
        if filtro:
            

            # Solo un dato: busca en ambos campos
            query = query.filter(
                (Usuarios.nombre_completo.ilike(f"%{filtro}%"))
            )
            
        total_usuarios = query.count()  # Contar el total de usuarios después del filtro
        total_paginas = (total_usuarios - 1) // usuarios_por_pagina + 1  # Calcular el número total de páginas
        inicio = (pagina_actual - 1) * usuarios_por_pagina  # Calcular el índice de inicio para la página actual
        users_paginados = query.offset(inicio).limit(usuarios_por_pagina).all()  # Obtener los usuarios para la página actual
        paginas_visibles = []
        for pagina in range(
            max(1, pagina_actual - 2), min(total_paginas + 1, pagina_actual + 3)
        ):
            paginas_visibles.append(pagina)

        return render_template(
            "list_users.html",
            data=users_paginados,
            pagina_actual=pagina_actual,
            total_usuarios=total_usuarios,
            total_paginas=total_paginas,
            usuarios_por_pagina=usuarios_por_pagina,
            filtro=filtro,
            paginas_visibles=paginas_visibles,
        ), 200

    except Exception as e:
        print("Error al obtener los usuarios:", e)
        # En caso de error, mostrar una página en blanco o una página de error
        return render_template(
            "list_users.html",
            data=[],
            pagina_actual=pagina_actual,
            total_usuarios=0,
            total_paginas=0,
            usuarios_por_pagina=usuarios_por_pagina,
            filtro=filtro,
            paginas_visibles=[],
        ), 200
    
    
# Ruta Flask corregida
@app.route('/send_multiple_emails', methods=['POST'])
@check_db_connection
@login_required
def send_multiple_emails():
    try:
        # Eliminamos la lectura duplicada de request.get_json()
        data = request.get_json()
        
        if not data or not isinstance(data, dict):
            return jsonify({"success": False, "message": "Datos inválidos"}), 400

        ids_pago = data.get("ids", [])
        
        if not ids_pago or not isinstance(ids_pago, list):
            return jsonify({"success": False, "message": "No se proporcionaron IDs válidos"}), 400

        resultados = []

        for id_pago in ids_pago:
            try:
                pago = db.session.query(
                    Pagos,
                    Usuarios
                ).join(
                    Creditos, Pagos.id_credito == Creditos.id_credito
                ).join(
                    Usuarios, Creditos.id_usuario == Usuarios.id_usuario
                ).filter(
                    Pagos.id_pago == id_pago
                ).first()

                if not pago:
                    resultados.append({"id_pago": id_pago, "status": "Pago no encontrado"})
                    continue

                pago_data = pago[0]
                usuario_data = pago[1]

                # Validación adicional de datos
                if not usuario_data.correo:
                    resultados.append({"id_pago": id_pago, "status": "Correo no disponible"})
                    continue

                email = usuario_data.correo
                subject = "Notificación de mora en su pago"
                body_text = (
                    f"Estimado(a) {usuario_data.nombre_completo},\n\n"
                    f"Le informamos que se encuentra en mora con el pago correspondiente a la cuota #{pago_data.numero_cuota}. "
                    f"Fecha programada para el pago: {pago_data.fecha_pago_programada.strftime('%d/%m/%Y')}.\n"
                    f"Días en mora: {pago_data.dias_mora}.\n\n"
                    f"Por favor, regularice su situación a la brevedad para evitar inconvenientes mayores.\n\n"
                    f"Atentamente,\nReagendar."
                )

                enviado = send_email_amazon(email, subject, body_text)
                resultados.append({
                    "id_pago": id_pago, 
                    "status": "Enviado" if enviado else "Error al enviar",
                    "email": email
                })

            except Exception as e:
                resultados.append({
                    "id_pago": id_pago,
                    "status": f"Error: {str(e)}"
                })

        return jsonify({
            "success": True,
            "resultados": resultados,
            "total_enviados": len([r for r in resultados if r["status"] == "Enviado"])
        }), 200

    except Exception as e:
        return jsonify({
            "success": False, 
            "message": f"Error interno del servidor: {str(e)}"
        }), 500



@app.route("/list_mora", methods=["GET"])
@check_db_connection
@login_required
def list_mora():
    pagina_actual = request.args.get("pagina", default=1, type=int)
    usuarios_por_pagina = 10

    try:
        # Consulta para obtener todos los pagos en mora
        query = db.session.query(
            Pagos.id_pago,
            Usuarios.nombre_completo,
            Pagos.numero_cuota,
            Pagos.fecha_pago_programada,
            Pagos.fecha_pago_real,
            Pagos.monto_cuota,
            Pagos.abono_capital,
            Pagos.abono_intereses,
            Pagos.saldo_restante,
            EstadosDeuda.nombre_estado,
            Usuarios.id_usuario,
            Creditos.id_credito,
            Pagos.dias_mora
        ).select_from(Pagos) \
        .join(Creditos, Pagos.id_credito == Creditos.id_credito) \
        .join(Usuarios, Creditos.id_usuario == Usuarios.id_usuario) \
        .join(EstadosDeuda, Pagos.id_estado_deuda == EstadosDeuda.id_estado) \
        .filter(Pagos.id_estado_deuda == 3) \
        .filter(Pagos.dias_mora > 0) \
        .order_by(Pagos.dias_mora.desc())

        # Paginación
        total_usuarios = query.count()
        total_paginas = (total_usuarios - 1) // usuarios_por_pagina + 1
        inicio = (pagina_actual - 1) * usuarios_por_pagina
        users_paginados = query.offset(inicio).limit(usuarios_por_pagina).all()

        # Páginas visibles para la navegación
        paginas_visibles = [
            pagina for pagina in range(
                max(1, pagina_actual - 2), min(total_paginas + 1, pagina_actual + 3)
            )
        ]

        # Renderizamos la plantilla
        return render_template(
            "list_mora.html",
            data=users_paginados,
            pagina_actual=pagina_actual,
            total_usuarios=total_usuarios,
            total_paginas=total_paginas,
            usuarios_por_pagina=usuarios_por_pagina,
            paginas_visibles=paginas_visibles,
        ), 200

    except Exception as e:
        print("Error al obtener los pagos en mora:", e)
        return render_template(
            "list_mora.html",
            data=[],
            pagina_actual=pagina_actual,
            total_usuarios=0,
            total_paginas=0,
            usuarios_por_pagina=usuarios_por_pagina,
            paginas_visibles=[],
        ), 200


@app.route("/list_pagos/<int:id>", methods=["GET"])
@check_db_connection
@login_required
def list_pagos(id):
    # filtro = request.args.get("filtro", "")
    pagina_actual = request.args.get("pagina", default=1, type=int)
    usuarios_por_pagina = 10

    try:
        
        query = db.session.query(
            Pagos.id_pago,
            Usuarios.nombre_completo,
            Pagos.numero_cuota,
            Pagos.fecha_pago_programada,
            Pagos.fecha_pago_real,
            Pagos.monto_cuota,
            Pagos.abono_capital,
            Pagos.abono_intereses,
            Pagos.saldo_restante,
            EstadosDeuda.nombre_estado,
            Usuarios.id_usuario,
            Creditos.id_credito,
            Pagos.dias_mora
        ).select_from(Pagos) \
        .join(Creditos, Pagos.id_credito == Creditos.id_credito) \
        .join(Usuarios, Creditos.id_usuario == Usuarios.id_usuario) \
        .join(EstadosDeuda, Pagos.id_estado_deuda == EstadosDeuda.id_estado) \
        .filter(Creditos.id_credito == id) \
        .filter(Pagos.habilitado == True) \
        .order_by(Pagos.id_pago.asc())


        total_usuarios = query.count()
        total_paginas = (total_usuarios - 1) // usuarios_por_pagina + 1
        inicio = (pagina_actual - 1) * usuarios_por_pagina
        users_paginados = query.offset(inicio).limit(usuarios_por_pagina).all()
        results = query.all()


        paginas_visibles = []
        for pagina in range(
            max(1, pagina_actual - 2), min(total_paginas + 1, pagina_actual + 3)
        ):
            paginas_visibles.append(pagina)

        return render_template(
            "list_pagos.html",
            data=users_paginados,
            pagina_actual=pagina_actual,
            total_usuarios=total_usuarios,
            total_paginas=total_paginas,
            usuarios_por_pagina=usuarios_por_pagina,
            # filtro=filtro,
            paginas_visibles=paginas_visibles,
        ), 200

    except Exception as e:
        print("Error al obtener los usuarios:", e)
        # En caso de error, mostrar una página en blanco o una página de error
        return render_template(
            "list_pagos.html",
            data=[],
            pagina_actual=pagina_actual,
            total_usuarios=0,
            total_paginas=0,
            usuarios_por_pagina=usuarios_por_pagina,
            # filtro=filtro,
            paginas_visibles=[],
        ), 200


@app.route("/list_credito/<int:id>", methods=["GET"])
@check_db_connection
@login_required
def list_credito(id):
    pagina_actual = request.args.get("pagina", default=1, type=int)
    usuarios_por_pagina = 10

    try:
        # Consulta para obtener el número total de registros
        query_sql = db.session.query(
            Creditos.id_credito,
            Usuarios.nombre_completo,
            Creditos.monto_credito,
            Creditos.tasa_interes,
            Creditos.numero_cuotas,
            ModalidadesPago.nombre_modalidad,
            Creditos.fecha_credito,
            Creditos.fecha_creacion,
            Creditos.fecha_actualizacion,
            Creditos.ganancia_total,
            Usuarios.id_usuario
        ).join(
            Usuarios, Creditos.id_usuario == Usuarios.id_usuario
        ).join(
            ModalidadesPago, Creditos.id_modalidad_pago == ModalidadesPago.id_modalidad
        ).filter(
            Usuarios.id_usuario == id,
            Creditos.habilitado == True  # Filtro para incluir solo los créditos habilitados
        ).order_by(
            Creditos.id_credito.asc()  # Ordenar por id_credito de menor a mayor
        )



        # Para obtener el total de usuarios
        total_usuarios = query_sql.count()

        # Cálculo de paginación
        total_paginas = (total_usuarios - 1) // usuarios_por_pagina + 1
        inicio = (pagina_actual - 1) * usuarios_por_pagina

        # Consulta con paginación
        users_paginados = query_sql.offset(inicio).limit(usuarios_por_pagina).all()

        paginas_visibles = []
        for pagina in range(max(1, pagina_actual - 2), min(total_paginas + 1, pagina_actual + 3)):
            paginas_visibles.append(pagina)

        return render_template(
            "list_credito.html",
            data=users_paginados,
            pagina_actual=pagina_actual,
            total_usuarios=total_usuarios,
            total_paginas=total_paginas,
            usuarios_por_pagina=usuarios_por_pagina,
            paginas_visibles=paginas_visibles,
        ), 200

    except Exception as e:
        print("Error al obtener los usuarios:", e)
        # En caso de error, mostrar una página en blanco o una página de error
        return render_template(
            "list_credito.html",
            data=[],
            pagina_actual=pagina_actual,
            total_usuarios=0,
            total_paginas=0,
            usuarios_por_pagina=usuarios_por_pagina,
            paginas_visibles=[],
        ), 200


@app.route("/list_all_credito", methods=["GET"])
@check_db_connection
@login_required
def list_all_credito():
    pagina_actual = request.args.get("pagina", default=1, type=int)
    usuarios_por_pagina = 10
    
    filtro_usuario = request.args.get("filtro_usuario", "").strip()

    try:
        # Consulta para obtener el número total de registros
        query_sql = db.session.query(
            Creditos.id_credito,
            Usuarios.nombre_completo,
            Creditos.monto_credito,
            Creditos.tasa_interes,
            Creditos.numero_cuotas,
            ModalidadesPago.nombre_modalidad,
            Creditos.fecha_credito,
            Creditos.fecha_creacion,
            Creditos.fecha_actualizacion,
            Creditos.ganancia_total,
            Usuarios.id_usuario
        ).join(
            Usuarios, Creditos.id_usuario == Usuarios.id_usuario
        ).join(
            ModalidadesPago, Creditos.id_modalidad_pago == ModalidadesPago.id_modalidad
        ).filter(
            Creditos.habilitado == True  # Filtro para incluir solo los créditos habilitados
        ).order_by(
            Creditos.id_credito.asc()  # Ordenar por id_credito de menor a mayor
        )
        
        # Aplicar filtros dinámicos
        if filtro_usuario:
            query_sql = query_sql.filter(Usuarios.nombre_completo.ilike(f"%{filtro_usuario}%"))
            
        # Calcular la suma total del monto de la cuota según el filtro
        suma_monto = query_sql.with_entities(db.func.sum(Pagos.monto_cuota)).scalar() or 0


        # Para obtener el total de usuarios
        total_usuarios = query_sql.count()

        # Cálculo de paginación
        total_paginas = (total_usuarios - 1) // usuarios_por_pagina + 1
        inicio = (pagina_actual - 1) * usuarios_por_pagina

        # Consulta con paginación
        users_paginados = query_sql.offset(inicio).limit(usuarios_por_pagina).all()

        paginas_visibles = []
        for pagina in range(max(1, pagina_actual - 2), min(total_paginas + 1, pagina_actual + 3)):
            paginas_visibles.append(pagina)

        return render_template(
            "list_all_credito.html",
            data=users_paginados,
            pagina_actual=pagina_actual,
            total_usuarios=total_usuarios,
            total_paginas=total_paginas,
            usuarios_por_pagina=usuarios_por_pagina,
            paginas_visibles=paginas_visibles,
            suma_monto=suma_monto
        ), 200

    except Exception as e:
        print("Error al obtener los usuarios:", e)
        # En caso de error, mostrar una página en blanco o una página de error
        return render_template(
            "list_all_credito.html",
            data=[],
            pagina_actual=pagina_actual,
            total_usuarios=0,
            total_paginas=0,
            usuarios_por_pagina=usuarios_por_pagina,
            paginas_visibles=[],
            suma_monto=0
        ), 200


@app.route("/list_all_pagos", methods=["GET"])
@check_db_connection
@login_required
def list_all_pagos():
    pagina_actual = request.args.get("pagina", default=1, type=int)
    usuarios_por_pagina = 10

    # Filtros opcionales
    filtro_usuario = request.args.get("filtro_usuario", "").strip()
    filtro_estado = request.args.get("filtro_estado", "").strip()

    try:
        query = db.session.query(
            Pagos.id_pago,
            Usuarios.nombre_completo,
            Pagos.numero_cuota,
            Pagos.fecha_pago_programada,
            Pagos.fecha_pago_real,
            Pagos.monto_cuota,
            Pagos.abono_capital,
            Pagos.abono_intereses,
            Pagos.saldo_restante,
            EstadosDeuda.nombre_estado,
            Usuarios.id_usuario,
            Creditos.id_credito,
            Pagos.dias_mora
        ).select_from(Pagos) \
        .join(Creditos, Pagos.id_credito == Creditos.id_credito) \
        .join(Usuarios, Creditos.id_usuario == Usuarios.id_usuario) \
        .join(EstadosDeuda, Pagos.id_estado_deuda == EstadosDeuda.id_estado) \
        .filter(Pagos.habilitado == True)

        # Aplicar filtros dinámicos
        if filtro_usuario:
            query = query.filter(Usuarios.nombre_completo.ilike(f"%{filtro_usuario}%"))
        if filtro_estado:
            query = query.filter(EstadosDeuda.nombre_estado.ilike(f"%{filtro_estado}%"))
            
         # Calcular la suma total del monto de la cuota según el filtro
        suma_monto = query.with_entities(db.func.sum(Pagos.monto_cuota)).scalar() or 0

        total_usuarios = query.count()
        total_paginas = (total_usuarios - 1) // usuarios_por_pagina + 1
        inicio = (pagina_actual - 1) * usuarios_por_pagina
        users_paginados = query.offset(inicio).limit(usuarios_por_pagina).all()

        paginas_visibles = [
            pagina for pagina in range(
                max(1, pagina_actual - 2),
                min(total_paginas + 1, pagina_actual + 3)
            )
        ]

        return render_template(
            "list_all_pagos.html",
            data=users_paginados,
            pagina_actual=pagina_actual,
            total_usuarios=total_usuarios,
            total_paginas=total_paginas,
            usuarios_por_pagina=usuarios_por_pagina,
            filtro_usuario=filtro_usuario,
            filtro_estado=filtro_estado,
            paginas_visibles=paginas_visibles,
            suma_monto=suma_monto  # Pasar la suma a la plantilla

        ), 200

    except Exception as e:
        print("Error al obtener los pagos:", e)
        return render_template(
            "list_all_pagos.html",
            data=[],
            pagina_actual=pagina_actual,
            total_usuarios=0,
            total_paginas=0,
            usuarios_por_pagina=usuarios_por_pagina,
            filtro_usuario=filtro_usuario,
            filtro_estado=filtro_estado,
            paginas_visibles=[],
            suma_monto=suma_monto  # Pasar la suma a la plantilla

        ), 200



@app.route("/history_user/<int:id>", methods=["GET", "POST"])
@check_db_connection
@login_required
def history_user(id):
    
    usuario_actual = Usuarios.query.get(id)
    if not usuario_actual:
        return "Usuario no encontrado", 404
    
    pagina_actual = request.args.get("pagina", default=1, type=int)
    usuarios_por_pagina = 10
    
    try:
        query = db.session.query(
            Auditoria,
            Administradores.correo
        ).join(
            Administradores, Administradores.id_administrador == Auditoria.id_administrador
        ).filter(
            Auditoria.id_usuario == id
        )
        
        total_usuarios = query.count()
        total_paginas = (total_usuarios - 1) // usuarios_por_pagina + 1
        inicio = (pagina_actual - 1) * usuarios_por_pagina
        users_paginados = query.offset(inicio).limit(usuarios_por_pagina).all()

        paginas_visibles = [
            pagina for pagina in range(
                max(1, pagina_actual - 2),
                min(total_paginas + 1, pagina_actual + 3)
            )
        ]


        return render_template('history_user.html', histories=users_paginados, pagina_actual=pagina_actual, paginas_visibles=paginas_visibles, total_paginas=total_paginas), 200
    except Exception as e:
        print("Error al obtener el historial:", e)
        return render_template('history_user.html', histories=[],pagina_actual=pagina_actual, paginas_visibles=[], total_paginas=0), 200


@app.route("/update_user/<int:id>", methods=["GET", "POST"])
@check_db_connection
@login_required
def update_user(id):
    mostrar_exito = False
    mostrar_alerta = False
    
    usuario_actual = Usuarios.query.get(id)

    if not usuario_actual:
        return "Usuario no encontrado", 404
    
    if request.method == "POST":
        # Obtener valores actuales y nuevos
        cambios = {}
        nuevos_valores = {
            "nombre_completo": request.form.get("nombre_completo"),
            "cedula": request.form.get("cedula"),
            "direccion": request.form.get("direccion"),
            "celular": request.form.get("celular"),
            "correo": request.form.get("correo"),
        }

        # Comparar valores actuales con los nuevos
        for campo, nuevo_valor in nuevos_valores.items():
            valor_actual = getattr(usuario_actual, campo)
            if str(valor_actual) != str(nuevo_valor):  # Compara valores como cadenas
                cambios[campo] = nuevo_valor
                setattr(usuario_actual, campo, nuevo_valor)  # Actualiza solo si hay cambios
                
        
        # Si hay cambios, actualiza la base de datos y registra en la auditoría
        if cambios:
            try:
                db.session.commit()
                # Registrar en la auditoría
                auditoria = Auditoria(
                    id_administrador=current_user.id_administrador,  # ID del administrador actual
                    tabla_afectada="Usuarios",
                    id_usuario=id,
                    cambios=cambios,
                    tipo_operacion="Actualizar"
                )
                db.session.add(auditoria)
                db.session.commit()
                mostrar_exito = True
            except Exception:
                db.session.rollback()
                mostrar_alerta = True
        else:
            mostrar_exito = False  # No hubo cambios, por lo que no se muestra éxito
            
        # Verificar si se ha subido un archivo
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                # Asegurarse de que el nombre del archivo sea seguro
                filename = secure_filename(file.filename)
                # Guardar el archivo con el nombre ID_USUARIO.pdf
                filepath = os.path.join('pdfs', f"{id}.pdf")
                file.save(filepath)
                mostrar_exito = True

            

        return render_template('update_user.html', user=usuario_actual, mostrar_exito=mostrar_exito, mostrar_alerta=mostrar_alerta)
    
    elif request.method == "GET":
        return render_template('update_user.html', user=usuario_actual)



    

@app.route("/deshabilitar_usuario/<int:id>", methods=["PUT"])
@check_db_connection
@login_required
def deshabilitar_usuario(id):
    if request.method == "PUT":
        try:
            usuario = Usuarios.query.get(id)
            if usuario:
                usuario.habilitado = False
                db.session.commit()
                
                auditoria = Auditoria(
                    id_administrador=current_user.id_administrador,  # ID del administrador actual
                    tabla_afectada="Usuarios",
                    id_usuario=id,
                    cambios= {"Habilitado": "No"},
                    tipo_operacion="Eliminar"
                )
                db.session.add(auditoria)
                db.session.commit()
                
                return "", 204  # No Content
            else:
                return "Usuario no encontrado", 404  # Not Found
        except Exception as error:
            print("Error al deshabilitar el usuario:", error)
            db.session.rollback()
            return "Error al deshabilitar el usuario", 500  # Internal Server Error
    else:
        return "Método no permitido", 405  # Method Not Allowed


@app.route("/deshabilitar_credito/<int:id>", methods=["PUT"])
@check_db_connection
@login_required
def deshabilitar_credito(id):
    if request.method == "PUT":
        try:
            credito = Creditos.query.get(id)
            

            if credito:
                credito.habilitado = False
                db.session.commit()
                
                auditoria = Auditoria(
                    id_administrador=current_user.id_administrador,  # ID del administrador actual
                    tabla_afectada="Creditos",
                    id_usuario=credito.id_usuario,
                    cambios= {"Habilitado": "No",
                              "id credito": credito.id_credito
                            },
                    tipo_operacion="Eliminar"
                )
                db.session.add(auditoria)
                db.session.commit()
                
                return "", 204  # No Content
            else:
                return "Credito no encontrado", 404  # Not Found
        except Exception as error:
            print("Error al deshabilitar el credito:", error)
            db.session.rollback()
            return "Error al deshabilitar el credito", 500  # Internal Server Error
    else:
        return "Método no permitido", 405  # Method Not Allowed
    
    
@app.route('/usuario/<int:id_usuario>/archivo', methods=['GET', 'POST'])
def gestionar_archivo(id_usuario):
    # Ruta completa del archivo
    filepath = os.path.join(UPLOAD_FOLDER, f"{id_usuario}.pdf")

    if request.method == 'GET':
        # Descargar el archivo si existe
        if os.path.exists(filepath):
            return send_file(filepath, as_attachment=True, download_name=f"{id_usuario}.pdf")
        else:
            # Responder con 404 si no se encuentra el archivo
            return jsonify({'message': 'Archivo no encontrado'}), 404

    if request.method == 'POST':
        # Subir o reemplazar el archivo
        if 'file' not in request.files:
            return jsonify({'message': 'No se envió ningún archivo'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'message': 'Nombre de archivo inválido'}), 400

        if file and file.filename.endswith('.pdf'):
            # Guardar el archivo
            filename = secure_filename(f"{id_usuario}.pdf")
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return jsonify({'message': 'Archivo guardado correctamente'}), 200
        else:
            return jsonify({'message': 'Formato de archivo no permitido. Solo se aceptan PDFs.'}), 400
