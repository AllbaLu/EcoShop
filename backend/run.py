from app import create_app
from app.extensions import db

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("\n📌 RUTAS REGISTRADAS:")
    for rule in app.url_map.iter_rules():
        print(f"{rule}\t==> {rule.endpoint}")
    print("\n")

    app.run(debug=True)
