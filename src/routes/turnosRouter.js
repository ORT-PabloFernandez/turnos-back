import express from "express";
import { 
    getAllTurnos, 
    getTurnoById, 
    getTurnosByUsuario,
    reservarTurnoController, 
    cancelarTurnoController,
    updateTurnoController 
} from "../controllers/turnosController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.get("/", getAllTurnos);
router.get("/:id", getTurnoById);
router.get("/usuario/:usuarioId", getTurnosByUsuario);

// Rutas protegidas (requieren autenticación)
router.post("/", authMiddleware, reservarTurnoController);
router.put("/:id", authMiddleware, updateTurnoController);
router.delete("/:id", authMiddleware, cancelarTurnoController);

export default router;
