# EcoShop E-commerce Platform
Plataforma web de comercio electrónico sostenible

## Descripción general

Plataforma de e-commerce sostenible que integra indicadores de impacto ambiental por producto (huella de carbono, materiales reciclables, transporte, etc.), fomenta la trazabilidad y ofrece una experiencia de usuario fluida y moderna.

Está hecha para aquellas marcas sostenibles que buscan plataformas de e-commerce que no solo vendan productos, sino que también midan, visualicen y comuniquen el impacto ambiental de cada compra.

EcoShop E-commerce Platform es una tienda online ecológica, con un enfoque educativo y transparente, que busca fortalecer la confianza de los consumidores y promover decisiones de compra responsables.


## Estado del proyecto

En desarrollo

Última actualización: 04 de diciembre de 2025

Versión: 0.0

## Características principales

- Catálogo de productos ecológicos con indicadores ambientales.
- Sistema de Sellos y Eco-Badges.
- Módulo de cálculo de huella de carbono por producto.
- Recomendaciones basadas en impacto ambiental.
- Panel de administración (productos, precios, imágenes, etc.).
- Blog educativo sobre sostenibilidad.
- Interfaz modular hecha con Vue + Vuetify.
- Backend con API REST en Flask + PostgreSQL.
- Arquitectura limpia y escalable.

## Estructura del proyecto

```
backend/
   ├── src/
   │   ├── models/
   │   ├── routes/
   │   ├── middlewares/
   │   └── app.py
   ├── config/
   ├── tests/
   └── requirements.txt

frontend/
   src/
   │
   ├── assets/ # Imágenes, iconos, fondos
   ├── components/ # Componentes reutilizables
   │ ├── Navbar.vue
   │ ├── Footer.vue
   │ ├── CartDrawer.vue
   │ ├── BlogPost.vue
   │ └── ...
   │
   ├── views/ # Vistas principales
   │ ├── HomeView.vue
   │ ├── BlogView.vue
   │ ├── BlogDetailView.vue
   │ ├── SellosView.vue
   │ ├── ProductSectionView.vue
   │ └── ProductDetailView.vue
   │
   ├── stores/ # Pinia stores
   │ ├── useCartStore.js
   │ └── auth.js
   │
   ├── plugins/
   │ ├── vuetify.js # Configuración del tema EcoShop
   │ └── index.js # Registro de plugins
   │
   ├── router/
   │ └── index.js # Configuración de rutas
   │
   ├── App.vue
   └── main.js
```

### Arquitectura General: Backend + Frontend + Base de Datos

#### Frontend:
- Vite
- Vue 3 (Composition API)
- Vuetify 3 (Componentes UI)
- Componentes UI personalizados
- Pinia (manejo de estado global)
- Vue Router
- Material Design Icons
- Unplugin Fonts + Fontsource Roboto

#### Backend:
- Python
- Flask Bases de Datos
- PostgreSQL
- Relaciones
- Modelos, rutas, servicios y controladores

## Tema personalizado
EcoShop utiliza un tema propio, que se carga automáticamente mediante vuetify.js, basado en colores inspirados en naturaleza y sostenibilidad:

- background: #F1FFFF -  Azul muy pálido para fondo general
- surface: #FFFFFF - Blanco puro para tarjetas
- primary: #375A0A - Verde Bosque para botones principales y Headers
- secondary: #C8E8FF - Azul Cielo para botones secundarios e iconos
- accent: #E6EB51 - Lima para ofertas, badges y Call to Action
- info: #010101 - Negro para textos

## Estado global (Pinia)
### Carrito de compras — ```useCartStore.js```
- Agregar productos
- Aumentar/disminuir cantidades
- Remover items
- Cálculo de total y cantidad total
- Apertura automática del drawer del carrito al agregar un producto

### Autenticación — auth.js
- Login con persistencia de token
- Logout
- Manejo de usuario autenticado

