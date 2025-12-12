# EcoShop E-commerce Platform
Plataforma web de comercio electrónico sostenible

## Descripción general

Plataforma de e-commerce sostenible que integra indicadores de impacto ambiental por producto (huella de carbono, materiales reciclables, transporte, etc.), fomenta la trazabilidad y ofrece una experiencia de usuario fluida y moderna.

Está hecha para aquellas marcas sostenibles que buscan plataformas de e-commerce que no solo vendan productos, sino que también midan, visualicen y comuniquen el impacto ambiental de cada compra.

EcoShop E-commerce Platform es una tienda online ecológica, con un enfoque educativo y transparente, que busca fortalecer la confianza de los consumidores y promover decisiones de compra responsables.


## Estado del proyecto

En desarrollo

Última actualización: 11 de diciembre de 2025

Versión: 1.0

## Características principales

## Experiencia de Compra (Cliente)

- **Catálogo Inteligente:** Visualización de productos con filtros por precio, etiquetas y ordenamiento.  
- **Indicadores de Impacto:** Cada producto muestra su huella de carbono, materiales, origen y sellos ecológicos.  
- **Sistema de Recomendaciones:** Sugerencias de productos basadas en etiquetas y categorías relacionadas.  
- **Carrito de Compras:** Gestión de items con cálculo automático de totales.  
- **Pasarela de Pago (Simulación):** Integración con Mercado Pago que incluye un Resumen de Impacto, mostrando el total de CO2 compensado y los sellos adquiridos en la compra.  
- **Sección de Certificaciones:** Explorador de sellos (Cruelty Free, Carbon Neutral, etc.) con funcionalidad para ver todos los productos asociados a cada certificación.  
- **Blog Educativo:** Artículos sobre sostenibilidad y cuidado del medio ambiente.  

## Panel de Administración (Backoffice)

- **Gestión de Productos:** Formulario para agregar nuevos productos con detalles técnicos (emisiones, materiales, sellos).  
- **Base de Datos Híbrida:** Visualización unificada de productos estáticos y productos dinámicos (base de datos).  
- **Eliminación de Productos:** Funcionalidad para borrar productos de la base de datos (requiere rol de Administrador).  
- **Dashboard:** Vista rápida de conteo de productos y estado del inventario.  

## Seguridad y Autenticación

- **Login/Registro:** Sistema de autenticación seguro con JWT (JSON Web Tokens).  
- **Roles de Usuario:** Diferenciación entre usuarios clientes y administradores.  
- **Protección de Rutas:** El panel de administración es accesible solo para usuarios con rol admin.

---

# Tecnologías Utilizadas

## Frontend

- **Framework:** Vue 3 (Composition API)  
- **UI Library:** Vuetify 3  
- **Estado Global:** Pinia (Módulos: Auth, Cart, Filter)  
- **Routing:** Vue Router  
- **HTTP Client:** Axios (con interceptores para JWT)  
- **Build Tool:** Vite  

## Backend

- **Framework:** Flask (Python)  
- **ORM:** SQLAlchemy  
- **Base de Datos:** SQLite (Entorno de desarrollo)  
- **Autenticación:** Flask-JWT-Extended  
- **Migraciones:** Flask-Migrate

---


## Tema personalizado
EcoShop utiliza un tema propio, que se carga automáticamente mediante vuetify.js, basado en colores inspirados en naturaleza y sostenibilidad:

- background: #F1FFFF -  Azul muy pálido para fondo general
- surface: #FFFFFF - Blanco puro para tarjetas
- primary: #375A0A - Verde Bosque para botones principales y Headers
- secondary: #C8E8FF - Azul Cielo para botones secundarios e iconos
- accent: #E6EB51 - Lima para ofertas, badges y Call to Action
- info: #010101 - Negro para textos

---

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
   │ ├── BlogDetail.vue
   │ ├── BlogDetailView.vue
   │ ├── BlogView.vue
   │ ├── ContactView.vue         
   │ ├── HomeView.vue
   │ ├── PanelAdminView.vue
   │ ├── ProductDetailView.vue
   │ ├── ProductSectionView.vue
   │ └── SellosView.vue
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
---

