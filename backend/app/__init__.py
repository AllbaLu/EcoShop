from flask import Flask
from .config import Config
from .extensions import db, migrate, cors, bcrypt, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Registrar rutas
    from .routes import api
    app.register_blueprint(api, url_prefix="/api")

    return app
