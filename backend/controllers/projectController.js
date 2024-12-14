import { addProject, addPhase, addResidentialUnit, addCommercialUnit, getAllProjects } from '../models/projectModel.js';

// Controller to handle form submission
export const submitProject = async (req, res) => {
  try {
    const { projectDetails, phases, residentialUnits, commercialUnits } = req.body;

    // Add project to the database
    const projectResponse = await addProject(projectDetails);

    if (!projectResponse.success) {
      return res.status(500).json({ success: false, message: 'Failed to add project' });
    }

    const projectId = projectResponse.projectId; // Extract Project_id

    // Add phases to the database
    for (let phase of phases) {
      await addPhase({ Project_id: projectId, ...phase });
    }

    // Add residential units if applicable
    if (projectDetails.projectType === 'Residential' || projectDetails.projectType === 'Mixed') {
      for (let unit of residentialUnits) {
        await addResidentialUnit(projectId, unit);
      }
    }

    // Add commercial units if applicable
    if (projectDetails.projectType === 'Commercial' || projectDetails.projectType === 'Mixed') {
      for (let unit of commercialUnits) {
        await addCommercialUnit(projectId, unit);
      }
    }

    res.status(200).json({ success: true, message: 'Project submitted successfully!' });
  } catch (error) {
    console.error('Error submitting project:', error.message);
    res.status(500).json({ success: false, message: 'Error submitting project data' });
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
