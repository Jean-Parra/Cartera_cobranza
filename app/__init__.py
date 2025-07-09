from flask import Flask, session
from itsdangerous import URLSafeTimedSerializer
from config import Config
from flask_wtf import CSRFProtect
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
from flask_socketio import SocketIO

app = Flask(__name__)
app.config.from_object(Config)
csrf = CSRFProtect(app)

# Configuración de Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # Ruta de inicio de sesión

# Configuración de SQLAlchemy
db = SQLAlchemy(app)

# Serializer para tokens (por ejemplo, para restablecer contraseñas)
s = URLSafeTimedSerializer(app.config['SECRET_KEY'])

# Configuración de Socket.IO
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="gevent")

# Variable global para almacenar los usuarios activos (IDs en formato string)
current_active_users = set()

# Duración de la sesión y tiempo de expiración del token CSRF (9 horas)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=9)
app.config['WTF_CSRF_TIME_LIMIT'] = 9 * 3600  # 9 horas en segundos

@app.before_request
def make_session_permanent():
    session.permanent = True

from app import routes, models
