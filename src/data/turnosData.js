import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "turnos";

export const getAllTurnos = async () => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).find({}).toArray();
};

export const getTurnoById = async (id) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
};

export const getTurnosByUsuario = async (usuarioId) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).find({ "usuario.id": usuarioId }).toArray();
};

export const getTurnosByProfesional = async (profesionalId) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).find({ profesionalId }).toArray();
};

export const getTurnoByHorarioId = async (horarioId) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).findOne({ horarioId });
};

export const createTurno = async (turno) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).insertOne(turno);
};

export const updateTurno = async (id, turno) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).updateOne(
        { _id: new ObjectId(id) },
        { $set: turno }
    );
};

export const deleteTurno = async (id) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
};

export const deleteTurnoByHorarioId = async (horarioId) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).deleteOne({ horarioId });
};
