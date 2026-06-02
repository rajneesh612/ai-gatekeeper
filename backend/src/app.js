import express from "express";
import cors from "cors";

import fileRoutes from "./routes/fileRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/files", fileRoutes);

export default app;