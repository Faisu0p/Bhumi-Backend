// builderController.js
import { getAllBuilders, getBuilderById, createBuilder } from '../models/builderModel.js';

export const getBuilders = async (req, res) => {
  try {
    const builders = await getAllBuilders();
    res.status(200).json(builders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching builders', error });
  }
};

export const getBuilder = async (req, res) => {
  const { id } = req.params;
  try {
    const builder = await getBuilderById(id);
    if (builder) {
      res.status(200).json(builder);
    } else {
      res.status(404).json({ message: 'Builder not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching builder', error });
  }
};

export const addBuilder = async (req, res) => {
  const builderData = req.body;
  try {
    const result = await createBuilder(builderData);
    if (result > 0) {
      res.status(201).json({ message: 'Builder added successfully' });
    } else {
      res.status(400).json({ message: 'Failed to add builder' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding builder', error });
  }
};

// import * as builderModel from "../models/builderModel.js";

// // Utility function to validate string inputs
// function validateString(param, paramName) {
//   if (typeof param !== "string" || !param.trim()) {
//     throw new Error(`${paramName} must be a non-empty string`);
//   }
//   return param;
// }

// // Utility function to sanitize and validate URLs
// function sanitizeUrl(url) {
//   if (typeof url !== "string" || !url.trim()) {
//     throw new Error("URL must be a non-empty string");
//   }
//   return encodeURIComponent(url);
// }

// // Create a new builder
// export async function createBuilder(req, res) {
//   try {
//     const { builderLogo, ...builderData } = req.body;

//     if (builderLogo) {
//       builderData.builderLogo = sanitizeUrl(builderLogo);
//     }

//     // Validate necessary string fields in builderData (e.g., name)
//     if (builderData.builderCompleteName) {
//       builderData.builderCompleteName = validateString(
//         builderData.builderCompleteName,
//         "Builder Complete Name"
//       );
//     }
//     if (builderData.builderShortName) {
//       builderData.builderShortName = validateString(
//         builderData.builderShortName,
//         "Builder Short Name"
//       );
//     }

//     const builderId = await builderModel.createBuilder(builderData);

//     res.status(201).json({
//       id: builderId,
//       message: "Builder created successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating builder",
//       error: error.message,
//     });
//   }
// }

// // Retrieve a builder by ID
// export async function getBuilder(req, res) {
//   try {
//     const builderId = validateString(req.params.id, "Builder ID");
//     const builder = await builderModel.getBuilderById(builderId);

//     if (builder) {
//       res.json(builder);
//     } else {
//       res.status(404).json({ message: "Builder not found" });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving builder",
//       error: error.message,
//     });
//   }
// }

// // Update a builder
// export async function updateBuilder(req, res) {
//   try {
//     const builderId = validateString(req.params.id, "Builder ID");
//     const { builderLogo, ...builderData } = req.body;

//     if (builderLogo) {
//       builderData.builderLogo = sanitizeUrl(builderLogo);
//     }

//     await builderModel.updateBuilder(builderId, builderData);
//     res.json({ message: "Builder updated successfully" });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating builder",
//       error: error.message,
//     });
//   }
// }

// // Delete a builder
// export async function deleteBuilder(req, res) {
//   try {
//     const builderId = validateString(req.params.id, "Builder ID");
//     await builderModel.deleteBuilder(builderId);
//     res.json({ message: "Builder deleted successfully" });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error deleting builder",
//       error: error.message,
//     });
//   }
// }

// // Retrieve all builders
// export async function getAllBuilders(req, res) {
//   try {
//     const builders = await builderModel.getAllBuilders();
//     res.json(builders);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving builders",
//       error: error.message,
//     });
//   }
// }

// // Upload builder logo to Azure Blob Storage and save its URL
// export async function uploadBuilderLogo(req, res) {
//   try {
//     const builderId = validateString(req.params.id, "Builder ID");

//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ message: "No logo file uploaded" });
//     }

//     const logoUrl = await builderModel.uploadBuilderLogoToAzure(
//       req.file.path, // Path to the uploaded file
//       `builder-logos/${builderId}` // Target folder in Azure
//     );

//     await builderModel.updateBuilder(builderId, { builderLogo: logoUrl });

//     res.json({
//       logoUrl,
//       message: "Builder logo uploaded and updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error uploading builder logo",
//       error: error.message,
//     });
//   }
// }
