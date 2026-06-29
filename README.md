# ElectroFest - E-commerce de electrodomésticos

Trabajo práctico integrador de **Programación III** desarrollado como una aplicación web fullstack para la gestión y venta de productos de electrodomésticos.

## Integrantes

- Diego Bufalari
- Leonardo Ramos
- Rocco Gironacci
- Geronimo Carlucci

## Descripción del proyecto

**ElectroFest** es un e-commerce que permite navegar productos, buscar por nombre, filtrar por categorías y marcas, ver el detalle de cada producto, agregar productos al carrito y generar pedidos.

Además, cuenta con un panel administrativo para gestionar productos, pedidos, usuarios y visualizar métricas generales del sistema.

## Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router DOM
- React Icons
- React Toastify
- Bootstrap / React Bootstrap
- CSS personalizado responsive

### Backend

- Node.js
- Express
- Sequelize
- SQLite
- JSON Web Token
- Bcrypt
- CORS
- Morgan

## Funcionalidades principales

### Sitio público

- Visualización de productos en catálogo.
- Productos destacados en la página principal.
- Búsqueda de productos por nombre.
- Filtros por categoría, marca, precio y oferta.
- Ordenamiento de productos.
- Vista de detalle de producto.
- Carrito de compras.
- Registro e inicio de sesión de usuarios.
- Checkout con datos del usuario.
- Visualización de pedidos realizados por el usuario.

### Panel de administración

- Dashboard con métricas generales.
- Total de productos.
- Total de pedidos.
- Total de usuarios registrados.
- Estados de pedidos.
- ABM de productos.
- Edición y eliminación de productos.
- Gestión de pedidos.
- Cambio de estado de pedidos.
- Gestión de usuarios para rol SuperAdmin.
- Rutas protegidas según rol.

## Roles del sistema

El sistema trabaja con tres tipos de roles:

| Rol | Descripción |
| --- | --- |
| Cliente | Usuario común que puede comprar productos y ver sus pedidos. |
| Administrador | Puede acceder al panel admin, gestionar productos y pedidos. |
| SuperAdmin | Puede acceder a todas las funciones administrativas, incluida la gestión de usuarios. |

## Credenciales de prueba

Al iniciar el backend, el sistema crea usuarios administrativos de prueba si no existen.

### Administrador

```txt
Email: admin@admin.com
Password: admin123
```

### SuperAdmin

```txt
Email: superadmin@admin.com
Password: admin123
```

> Estas credenciales son solo para pruebas académicas. No deben utilizarse en producción.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd api-tp-3
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Ejecutar el backend

```bash
npm run dev
```

El servidor queda disponible en:

```txt
http://localhost:3000
```

### 4. Instalar dependencias del frontend

Abrir otra terminal desde la carpeta principal del proyecto:

```bash
cd frontend
npm install
```

### 5. Ejecutar el frontend

```bash
npm run dev
```

El frontend queda disponible en:

```txt
http://localhost:5173
```

## Estructura general del proyecto

```txt
api-tp-3/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── src/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── config.js
│   │   ├── db.js
│   │   └── index.js
│   ├── package.json
│   └── products.db
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## Rutas principales del frontend

| Ruta | Descripción |
| --- | --- |
| `/` | Página principal del sitio. |
| `/producto/:id` | Detalle de un producto. |
| `/carrito` | Carrito de compras. |
| `/checkout` | Finalización de compra. |
| `/mis-pedidos` | Pedidos del usuario. |
| `/login` | Inicio de sesión. |
| `/registro` | Registro de usuario. |
| `/admin/dashboard` | Dashboard administrativo. |
| `/admin/productos` | Gestión de productos. |
| `/admin/pedidos` | Gestión de pedidos. |
| `/admin/usuarios` | Gestión de usuarios, solo SuperAdmin. |

## Endpoints principales del backend

### Autenticación

| Método | Endpoint | Descripción |
| --- | --- | --- |
| POST | `/register` | Registrar usuario. |
| POST | `/login` | Iniciar sesión. |
| GET | `/me/:id` | Obtener datos de usuario. |

### Productos

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/products` | Listar productos. |
| GET | `/products/:id` | Obtener un producto. |
| POST | `/products` | Crear producto. |
| PUT | `/products/:id` | Editar producto. |
| DELETE | `/products/:id` | Eliminar producto. |

### Pedidos

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/orders` | Listar pedidos. |
| GET | `/orders/:id` | Obtener detalle de pedido. |
| GET | `/orders/user/:userId` | Listar pedidos de un usuario. |
| POST | `/orders` | Crear pedido. |
| PATCH | `/orders/:id/status` | Cambiar estado de pedido. |

## Base de datos

El proyecto utiliza **SQLite** como base de datos local junto con **Sequelize** como ORM.

Modelos principales:

- Usuario
- Rol
- Producto
- Pedido
- DetallePedido

Relaciones principales:

- Un usuario pertenece a un rol.
- Un usuario puede tener muchos pedidos.
- Un pedido pertenece a un usuario.
- Un pedido puede tener varios detalles.
- Cada detalle de pedido pertenece a un producto.

## Mejoras aplicadas durante el desarrollo

- Corrección de botones del panel de administración.
- Corrección del botón de edición de productos.
- Agregado de botón para volver al sitio principal desde admin.
- Corrección del botón Comprar ahora del hero.
- Reemplazo de alerts por notificaciones Toastify.
- Mejoras responsive en header, categorías y panel admin.
- Corrección del botón/logo ElectroFest para volver al home.
- Corrección del registro de usuarios.
- Actualización del dashboard para mostrar el total real de usuarios registrados.
- Protección de rutas según roles.

## Posibles mejoras futuras

- Agregar pasarela de pago real.
- Agregar historial más detallado de cambios de estado de pedidos.
- Mejorar validaciones del backend con middlewares específicos.
- Agregar subida real de imágenes de productos.
- Implementar paginación en productos y pedidos.
- Agregar pruebas unitarias e integración.
- Mejorar seguridad en rutas administrativas del backend.

## Estado del proyecto

Proyecto desarrollado con fines académicos para demostrar conocimientos de frontend, backend, rutas protegidas, consumo de API, base de datos, autenticación, roles y gestión de información desde un panel administrativo.
