import {
  getTurnos,
  getTurno,
  reservarTurnoService,
  cancelarTurnoService,
  updateTurnoService,
} from "../services/turnosService.js";

export const getAllTurnos = async (req, res) => {
  try {
    const { usuarioId, profesionalId } = req.query;
    const turnos = await getTurnos(
      usuarioId ? parseInt(usuarioId) : null,
      profesionalId ? parseInt(profesionalId) : null
    );
    res.json(turnos);
  } catch (error) {
    console.log("Error fetching turnos: ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTurnoById = async (req, res) => {
  try {
    const turno = await getTurno(req.params.id);
    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    res.json(turno);
  } catch (error) {
    console.log("Error fetching turno: ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTurnosByUsuario = async (req, res) => {
  try {
    const turnos = await getTurnos(parseInt(req.params.usuarioId));
    res.json(turnos);
  } catch (error) {
    console.log("Error fetching turnos by usuario: ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const reservarTurnoController = async (req, res) => {
  try {
    const result = await reservarTurnoService(req.body);

    // Obtener el turno recién creado para devolverlo completo
    const nuevoTurno = await getTurno(result.insertedId);

    res.status(201).json({
      message: "Turno reservado exitosamente",
      turno: nuevoTurno,
    });
  } catch (error) {
    if (
      error.message.includes("Faltan campos obligatorios") ||
      error.message.includes("Datos de usuario incompletos") ||
      error.message === "Este horario ya está ocupado"
    ) {
      return res.status(400).json({ message: error.message });
    }
    console.log("Error reserving turno: ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const cancelarTurnoController = async (req, res) => {
  try {
    const result = await cancelarTurnoService(req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    res.json({ message: "Turno cancelado exitosamente" });
  } catch (error) {
    if (error.message === "Turno no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    console.log("Error canceling turno: ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateTurnoController = async (req, res) => {
  try {
    const result = await updateTurnoService(req.params.id, req.body);
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    res.json({ message: "Turno actualizado exitosamente" });
  } catch (error) {
    if (error.message === "Turno no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    console.log("Error updating turno: ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
