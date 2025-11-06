import { 
    getAllProfesionales, 
    getProfesionalById, 
    createProfesional, 
    updateProfesional, 
    deleteProfesional 
} from "../data/profesionalesData.js";

export const getProfesionales = async () => {
    return await getAllProfesionales();
};

export const getProfesional = async (id) => {
    return await getProfesionalById(id);
};

export const createProfesionalService = async (profesionalData) => {
    const { nombre, especialidad, email, avatar } = profesionalData;
    
    if (!nombre || !especialidad || !email) {
        throw new Error("Faltan campos obligatorios (nombre, especialidad, email)");
    }
    
    const profesional = {
        nombre,
        especialidad,
        email,
        avatar: avatar || null,
        fechaCreacion: new Date()
    };
    
    return await createProfesional(profesional);
};

export const updateProfesionalService = async (id, profesionalData) => {
    const profesional = await getProfesionalById(id);
    if (!profesional) {
        throw new Error("Profesional no encontrado");
    }
    
    const updatedData = {
        ...profesionalData,
        fechaActualizacion: new Date()
    };
    
    return await updateProfesional(id, updatedData);
};

export const deleteProfesionalService = async (id) => {
    const profesional = await getProfesionalById(id);
    if (!profesional) {
        throw new Error("Profesional no encontrado");
    }
    
    return await deleteProfesional(id);
};
