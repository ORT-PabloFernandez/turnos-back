import { 
    getProfesionales, 
    getProfesional, 
    createProfesionalService, 
    updateProfesionalService, 
    deleteProfesionalService 
} from "../services/profesionalesService.js";

export const getAllProfesionales = async (req, res) => {
    try {
        const profesionales = await getProfesionales();
        res.json(profesionales);
    } catch (error) {
        console.log("Error fetching profesionales: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getProfesionalById = async (req, res) => {
    try {
        const profesional = await getProfesional(req.params.id);
        if (!profesional) {
            return res.status(404).json({ message: "Profesional no encontrado" });
        }
        res.json(profesional);
    } catch (error) {
        console.log("Error fetching profesional: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const createProfesionalController = async (req, res) => {
    try {
        const result = await createProfesionalService(req.body);
        res.status(201).json({ 
            message: "Profesional creado exitosamente", 
            profesionalId: result.insertedId 
        });
    } catch (error) {
        if (error.message.includes("Faltan campos obligatorios")) {
            return res.status(400).json({ message: error.message });
        }
        console.log("Error creating profesional: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateProfesionalController = async (req, res) => {
    try {
        const result = await updateProfesionalService(req.params.id, req.body);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Profesional no encontrado" });
        }
        res.json({ message: "Profesional actualizado exitosamente" });
    } catch (error) {
        if (error.message === "Profesional no encontrado") {
            return res.status(404).json({ message: error.message });
        }
        console.log("Error updating profesional: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteProfesionalController = async (req, res) => {
    try {
        const result = await deleteProfesionalService(req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Profesional no encontrado" });
        }
        res.json({ message: "Profesional eliminado exitosamente" });
    } catch (error) {
        if (error.message === "Profesional no encontrado") {
            return res.status(404).json({ message: error.message });
        }
        console.log("Error deleting profesional: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
