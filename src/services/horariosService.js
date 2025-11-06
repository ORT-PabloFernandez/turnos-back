import { 
    getAllHorarios, 
    getHorarioById, 
    getHorariosByProfesional,
    getHorariosDisponibles,
    createHorario, 
    updateHorario,
    updateHorarioDisponibilidad,
    deleteHorario 
} from "../data/horariosData.js";

export const getHorarios = async (profesionalId = null, fecha = null, disponible = null) => {
    if (disponible !== null) {
        return await getHorariosDisponibles(profesionalId, fecha);
    }
    
    if (profesionalId) {
        return await getHorariosByProfesional(profesionalId);
    }
    
    return await getAllHorarios();
};

export const getHorario = async (id) => {
    return await getHorarioById(id);
};

export const createHorarioService = async (horarioData) => {
    const { profesionalId, fecha, hora } = horarioData;
    
    if (!profesionalId || !fecha || !hora) {
        throw new Error("Faltan campos obligatorios (profesionalId, fecha, hora)");
    }
    
    // Validar formato de fecha (YYYY-MM-DD)
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fecha)) {
        throw new Error("Formato de fecha inválido. Use YYYY-MM-DD");
    }
    
    // Validar formato de hora (HH:MM)
    const horaRegex = /^\d{2}:\d{2}$/;
    if (!horaRegex.test(hora)) {
        throw new Error("Formato de hora inválido. Use HH:MM");
    }
    
    const horario = {
        profesionalId: parseInt(profesionalId),
        fecha,
        hora,
        disponible: true,
        fechaCreacion: new Date()
    };
    
    return await createHorario(horario);
};

export const updateHorarioService = async (id, horarioData) => {
    const horario = await getHorarioById(id);
    if (!horario) {
        throw new Error("Horario no encontrado");
    }
    
    const updatedData = {
        ...horarioData,
        fechaActualizacion: new Date()
    };
    
    return await updateHorario(id, updatedData);
};

export const updateDisponibilidadService = async (id, disponible) => {
    const horario = await getHorarioById(id);
    if (!horario) {
        throw new Error("Horario no encontrado");
    }
    
    return await updateHorarioDisponibilidad(id, disponible);
};

export const deleteHorarioService = async (id) => {
    const horario = await getHorarioById(id);
    if (!horario) {
        throw new Error("Horario no encontrado");
    }
    
    return await deleteHorario(id);
};
