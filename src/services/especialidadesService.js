import { 
    getAllEspecialidades,
} from "../data/especialidadesData.js";

export const getEspecialidades = async () => {
    return await getAllEspecialidades();
};