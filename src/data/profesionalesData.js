import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "profesionales";

export const getAllProfesionales = async () => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).find({}).toArray();
};

export const getProfesionalById = async (id) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
};

export const createProfesional = async (profesional) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).insertOne(profesional);
};

export const updateProfesional = async (id, profesional) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).updateOne(
        { _id: new ObjectId(id) },
        { $set: profesional }
    );
};

export const deleteProfesional = async (id) => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
};
