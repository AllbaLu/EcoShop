# 🌿 EcoShop E-commerce Platform

**Plataforma de comercio electrónico sostenible con trazabilidad de impacto ambiental.**

EcoShop es una solución de e-commerce diseñada para marcas conscientes que buscan no solo vender productos, sino educar y comunicar el impacto ambiental de cada compra. La plataforma integra indicadores de huella de carbono, certificaciones ecológicas y un sistema de gestión transparente.

---

## 🚀 Características Principales

### 🛒 Experiencia de Compra (Cliente)
- **Catálogo Inteligente**: Visualización de productos con filtros por precio, etiquetas y ordenamiento.
- **Indicadores de Impacto**: Cada producto muestra su huella de carbono, materiales, origen y sellos ecológicos.
- **Sistema de Recomendaciones**: Sugerencias de productos basadas en etiquetas y categorías relacionadas.
- **Carrito de Compras**: Gestión de items con cálculo automático de totales.
- **Pasarela de Pago (Simulación)**: Integración con Mercado Pago que incluye un **Resumen de Impacto**, mostrando el total de CO2 compensado y los sellos adquiridos en la compra.
- **Sección de Certificaciones**: Explorador de sellos (Cruelty Free, Carbon Neutral, etc.) con funcionalidad para ver todos los productos asociados a cada certificación.
- **Blog Educativo**: Artículos sobre sostenibilidad y cuidado del medio ambiente.

### 🛠️ Panel de Administración (Backoffice)
- **Gestión de Productos**: Formulario para agregar nuevos productos con detalles técnicos (emisiones, materiales, sellos).
- **Base de Datos Híbrida**: Visualización unificada de productos estáticos y productos dinámicos (base de datos).
- **Eliminación de Productos**: Funcionalidad para borrar productos de la base de datos (requiere rol de Administrador).
- **Dashboard**: Vista rápida de conteo de productos y estado del inventario.

### 🔐 Seguridad y Autenticación
- **Login/Registro**: Sistema de autenticación seguro con JWT (JSON Web Tokens).
- **Roles de Usuario**: Diferenciación entre usuarios clientes y administradores.
- **Protección de Rutas**: El panel de administración es accesible solo para usuarios con rol `admin`.

---

## 💻 Tecnologías Utilizadas

### Frontend
- **Framework**: Vue 3 (Composition API)
- **UI Library**: Vuetify 3
- **Estado Global**: Pinia (Módulos: Auth, Cart, Filter)
- **Routing**: Vue Router
- **HTTP Client**: Axios (con interceptores para JWT)
- **Build Tool**: Vite

### Backend
- **Framework**: Flask (Python)
- **ORM**: SQLAlchemy
- **Base de Datos**: SQLite (Entorno de desarrollo)
- **Autenticación**: Flask-JWT-Extended
- **Migraciones**: Flask-Migrate

---

## 📖 Manual de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos
- Node.js (v18 o superior)
- Python (v3.10 o superior)
- Git

### 1. Clonar el Repositorio
```bash
git clone -b main-2 https://github.com/AllbaLu/EcoShop.git
cd EcoShop
```

### 2. Configuración del Backend (Servidor)
```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Inicializar base de datos (si es la primera vez)
flask db upgrade
# O si usas el script de creación de tablas directo:
python -c "from app import create_app, db; app = create_app(); app.app_context().push(); db.create_all()"

# Crear usuario administrador por defecto
python scripts/create_admin.py

# Ejecutar servidor
python run.py
```
*El servidor correrá en `http://localhost:5000`*

### 3. Configuración del Frontend (Cliente)
Abrir una nueva terminal en la raíz del proyecto:
```bash
cd vuetify-project

# Instalar dependencias
npm install

# Ejecutar entorno de desarrollo
npm run dev
```
*La aplicación estará disponible en `http://localhost:3000` (o el puerto que indique Vite).*

---

## 📚 Guía de Uso

### 👤 Para Clientes
1. **Explorar**: Navega por la "Tienda" para ver productos. Usa los filtros para encontrar lo que buscas.
2. **Detalles**: Haz clic en un producto para ver su ficha técnica, huella de carbono y recomendaciones.
3. **Sellos**: Visita la sección "Sellos" para entender las certificaciones. Haz clic en "Mostrar productos relacionados" para ver qué artículos tienen ese sello.
4. **Compra**: Agrega productos al carrito. Al finalizar, verás el resumen de tu impacto ambiental antes de proceder al pago con Mercado Pago.

### 🛡️ Para Administradores
1. **Acceso**: Ve a "Iniciar Sesión".
2. **Credenciales por defecto**:
   - **Email**: `admin@ecoshop.local`
   - **Contraseña**: `admin123`
3. **Panel**: Una vez logueado como admin, aparecerá la opción "Panel Admin" en el menú.
4. **Gestión**:
   - Usa el formulario para cargar nuevos productos (imágenes vía URL o MDI icons).
   - En la lista inferior, puedes eliminar productos creados (los productos estáticos de demostración no se pueden borrar desde el panel).

---

## 📂 Estructura del Proyecto

```
EcoShop/
├── backend/                 # API REST Flask
│   ├── app/
│   │   ├── models.py        # Modelos de Base de Datos (User, Product)
│   │   ├── routes.py        # Endpoints de la API
│   │   └── ...
│   ├── scripts/             # Scripts de utilidad (create_admin.py)
│   └── ecoshop.db           # Base de datos SQLite
│
├── vuetify-project/         # Aplicación Vue.js
│   ├── src/
│   │   ├── api.js           # Configuración Axios
│   │   ├── components/      # Componentes (Hero, ProductSection, PanelAdmin...)
│   │   ├── data/            # Datos estáticos (products.js, certifications.js)
│   │   ├── stores/          # Estado Pinia (auth, cart, filter)
│   │   ├── views/           # Vistas (Home, ProductDetail, Admin...)
│   │   └── ...
│   └── ...
└── README.md                # Documentación
```

---

## 👥 Equipo de Desarrollo
**No Country - Cohorte S11-25 - Equipo 62**

- **Alba Rodríguez** - Full Stack Developer
- **Fabián Jeldes** - Frontend Developer
- **María Teresa de la Fuente** - Frontend Developer
- **Tiziano Caamano** - Frontend Developer
- **Agustín Prato** - Frontend Developer

---

© 2025 EcoShop. Todos los derechos reservados.
