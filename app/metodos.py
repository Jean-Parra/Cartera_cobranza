from datetime import datetime
from email.mime.image import MIMEImage
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
import mysql.connector
from dotenv import load_dotenv
import boto3
from botocore.exceptions import ClientError
load_dotenv() 

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

file_handler = logging.FileHandler(f"log_metodos_{str(datetime.now().date())}.log")
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)


class ConexionDB:
    @staticmethod
    def conectar():
        try:
            conexion = mysql.connector.connect(
                user=os.environ.get('DB_USER'),
                password=os.environ.get('DB_PASSWORD'),
                host=os.environ.get('DB_HOST'),
                database=os.environ.get('DB_DATABASE'),
                port=os.environ.get('DB_PORT'),
                connection_timeout=30,  # Aumenta el tiempo de espera aquí
            )

            if conexion.is_connected():
                return conexion

        except mysql.connector.Error as error:
            print("Error al conectarse a la base de datos:", error)
            return None


def send_email_amazon(recipient, subject, body_text, body_html=None):
    # Configura las credenciales de AWS
    aws_region = "us-east-1"
    ses_client = boto3.client('ses', region_name=aws_region)

    # Configura el correo electrónico
    sender = os.environ.get('EMAIL')

    recipient = recipient
    subject = subject
    body_text = body_text
    body_html = body_html

    # Crea el mensaje multipart
    msg = MIMEMultipart()
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipient

     # Adjunta el cuerpo del correo electrónico
    msg.attach(MIMEText(body_text, 'plain'))
    if body_html:
        msg.attach(MIMEText(body_html, 'html'))


    try:
        # Envía el correo electrónico
        response = ses_client.send_raw_email(
            Source=sender,
            Destinations=[recipient],
            RawMessage={
                'Data': msg.as_string()
            }
        )
        print(f"Correo electrónico enviado. ID de mensaje: {response['MessageId']}")
        return True
    except ClientError as e:
        print(f"Error al enviar el correo electrónico: {e.response['Error']['Message']}")
        return False
