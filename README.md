# API Sistema de Turnos Médicos

API REST para la gestión de turnos médicos, desarrollada con Node.js, Express y MongoDB. Esta API proporciona endpoints para gestionar profesionales de la salud, horarios disponibles y reservas de turnos.

## Estructura del Proyecto

```
src/
├── app.js              # Configuración principal de Express
├── controllers/        # Controladores de las rutas
│   ├── userController.js
│   ├── listingsController.js
│   ├── profesionalesController.js
│   ├── horariosController.js
│   └── turnosController.js
├── data/              # Capa de acceso a datos
│   ├── connection.js
│   ├── userData.js
│   ├── listingsData.js
│   ├── profesionalesData.js
│   ├── horariosData.js
│   └── turnosData.js
├── middleware/        # Middlewares personalizados
│   └── authMiddleware.js
├── routes/            # Definición de rutas
│   ├── userRoute.js
│   ├── listingsRouter.js
│   ├── profesionalesRouter.js
│   ├── horariosRouter.js
│   └── turnosRouter.js
└── services/          # Lógica de negocio
    ├── userService.js
    ├── listingsService.js
    ├── profesionalesService.js
    ├── horariosService.js
    └── turnosService.js
scripts/
└── init-db.js         # Script de inicialización de la base de datos
```

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/turnos_medicos
   JWT_SECRET=tu_secreto_jwt_super_seguro
   PORT=3000
   ```

## Inicialización de la Base de Datos

Para inicializar la base de datos con datos de ejemplo:

```bash
npm run init-db
```

Este script creará:
- 5 profesionales de diferentes especialidades
- Horarios disponibles para los próximos 30 días laborables
- Usuarios de prueba
- Índices para optimizar las consultas

## Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

## Endpoints de la API

### Base URL
```
http://localhost:3000/api
```

---

## 👨‍⚕️ Profesionales

### GET /api/profesionales
Obtiene todos los profesionales médicos.

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "ObjectId",
    "id": 1,
    "nombre": "Dr. Juan Pérez",
    "especialidad": "Cardiología",
    "email": "juan.perez@hospital.com",
    "avatar": "https://example.com/avatar.jpg",
    "fechaCreacion": "2025-01-01T00:00:00.000Z"
  }
]
```

### GET /api/profesionales/:id
Obtiene un profesional por ID.

**Respuesta exitosa (200):**
```json
{
  "_id": "ObjectId",
  "id": 1,
  "nombre": "Dr. Juan Pérez",
  "especialidad": "Cardiología",
  "email": "juan.perez@hospital.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

### POST /api/profesionales
Crea un nuevo profesional (requiere autenticación).

**Headers:**
```
Authorization: Bearer jwt_token
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "Dr. Ana García",
  "especialidad": "Pediatría",
  "email": "ana.garcia@hospital.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Profesional creado exitosamente",
  "profesionalId": "ObjectId"
}
```

### PUT /api/profesionales/:id
Actualiza un profesional (requiere autenticación).

### DELETE /api/profesionales/:id
Elimina un profesional (requiere autenticación).

---

## 📅 Horarios

### GET /api/horarios
Obtiene horarios con filtros opcionales.

**Query Parameters:**
- `profesionalId` (number): Filtrar por profesional
- `fecha` (string): Filtrar por fecha (YYYY-MM-DD)
- `disponible` (boolean): Filtrar por disponibilidad

**Ejemplos:**
```
GET /api/horarios?profesionalId=1
GET /api/horarios?fecha=2025-01-15
GET /api/horarios?disponible=true
GET /api/horarios?profesionalId=1&fecha=2025-01-15&disponible=true
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "ObjectId",
    "id": "1-2025-01-15-09:00",
    "profesionalId": 1,
    "fecha": "2025-01-15",
    "hora": "09:00",
    "disponible": true,
    "fechaCreacion": "2025-01-01T00:00:00.000Z"
  }
]
```

### GET /api/horarios/:id
Obtiene un horario específico por ID.

### POST /api/horarios
Crea un nuevo horario (requiere autenticación).

**Body:**
```json
{
  "profesionalId": 1,
  "fecha": "2025-01-15",
  "hora": "09:00"
}
```

### PUT /api/horarios/:id
Actualiza un horario (requiere autenticación).

### PATCH /api/horarios/:id/disponibilidad
Actualiza solo la disponibilidad de un horario (requiere autenticación).

**Body:**
```json
{
  "disponible": false
}
```

### DELETE /api/horarios/:id
Elimina un horario (requiere autenticación).

---

## 🗓️ Turnos

### GET /api/turnos
Obtiene turnos con filtros opcionales.

**Query Parameters:**
- `usuarioId` (number): Filtrar por usuario
- `profesionalId` (number): Filtrar por profesional

**Ejemplos:**
```
GET /api/turnos?usuarioId=1
GET /api/turnos?profesionalId=1
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "ObjectId",
    "horarioId": "1-2025-01-15-09:00",
    "usuario": {
      "id": 1,
      "nombre": "Juan Paciente",
      "email": "juan@email.com"
    },
    "estado": "confirmado",
    "fechaReserva": "2025-01-01T00:00:00.000Z"
  }
]
```

### GET /api/turnos/:id
Obtiene un turno específico por ID.

### GET /api/turnos/usuario/:usuarioId
Obtiene todos los turnos de un usuario específico.

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "ObjectId",
    "horarioId": "1-2025-01-15-09:00",
    "usuario": {
      "id": 1,
      "nombre": "Juan Paciente",
      "email": "juan@email.com"
    },
    "estado": "confirmado",
    "fechaReserva": "2025-01-01T00:00:00.000Z"
  }
]
```

