import { 
    getHorarios, 
    getHorario, 
    createHorarioService, 
    updateHorarioService,
    updateDisponibilidadService,
    deleteHorarioService 
} from "../services/horariosService.js";

export const getAllHorarios = async (req, res) => {
    try {
        const { profesionalId, fecha, disponible } = req.query;
        const horarios = await getHorarios(
            profesionalId ? parseInt(profesionalId) : null,
            fecha,
            disponible !== undefined ? disponible === 'true' : null
        );
        res.json(horarios);
    } catch (error) {
        console.log("Error fetching horarios: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getHorarioById = async (req, res) => {
    try {
        const horario = await getHorario(req.params.id);
        if (!horario) {
            return res.status(404).json({ message: "Horario no encontrado" });
        }
        res.json(horario);
    } catch (error) {
        console.log("Error fetching horario: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const createHorarioController = async (req, res) => {
    try {
        const result = await createHorarioService(req.body);
        res.status(201).json({ 
            message: "Horario creado exitosamente", 
            horarioId: result.insertedId 
        });
    } catch (error) {
        if (error.message.includes("Faltan campos obligatorios") || 
            error.message.includes("Formato") || 
            error.message.includes("inválido")) {
            return res.status(400).json({ message: error.message });
        }
        console.log("Error creating horario: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateHorarioController = async (req, res) => {
    try {
        const result = await updateHorarioService(req.params.id, req.body);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Horario no encontrado" });
        }
        res.json({ message: "Horario actualizado exitosamente" });
    } catch (error) {
        if (error.message === "Horario no encontrado") {
            return res.status(404).json({ message: error.message });
        }
        console.log("Error updating horario: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateDisponibilidadController = async (req, res) => {
    try {
        const { disponible } = req.body;
        if (disponible === undefined) {
            return res.status(400).json({ message: "El campo 'disponible' es requerido" });
        }
        
        const result = await updateDisponibilidadService(req.params.id, disponible);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Horario no encontrado" });
        }
        res.json({ message: "Disponibilidad actualizada exitosamente" });
    } catch (error) {
        if (error.message === "Horario no encontrado") {
            return res.status(404).json({ message: error.message });
        }
        console.log("Error updating disponibilidad: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteHorarioController = async (req, res) => {
    try {
        const result = await deleteHorarioService(req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Horario no encontrado" });
        }
        res.json({ message: "Horario eliminado exitosamente" });
    } catch (error) {
        if (error.message === "Horario no encontrado") {
            return res.status(404).json({ message: error.message });
        }
        console.log("Error deleting horario: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
