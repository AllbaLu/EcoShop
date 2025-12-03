from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)
from datetime import timedelta

from .models import User, Product, manager_required
from .extensions import db

api = Blueprint("api", __name__)


# ================================
#   AUTH - Registro & Login
# ================================
@api.route("/register", methods=["POST"])
def register():
    data = request.json
    
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "El email ya está registrado"}), 400
    
    new_user = User(
        name=data["name"],
        lastname=data["lastname"],
        email=data["email"],
        gender=data.get("gender"),
        birth_date=data.get("birth_date"),
        role=data.get("role", "user")  # user o manager
    )
    new_user.password = new_user.generate_password(data["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201



@api.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Credenciales incorrectas"}), 401

    token = create_access_token(identity=user.id, expires_delta=timedelta(hours=24))

    return jsonify({
        "token": token,
        "user": user.serialize()
    }), 200



# ================================
#     PRODUCTOS (CRUD)
# ================================
@api.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([p.serialize() for p in products])


@api.route("/products", methods=["POST"])
@jwt_required()
@manager_required
def create_product():
    data = request.json
    user_id = get_jwt_identity()

    new_product = Product(
        title=data["title"],
        description=data["description"],
        price=data["price"],
        stock=data["stock"],
        manager_id=user_id
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.serialize()), 201


@api.route("/products/<int:id>", methods=["PUT"])
@jwt_required()
@manager_required
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.json

    product.title = data.get("title", product.title)
    product.description = data.get("description", product.description)
    product.price = data.get("price", product.price)
    product.stock = data.get("stock", product.stock)

    db.session.commit()

    return jsonify(product.serialize())


@api.route("/products/<int:id>", methods=["DELETE"])
@jwt_required()
@manager_required
def delete_product(id):
    product = Product.query.get_or_404(id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Producto eliminado"})
