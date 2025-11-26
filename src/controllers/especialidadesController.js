import { 
    getEspecialidades 
} from "../services/especialidadesService.js";

export const getAllEspecialidades = async (req, res) => {
    try {
        const especialidades = await getEspecialidades();
        res.json(especialidades);
    } catch (error) {
        console.log("Error fetching especialidades: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};