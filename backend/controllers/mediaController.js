// import * as mediaModel from "../models/mediaModel.js";

// // Utility function to validate string inputs
// function validateString(param, paramName) {
//   if (typeof param !== "string" || !param.trim()) {
//     throw new Error(`${paramName} must be a non-empty string`);
//   }
//   return param;
// }

// // Utility function to validate and sanitize URLs
// function sanitizeUrl(url) {
//   if (typeof url !== "string" || !url.trim()) {
//     throw new Error("URL must be a non-empty string");
//   }
//   return encodeURIComponent(url);
// }

// // Create a new media record
// export async function createMedia(req, res) {
//   try {
//     const { url, ...mediaData } = req.body;

//     if (url) {
//       mediaData.url = sanitizeUrl(url);
//     }

//     // Validate necessary string fields
//     if (mediaData.type) {
//       mediaData.type = validateString(mediaData.type, "Media Type");
//     }

//     const mediaId = await mediaModel.createMedia(mediaData);

//     res.status(201).json({
//       id: mediaId,
//       message: "Media record created successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating media record",
//       error: error.message,
//     });
//   }
// }

// // Retrieve a media record by ID
// export async function getMedia(req, res) {
//   try {
//     const mediaId = validateString(req.params.id, "Media ID");
//     const media = await mediaModel.getMediaById(mediaId);

//     if (media) {
//       res.json(media);
//     } else {
//       res.status(404).json({ message: "Media record not found" });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving media record",
//       error: error.message,
//     });
//   }
// }

// // Update a media record
// export async function updateMedia(req, res) {
//   try {
//     const mediaId = validateString(req.params.id, "Media ID");
//     const { url, ...mediaData } = req.body;

//     if (url) {
//       mediaData.url = sanitizeUrl(url);
//     }

//     await mediaModel.updateMedia(mediaId, mediaData);
//     res.json({ message: "Media record updated successfully" });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating media record",
//       error: error.message,
//     });
//   }
// }

// // Delete a media record
// export async function deleteMedia(req, res) {
//   try {
//     const mediaId = validateString(req.params.id, "Media ID");
//     await mediaModel.deleteMedia(mediaId);
//     res.json({ message: "Media record deleted successfully" });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error deleting media record",
//       error: error.message,
//     });
//   }
// }

// // Retrieve all media records
// export async function getAllMedia(req, res) {
//   try {
//     const mediaRecords = await mediaModel.getAllMedia();
//     res.json(mediaRecords);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving media records",
//       error: error.message,
//     });
//   }
// }

// // Upload media file to a storage service and save its URL
// export async function uploadMediaFile(req, res) {
//   try {
//     const mediaId = validateString(req.params.id, "Media ID");

//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ message: "No media file uploaded" });
//     }

//     const mediaUrl = await mediaModel.uploadMediaToStorage(
//       req.file.path, // Path to the uploaded file
//       `media/${mediaId}` // Target folder in storage
//     );

//     await mediaModel.updateMedia(mediaId, { url: mediaUrl });

//     res.json({
//       mediaUrl,
//       message: "Media file uploaded and updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error uploading media file",
//       error: error.message,
//     });
//   }
// }
