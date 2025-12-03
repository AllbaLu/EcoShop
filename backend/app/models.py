from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from functools import wraps

from .extensions import db, bcrypt


# ================================
#    MODELOS
# ================================
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(20))
    birth_date = db.Column(db.String(20))
    role = db.Column(db.String(20), default="user")  # user o manager

    products = db.relationship("Product", backref="manager", lazy=True)

    # Password helpers
    def generate_password(self, password):
        return bcrypt.generate_password_hash(password).decode("utf-8")
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "gender": self.gender,
            "birth_date": self.birth_date,
            "role": self.role
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)

    manager_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "stock": self.stock,
            "manager_id": self.manager_id
        }


# ================================
#    DECORADOR PARA MANAGERS
# ================================
def manager_required(func):
    """Decorador para validar que el usuario sea manager."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or user.role != "manager":
            return jsonify({"error": "Acceso denegado. Solo administradores."}), 403
        
        return func(*args, **kwargs)
    
    return wrapper
