import { MongoClient } from "mongodb";

const uri = "mongodb+srv://joserra_93:mbP31WL9kexDVmQa@cluster-express.fsusq3e.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express";

const client = new MongoClient(uri);

export const dbName = "cineDB";  

export let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("✅ Conexión exitosa a MongoDB Atlas");
    return true;
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB Atlas:", error);
    return false;
  }
}
