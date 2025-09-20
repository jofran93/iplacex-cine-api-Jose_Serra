import { ObjectId } from "mongodb";
import { db } from "../common/db.js";

const actorCollection = () => db.collection("actores");
const peliculaCollection = () => db.collection("peliculas");

export async function handleInsertActorRequest(req, res) {
  try {
    const { idPelicula, nombre, edad, estaRetirado, premios } = req.body;

    peliculaCollection()
      .findOne({ _id: new ObjectId(idPelicula) })
      .then(pelicula => {
        if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });

        actorCollection()
          .insertOne({ idPelicula, nombre, edad, estaRetirado, premios })
          .then(result => res.status(201).json(result))
          .catch(err => res.status(500).json({ error: err.message }));
      })
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}

export async function handleGetActoresRequest(req, res) {
  actorCollection()
    .find()
    .toArray()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
}

export async function handleGetActorByIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    actorCollection()
      .findOne({ _id: id })
      .then(result => {
        if (!result) return res.status(404).json({ error: "Actor no encontrado" });
        res.status(200).json(result);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}

export async function handleGetActoresByPeliculaIdRequest(req, res) {
  try {
    const id = new ObjectId(req.params.pelicula);
    actorCollection()
      .find({ idPelicula: id.toString() })
      .toArray()
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}

export async function handleUpdateActorRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    actorCollection()
      .updateOne({ _id: id }, { $set: req.body })
      .then(result => {
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Actor no encontrado" });
        }
        res.status(200).json({ mensaje: "Actor actualizado correctamente" });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}


export async function handleDeleteActorRequest(req, res) {
  try {
    const id = new ObjectId(req.params.id);
    actorCollection()
      .deleteOne({ _id: id })
      .then(result => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Actor no encontrado" });
        }
        res.status(200).json({ mensaje: "Actor eliminado correctamente" });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: "Id mal formado" });
  }
}
