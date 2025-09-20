import express from "express";
import cors from "cors";
import { connectDB } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ruta por defecto
app.get("/", (req, res) => {
  res.status(200).send("Bienvenido al cine Iplacex");
});

// Middleware de rutas personalizadas
app.use("/api", peliculaRoutes);
app.use("/api", actorRoutes);

// Conectar DB y levantar servidor
connectDB().then((ok) => {
  if (ok) {
    app.listen(PORT, () => {
      console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
    });
  } else {
    console.log("⚠️ No se pudo iniciar el servidor porque falló la conexión a la BD.");
  }
});
