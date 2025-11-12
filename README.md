# Aplicación FullStack con Seguridad, Docker y Web Services (SHU3)

Aplicación web FullStack desarrollada con stack MERN (MongoDB, Express, React, Node.js). Implementa autenticación JWT, API REST con CRUD protegido y consumo de servicios web externos, todo orquestado con Docker.

**Repositorio**: https://github.com/Lizeth290/ClaudializethcarmonasuarezSHU3

## 🚀 Características Principales

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Mongoose
- **Base de Datos**: MongoDB 4.4
- **Contenerización**: Docker Compose
- **Autenticación**: JWT (JSON Web Tokens)
- **Seguridad**: Hashing de contraseñas con bcryptjs

## 🔐 Seguridad Implementada

- **Autenticación JWT**: Sistema completo de tokens para autenticación y autorización
- **Contraseñas Seguras**: Hashing con bcryptjs antes de almacenar
- **Rutas Protegidas**: Middleware `authJWT.js` valida tokens en rutas privadas
- **CORS Configurado**: Solo permite peticiones desde `http://localhost:5173`
- **Validación de Datos**: Prevención de inyecciones SQL/NoSQL y XSS

## 📡 API REST Propia

El backend expone una API REST completa para gestión de items. Todos los endpoints están protegidos con JWT:

### Endpoints de Autenticación
- `POST /api/users/register` - Registro de nuevos usuarios
- `POST /api/users/login` - Inicio de sesión
- `GET /api/users/profile` - Obtener perfil del usuario (protegida)

### Endpoints de Items (CRUD)
- `GET /api/items` - Listar todos los items del usuario autenticado
- `POST /api/items` - Crear un nuevo item
- `PUT /api/items/:id` - Actualizar un item existente
- `DELETE /api/items/:id` - Eliminar un item

## 🌐 Consumo de API Externa

- **Endpoint**: `POST /api/users/google`
- **Fuente**: https://accounts.google.com/gsi/client
- **Implementación**: Validación del token desde el backend mediante google-auth-library, actuando como proxy seguro entre el cliente y Google.
- **Fallback**: Manejo de errores y uso de datos simulados si el servicio externo falla.

## 🐳 Instalación y Ejecución

### Prerrequisitos
- Docker y Docker Compose instalados
- Puertos disponibles: 5173 (frontend), 5001 (backend), 27017 (MongoDB)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Lizeth290/ClaudializethcarmonasuarezSHU3
cd ClaudializethcarmonasuarezSHU3
```

2. **Iniciar la aplicación con Docker**
```bash
docker compose up --build
```

3. **Acceder a la aplicación**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001/api
- **MongoDB**: localhost:27017

4. **Detener la aplicación**
```bash
docker compose down
```

## 🛠️ Stack Tecnológico

### Frontend
- React 18.3.1
- Vite 5.3.1
- Tailwind CSS 3.4.4
- React Router DOM 6.23.1
- Axios 1.7.2

### Backend
- Node.js 18
- Express 4.19.2
- MongoDB 4.4
- Mongoose 8.4.3
- jsonwebtoken 9.0.2
- bcryptjs 2.4.3
- express-async-handler 1.2.0

### DevOps
- Docker + Docker Compose
- Nodemon 3.1.4 (Hot Reload en desarrollo)
- Volúmenes persistentes para MongoDB

## 📁 Estructura del Proyecto

```
ClaudializethcarmonasuarezSHU3/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    # Conexión a MongoDB con reintentos
│   │   ├── controllers/
│   │   │   ├── auth.controller.js       # Registro, login, perfil
│   │   │   ├── crud.controller.js       # CRUD de items
│   │   │   └── google.controller.js     # Consumo de API externa
│   │   ├── middleware/
│   │   │   ├── authJWT.js              # Verificación de tokens JWT
│   │   │   └── errorHandler.js         # Manejo de errores
│   │   ├── models/
│   │   │   ├── user.model.js           # Modelo de usuarios
│   │   │   └── item.model.js           # Modelo de items
│   │   ├── routes/
│   │   │   ├── authRoutes.js           # Rutas de autenticación
│   │   │   └── itemRoutes.js           # Rutas de items
│   │   └── index.js                     # Punto de entrada del servidor
│   ├── .env.example                     # Variables de entorno de ejemplo
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx                      # Componente principal
│   │   ├── main.jsx                     # Punto de entrada
│   │   └── index.css                    # Estilos globales
│   ├── index.html
│   ├── Dockerfile
│   ├── vite.config.js                   # Configuración de Vite
│   ├── tailwind.config.js               # Configuración de Tailwind
│   └── package.json
├── docker-compose.yml                    # Orquestación de servicios
└── README.md
```

## 💡 Uso de la Aplicación

1. **Registro**: Crea una cuenta con usuario y contraseña
2. **Login**: Inicia sesión para obtener un token JWT
3. **Dashboard**: Gestiona tus items (crear, listar, eliminar)
4. **API Externa**: Inicia Sesión con tu cuenta de google

## 📝 Notas Importantes

- **MongoDB 4.4**: Versión compatible con CPUs sin soporte AVX (cambiado de `mongo:latest`)
- **Hot Reload**: Los cambios en el código se reflejan automáticamente con nodemon
- **Persistencia**: Los datos se mantienen en volúmenes Docker (`mongo-data`)
- **Reintentos de Conexión**: El backend reintenta conectarse a MongoDB hasta 5 veces
- **API Externa**: Si falla la conexión, se muestran datos de ejemplo automáticamente

## 🔒 Variables de Entorno

El archivo `.env.example` en el backend contiene:

```env
PORT=5001
MONGO_URI=mongodb://db:27017/shu3-app
JWT_SECRET=unsecretojwtmuydificildeadivinar123!
GOOGLE_CLIENT_ID=Clave
```

## 🚀 Características Técnicas

- ✅ Arquitectura REST API
- ✅ Autenticación y autorización con JWT
- ✅ Autenticación y autorización con Google
- ✅ CRUD completo con MongoDB
- ✅ Middleware de protección de rutas
- ✅ Manejo centralizado de errores
- ✅ Validación de datos
- ✅ CORS configurado
- ✅ Hot reload en desarrollo
- ✅ Contenerización con Docker
- ✅ Persistencia de datos

## 📚 Documentación Adicional

**Proyecto**: SHU3 - Seguridad, Docker y Web Services  
**Fecha**: Noviembre 2025
