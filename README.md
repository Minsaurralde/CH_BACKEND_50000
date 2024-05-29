# E-commerce API

## Descripción

Esta es una API para un sistema de e-commerce presentado en un curso de backend con node js.
Permite la gestión de productos, carritos de compras y usuarios.
La API está protegida por autenticación JWT y ofrece diferentes niveles de autorización para administradores y usuarios regulares.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Rutas](#rutas)
  - [Carrito](#carrito)
  - [Productos](#productos)
  - [Sesiones](#sesiones)
  - [Usuarios](#usuarios)
- [Autenticación](#autenticación)
- [Tecnologías](#tecnologías)
- [Contribución](#contribución)

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Minsaurralde/CH_BACKEND_50000.git
   ```

2. Navegar al directorio del proyecto:

   ```bash
   cd CH_BACKEND_50000
   ```

3. Instalar dependencias:

   ```bash
   npm install
   ```

4. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

   ```env
   GITHUB_APP_ID=your_github_app_id
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_secret
   GITHUB_CALLBACK=your_github_callback_url

   JWT_SECRET=your_jwt_secret
   JWT_COOKIE=your_jwt_cookie_name

   MONGO_CLUSTER=your_database_cluster
   MONGO_USER=your_database_user
   MONGO_PASSWORD=your_database_pass

   NODEMAILER_USER=your_mailer_identifier_user
   NODEMAILER_PASSWORD=your_mailer_identifier_pass

   PORT=your_port
   HOST=your_host_url
   ```

5. Inicia la aplicación:
   ```bash
   npm start
   ```

## Uso

Para utilizar la API, puedes usar herramientas como Postman o cURL para hacer solicitudes HTTP a los diferentes endpoints. Tambien puedes utilizar la interfaz grafica aunque por el momento no cuenta con vistas para todos los endpoints.

## Rutas

### Carts

- **GET /**: Obtiene una lista de los carritos existentes.
- **POST /**: Obtiene un id de carrito para el usuario logueado.
- **GET /:cid**: Obtiene un carrito por su ID.
- **PUT /:cid**: Actualiza los productos del carrito.
- **DELETE /:cid**: Deja el carrito vacio.
- **POST /:cid/product/:pid**: Añade un producto al carrito.
- **PUT /:cid/product/:pid**: Actualiza la cantidad de un producto en el carrito.
- **DELETE /:cid/product/:pid**: Elimina un producto del carrito.
- **POST /:cid/purchase**: Confirma una compra entregando un numero de ticket al cliente.

### Products

- **GET /**: Obtiene una lista de productos con opciones de filtrado, paginación y ordenación.
- **POST /**: Crea un nuevo producto (requiere permisos de administrador).
- **GET /:pid**: Obtiene un producto por su ID.
- **PUT /:pid**: Actualiza un producto por su ID (requiere permisos de administrador).
- **DELETE /:pid**: Elimina un producto por su ID (requiere permisos de administrador).

### Sessions

- **POST /register**: Registra un nuevo usuario.
- **POST /login**: Inicia sesión y devuelve un token JWT.
- **GET /current**: Obtiene la información del usuario autenticado.
- **POST /logout**: Cierra la sesión del usuario.
- **POST /restartPassword**: Reinicia la contraseña del usuario.
- **GET /github**: Inicia sesión con GitHub.
- **GET /callback**: Callback para la autenticación con GitHub.

### Users

- **GET /**: Obtiene una lista de todos los usuarios (requiere permisos de administrador).
- **DELETE /**: Elimina todos los usuarios inactivos por mas de 2 dias (requiere permisos de administrador).
- **GET /:uid**: Obtiene un usuario por su ID (requiere permisos de administrador).
- **DELETE /:uid**: Elimina un usuario por su ID (requiere permisos de administrador).

## Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Los endpoints protegidos requieren un token JWT en el encabezado de la solicitud. Para obtener un token, los usuarios deben iniciar sesión mediante el endpoint `/login`.

## Tecnologías

- Node.js
- Express.js
- MongoDB (o la base de datos que estés usando)
- JWT (JSON Web Tokens)
- Passport.js
- Socket.io
- Nodemailer
- winston

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Empuja la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
