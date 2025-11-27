from flask import Blueprint, jsonify, request
from .models import User
from .extensions import db

bp = Blueprint("api", __name__)

@bp.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Backend funcionando correctamente"})

@bp.route("/users", methods=["GET"])
def list_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "name": u.name} for u in users])

# ➜ Nuevo endpoint para crear un usuario
@bp.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()

    # Validación básica
    if not data or "name" not in data:
        return jsonify({"error": "El campo 'name' es obligatorio"}), 400

    # Crear usuario
    user = User(name=data["name"])
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Usuario creado", "id": user.id, "name": user.name}), 201
