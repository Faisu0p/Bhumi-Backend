import { 
  addState, 
  addCity, 
  addLocality, 
  addSublocality, 
  addPincode, 
  getStates, 
  getCitiesByState, 
  getLocalitiesByCity, 
  getSublocalitiesByLocality, 
  getPincodesByLocality 
} from '../models/locationModel.js';

// Controller to add a location (state, city, locality, sublocality, pincode)
export const addLocation = async (req, res) => {
  const { type, name, parentId } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    let result;

    // Insert into the appropriate table based on location type
    switch (type) {
      case 'state':
        result = await addState(name);
        break;

      case 'city':
        if (!parentId) {
          return res.status(400).json({ message: 'State ID is required for city' });
        }
        result = await addCity(name, parentId);
        break;

      case 'locality':
        if (!parentId) {
          return res.status(400).json({ message: 'City ID is required for locality' });
        }
        result = await addLocality(name, parentId);
        break;

      case 'sublocality':
        if (!parentId) {
          return res.status(400).json({ message: 'Locality ID is required for sublocality' });
        }
        result = await addSublocality(name, parentId);
        break;

      case 'pincode':
        if (!parentId) {
          return res.status(400).json({ message: 'Locality ID is required for pincode' });
        }
        result = await addPincode(name, parentId);
        break;

      default:
        return res.status(400).json({ message: 'Invalid location type' });
    }

    // Return the response with the message and ID dynamically
    return res.status(200).json({
      message: result.message,
      id: result[`${type}Id`] // Dynamically get the ID based on the location type
    });

  } catch (err) {
    console.error('Error adding location:', err.message);
    return res.status(500).json({ message: 'An error occurred while adding the location', error: err.message });
  }
};

// Fetch All States
export const getStatesController = async (req, res) => {
  try {
    const states = await getStates();  // Fetch all states
    return res.status(200).json(states);  // Return states data
  } catch (err) {
    console.error('Error fetching states:', err.message);
    return res.status(500).json({ message: 'Failed to fetch states', error: err.message });
  }
};

// Fetch Cities by State
export const getCitiesByStateController = async (req, res) => {
  const { stateId } = req.query;

  if (!stateId) {
    return res.status(400).json({ message: 'State ID is required to fetch cities' });
  }

  try {
    const cities = await getCitiesByState(stateId);  // Fetch cities by stateId
    return res.status(200).json(cities);  // Return cities data
  } catch (err) {
    console.error('Error fetching cities:', err.message);
    return res.status(500).json({ message: 'Failed to fetch cities', error: err.message });
  }
};

// Fetch Localities by City
export const getLocalitiesByCityController = async (req, res) => {
  const { cityId } = req.query;

  if (!cityId) {
    return res.status(400).json({ message: 'City ID is required to fetch localities' });
  }

  try {
    const localities = await getLocalitiesByCity(cityId);  // Fetch localities by cityId
    return res.status(200).json(localities);  // Return localities data
  } catch (err) {
    console.error('Error fetching localities:', err.message);
    return res.status(500).json({ message: 'Failed to fetch localities', error: err.message });
  }
};

// Fetch Sublocalities by Locality
export const getSublocalitiesByLocalityController = async (req, res) => {
  const { localityId } = req.query;

  if (!localityId) {
    return res.status(400).json({ message: 'Locality ID is required to fetch sublocalities' });
  }

  try {
    const sublocalities = await getSublocalitiesByLocality(localityId);  // Fetch sublocalities by localityId
    return res.status(200).json(sublocalities);  // Return sublocalities data
  } catch (err) {
    console.error('Error fetching sublocalities:', err.message);
    return res.status(500).json({ message: 'Failed to fetch sublocalities', error: err.message });
  }
};

// Fetch Pincodes by Locality
export const getPincodesByLocalityController = async (req, res) => {
  const { localityId } = req.query;

  if (!localityId) {
    return res.status(400).json({ message: 'Locality ID is required to fetch pincodes' });
  }

  try {
    const pincodes = await getPincodesByLocality(localityId);  // Fetch pincodes by localityId
    return res.status(200).json(pincodes);  // Return pincodes data
  } catch (err) {
    console.error('Error fetching pincodes:', err.message);
    return res.status(500).json({ message: 'Failed to fetch pincodes', error: err.message });
  }
};
