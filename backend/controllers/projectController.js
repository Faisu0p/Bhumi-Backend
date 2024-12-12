import {
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../models/projectModel.js";
// Controller for creating a new project
export async function createProjectController(req, res) {
  try {
    const projectData = req.body;
    const projectId = await createProject(projectData);

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      projectId,
    });
  } catch (error) {
    console.error("Error creating project:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Controller for fetching a project by ID
export async function getProjectByIdController(req, res) {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Controller for fetching all projects
export async function getAllProjectsController(req, res) {
  try {
    const projects = await getAllProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Controller for updating a project
export async function updateProjectController(req, res) {
  try {
    const { id } = req.params;
    const projectData = req.body;

    await updateProject(id, projectData);

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (error) {
    console.error("Error updating project:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Controller for deleting a project
export async function deleteProjectController(req, res) {
  try {
    const { id } = req.params;

    await deleteProject(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting project:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// import * as projectModel from "../models/projectModel.js";

// // Utility function to sanitize and join URLs
// function sanitizeUrls(urls) {
//   if (!Array.isArray(urls)) {
//     throw new Error("mediaUrls should be an array");
//   }
//   return urls.map((url) => encodeURIComponent(url)).join(", ");
// }

// // Utility function to validate string inputs
// function validateString(param, paramName) {
//   if (typeof param !== "string" || !param.trim()) {
//     throw new Error(`${paramName} must be a non-empty string`);
//   }
//   return param;
// }

// export async function createProject(req, res) {
//   try {
//     const { mediaUrls, ...projectData } = req.body;

//     if (mediaUrls && !Array.isArray(mediaUrls)) {
//       return res.status(400).json({ message: "mediaUrls should be an array" });
//     }

//     const sanitizedMediaUrls = mediaUrls ? sanitizeUrls(mediaUrls) : null;

//     // Validate necessary string fields in projectData (e.g., name)
//     if (projectData.name) {
//       projectData.name = validateString(projectData.name, "Project name");
//     }

//     const projectId = await projectModel.createProject({
//       ...projectData,
//       mediaUrls: sanitizedMediaUrls,
//     });

//     res.status(201).json({
//       id: projectId,
//       message: "Project and media created successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating project",
//       error: error.message,
//     });
//   }
// }

// export async function getProject(req, res) {
//   try {
//     const projectId = validateString(req.params.id, "Project ID");
//     const project = await projectModel.getProjectById(projectId);
//     if (project) {
//       res.json(project);
//     } else {
//       res.status(404).json({ message: "Project not found" });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving project",
//       error: error.message,
//     });
//   }
// }

// export async function updateProject(req, res) {
//   try {
//     const projectId = validateString(req.params.id, "Project ID");
//     await projectModel.updateProject(projectId, req.body);
//     res.json({ message: "Project updated successfully" });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating project",
//       error: error.message,
//     });
//   }
// }

// export async function deleteProject(req, res) {
//   try {
//     const projectId = validateString(req.params.id, "Project ID");
//     await projectModel.deleteProject(projectId);
//     res.json({ message: "Project deleted successfully" });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error deleting project",
//       error: error.message,
//     });
//   }
// }

// export async function getAllProjects(req, res) {
//   try {
//     const projects = await projectModel.getAllProjects();
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error retrieving projects",
//       error: error.message,
//     });
//   }
// }
