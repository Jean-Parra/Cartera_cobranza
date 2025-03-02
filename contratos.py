from docx import Document

# Definir los valores a reemplazar
datos = {
    "{{NOMBRE}}": "JHELVER ALEXANDER HERRERA LOZADA", #OBLIGATORIO
    "{{CEDULA}}": "86.050.606", #OBLIGATORIO
    "{{RESIDENCIA}}": "SOGAMOSO/BOYACA", #OBLIGATORIO
    "{{DIRECCION}}": "Calle 3 Sur No15=23", #OBLIGATORIO
    "{{MONTO_TOTAL}}": "1.054.000", 
    "{{ANTICIPO}}": "100.000", 
    "{{NUMERO_CUOTAS}}": "6",
    "{{NUMERO_CUOTAS_TEXTO}}": "seis", 
    "{{VALOR_CUOTA}}": "318.000", 
    "{{MONTO_TOTAL_TEXTO}}": "UN MILLON CINCUENTA Y CUATRO MIL", 
    "{{ANTICIPO_TEXTO}}": "CIEN MIL", 
    "{{MONTO_COSTOS_CONSULARES_TEXTO}}": "OCHOCIENTOS TREINTA Y DOS MIL QUINIENTOS",
    "{{MONTO_COSTOS_CONSULARES}}": "832.500",
    "{{MONTO_VALOR_TEXTO}}": "NOVECIENTOS CINCUENTA Y CUATRO  MIL", 
    "{{MONTO_VALOR}}": "954.000", 
    "{{NUMERO_CREDITO}}": "279",
    "{{FECHA_FIRMA}}": "04/01/2025",
    "{{FECHA_FIRMA_DIA_TEXTO}}": "Cuatro",
    "{{FECHA_FIRMA_DIA}}": "4", 
    "{{FECHA_FIRMA_MES_TEXTO}}": "enero", 
    "{{FECHA_FIRMA_AÑO}}": "2025", 
    "{{EXPEDICION}}": "VILLAVICENCIO", #OBLIGATORIO
    "{{CORREO}}": "Jhelhelo@gmail.com" #OBLIGATORIO
}

# Cargar el contrato base
contrato = Document(r"C:\Users\yampi\Downloads\CONTRATO DE PRESTACIÓN DE SERVICIOS DE FINANCIAMIENTO.docx")

# Reemplazar campos respetando el formato
for parrafo in contrato.paragraphs:
    for placeholder, valor in datos.items():
        if placeholder in parrafo.text:
            for run in parrafo.runs:  # Iterar sobre cada segmento con formato
                if placeholder in run.text:
                    run.text = run.text.replace(placeholder, valor)

# Guardar el contrato modificado
contrato.save(r"C:\Users\yampi\Downloads\CONTRATO_DE_PRESTACIÓN_DE_SERVICIOS_DE_FINANCIAMIENTO_modificado.docx")
