import express from "express";
import {
  createProjectController,
  getProjectByIdController,
  getAllProjectsController,
  updateProjectController,
  deleteProjectController,
} from "../controllers/projectController.js"; // Replace with the correct path to your controller file

const router = express.Router();

// Route to create a new project
router.post("/", createProjectController);

// Route to get a project by ID
router.get("/:id", getProjectByIdController);

// Route to get all projects
router.get("/", getAllProjectsController);

// Route to update a project
router.put("/:id", updateProjectController);

// Route to delete a project
router.delete("/:id", deleteProjectController);

export default router;

// import express from "express";
// import * as projectController from "../controllers/projectController.js";

// const router = express.Router();

// // Project routes
// router.post("/", projectController.createProject); // Create a new project
// router.get("/:id", projectController.getProject); // Get a specific project by ID
// router.put("/:id", projectController.updateProject); // Update a project by ID
// router.delete("/:id", projectController.deleteProject); // Delete a project by ID
// router.get("/", projectController.getAllProjects); // Get all projects

// // Catch-all Error Handling
// router.use((err, req, res, next) => {
//   console.error(err.stack); // Logs error stack
//   res
//     .status(500)
//     .json({ error: "Internal server error. Please try again later." });
// });

// export default router;
