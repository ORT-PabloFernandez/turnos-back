import { getDb } from "./connection.js";

const COLLECTION_NAME = "especialidades";

export const getAllEspecialidades = async () => {
    const db = getDb();
    return await db.collection(COLLECTION_NAME).find({}).toArray();
};