### POST /api/turnos
Reserva un nuevo turno (requiere autenticación).

**Body:**
```json
{
  "horarioId": "1-2025-01-15-09:00",
  "usuario": {
    "id": 1,
    "nombre": "Juan Paciente",
    "email": "juan@email.com"
  }
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Turno reservado exitosamente",
  "turnoId": "ObjectId"
}
```

### PUT /api/turnos/:id
Actualiza un turno (requiere autenticación).

### DELETE /api/turnos/:id
Cancela un turno (requiere autenticación). Automáticamente libera el horario.

**Respuesta exitosa (200):**
```json
{
  "message": "Turno cancelado exitosamente"
}
```

---

## 👥 Usuarios (Endpoints Existentes)

### POST /api/users/register
Registra un nuevo usuario.

**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### POST /api/users/login
Inicia sesión de usuario.

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

### GET /api/users
Obtiene todos los usuarios (requiere autenticación).

### GET /api/users/:id
Obtiene un usuario por ID (requiere autenticación).

---

## 🏠 Listings (Endpoints Existentes)

### GET /api/listings
Obtiene todos los listings (requiere autenticación).

### GET /api/listings/:id
Obtiene un listing por ID.

---

## 🔐 Autenticación

La API utiliza JWT para autenticación. Para acceder a rutas protegidas, incluye el token en el header:

```
Authorization: Bearer tu_jwt_token
```

### Usuarios de Prueba

Después de ejecutar `npm run init-db`:

- **Admin**: admin@hospital.com / admin123
- **Usuario Demo**: usuario@demo.com / demo123

---

## 📊 Estructura de Datos

### Profesional
```json
{
  "id": "number",
  "nombre": "string",
  "especialidad": "string",
  "email": "string",
  "avatar": "string (URL)",
  "fechaCreacion": "Date"
}
```

### Horario
```json
{
  "id": "string (profesionalId-fecha-hora)",
  "profesionalId": "number",
  "fecha": "string (YYYY-MM-DD)",
  "hora": "string (HH:MM)",
  "disponible": "boolean",
  "fechaCreacion": "Date"
}
```

### Turno
```json
{
  "horarioId": "string",
  "usuario": {
    "id": "number",
    "nombre": "string",
    "email": "string"
  },
  "estado": "string",
  "fechaReserva": "Date"
}
```

---

## ⚠️ Manejo de Errores

La API devuelve errores en el siguiente formato:

```json
{
  "message": "Descripción del error"
}
```

### Códigos de Estado

- **200**: Éxito
- **201**: Creado
- **400**: Solicitud incorrecta
- **401**: No autorizado
- **404**: No encontrado
- **409**: Conflicto (ej: horario ya ocupado)
- **500**: Error interno del servidor

---

## 🚀 Funcionalidades Principales

1. **Gestión de Profesionales**: CRUD completo para profesionales médicos
2. **Gestión de Horarios**: Creación y administración de horarios disponibles
3. **Sistema de Reservas**: Reserva y cancelación de turnos
4. **Filtros Avanzados**: Búsqueda por profesional, fecha y disponibilidad
5. **Autenticación JWT**: Seguridad para operaciones sensibles
6. **Validaciones**: Validación de datos de entrada y reglas de negocio
7. **Índices de Base de Datos**: Optimización de consultas

---

## 🔧 Desarrollo

### Agregar Nuevos Endpoints

1. Crear el modelo de datos en `/src/data/`
2. Implementar el servicio en `/src/services/`
3. Crear el controlador en `/src/controllers/`
4. Definir las rutas en `/src/routes/`
5. Registrar las rutas en `app.js`
6. Actualizar la documentación

### Testing

Para probar los endpoints, puedes usar herramientas como:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code)
