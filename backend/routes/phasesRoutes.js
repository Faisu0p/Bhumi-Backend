// import express from "express";
// import {
//   createPhaseHandler,
//   getPhaseByIdHandler,
//   getPhasesByProjectIdHandler,
//   getAllPhasesHandler,
//   updatePhaseHandler,
//   deletePhaseHandler,
// } from "../controllers/phasesController.js";

// const router = express.Router();

// // Create a new phase
// router.post("/", createPhaseHandler);

// // Retrieve a phase by ID
// router.get("/:id", getPhaseByIdHandler);

// // Retrieve all phases for a specific project
// router.get("/project/:projectId", getPhasesByProjectIdHandler);

// // Retrieve all phases
// router.get("/", getAllPhasesHandler);

// // Update a phase
// router.put("/:id", updatePhaseHandler);

// // Delete a phase
// router.delete("/:id", deletePhaseHandler);

// export default router;

// // import express from "express";
// // import * as phaseController from "../controllers/phasesController.js";

// // const router = express.Router();

// // // Phase routes
// // router.post("/", phaseController.createPhase); // Create a new phase for a project
// // router.get("/:id", phaseController.getPhase); // Get a specific phase by ID
// // router.put("/:id", phaseController.updatePhase); // Update a phase by ID
// // router.delete("/:id", phaseController.deletePhase); // Delete a phase by ID
// // router.get("/project/:projectId", phaseController.getPhasesByProject); // Get all phases for a specific project
// // router.get("/", phaseController.getAllPhases); // Get all phases

// // // Catch-all Error Handling
// // router.use((err, req, res, next) => {
// //   console.error(err.stack); // Logs error stack
// //   res
// //     .status(500)
// //     .json({ error: "Internal server error. Please try again later." });
// // });

// // export default router;
