// import express from "express";
// import * as bedroomController from "../controllers/bedroomController.js";

// const router = express.Router();

// // Bedroom routes
// router.post("/:projectId/bedrooms", bedroomController.createBedroom); // Add a new bedroom to a project
// router.get("/:projectId/bedrooms", bedroomController.getBedroomsByProjectId); // Get all bedrooms for a specific project
// router.get("/bedrooms/:id", bedroomController.getBedroomById); // Get details of a specific bedroom by ID
// router.put("/bedrooms/:id", bedroomController.updateBedroom); // Update a specific bedroom by ID
// router.delete("/bedrooms/:id", bedroomController.deleteBedroom); // Delete a specific bedroom by ID
// router.get("/bedrooms", bedroomController.getAllBedrooms); // Get all bedrooms

// // Catch-all Error Handling
// router.use((err, req, res, next) => {
//   console.error(err.stack); // Logs error stack
//   res
//     .status(500)
//     .json({ error: "Internal server error. Please try again later." });
// });

// export default router;
