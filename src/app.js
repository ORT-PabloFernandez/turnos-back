import express from "express";
import morgan from "morgan";
import cors from "cors";

// Rutas existentes
import userRoutes from "./routes/userRoute.js";
import listingsRoutes from "./routes/listingsRouter.js";

// Nuevas rutas para el sistema de turnos
import profesionalesRoutes from "./routes/profesionalesRouter.js";
import horariosRoutes from "./routes/horariosRouter.js";
import turnosRoutes from "./routes/turnosRouter.js";
import especialidadesRoutes from "./routes/especialidadesRouter.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Rutas existentes
app.use("/api/users", userRoutes);
app.use("/api/listings", listingsRoutes);

// Nuevas rutas para el sistema de turnos
app.use("/api/profesionales", profesionalesRoutes);
app.use("/api/horarios", horariosRoutes);
app.use("/api/turnos", turnosRoutes);
app.use("/api/especialidades", especialidadesRoutes);

// Ruta base
app.get("/", (req, res) => {
    res.json({
        message: "API Sistema de Turnos Médicos - 2025",
        endpoints: {
            profesionales: "/api/profesionales",
            horarios: "/api/horarios", 
            turnos: "/api/turnos",
            users: "/api/users",
            listings: "/api/listings",
            especialidades: "/api/especialidades"
        }
    });
});

export default app;