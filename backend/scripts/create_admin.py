import sys
import os

# Add backend directory to path so we can import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app
from app.extensions import db
from app.models import User


def ensure_admin(email: str, password: str, name: str = "Admin", lastname: str = "User"):
    app = create_app()
    with app.app_context():
        user = User.query.filter_by(email=email).first()
        if user:
            print(f"User already exists: {email} (role={user.role})")
            if user.role != "admin":
                user.role = "admin"
                db.session.commit()
                print("Updated user role to admin")
            return

        user = User(
            name=name,
            lastname=lastname,
            email=email,
            gender=None,
            birth_date=None,
            role="admin",
        )
        user.password = user.generate_password(password)
        db.session.add(user)
        db.session.commit()
        print(f"Created admin user: {email}")


if __name__ == "__main__":
    # Change these defaults or pass via environment variables
    ensure_admin(email="admin@ecoshop.local", password="admin123")
