import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "horarios";

export const getAllHorarios = async () => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).find({}).toArray();
};

export const getHorarioById = async (id) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
};

export const getHorariosByProfesional = async (profesionalId) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).find({ profesionalId }).toArray();
};

export const getHorariosDisponibles = async (profesionalId = null, fecha = null) => {
    const db = getDb();
    const filter = { disponible: true };
    
    if (profesionalId) {
        filter.profesionalId = profesionalId;
    }
    
    if (fecha) {
        filter.fecha = fecha;
    }
    
    return await db.collection(COLLECTION_NAME).find(filter).toArray();
};

export const createHorario = async (horario) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).insertOne(horario);
};

export const updateHorario = async (id, horario) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).updateOne(
        { _id: new ObjectId(id) },
        { $set: horario }
    );
};

export const updateHorarioDisponibilidad = async (id, disponible) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).updateOne(
        { _id: new ObjectId(id) },
        { $set: { disponible } }
    );
};

export const deleteHorario = async (id) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
};
