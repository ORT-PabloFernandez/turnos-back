import express from "express";
import { 
    getAllProfesionales, 
    getProfesionalById, 
    createProfesionalController, 
    updateProfesionalController, 
    deleteProfesionalController 
} from "../controllers/profesionalesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.get("/", getAllProfesionales);
router.get("/:id", getProfesionalById);

// Rutas protegidas (requieren autenticación)
router.post("/", authMiddleware, createProfesionalController);
router.put("/:id", authMiddleware, updateProfesionalController);
router.delete("/:id", authMiddleware, deleteProfesionalController);

export default router;
