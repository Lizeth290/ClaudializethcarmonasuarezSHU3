Aplicación FullStack con Seguridad, Docker y Web Services (SHU3)

Este es un proyecto de aplicación web FullStack (MERN) que implementa mecanismos de seguridad con JWT, consumo de web services de terceros y un API REST propio (CRUD), todo orquestado con Docker.

Repositorio GitHub: https://github.com/Lizeth290/ClaudializethcarmonasuarezSHU3

🚀 Características

Frontend: React con Vite y Tailwind CSS.

Backend: Node.js con Express y Mongoose.

Base de Datos: MongoDB.

Contenerización: Docker y Docker Compose.

1. Mecanismos de Seguridad

Autenticación y Autorización: Implementada con JSON Web Tokens (JWT).

Contraseñas Seguras: Hashing de contraseñas usando bcryptjs.

Rutas Protegidas: El middleware authJWT.js protege las rutas que requieren autenticación.

CORS: Configuración de CORS en el backend para permitir peticiones solo desde el origen del frontend (http://localhost:5173).

Validación y Sanitización: Validación básica de entradas en los controladores para prevenir inyecciones y sanitización simple contra XSS.

2. Web Services Propios (API REST)

El backend expone una API REST (/api/items) para operaciones CRUD sobre "Items". Todas estas rutas están protegidas y requieren un JWT válido.

GET /api/items: Obtiene todos los items del usuario autenticado.

POST /api/items: Crea un nuevo item para el usuario autenticado.

PUT /api/items/:id: Actualiza un item (solo si el usuario es el propietario).

DELETE /api/items/:id: Borra un item (solo si el usuario es el propietario).

3. Web Services de Terceros

Se consume una API pública externa (https://api.publicapis.org/random) a través de una ruta proxy en el backend (/api/external/random-api). Esto oculta la llamada directa desde el frontend.

🐳 Cómo Ejecutar (con Docker)

Sigue estos pasos para construir e iniciar toda la aplicación (Frontend, Backend y Base de Datos) usando Docker Compose.

Prerrequisitos

Tener Docker y Docker Compose instalados.

1. Clonar el Repositorio

git clone [https://github.com/Lizeth290/ClaudializethcarmonasuarezSHU3](https://github.com/Lizeth290/ClaudializethcarmonasuarezSHU3)
cd ClaudializethcarmonasuarezSHU3


2. Construir e Iniciar los Contenedores

Este comando construirá las imágenes de frontend y backend (si no existen) y luego iniciará los tres servicios (frontend, backend, db).

docker-compose up --build


La aplicación estará disponible en:

Frontend (Aplicación Web): http://localhost:5173

Backend (API): http://localhost:5001/api

3. Detener la Aplicación

Para detener y eliminar los contenedores, ejecuta:

docker-compose down


Proyecto desarrollado por Claudia Lizeth Carmona Suarez.