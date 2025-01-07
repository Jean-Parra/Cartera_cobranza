from flask import jsonify
from flask_login import UserMixin
from app import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.mysql import ENUM
from sqlalchemy.dialects.mysql import DECIMAL
from sqlalchemy import JSON, func

@login_manager.user_loader
def load_user(user_id):
    return Administradores.query.get(int(user_id))


class Administradores(db.Model):
    __tablename__ = 'Administradores'
    id_administrador = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(100), nullable=False, unique=True)
    habilitado = db.Column(db.Boolean, default=True)
    contraseña = db.Column(db.String(255), nullable=False)
    id_rol = db.Column(
        db.Integer,
        db.ForeignKey('Roles.id_rol'),
        nullable=False
    )

    # Relación con Roles
    rol = db.relationship('Roles', back_populates='administradores')

    # Relación con Auditoria
    auditorias = db.relationship('Auditoria', back_populates='administrador')  # Relación inversa

    def set_password(self, password):
        self.contraseña = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.contraseña, password)

    def __repr__(self):
        return f'<Administradores {self.id_administrador}>'



    # Métodos requeridos por Flask-Login
    @property
    def is_authenticated(self):
        return True
    
    @property
    def is_active(self):
        return self.habilitado

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id_administrador)


class Roles(db.Model):
    __tablename__ = 'Roles'
    id_rol = db.Column(db.Integer, primary_key=True)
    nombre_rol = db.Column(
        db.Enum('Admin', 'Usuario', 'Contador', name='nombre_rol_enum'), 
        nullable=False
    )

    # Relación con Administradores
    administradores = db.relationship('Administradores', back_populates='rol')  # Relación inversa

    def __repr__(self):
        return f'<Roles {self.id_rol}>'



class Auditoria(db.Model):
    __tablename__ = 'Auditoria'
    id_auditoria = db.Column(db.Integer, primary_key=True)
    id_administrador = db.Column(
        db.Integer,
        db.ForeignKey('Administradores.id_administrador'),
        nullable=False
    )
    tabla_afectada = db.Column(db.String(50), nullable=False)
    id_usuario = db.Column(
        db.Integer,
        db.ForeignKey('Usuarios.id_usuario'),
        nullable=False
    )
    cambios = db.Column(
        JSON,  # Aquí usamos un campo JSON para almacenar los detalles de los cambios
        nullable=True
    )
    tipo_operacion = db.Column(db.String(255), nullable=False)

    fecha_cambio = db.Column(
        db.DateTime,
        nullable=True,
        default=db.func.current_timestamp()
    )

    # Relación con Administradores
    administrador = db.relationship('Administradores', back_populates='auditorias')

    # Relación con Usuarios
    usuario = db.relationship('Usuarios', back_populates='auditorias')

    def __repr__(self):
        return f'<Auditoria {self.id_auditoria}>'



class EstadosDeuda(db.Model):
    __tablename__ = 'EstadosDeuda'

    id_estado = db.Column(db.Integer, primary_key=True)
    nombre_estado = db.Column(
        ENUM(
            'Pagado',
            'Pendiente',
            'Vencido'),
        nullable=False
    )

    # Especificar explícitamente la clave foránea y la condición de unión
    pagos = db.relationship(
        'Pagos',
        back_populates='estado_deuda',
        primaryjoin="Pagos.id_estado_deuda == EstadosDeuda.id_estado",  # Condición de unión explícita
        foreign_keys="Pagos.id_estado_deuda"  # Clave foránea a utilizar para la unión
    )

    def __repr__(self):
        return f'<EstadosDeuda {self.id_estado}>'




