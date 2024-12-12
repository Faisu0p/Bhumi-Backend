// builderRoutes.js
import express from 'express';
import { getBuilders, getBuilder, addBuilder } from '../controllers/builderController.js';

const router = express.Router();

router.get('/', getBuilders);
router.get('/:id', getBuilder);
router.post('/', addBuilder);

export default router;

// import express from "express";
// import * as builderController from "../controllers/builderController.js";

// const router = express.Router();

// // Builder routes
// router.post("/", builderController.createBuilder); // Create a new builder
// router.get("/:id", builderController.getBuilder); // Get a specific builder by ID
// router.put("/:id", builderController.updateBuilder); // Update a builder by ID
// router.delete("/:id", builderController.deleteBuilder); // Delete a builder by ID
// router.get("/", builderController.getAllBuilders); // Get all builders

// // Projects by builder routes
// // router.post("/:id/projects", builderController.createProjectForBuilder); // Add a project to a builder

// // // Media routes for builder
// // router.post("/:id/media", builderController.createBuilderMedia); // Add media to a builder

// // // Additional info routes for builder
// // router.post("/:id/additional-info", builderController.addAdditionalInfo); // Add additional information for a builder

// // Catch-all Error Handling
// router.use((err, req, res, next) => {
//   console.error(err.stack); // Logs error stack
//   res
//     .status(500)
//     .json({ error: "Internal server error. Please try again later." });
// });
// export default router;
