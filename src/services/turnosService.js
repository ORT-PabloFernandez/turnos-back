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
import { updateHorarioDisponibilidad, getHorarioById } from "../data/horariosData.js";

const MILISEGUNDOS_EN_24HS = 24 * 60 * 60 * 1000;

const canCancelTurnoByHorario = (horario) => {
    if (!horario || !horario.fecha || !horario.hora) {
        return false;
    }

    const turnoDateTime = new Date(`${horario.fecha}T${horario.hora}:00`);
    const now = new Date();

    const diff = turnoDateTime.getTime() - now.getTime();
    return diff >= MILISEGUNDOS_EN_24HS;
};


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

    const horario = await getHorarioById(turno.horarioId);
    if (!horario) {
        throw new Error("Horario no encontrado para este turno");
    }

    if (!canCancelTurnoByHorario(horario)) {
        throw new Error("El turno solo puede cancelarse con al menos 24 horas de anticipación");
    }

    const result = await deleteTurno(id);

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
