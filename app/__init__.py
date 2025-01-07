from flask import Flask, session
from itsdangerous import URLSafeTimedSerializer
from config import Config
from flask_wtf import CSRFProtect
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta

app = Flask(__name__)
app.config.from_object(Config)
csrf = CSRFProtect(app)

# Configuración de Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # Ruta de inicio de sesión

# Configuración de SQLAlchemy
db = SQLAlchemy(app)

s = URLSafeTimedSerializer(app.config['SECRET_KEY'])

# Configuración de la duración de la sesión
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=9)

# Configuración del tiempo de expiración del token CSRF
app.config['WTF_CSRF_TIME_LIMIT'] = 9 * 3600  # 9 horas en segundos

@app.before_request
def make_session_permanent():
    session.permanent = True

from app import routes, models