# Manual de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local.

## Prerrequisitos
- Node.js (v18 o superior)
- Python (v3.10 o superior)
- Git

## 1. Clonar repositorio
```
git clone -b main-2 https://github.com/AllbaLu/EcoShop.git
cd EcoShop
```

## 2. Configuración del Backend (Servidor)

```
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
El servidor correrá en http://localhost:5000

## 3. Configuración del Frontend (Cliente)
Abrir una nueva terminal en la raíz del proyecto:

```
cd vuetify-project

# Instalar dependencias
npm install

# Ejecutar entorno de desarrollo
npm run dev
```
La aplicación estará disponible en http://localhost:3000 (o el puerto que indique Vite).

---

# Guía de Uso
## Para Clientes

- **Explorar:** Navega por la "Tienda" para ver productos. Usa los filtros para encontrar lo que buscas.  
- **Detalles:** Haz clic en un producto para ver su ficha técnica, huella de carbono y recomendaciones.  
- **Sellos:** Visita la sección "Sellos" para entender las certificaciones. Haz clic en "Mostrar productos relacionados" para ver qué artículos tienen ese sello.  
- **Compra:** Agrega productos al carrito. Al finalizar, verás el resumen de tu impacto ambiental antes de proceder al pago con Mercado Pago.  

## Para Administradores

- **Acceso:** Ve a "Iniciar Sesión".  
- **Credenciales por defecto:**  
  - Email: admin@ecoshop.local  
  - Contraseña: admin123  
- **Panel:** Una vez logueado como admin, aparecerá la opción "Panel Admin" en el menú.  
- **Gestión:**  
  - Usa el formulario para cargar nuevos productos (imágenes vía URL o MDI icons).  
  - En la lista inferior, puedes eliminar productos creados (los productos estáticos de demostración no se pueden borrar desde el panel).  

---

# Estado global (Pinia)
## Carrito de compras — ```useCartStore.js```
- Agregar productos
- Aumentar/disminuir cantidades
- Remover items
- Cálculo de total y cantidad total
- Apertura automática del drawer del carrito al agregar un producto

## Autenticación — auth.js
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


# Componentes

### Navbar.vue - Navbar
- Barra de navegación responsive con drawer para móviles
- Ícono de hamburguesa que abre/cierra menú lateral en pantallas pequeñas
- Logo con ajuste automático de tamaño y proporción
- Botones de navegación principales (Inicio, Sellos, Blog, Catálogo, Contacto) visibles solo en escritorio
- Integración con autenticación:
- Mostrar botón “Log in” y “Register” si no hay usuario logueado
- Mostrar menú de usuario con nombre y opción de “Cerrar Sesión” si está logueado
- Soporte para roles:
- Mostrar botón “Panel Admin” solo para usuarios con rol admin
- Carrito de compras:
- Icono de carrito visible según estado de login/rol
- Badge con cantidad total de productos
- Apertura del drawer de carrito al hacer click
- Drawer lateral para móviles:
- Contiene navegación, opciones de usuario y panel admin si corresponde
- Diálogos modales integrados:
- LoginDialog y RegisterDialog controlados desde Navbar
- Abrir login tras registro exitoso
- Funcionalidad de logout y redirección a Home
- Hover y estilos de botones personalizables (colores y efectos)
- Computed properties para verificar estado de login y rol admin

---

### ContactView.vue / Vista de Contacto — Formulario de contacto
- Permite a los usuarios enviar consultas o mensajes al equipo de EcoShop.
- Información de contacto mostrada de forma visual y clara:
  - Oficina: dirección física con ícono de ubicación
  - Teléfono: número de contacto con ícono de teléfono
  - Email: correo electrónico con ícono de email
  - Formulario reactivo usando Vuetify y Composition API:
- Campos del formulario:
  - Nombre completo con validación de requerido y mínimo 3 caracteres
  - Correo electrónico con validación de formato
  - Asunto mediante un v-select con opciones predefinidas
  - Mensaje en un v-textarea de 4 filas
- Validación en tiempo real con reglas definidas (nameRules y emailRules)
- Botón de envío deshabilitado hasta que el formulario sea válido
- Feedback al usuario: v-snackbar muestra mensaje de éxito al enviar
- Reset automático del formulario tras envío

---

### CartDrawer.vue – Drawer del carrito de compras
- Muestra los productos agregados al carrito con imagen, nombre, precio y cantidad.
- Permite:
  - Aumentar/disminuir cantidades
  - Remover productos
- Calcula el total del carrito
- Botón para finalizar compra que abre la pasarela de pago (PaymentGateway.vue)
- Drawer temporal a la derecha, con cierre manual
- Diseño responsivo y estilizado con Vuetify

---

### PaymentGateway.vue - Pasarela de Pago
- Integración con Mercado Pago para pago de carrito
- Cálculo de emisiones de CO₂ total de los productos en carrito
  - Maneja valores simples y rangos estimados
- Muestra sellos ecológicos únicos de los productos agregados
- Carga dinámica de la pasarela:
  - Genera preferenceId desde backend (`/create_preference`)
  - Inicializa el widget "wallet" de Mercado Pago
- Mensajes de estado:
  - Loading al generar preferencia
  - Error en caso de fallo en creación de preference
  - Botón para reintentar
- Diseño responsivo con Vuetify:
  - Badge con sellos ecológicos
  - Indicador de contribución CO₂ total
  - Botón directo a pago si `initPoint` está disponible

---

### LoginDialog.vue / Autenticación — auth.js
- Login con validación de email y contraseña
- Persistencia del token y estado de usuario autenticado
- Diferenciación de roles (admin vs usuario normal)
- Redirección automática según rol:
  - Admin → Panel de administración
  - Usuario → Home
- Diálogo modal accesible y responsivo
- Mostrar/ocultar contraseña y manejo de errores
- Botón para cancelar o cerrar el diálogo

---

### RegisterDialog.vue / Crear nueva cuenta — auth.js

- Modal de registro de usuario usando Vuetify 3
- Formulario con campos:
  - Nombre completo
  - Email
  - Contraseña
  - Confirmar contraseña
  - Checkbox para registrar como administrador
- Validaciones:
  - Nombre: obligatorio, mínimo 3 caracteres
  - Email: obligatorio, formato válido
  - Contraseña: obligatorio, mínimo 6 caracteres
  - Confirmar contraseña: debe coincidir con la contraseña
- Mostrar/ocultar contraseña mediante iconos de ojo
- Mensajes de error y éxito mediante `v-alert`
- Botón "Cancelar" y cierre automático tras registro exitoso
- Integración con API (`api.post('/register')`) enviando `name`, `email`, `password` y `role` (`user` o `admin`)
- Emite eventos:
  - `update:modelValue` → abrir/cerrar dialog
  - `registered` → para abrir login tras registro
- Indicador de carga en botón de registro (`loading`)
- Reseteo de formulario al cerrar o completar registro

---

### PanelAdmin.vue
- Vista exclusiva para administradores
  - Mostrar resumen de productos:
    - Productos estáticos (`data/products.js`)  
    - Productos cargados en la base de datos
    - Total de productos disponibles
  - Formulario de ingreso de productos nuevos:
    - Nombre, descripción, precio, stock
    - Imagen desde URL o subida local
    - Materiales, origen, emisiones de CO₂
    - Selección de eco-badges, categorías/tags y tallas disponibles
  - Validación básica y mensajes de éxito/error
  - Carga de imagen en vista previa antes de enviar
  - Eliminación de productos desde la base de datos
  - Manejo de estado de carga (`loading`) y confirmación de acción
  - Contadores dinámicos de productos
  - Compatible con diseño responsivo usando Vuetify

  ---

### Hero.vue – Carrusel de información destacada
- Carrusel con slides de productos o mensajes destacados.
- Cada slide incluye:
  - Imagen de fondo
  - Título y texto descriptivo
  - Botón(es) de acción que redirigen a productos
- Autoplay accesible con botón de pausar/reanudar
- Overlay con texto y botones, responsive y estilizado
- Flechas de navegación visibles al interactuar o temporizadas en mobile
- Diseño responsivo, accesible y moderno
- Flechas visibles al interactuar (hover/touch)

---

### SearchBar.vue / Búsqueda y filtros — filterStore.js
- Barra de búsqueda de productos con texto libre
- Panel de filtros expandible con categorías, precio, tamaño y colores
- Integración con `filterStore` para mantener filtros globales
- Navegación al catálogo de productos (`/product-section`) respetando los filtros
- Botón de toggle para mostrar/ocultar panel de filtros
- Selección visual de colores con iconos y cambio de estilo al seleccionar
- Campos de filtros accesibles y responsivos

---

###  ProductCarousel.vue - Productos Destacados
- Componente de carrusel horizontal de productos destacados
- Mezcla productos estáticos (`data/products.js`) y de base de datos
- Autogenera máximo 8 productos destacados por carga
- Navegación por slides:
  - Flechas izquierda/derecha
  - Indicadores circulares de slide
- Responsive: ajusta número de productos por slide según ancho de pantalla
- Acciones sobre cada producto:
  - Click en card → abrir detalle del producto en `ProductSectionView`
  - Botón Añadir → agrega producto al carrito (Pinia `useCartStore`)
- Visualización de eco-badges de cada producto como íconos de color
- Efectos hover:
  - Resalta card y cambio de color de iconos
- Manejo de carga (`loading`) con indicador circular

---

### ProductSection.vue - Catálogo de Productos

El componente `ProductSection.vue` es la sección principal para mostrar y gestionar productos en la tienda EcoShop. Incluye listado de productos, filtros, paginación, modal de detalle y lógica de recomendación.


#### Funcionalidades

1. **Listado de productos**
   - Muestra productos en cards con:
     - Imagen principal
     - Nombre
     - Precio formateado en CLP
     - Rating
     - EcoBadges
   - Cada card permite abrir el modal de detalle o añadir al carrito.

2. **Filtros avanzados**
   - Búsqueda por nombre (`v-text-field`)
   - Etiquetas (`v-chip-group`)
   - Rango de precio (`v-range-slider`)
   - Ordenamiento por:
     - Nuevo (`id` descendente)
     - Precio ascendente
     - Precio descendente
     - Rating
   - Filtros de tamaño y color preparados pero deshabilitados hasta agregar productos con esos atributos.

3. **Paginación**
   - Configurable (`perPage = 15`)
   - Muestra la cantidad total de páginas según filtros aplicados.
   - Utiliza `v-pagination` de Vuetify.

4. **Modal / Dialog de detalle de producto**
   - Nombre, imagen, descripción, precio y rating
   - Materiales:
     - Composición
     - Porcentaje renovable
     - Reciclabilidad
     - Libre de BPA / ftalatos
   - Origen y marca con link externo
   - Datos ambientales:
     - Huella de carbono (producción, transporte, total estimado)
     - Nivel de sostenibilidad
     - Biodegradabilidad
     - Durabilidad
   - Certificaciones con tooltip e imagen (`v-tooltip` + `v-img`)
   - Recomendaciones basadas en tags y categoría

5. **Carrito**
   - Añadir productos desde la card o desde el modal.
   - Integra con `useCartStore` de Pinia.

6. **Accesibilidad**
   - `aria-label` en botones, cards y modal
   - Texto oculto (`sr-only`) con información relevante para lectores de pantalla.


#### Propiedades y Variables

- `products` (ref): listado de productos combinando estáticos y backend
- `sharedProducts` (ref): productos estáticos predefinidos
- `filteredProducts` (computed): productos filtrados según criterios
- `paginatedProducts` (computed): productos de la página actual
- `page` (ref): página actual
- `perPage` (ref): productos por página
- `showFilters` (ref): estado del panel de filtros
- `selectedProduct` (ref): producto seleccionado para modal
- `showProductDialog` (ref): estado del modal
- `loading` (ref): indicador de carga
- `error` (ref): mensaje de error al cargar productos
- `filterStore` (Pinia store): contiene búsqueda, tags, rangos y opciones de ordenamiento


#### Métodos Principales

- `loadProducts()`: carga productos desde backend y combina con los estáticos
- `formatCLP(value)`: formatea precios a CLP sin decimales
- `openProductDetail(product)`: abre modal con detalle del producto
- `addToCart(product)`: añade un producto al carrito
- `getRecommendations(product)`: devuelve hasta 4 productos recomendados
- `getSelloImg(certName)`, `getSelloTitle(certName)`, `getSelloShortDesc(certName)`: gestionan las certificaciones
- `goToSellos()`: navega a la página de sellos


#### Componentes Hijos

- `EcoBadge`: muestra un badge de sostenibilidad según color
- Vuetify 3:
  - `v-container`, `v-row`, `v-col`
  - `v-card`, `v-sheet`, `v-btn`, `v-icon`, `v-img`, `v-rating`, `v-tooltip`, `v-dialog`, `v-pagination`, `v-text-field`, `v-chip-group`, `v-range-slider`


#### Estilos

- Clases principales:
  - `.text-forest`, `.bg-forest`: colores de marca
  - `.cursor-pointer`
  - `.product-card:hover`: efecto hover en cards
  - `.sr-only`: texto oculto para lectores de pantalla
  - `.certificado-icon-wrapper`: estilos para iconos de certificaciones
  - `.tooltip-content`: contenido de tooltip para certificaciones
- Transiciones y hover implementadas con CSS

---

### EcoBadge.vue – Chips de ecobadges para productos
- Muestra los sellos ecológicos de cada producto como chips.
- Cada chip:
  - Tiene un color asociado (`badge.color`)
  - Muestra un ícono (`badge.icon`)
  - Incluye un tooltip con el texto descriptivo (`badge.label`)
- Soporta accesibilidad:
  - `role="img"` y `aria-label` para lectores de pantalla
  - Texto oculto con `.sr-only` para la descripción
- Diseño horizontal con alineación centrada
- Estilizado con Vuetify (`v-chip`, `v-tooltip`, `v-icon`)
- Adaptable a diferentes cantidades de badges

---

### BlogPostHome.vue – Artículos destacados en Home
- Muestra los primeros 2 artículos destacados.
- Tarjetas con imagen, título, subtítulo y párrafo introductorio.
- Botón para leer el artículo completo (navega a BlogDetail.vue).
- Efectos hover y responsividad.

---

### BlogPost.vue – Listado de artículos
- Itera sobre los artículos disponibles.
- Muestra imagen, título, subtítulo, párrafo introductorio y primeros párrafos del cuerpo.
- Botones para:
  - Leer artículo completo (navega a BlogDetail.vue)
  - Abrir fuente original en nueva pestaña
- Efectos hover en tarjetas y responsividad.

---

### BlogDetail.vue – Vista de artículo individual
- Muestra la imagen destacada del artículo.
- Incluye título, subtítulo, párrafo introductorio en negrita y cuerpo del artículo.
- Metadata visible: autor y fecha.
- Fuente del artículo con link externo.
- Botón para volver al listado del blog.
- Botones de compartir (share).
- Diseño responsivo y accesible.

---

### SellosHome.vue / Vista de Sellos — certifications.js

- Muestra de manera compacta los sellos y certificaciones ecológicas disponibles
- Cada sello incluye:
  - Imagen circular
  - Título del sello
- Diseño responsivo usando Vuetify:
  - Ajuste de columnas según tamaño de pantalla (cols, sm, md, lg)
  - Hover con efecto de escalado en la imagen (`sello-circle`)
- Interactividad visual:
  - Animación suave al pasar el cursor sobre cada sello
- Adaptación para pantallas pequeñas:
  - Reducción de tamaño de las imágenes circulares en dispositivos móviles

---

### Sellos.vue / Certificaciones ecológicas — products.js

- Muestra los sellos y certificaciones ecológicas disponibles en la tienda
- Cada sello incluye:
  - Imagen, título, subtítulo y descripción detallada
- Botón para mostrar productos relacionados con cada sello
- Filtra productos usando `products` y muestra solo los que incluyen la certificación seleccionada
- Modal de productos relacionados:
  - Listado de productos filtrados
  - Navegación a detalle de producto (`ProductDetail`) al hacer clic
  - Mensaje y ícono cuando no hay productos disponibles
- Formateo de precios a CLP mediante función `formatCLP`
- Diseño responsivo y accesible usando Vuetify:
  - Cards con imagen circular y efectos hover
  - Texto justificado y adaptable a distintos tamaños de pantalla
- Interactividad:
  - Abrir/cerrar modal de productos relacionados (`showDialog`)
  - Selección dinámica del sello (`selectedSelloTitle`)
  - Transiciones visuales en cards y modales

---

### Footer.vue – Pie de página
- Secciones principales:
  - Accesos rápidos: enlaces internos (Inicio, Sellos, Blog, Catálogo, Contacto, Carrito)
  - Información de usuario: Centro de ayuda, seguimiento de pedidos, políticas y atención al cliente
  - Newsletter: formulario de suscripción con validación de email
  - Contacto y redes sociales: Instagram, YouTube, Twitter, email y teléfono
- Diseño responsivo y accesible
- Texto de derechos reservados y créditos

---

## Data

### blogArticles.js / Visualización de Artículos — BlogDetail.vue

- Componente para mostrar artículos individuales del blog
- Obtiene el `articleId` desde la ruta usando `useRoute`
- Carga del artículo al montar el componente (`onMounted`)
  - Actualmente simula datos locales (puede integrarse con API real)
- Renderiza el artículo usando el componente `BlogDetail`
- Incluye el footer de la página con `Footer.vue`
- Diseño responsivo y estructurado con Vuetify (`v-container`)

---

### certifications.js / Datos de Certificaciones — sellos

- Archivo que define los sellos y certificaciones ecológicas disponibles en la tienda
- Cada sello incluye:
  - `title`: nombre del sello
  - `subtitle`: subtítulo descriptivo
  - `img`: imagen asociada al sello
  - `description`: explicación detallada del sello y sus beneficios
- Importa imágenes locales para cada certificación
- Exporta un array `sellos` con todos los objetos de certificación
- Permite integración con componentes como `SellosHome.vue` o `Sellos.vue` para visualización dinámica
- Garantiza consistencia y centralización de la información de certificaciones

---

### products.js / Datos de Productos — products

- Archivo que define los productos disponibles en la tienda
- Cada producto incluye:
  - `id`: identificador único
  - `name`: nombre del producto
  - `price`: precio en moneda local
  - `rating`: calificación promedio de usuarios
  - `image`: URL de la imagen del producto
  - `ecoBadges`: array de badges de sostenibilidad (iconos, colores, etiquetas)
  - `tags`: categorías o etiquetas del producto
  - `description`: descripción detallada del producto
  - `materials`: composición, porcentaje de materiales renovables, reciclabilidad, presencia de BPA, ftalatos o látex
  - `origin`: marca, país de origen, lugar de fabricación y URL del producto
  - `environment`: huella de carbono, nivel de sostenibilidad, durabilidad y biodegradabilidad
  - `certifications`: array de certificaciones asociadas
  - `recommendations`: IDs de productos relacionados o sugeridos
- Exporta:
  - `products`: array reactivo (`ref`) de todos los productos
  - `getProductById(id)`: función para obtener un producto por su ID
- Permite integración dinámica con componentes de catálogo, detalle de producto y filtros de sostenibilidad
- Centraliza información de impacto ambiental, composición y certificaciones para cada producto

---

## Stores

### auth.js / Store de Autenticación — Pinia

- Archivo que define la **store de autenticación** usando Pinia
- Importa:
  - `defineStore` de Pinia
  - `api` para llamadas a endpoints de autenticación (`api_auth.js`)
- Store: `useAuthStore`
  - **state**:
    - `token`: token de autenticación, recuperado de `localStorage` si existe
    - `user`: objeto de usuario, parseado desde `localStorage` si existe
  - **actions**:
    - `login(email, password)`:
      - Llama a `api.post("/login")` con email y password
      - Guarda `token` y `user` en el state y en `localStorage`
      - Imprime en consola información de login exitoso (`user` y `role`)
      - Devuelve `res.data`
    - `register(name, email, password)`:
      - Llama a `api.post("/register")` con nombre, email y password
      - Devuelve `res.data`
    - `logout()`:
      - Limpia `token` y `user` del state
      - Elimina `token` y `user` de `localStorage`
- Permite manejar la sesión del usuario de manera reactiva y persistente

---

### useCartStore.js / Store del Carrito — Pinia

- Archivo que define la **store del carrito** usando Pinia y Composition API
- Store: `useCartStore`
  - **state**:
    - `open`: booleano que indica si el carrito está abierto
    - `items`: array de productos agregados al carrito, cada uno con `quantity`
  - **actions / funciones**:
    - `addItem(product)`:
      - Si el producto ya existe en `items`, incrementa su `quantity`
      - Si no existe, lo agrega con `quantity: 1`
      - Abre el carrito (`open.value = true`)
    - `removeItem(index)`: elimina el producto del carrito según su índice
    - `increase(index)`: incrementa la cantidad de un producto
    - `decrease(index)`: decrementa la cantidad, mínimo 1
  - **computed**:
    - `total`: suma de `price * quantity` de todos los productos
    - `totalQuantity`: total de unidades en el carrito, usado por ejemplo para un badge
- Permite manejar el estado del carrito de forma reactiva, con apertura automática al agregar productos

---

### useFilterStore.js / Store de Filtros — Pinia

- Archivo que define la **store de filtros** usando Pinia y Composition API
- Store: `useFilterStore`
  - **state / variables reactivas**:
    - `searchQuery`: texto de búsqueda
    - `priceRange`: rango de precios `[min, max]`
    - `selectedTags`: array de tags seleccionados
    - `selectedSizes`: array de tallas seleccionadas
    - `selectedColors`: array de colores seleccionados
    - `sortOption`: opción de ordenamiento, por defecto `"new"`
    - `productToOpen`: producto seleccionado para abrir detalles
  - **actions / funciones**:
    - `resetFilters()`: limpia todos los filtros y restablece valores por defecto
- Permite manejar filtros de productos de forma centralizada y reactiva en la app

---

## Router

### index.js / Router de la aplicación — Vue Router + Pinia

- Archivo que define el **router de la aplicación** usando Vue Router
- Router: `router`
  - **Rutas principales**:
    - `/` → `HomeView`
    - `/blog` → `BlogView`
    - `/sellos` → `SellosView`
    - `/product-section` → `ProductSectionView`
    - `/blogdetail/:id` → `BlogDetailView` (carga perezosa)
    - `/product/:id` → `ProductDetailView`
    - `/paneladmin` → `PanelAdminView` (carga perezosa)
    - `/contacto` → `ContactView`
  - **Protección de ruta admin**:
    - Antes de acceder a `/paneladmin`, se verifica:
      - `token` válido en `useAuthStore`
      - `user.role === 'admin'`
    - Si no cumple, redirige a `/`
- Permite centralizar la navegación de la aplicación y proteger rutas sensibles según rol

---

## Accesibilidad
El proyecto implementa:
- Botón accesible para pausar autoplay del carrusel
- `aria-label` en flechas y botones interactivos
- Preferencias de usuario: desactiva autoplay si el sistema pide *reduced motion*
- Contrastes revisados con tema EcoShop
- Navegación protegida basada en rol, evitando que usuarios no autorizados accedan a rutas administrativas
- Uso de atributos semánticos en componentes de Vue para mejorar la lectura por lectores de pantalla
- Feedback visual inmediato al agregar/quitar productos del carrito, mejorando la percepción de cambios de estado
- Contadores y badges con información clara (`totalQuantity`) para usuarios con necesidades de seguimiento visual

---


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


## Contacto

grupoecoshop@gmail.com

---
© 2025 EcoShop. Todos los derechos reservados.