class Pagos(db.Model):
    __tablename__ = 'Pagos'
    id_pago = db.Column(db.Integer, primary_key=True)
    id_credito = db.Column(db.Integer, db.ForeignKey('Creditos.id_credito'), nullable=False)
    numero_cuota = db.Column(db.Integer, nullable=False)
    fecha_pago_programada = db.Column(db.Date, nullable=False)
    fecha_pago_real = db.Column(db.Date, nullable=True, default=None)
    monto_cuota = db.Column(db.Integer, nullable=False)
    abono_capital = db.Column(db.Integer, nullable=False)
    abono_intereses = db.Column(db.Integer, nullable=False)
    saldo_restante = db.Column(db.Integer, nullable=False)
    id_estado_deuda = db.Column(db.Integer, db.ForeignKey('EstadosDeuda.id_estado'), nullable=False)
    dias_mora = db.Column(db.Integer, nullable=True, default=0)
    habilitado = db.Column(db.Boolean, default=True)

    # Relación con Creditos
    credito = db.relationship('Creditos', back_populates='pagos')

    # Relación con EstadosDeuda
    estado_deuda = db.relationship(
        'EstadosDeuda', 
        back_populates='pagos',
        primaryjoin="Pagos.id_estado_deuda == EstadosDeuda.id_estado",  # Condición de unión explícita
        foreign_keys="Pagos.id_estado_deuda"  # Clave foránea a utilizar para la unión
    )
    

    def __repr__(self):
        return f'<Pagos {self.id_pago}>'





class Creditos(db.Model):
    __tablename__ = 'Creditos'
    id_credito = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(
        db.Integer,
        db.ForeignKey('Usuarios.id_usuario'),
        nullable=False
    )
    monto_credito = db.Column(db.Integer, nullable=False)
    tasa_interes = db.Column(DECIMAL(10, 2), nullable=False)
    numero_cuotas = db.Column(db.Integer, nullable=False)
    id_modalidad_pago = db.Column(
        db.Integer,
        db.ForeignKey('ModalidadesPago.id_modalidad'),
        nullable=False
    )
    fecha_credito = db.Column(
        db.DateTime,
        nullable=False    
    )
    fecha_creacion = db.Column(
        db.DateTime,
        nullable=True,
        default=db.func.current_timestamp()
    )
    fecha_actualizacion = db.Column(
        db.DateTime,
        nullable=True,
        default=func.current_timestamp(),
        onupdate=func.current_timestamp()
    )
    ganancia_total = db.Column(db.Integer, nullable=False)
    habilitado = db.Column(db.Boolean, default=True)


    # Relación con Usuarios
    usuario = db.relationship('Usuarios', back_populates='creditos')

    # Relación con ModalidadesPago, con especificación explícita de claves foráneas
    modalidad_pago = db.relationship(
        'ModalidadesPago',
        back_populates='creditos',
        primaryjoin="Creditos.id_modalidad_pago == ModalidadesPago.id_modalidad",  # Condición explícita
        foreign_keys="Creditos.id_modalidad_pago"  # Clave foránea a utilizar para la unión
    )
    
    pagos = db.relationship('Pagos', back_populates='credito')

    def __repr__(self):
        return f'<Creditos {self.id_credito}>'


class ModalidadesPago(db.Model):
    __tablename__ = 'ModalidadesPago'
    id_modalidad = db.Column(db.Integer, primary_key=True)
    nombre_modalidad = db.Column(ENUM('Mensual', 'Quincenal', 'Semanal', 'Diario'), nullable=False)
    
    # Relación con Creditos, con especificación explícita de claves foráneas
    creditos = db.relationship(
        'Creditos',
        back_populates='modalidad_pago',
        primaryjoin="Creditos.id_modalidad_pago == ModalidadesPago.id_modalidad",  # Condición explícita
        foreign_keys="Creditos.id_modalidad_pago"  # Clave foránea a utilizar para la unión
    )

    def __repr__(self):
        return f'<ModalidadesPago {self.id_modalidad}>'



class Usuarios(db.Model):
    __tablename__ = 'Usuarios'
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(100), nullable=False)
    cedula = db.Column(db.String(20), nullable=False)
    direccion = db.Column(db.String(255), nullable=False)
    celular = db.Column(db.String(20), nullable=False)
    correo = db.Column(db.String(100), nullable=False)
    habilitado = db.Column(db.Boolean, default=True)
    fecha_creacion = db.Column(
        db.DateTime,
        nullable=True,
        default=func.current_timestamp()
    )
    fecha_actualizacion = db.Column(
        db.DateTime,
        nullable=True,
        default=func.current_timestamp(),
        onupdate=func.current_timestamp()
    )

    # Relationship with Auditoria
    auditorias = db.relationship('Auditoria', back_populates='usuario')

    # Relationship with Creditos
    creditos = db.relationship('Creditos', back_populates='usuario')

    def __repr__(self):
        return f'<Usuarios {self.id_usuario}>'

