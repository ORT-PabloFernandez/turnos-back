import { 
    getAllTurnos, 
    getTurnoById, 
    getTurnosByUsuario,
    getTurnosByProfesional,
    getTurnoByHorarioId,
    createTurno, 
    updateTurno,
    deleteTurno,
    deleteTurnoByHorarioId
} from "../data/turnosData.js";
import { updateHorarioDisponibilidad } from "../data/horariosData.js";

export const getTurnos = async (usuarioId = null, profesionalId = null) => {
    if (usuarioId) {
        return await getTurnosByUsuario(parseInt(usuarioId));
    }
    
    if (profesionalId) {
        return await getTurnosByProfesional(parseInt(profesionalId));
    }
    
    return await getAllTurnos();
};

export const getTurno = async (id) => {
    return await getTurnoById(id);
};

export const reservarTurnoService = async (turnoData) => {
    const { horarioId, usuario } = turnoData;
    
    if (!horarioId || !usuario) {
        throw new Error("Faltan campos obligatorios (horarioId, usuario)");
    }
    
    if (!usuario.id || !usuario.nombre || !usuario.email) {
        throw new Error("Datos de usuario incompletos (id, nombre, email)");
    }
    
    // Verificar si ya existe un turno para este horario
    const turnoExistente = await getTurnoByHorarioId(horarioId);
    if (turnoExistente) {
        throw new Error("Este horario ya está ocupado");
    }
    
    const turno = {
        horarioId,
        usuario: {
            id: parseInt(usuario.id),
            nombre: usuario.nombre,
            email: usuario.email
        },
        estado: "confirmado",
        fechaReserva: new Date()
    };
    
    // Crear el turno
    const result = await createTurno(turno);
    
    // Marcar el horario como no disponible
    await updateHorarioDisponibilidad(horarioId, false);
    
    return result;
};

export const cancelarTurnoService = async (id) => {
    const turno = await getTurnoById(id);
    if (!turno) {
        throw new Error("Turno no encontrado");
    }
    
    // Eliminar el turno
    const result = await deleteTurno(id);
    
    // Liberar el horario
    await updateHorarioDisponibilidad(turno.horarioId, true);
    
    return result;
};

export const updateTurnoService = async (id, turnoData) => {
    const turno = await getTurnoById(id);
    if (!turno) {
        throw new Error("Turno no encontrado");
    }
    
    const updatedData = {
        ...turnoData,
        fechaActualizacion: new Date()
    };
    
    return await updateTurno(id, updatedData);
};
