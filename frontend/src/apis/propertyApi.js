import axios from "axios";

// Base URL of the API
const API_BASE_URL = "http://localhost:8021/api/projects"; // Replace with your actual API URL

/**
 * Get all projects
 * @returns {Promise} List of projects
 */
export const getAllProjects = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

/**
 * Get a project by ID
 * @param {number} id - Project ID
 * @returns {Promise} Project data
 */
export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new project
 * @param {object} projectData - Data for the new project
 * @returns {Promise} Created project ID
 */
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_BASE_URL, projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

/**
 * Update a project by ID
 * @param {number} id - Project ID
 * @param {object} projectData - Updated project data
 * @returns {Promise} Success message
 */
export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a project by ID
 * @param {number} id - Project ID
 * @returns {Promise} Success message
 */
export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
};
