import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/dbconfig.js";
import projectRoutes from "./routes/projectRoutes.js";
import builderRoutes from './routes/builderRoutes.js';
import locationRoutes from './routes/locationRoutes.js';

dotenv.config();

// Connect to database
connectToDatabase();

const app = express();
const PORT = process.env.PORT || 8021;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/builders", builderRoutes);
app.use("/api/locations", locationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
