import express from "express";
import { 
    getAllHorarios, 
    getHorarioById, 
    createHorarioController, 
    updateHorarioController,
    updateDisponibilidadController,
    deleteHorarioController 
} from "../controllers/horariosController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.get("/", getAllHorarios);
router.get("/:id", getHorarioById);

// Rutas protegidas (requieren autenticación)
router.post("/", authMiddleware, createHorarioController);
router.put("/:id", authMiddleware, updateHorarioController);
router.patch("/:id/disponibilidad", authMiddleware, updateDisponibilidadController);
router.delete("/:id", authMiddleware, deleteHorarioController);

export default router;
