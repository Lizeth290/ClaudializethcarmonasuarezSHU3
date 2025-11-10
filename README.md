# Aplicación FullStack con Seguridad, Docker y Web Services (SHU3)

Aplicación web FullStack desarrollada con stack MERN (MongoDB, Express, React, Node.js). Implementa autenticación JWT, API REST con CRUD protegido y consumo de servicios web externos, todo orquestado con Docker.

**Repositorio**: https://github.com/Lizeth290/ClaudializethcarmonasuarezSHU3

## 🚀 Características

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Mongoose
- **Base de Datos**: MongoDB 4.4
- **Contenerización**: Docker Compose

## 🔐 Seguridad

- **Autenticación JWT**: Tokens para autenticación y autorización
- **Contraseñas**: Hashing con bcryptjs
- **Rutas Protegidas**: Middleware authJWT.js
- **CORS**: Configurado para localhost:5173
- **Validación**: Prevención de inyecciones y XSS

## 📡 API REST Propia

Endpoints protegidos con JWT en `/api/items`:

- `GET /api/items` - Listar items del usuario
- `POST /api/items` - Crear nuevo item
- `PUT /api/items/:id` - Actualizar item
- `DELETE /api/items/:id` - Eliminar item

## 🌐 API Externa

Consumo de API pública a través de proxy en `/api/external/random-api` (con fallback a datos de ejemplo si falla la conexión).

## 🐳 Instalación y Ejecución

### Prerrequisitos
- Docker y Docker Compose instalados
- Puertos 5173, 5001 y 27017 disponibles

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/Lizeth290/ClaudializethcarmonasuarezSHU3
cd ClaudializethcarmonasuarezSHU3
```

2. **Iniciar la aplicación**
```bash
docker-compose up --build
```

3. **Acceder a la aplicación**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001/api
- MongoDB: localhost:27017

4. **Detener la aplicación**
```bash
docker-compose down
```

## �️ Stack Teacnológico

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Axios

**Backend**
- Node.js + Express
- MongoDB 4.4 + Mongoose
- JWT + bcryptjs
- express-async-handler

**DevOps**
- Docker + Docker Compose
- Nodemon (Hot Reload)

## 📁 Estructura del Proyecto

```
├── backend/
│   ├── src/
│   │   ├── config/         # Configuración DB
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── middleware/     # Auth y errores
│   │   ├── models/         # Modelos Mongoose
│   │   └── routes/         # Rutas API
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx
│   └── Dockerfile
└── docker-compose.yml
```

## 🔧 Comandos Útiles

```bash
# Ver logs
docker logs shu3-backend
docker logs shu3-frontend

# Reiniciar servicio
docker restart shu3-backend

# Acceder a MongoDB
docker exec -it shu3-mongo-db mongosh
```

## 📝 Notas

- MongoDB 4.4 (compatible con CPUs sin AVX)
- Hot reload automático en desarrollo
- Datos persistentes en volúmenes Docker
- Fallback a datos de ejemplo si falla API externa
- Reintentos automáticos de conexión a MongoDB

---

**Desarrollado por**: Claudia Lizeth Carmona Suarez  
**Proyecto**: SHU3 - Seguridad, Docker y Web Services