// import * as bedroomModel from "../models/Depricated-bedroomModel.js";

// // Utility function to validate string inputs
// function validateString(param, paramName) {
//   if (typeof param !== "string" || !param.trim()) {
//     throw new Error(`${paramName} must be a non-empty string`);
//   }
//   return param;
// }

// // Utility function to validate numeric inputs
// function validateNumber(param, paramName) {
//   if (typeof param !== "number" || isNaN(param)) {
//     throw new Error(`${paramName} must be a valid number`);
//   }
//   return param;
// }

// // Create a new bedroom
// export async function createBedroom(req, res) {
//   try {
//     const projectId = validateString(req.params.projectId, "Project ID");
//     const bedroomData = {
//       projectId,
//       ...req.body,
//     };

//     // Validate mandatory fields
//     validateString(bedroomData.size, "Bedroom size");

//     const bedroomId = await bedroomModel.createBedroom(bedroomData);

//     res.status(201).json({
//       id: bedroomId,
//       message: "Bedroom created successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating bedroom",
//       error: error.message,
//     });
//   }
// }

// // Get a bedroom by ID
// export async function getBedroomById(req, res) {
//   try {
//     const bedroomId = validateString(req.params.id, "Bedroom ID");
//     const bedroom = await bedroomModel.getBedroomById(bedroomId);

//     if (bedroom) {
//       res.json(bedroom);
//     } else {
//       res.status(404).json({ message: "Bedroom not found" });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving bedroom",
//       error: error.message,
//     });
//   }
// }

// // Update a bedroom
// export async function updateBedroom(req, res) {
//   try {
//     const bedroomId = validateString(req.params.id, "Bedroom ID");
//     const bedroomData = req.body;

//     await bedroomModel.updateBedroom(bedroomId, bedroomData);

//     res.json({ message: "Bedroom updated successfully" });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating bedroom",
//       error: error.message,
//     });
//   }
// }

// // Delete a bedroom
// export async function deleteBedroom(req, res) {
//   try {
//     const bedroomId = validateString(req.params.id, "Bedroom ID");

//     await bedroomModel.deleteBedroom(bedroomId);

//     res.json({ message: "Bedroom deleted successfully" });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error deleting bedroom",
//       error: error.message,
//     });
//   }
// }

// // Get all bedrooms for a specific project
// export async function getBedroomsByProjectId(req, res) {
//   try {
//     const projectId = validateString(req.params.projectId, "Project ID");

//     const bedrooms = await bedroomModel.getBedroomsByProjectId(projectId);

//     res.json(bedrooms);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving bedrooms",
//       error: error.message,
//     });
//   }
// }

// // Get all bedrooms
// export async function getAllBedrooms(req, res) {
//   try {
//     const bedrooms = await bedroomModel.getAllBedrooms();

//     res.json(bedrooms);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving bedrooms",
//       error: error.message,
//     });
//   }
// }
