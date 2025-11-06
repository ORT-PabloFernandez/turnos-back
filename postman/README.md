# Colección de Postman - Sistema de Turnos Médicos

Esta carpeta contiene la colección completa de Postman para probar todos los endpoints del sistema de turnos médicos.

## Archivos Incluidos

- `Sistema_Turnos_Medicos.postman_collection.json` - Colección principal con todos los endpoints
- `Sistema_Turnos_Medicos.postman_environment.json` - Entorno con variables predefinidas
- `README.md` - Este archivo con instrucciones

## Importar en Postman

### 1. Importar la Colección

1. Abre Postman
2. Haz clic en "Import" en la esquina superior izquierda
3. Selecciona el archivo `Sistema_Turnos_Medicos.postman_collection.json`
4. Haz clic en "Import"

### 2. Importar el Entorno

1. En Postman, ve a "Environments" en la barra lateral
2. Haz clic en "Import"
3. Selecciona el archivo `Sistema_Turnos_Medicos.postman_environment.json`
4. Haz clic en "Import"
5. Selecciona el entorno "Sistema Turnos Médicos - Local" en el dropdown de entornos

## Configuración Inicial

### Variables de Entorno

El entorno incluye las siguientes variables:

- `baseUrl`: http://localhost:3000 (URL base del API)
- `authToken`: Se llena automáticamente al hacer login
- `profesionalId`: ID de ejemplo para profesional
- `horarioId`: ID de ejemplo para horario
- `turnoId`: ID de ejemplo para turno
- `userId`: ID de ejemplo para usuario
- `adminEmail`: admin@hospital.com
- `adminPassword`: admin123
- `demoEmail`: usuario@demo.com
- `demoPassword`: demo123

### Antes de Usar

1. **Inicializar la Base de Datos**:
   ```bash
   npm run init-db
   ```

2. **Iniciar el Servidor**:
   ```bash
   npm run dev
   ```

3. **Hacer Login**: Ejecuta el request "Login User" en la carpeta "Authentication" para obtener el token automáticamente.

## Estructura de la Colección

### 🔐 Authentication
- **Register User**: Registrar nuevo usuario
- **Login User**: Iniciar sesión (guarda el token automáticamente)

### 👨‍⚕️ Profesionales
- **Get All Profesionales**: Listar todos los profesionales
- **Get Profesional by ID**: Obtener profesional específico
- **Create Profesional**: Crear nuevo profesional (requiere auth)
- **Update Profesional**: Actualizar profesional (requiere auth)
- **Delete Profesional**: Eliminar profesional (requiere auth)

### 📅 Horarios
- **Get All Horarios**: Listar todos los horarios
- **Get Horarios by Profesional**: Filtrar por profesional
- **Get Horarios Disponibles**: Solo horarios disponibles
- **Get Horarios by Date**: Filtrar por fecha
- **Get Horarios with Multiple Filters**: Combinación de filtros
- **Get Horario by ID**: Obtener horario específico
- **Create Horario**: Crear nuevo horario (requiere auth)
- **Update Horario**: Actualizar horario (requiere auth)
- **Update Disponibilidad**: Cambiar solo disponibilidad (requiere auth)
- **Delete Horario**: Eliminar horario (requiere auth)

### 🗓️ Turnos
- **Get All Turnos**: Listar todos los turnos
- **Get Turnos by Usuario**: Filtrar por usuario (query param)
- **Get Turnos by Profesional**: Filtrar por profesional
- **Get Turnos by Usuario (Endpoint específico)**: Endpoint dedicado para turnos de usuario
- **Get Turno by ID**: Obtener turno específico
- **Reservar Turno**: Crear nueva reserva (requiere auth)
- **Update Turno**: Actualizar turno (requiere auth)
- **Cancelar Turno**: Cancelar turno y liberar horario (requiere auth)

### 👥 Users (Existing)
- **Get All Users**: Listar usuarios (requiere auth)
- **Get User by ID**: Obtener usuario específico (requiere auth)

### 🏠 Listings (Existing)
- **Get All Listings**: Listar listings (requiere auth)
- **Get Listing by ID**: Obtener listing específico

### ✅ Health Check
- **API Status**: Verificar estado del API

## Flujo de Trabajo Recomendado

### 1. Autenticación
```
1. Login User (con admin@hospital.com / admin123)
   → Esto guardará el token automáticamente
```

### 2. Explorar Datos
```
1. Get All Profesionales
2. Get All Horarios
3. Get All Turnos
```

### 3. Probar Filtros
```
1. Get Horarios Disponibles
2. Get Horarios by Profesional (profesionalId=1)
3. Get Horarios by Date (fecha=2025-01-15)
```

### 4. Reservar un Turno
```
1. Get Horarios Disponibles
2. Copiar un horarioId disponible
3. Reservar Turno (usar el horarioId copiado)
4. Verificar que el horario ya no esté disponible
```

### 5. Gestionar Turnos
```
1. Get Turnos by Usuario
2. Update Turno (cambiar estado o datos)
3. Cancelar Turno (libera el horario automáticamente)
```

## Scripts de Prueba Automáticos

La colección incluye scripts automáticos que:

- **Login User**: Guarda automáticamente el token JWT en la variable `authToken`
- **Autenticación**: Todos los endpoints protegidos usan automáticamente el token guardado

## Ejemplos de Datos

### Crear Profesional
```json
{
  "nombre": "Dr. Ana García",
  "especialidad": "Pediatría",
  "email": "ana.garcia@hospital.com",
  "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
}
```

### Crear Horario
```json
{
  "profesionalId": 1,
  "fecha": "2025-01-20",
  "hora": "10:00"
}
```

### Reservar Turno
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

## Códigos de Respuesta

- **200**: Éxito
- **201**: Creado exitosamente
- **400**: Error en la solicitud (datos inválidos)
- **401**: No autorizado (token inválido o faltante)
- **404**: Recurso no encontrado
- **409**: Conflicto (ej: horario ya ocupado)
- **500**: Error interno del servidor

## Troubleshooting

### Token Expirado
Si recibes errores 401, ejecuta nuevamente "Login User" para renovar el token.

### Servidor No Disponible
Verifica que el servidor esté corriendo en `http://localhost:3000` con `npm run dev`.

### Base de Datos Vacía
Ejecuta `npm run init-db` para poblar la base de datos con datos de ejemplo.

### Variables No Definidas
Asegúrate de haber seleccionado el entorno "Sistema Turnos Médicos - Local" en Postman.

## Contacto

Para reportar problemas o sugerencias sobre la colección de Postman, por favor crea un issue en el repositorio del proyecto.
