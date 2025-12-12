from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from .extensions import db, bcrypt, jwt, migrate
from .routes import api


def create_app():
    # Cargar variables de entorno desde backend/.env
    load_dotenv()
    app = Flask(__name__)
    
    # Configuración
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecoshop.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your-secret-key-change-this'  # Cambiar en producción
    
    # Inicializar extensiones
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Registrar blueprints
    app.register_blueprint(api, url_prefix='/api')
    
    return app
