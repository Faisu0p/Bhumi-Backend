// import {
//   createPhase,
//   getPhaseById,
//   getPhasesByProjectId,
//   getAllPhases,
//   updatePhase,
//   deletePhase,
// } from "../models/phasesModel.js";

// export const createPhaseHandler = async (req, res) => {
//   try {
//     const phaseData = req.body;

//     const newPhaseId = await createPhase(phaseData);
//     res
//       .status(201)
//       .json({ message: "Phase created successfully", id: newPhaseId });
//   } catch (error) {
//     console.error("Error creating phase:", error.message);
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getPhaseByIdHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const phase = await getPhaseById(id);
//     if (!phase) {
//       return res.status(404).json({ error: "Phase not found" });
//     }
//     res.status(200).json(phase);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getPhasesByProjectIdHandler = async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const phases = await getPhasesByProjectId(projectId);
//     res.status(200).json(phases);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getAllPhasesHandler = async (req, res) => {
//   try {
//     const phases = await getAllPhases();
//     res.status(200).json(phases);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const updatePhaseHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const phaseData = req.body;
//     await updatePhase(id, phaseData);
//     res.status(200).json({ message: "Phase updated successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const deletePhaseHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await deletePhase(id);
//     res.status(200).json({ message: "Phase deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
