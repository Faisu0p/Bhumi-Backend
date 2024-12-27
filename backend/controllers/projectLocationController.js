import { 
    getStates, 
    getCitiesByState, 
    getLocalitiesByCity, 
    getSublocalitiesByLocality, 
    getPincodesByLocality 
  } from '../models/projectLocationModel.js';
  
  // Controller to get all states
  export const getStatesController = async (req, res) => {
    try {
      const states = await getStates();
      res.status(200).json(states);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch states' });
    }
  };
  
  // Controller to get cities by state
  export const getCitiesByStateController = async (req, res) => {
    const { stateId } = req.params;
    try {
      const cities = await getCitiesByState(stateId);
      res.status(200).json(cities);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch cities' });
    }
  };
  
  // Controller to get localities by city
  export const getLocalitiesByCityController = async (req, res) => {
    const { cityId } = req.params;
    try {
      const localities = await getLocalitiesByCity(cityId);
      res.status(200).json(localities);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch localities' });
    }
  };
  
  // Controller to get sublocalities by locality
  export const getSublocalitiesByLocalityController = async (req, res) => {
    const { localityId } = req.params;
    try {
      const sublocalities = await getSublocalitiesByLocality(localityId);
      res.status(200).json(sublocalities);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch sublocalities' });
    }
  };
  
// Controller to get pincodes by locality
export const getPincodesByLocalityController = async (req, res) => {
  const { localityId } = req.params;  // Extract localityId from the URL parameters
  try {
    const pincodes = await getPincodesByLocality(localityId);  // Call the model function
    res.status(200).json(pincodes);  // Send the pincodes in the response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pincodes' });  // Handle any errors
  }
};

  