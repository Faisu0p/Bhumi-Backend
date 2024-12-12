import axios from "axios";

const BASE_URL = "http://localhost:8021/api/builders"; // Ensure the URL matches your backend

// Create a new builder
export const createBuilder = async (builderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/`, builderData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get a specific builder by ID
export const getBuilderById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get all builders
export const getAllBuilders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Handle errors
const handleError = (error) => {
  console.error("API call failed:", error.response?.data || error.message);
  throw error.response?.data || error.message;
};

// import axios from "axios";

// const BASE_URL = "http://localhost:8021/api/builders"; // Ensure the URL matches your backend

// // Create a new builder
// export const createBuilder = async (builderData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/`, builderData);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// // Handle errors
// const handleError = (error) => {
//   console.error("API call failed:", error.response?.data || error.message);
//   throw error.response?.data || error.message;
// };
