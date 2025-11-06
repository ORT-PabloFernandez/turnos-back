import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGODB_URI;
const dbName = "turnos_medicos";

if (!uri) {
    console.error("❌ La variable de entorno MONGODB_URI no está definida.");
    process.exit(1);
}

// Datos iniciales para profesionales
const profesionalesData = [
    {
        id: 1,
        nombre: "Dr. Juan Pérez",
        especialidad: "Cardiología",
        email: "juan.perez@hospital.com",
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
        fechaCreacion: new Date()
    },
    {
        id: 2,
        nombre: "Dra. María González",
        especialidad: "Dermatología",
        email: "maria.gonzalez@hospital.com",
        avatar: "https://images.unsplash.com/photo-1594824475317-e5b8e3f5c8b5?w=150&h=150&fit=crop&crop=face",
        fechaCreacion: new Date()
    },
    {
        id: 3,
        nombre: "Dr. Carlos Rodriguez",
        especialidad: "Traumatología",
        email: "carlos.rodriguez@hospital.com",
        avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
        fechaCreacion: new Date()
    },
    {
        id: 4,
        nombre: "Dra. Ana López",
        especialidad: "Pediatría",
        email: "ana.lopez@hospital.com",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
        fechaCreacion: new Date()
    },
    {
        id: 5,
        nombre: "Dr. Roberto Silva",
        especialidad: "Neurología",
        email: "roberto.silva@hospital.com",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face",
        fechaCreacion: new Date()
    }
];

// Función para generar horarios para los próximos 30 días
function generarHorarios() {
    const horarios = [];
    const hoy = new Date();
    
    for (let dia = 1; dia <= 30; dia++) {
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() + dia);
        
        // Solo días laborables (lunes a viernes)
        if (fecha.getDay() >= 1 && fecha.getDay() <= 5) {
            profesionalesData.forEach(profesional => {
                // Horarios de mañana: 9:00 - 12:00
                for (let hora = 9; hora < 12; hora++) {
                    horarios.push({
                        id: `${profesional.id}-${fecha.toISOString().split('T')[0]}-${hora}:00`,
                        profesionalId: profesional.id,
                        fecha: fecha.toISOString().split('T')[0],
                        hora: `${hora}:00`,
                        disponible: true,
                        fechaCreacion: new Date()
                    });
                }
                
                // Horarios de tarde: 14:00 - 17:00
                for (let hora = 14; hora < 17; hora++) {
                    horarios.push({
                        id: `${profesional.id}-${fecha.toISOString().split('T')[0]}-${hora}:00`,
                        profesionalId: profesional.id,
                        fecha: fecha.toISOString().split('T')[0],
                        hora: `${hora}:00`,
                        disponible: true,
                        fechaCreacion: new Date()
                    });
                }
            });
        }
    }
    
    return horarios;
}

// Datos de usuarios de ejemplo
const usuariosData = [
    {
        username: "admin",
        email: "admin@hospital.com",
        password: "$2b$10$8K1p/a0dqbqfaO4Q4QQZ4.VV1Q5qBqfqOQqfqOQqfqOQqfqOQqfqO", // password: admin123
        role: "admin",
        fechaCreacion: new Date()
    },
    {
        username: "usuario_demo",
        email: "usuario@demo.com",
        password: "$2b$10$8K1p/a0dqbqfaO4Q4QQZ4.VV1Q5qBqfqOQqfqOQqfqOQqfqOQqfqO", // password: demo123
        role: "user",
        fechaCreacion: new Date()
    }
];

async function initializeDatabase() {
    let client;
    
    try {
        console.log("🔄 Conectando a MongoDB...");
        client = new MongoClient(uri);
        await client.connect();
        
        const db = client.db(dbName);
        console.log(`✅ Conectado a la base de datos: ${dbName}`);
        
        // Limpiar colecciones existentes
        console.log("🧹 Limpiando colecciones existentes...");
        await db.collection("profesionales").deleteMany({});
        await db.collection("horarios").deleteMany({});
        await db.collection("turnos").deleteMany({});
        await db.collection("users").deleteMany({});
        
        // Insertar profesionales
        console.log("👨‍⚕️ Insertando profesionales...");
        const profesionalesResult = await db.collection("profesionales").insertMany(profesionalesData);
        console.log(`✅ ${profesionalesResult.insertedCount} profesionales insertados`);
        
        // Generar e insertar horarios
        console.log("📅 Generando horarios...");
        const horariosData = generarHorarios();
        const horariosResult = await db.collection("horarios").insertMany(horariosData);
        console.log(`✅ ${horariosResult.insertedCount} horarios insertados`);
        
        // Insertar usuarios de ejemplo
        console.log("👥 Insertando usuarios de ejemplo...");
        const usuariosResult = await db.collection("users").insertMany(usuariosData);
        console.log(`✅ ${usuariosResult.insertedCount} usuarios insertados`);
        
        // Crear índices para mejorar el rendimiento
        console.log("🔍 Creando índices...");
        
        // Índices para profesionales
        await db.collection("profesionales").createIndex({ id: 1 }, { unique: true });
        await db.collection("profesionales").createIndex({ email: 1 }, { unique: true });
        await db.collection("profesionales").createIndex({ especialidad: 1 });
        
        // Índices para horarios
        await db.collection("horarios").createIndex({ id: 1 }, { unique: true });
        await db.collection("horarios").createIndex({ profesionalId: 1 });
        await db.collection("horarios").createIndex({ fecha: 1 });
        await db.collection("horarios").createIndex({ disponible: 1 });
        await db.collection("horarios").createIndex({ profesionalId: 1, fecha: 1 });
        
        // Índices para turnos
        await db.collection("turnos").createIndex({ horarioId: 1 }, { unique: true });
        await db.collection("turnos").createIndex({ "usuario.id": 1 });
        await db.collection("turnos").createIndex({ profesionalId: 1 });
        
        // Índices para usuarios
        await db.collection("users").createIndex({ email: 1 }, { unique: true });
        await db.collection("users").createIndex({ username: 1 }, { unique: true });
        
        console.log("✅ Índices creados correctamente");
        
        console.log("\n🎉 Base de datos inicializada correctamente!");
        console.log("\n📊 Resumen:");
        console.log(`   • Profesionales: ${profesionalesResult.insertedCount}`);
        console.log(`   • Horarios: ${horariosResult.insertedCount}`);
        console.log(`   • Usuarios: ${usuariosResult.insertedCount}`);
        console.log(`   • Turnos: 0 (se crearán cuando los usuarios reserven)`);
        
        console.log("\n👥 Usuarios de prueba:");
        console.log("   • admin@hospital.com (password: admin123)");
        console.log("   • usuario@demo.com (password: demo123)");
        
    } catch (error) {
        console.error("❌ Error inicializando la base de datos:", error);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
            console.log("🔌 Conexión cerrada");
        }
    }
}

// Ejecutar la inicialización
initializeDatabase();