## Rutas principales (Vue Router)
| Ruta                 | Vista               | Descripción                               |
|----------------------|---------------------|-------------------------------------------|
| `/`                  | HomeView            | Página principal con slider hero          |
| `/blog`              | BlogView            | Listado de artículos                      |
| `/blogdetail/:id`    | BlogDetailView      | Vista de blog individual                  |
| `/sellos`            | SellosView          | Información de certificaciones sostenibles|
| `/product-section`   | ProductSectionView  | Listado de productos                      |
| `/product/:id`       | ProductDetailView   | Ficha completa de producto                |


## Componentes

### Navbar + Drawer del carrito
- Incluye badge dinámico con cantidad total de productos

### Carrusel Hero (Home)
- Con autoplay accesible
- Botón de pausar/reproducir
- Overlays dinámicos según cada slide
- Flechas visibles al interactuar (hover/touch)


## Accesibilidad
El proyecto implementa:
- Botón accesible para pausar autoplay del carrusel
- aria-label en flechas y botones interactivos
- Preferencias de usuario: desactiva autoplay si el sistema pide *reduced motion*
- Contrastes revisados con tema EcoShop


## REFERENCIA DE LO QUE HAY QUE HACER -->

Navbar / Header

User

Adm

Login

Logout

Section – Buscador

Buscador: [Título] [Guardar]

Filtros inteligentes

Carrusel – Información destacada

Section – Catálogo de productos

Cards (por producto):

Materiales

Origen

Emisiones

Eco-badges

Sistema de recomendaciones

Section – Sello

Logos

Marcas

Etiquetas

Blog

Historias

Contenido educativo

Certificaciones

Footer

Redes sociales

Logo

Links relacionados

Adicional

Carrito de compra

Pasarela de pago

Módulo de cálculo de huella de carbono

Reportes: ahorro de carbono por compra

Panel Administrador

Agregar nuevo producto (formulario)

Actualizar precios

Actualizar imágenes

Actualizar links

Borrar producto(s)

## <-- REFERENCIA DE LO QUE HAY QUE HACER





## Instalación / Configuración

1. Clonar repositorio
```
git clone https://github.com/usuario/EcoShop.git
```

2. Instalar dependencias
- Frontend
```
cd vuetify-project
npm install
```
## REVISAR BACKEND
- Backend
```
cd backend
pip install -r requirements.txt
```
3. Variables de entorno
Configurar archivo .env en backend:
```
DATABASE_URL=postgresql://user:password@localhost:5432/ecoshop
SECRET_KEY=tu_clave
```

4. Ejecutar el proyecto
- Frontend
```
npm run dev
```
- Backend
```
python src/app.py
```

Instalar dependencias

Configurar variables

Levantar el proyecto

(Si no es software, puede ser: pasos para abrir el documento, uso de archivos base, etc.)

## Uso
Ejemplos simples:

Ingresar a la raíz:
```
http://localhost:3000/
```

Panel Administrador (pendiente):
```
/admin
```

API Backend (ejemplo):
```
GET /api/products
```





Ejemplos simples de:

Cómo se utiliza

Comandos principales

Cómo interactuar con el proyecto

## Requisitos

- Node.js 18+
- Python 3.10+
- PostgreSQL 14+
- Navegador moderno
- Git

Dependencias, versiones mínimas, herramientas necesarias.

## Contribución (opcional)

Si otras personas pueden colaborar:

Lineamientos

Estilo de código

Flujo de trabajo (branches, PRs, etc.)

## Licencia

Proyecto privado/académico. Todos los derechos reservados

## Autores / Créditos

No Country - 2025
**S11-25-Equipo 62-WebApp**

- Alba Rodríguez - Full Stack Developer
- Fabián Jeldes - Frontend Developer
- María Teresa de la Fuente - Frontend Developer
- Tiziano Caamano - Frontend Developer
- Agustín Prato - Frontend Developer
- David Castro - Backend Developer

## Contacto

grupoecoshop@gmail.com

## Notas o consideraciones especiales

- Proyecto en fase inicial.
- Algunas vistas y módulos están en construcción.

- Próximas mejoras:

   - Autenticación completa
   - Dashboard Admin
   - Filtros avanzados del catálogo
   - Métricas ambientales gráficas
   - Blog funcional
   - Integración con pasarela de pago real

Cualquier información adicional relevante:

Limitaciones

Supuestos

Roadmap

Próximas mejoras
