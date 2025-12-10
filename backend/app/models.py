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
    role = db.Column(db.String(20), default="user")  # user o admin

    products = db.relationship("Product", backref="admin", lazy=True)

    # Password helpers
    def generate_password(self, password):
        return bcrypt.generate_password_hash(password).decode("utf-8")
    
    def check_password(self, password):
        """Validate password with backward compatibility.
        If the stored password is legacy plain text, allow login once and
        transparently upgrade it to a bcrypt hash.
        """
        try:
            if bcrypt.check_password_hash(self.password, password):
                return True
        except Exception:
            # If the stored value isn't a valid bcrypt hash, fall through
            pass

        # Legacy support: plain-text password stored in DB
        if self.password == password:
            # Upgrade to hashed password
            self.password = self.generate_password(password)
            try:
                db.session.commit()
            except Exception:
                db.session.rollback()
            return True

        return False

    def serialize(self):
        # Concatenar nombre completo para el frontend
        full_name = f"{self.name} {self.lastname}".strip()
        return {
            "id": self.id,
            "name": full_name,  # Nombre completo
            "firstname": self.name,  # Por si se necesita separado
            "lastname": self.lastname,
            "email": self.email,
            "gender": self.gender,
            "birth_date": self.birth_date,
            "role": self.role
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    image = db.Column(db.Text)  # URL de la imagen, icono o Base64
    rating = db.Column(db.Float, default=0.0)
    eco_badges = db.Column(db.String(500))  # JSON string con colores de badges
    materials = db.Column(db.String(500))
    origin = db.Column(db.String(200))
    emissions = db.Column(db.String(100))  # ej: "0.2kg CO2e"
    tags = db.Column(db.String(500))  # JSON string con tags
    sizes = db.Column(db.String(200))  # JSON string con tamaños
    recommendations = db.Column(db.String(200))  # JSON string con IDs de productos recomendados

    manager_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def serialize(self):
        import json
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "stock": self.stock,
            "image": self.image,
            "rating": self.rating,
            "ecoBadges": json.loads(self.eco_badges) if self.eco_badges else [],
            "materials": self.materials,
            "origin": self.origin,
            "emissions": self.emissions,
            "tags": json.loads(self.tags) if self.tags else [],
            "sizes": json.loads(self.sizes) if self.sizes else [],
            "recommendations": json.loads(self.recommendations) if self.recommendations else [],
            "manager_id": self.manager_id
        }


# ================================
#    DECORADOR PARA ADMINS
# ================================
def manager_required(func):
    """Decorador para validar que el usuario sea administrador."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(int(user_id))
        
        if not user or user.role != "admin":
            return jsonify({"error": "Acceso denegado. Solo administradores."}), 403
        
        return func(*args, **kwargs)
    
    return wrapper
