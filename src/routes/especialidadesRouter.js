import express from "express";
import { 
    getAllEspecialidades,
} from "../controllers/especialidadesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.get("/", getAllEspecialidades);

export default router;
