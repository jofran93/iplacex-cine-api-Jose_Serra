import { ObjectId } from "mongodb";
import { db } from "../common/db.js";

const peliculaCollection = () => db.collection("peliculas");

export async function handleInsertPeliculaRequest(req, res) {
  try {
    const nuevaPelicula = req.body;
    peliculaCollection()
      .insertOne(nuevaPelicula)
      .then(result => res.status(201).json(result))
      .catch(err => res.status(500).json({ error: err.message }));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleGetPeliculasRequest(req, res) {
  peliculaCollection()
    .find()
    .toArray()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
}

export async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    peliculaCollection()
      .findOne({ _id: id })
      .then(result => {
        if (!result) return res.status(404).json({ error: "Película no encontrada" });
        res.status(200).json(result);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    peliculaCollection()
      .updateOne({ _id: id }, { $set: req.body })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}

export async function handleDeletePeliculaByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    peliculaCollection()
      .deleteOne({ _id: id })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}
