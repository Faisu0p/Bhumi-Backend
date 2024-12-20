import { addProjectWithPhasesAndUnits, getAllProjects } from '../models/projectModel.js';

// Controller to handle project creation request
export const createProject = async (req, res) => {
  try {
    const projectData = req.body; // Assuming the data is sent in the request body

    // Call the function to add project, phases, units, and unit details
    const result = await addProjectWithPhasesAndUnits(projectData);

    // Return success response
    return res.status(201).json({
      success: true,
      projectId: result.projectId,
      message: result.message,
    });
  } catch (error) {
    // Handle errors and return an error response
    console.error('Error in createProject controller:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while creating the project.',
    });
  }
};


// Controller to fetch all property details
 export const fetchAllProjects = async (req, res) => {
   try {
     const result = await getAllProjects();

     if (result.success) {
       return res.status(200).json(result);
     } else {
       return res.status(404).json(result);
     }
   } catch (error) {
     console.error('Error fetching all projects:', error);
     return res.status(500).json({ success: false, message: 'Server error' });
   }
 };
