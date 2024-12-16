import { addProject, addPhase, addUnit, addUnitDetail } from '../models/projectModel.js';

// Controller to handle form submission
export const submitProject = async (req, res) => {
  try {
    const { projectDetails, phases, units } = req.body;

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

    // Add units to the database
    for (let phase of phases) {
      const phaseId = phase.Phase_id;
      const phaseUnits = units.filter(unit => unit.Phase_id === phaseId);
      
      for (let unit of phaseUnits) {
        const unitResponse = await addUnit(phaseId, unit);
        if (!unitResponse.success) {
          return res.status(500).json({ success: false, message: 'Failed to add unit' });
        }

        // Extract unitId from the response
        const unitId = unitResponse.unitId;

        // Add unit details
        for (let unitDetail of unit.unitDetails) {
          const unitDetailResponse = await addUnitDetail(unitId, unitDetail);
          if (!unitDetailResponse.success) {
            return res.status(500).json({ success: false, message: 'Failed to add unit detail' });
          }
        }
      }
    }

    res.status(200).json({ success: true, message: 'Project submitted successfully!' });
  } catch (error) {
    console.error('Error submitting project:', error.message);
    res.status(500).json({ success: false, message: 'Error submitting project data' });
  }
};

// Controller to fetch all property details
// export const fetchAllProjects = async (req, res) => {
//   try {
//     const result = await getAllProjects();

//     if (result.success) {
//       return res.status(200).json(result);
//     } else {
//       return res.status(404).json(result);
//     }
//   } catch (error) {
//     console.error('Error fetching all projects:', error);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// };
