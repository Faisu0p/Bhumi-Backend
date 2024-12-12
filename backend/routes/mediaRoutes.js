// import express from "express";
// import * as mediaController from "../controllers/mediaController.js";

// const router = express.Router();

// // Media routes
// router.post("/", mediaController.createMedia); // Create a new media record
// router.get("/:id", mediaController.getMedia); // Get a specific media record by ID
// router.put("/:id", mediaController.updateMedia); // Update a media record by ID
// router.delete("/:id", mediaController.deleteMedia); // Delete a media record by ID
// router.get("/", mediaController.getAllMedia); // Get all media records
// router.post("/:id/upload", mediaController.uploadMediaFile); // Upload a media file and update its URL

// // Error handling middleware
// router.use((err, req, res, next) => {
//   console.error(err.stack); // Logs the error stack
//   res
//     .status(500)
//     .json({ error: "Internal server error. Please try again later." });
// });

// export default router;
