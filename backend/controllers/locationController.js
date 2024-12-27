import {addState, addCity, getStates, 
  addLocality, getCities, addSubLocality, 
  addPincode, getLocalities} from '../models/locationModel.js';

// Controller to add a state
export const addStateController = async (req, res) => {
  const { stateName } = req.body;

  if (!stateName) {
    return res.status(400).json({ error: 'State name is required' });
  }

  try {
    const response = await addState(stateName);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add state' });
  }
};

// Controller to add a city
export const addCityController = async (req, res) => {
  const { cityName, stateId } = req.body;

  if (!cityName || !stateId) {
    return res.status(400).json({ error: 'City name and state ID are required' });
  }

  try {
    const response = await addCity(cityName, stateId);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add city' });
  }
};

// Controller to add a locality
export const addLocalityController = async (req, res) => {
  const { localityName, cityId } = req.body;

  if (!localityName || !cityId) {
    return res.status(400).json({ error: 'Locality name and city ID are required' });
  }

  try {
    const response = await addLocality(localityName, cityId);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add locality' });
  }
};

// Controller to add a sublocality
export const addSubLocalityController = async (req, res) => {
  const { subLocalityName, localityId } = req.body;

  // Validate that both subLocalityName and localityId are provided
  if (!subLocalityName || !localityId) {
    return res.status(400).json({ error: 'Both sublocality name and locality ID are required' });
  }

  try {
    const response = await addSubLocality(subLocalityName, localityId);  // Call the model function to add sublocality
    res.status(201).json(response);  // Send a success response back
  } catch (err) {
    res.status(500).json({ error: 'Failed to add sublocality' });  // Handle any errors
  }
};

// Controller to add a pincode
export const addPincodeController = async (req, res) => {
  const { pincode, localityId } = req.body;

  // Validate that both pincode and localityId are provided
  if (!pincode || !localityId) {
    return res.status(400).json({ error: 'Both pincode and locality ID are required' });
  }

  try {
    const response = await addPincode(pincode, localityId);  // Call the model function to add pincode
    res.status(201).json(response);  // Send a success response back
  } catch (err) {
    res.status(500).json({ error: 'Failed to add pincode' });  // Handle any errors
  }
};

// Controller to fetch all states
export const getStatesController = async (req, res) => {
  try {
    const states = await getStates();
    res.status(200).json(states);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch states' });
  }
};

// Controller to get all cities
export const getCitiesController = async (req, res) => {
  try {
    const cities = await getCities();
    res.status(200).json(cities);  // Sending the list of cities as JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
};

// Controller to get all localities
export const getLocalitiesController = async (req, res) => {
  try {
    const localities = await getLocalities();  // Call the model function to fetch localities
    res.status(200).json(localities);  // Send the list of localities as response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch localities' });  // Handle any errors
  }
};
