import express from 'express';
import { 
  addLocation, 
  getStatesController, 
  getCitiesByStateController, 
  getLocalitiesByCityController, 
  getSublocalitiesByLocalityController, 
  getPincodesByLocalityController 
} from '../controllers/locationController.js';

const router = express.Router();

// Route to add a location (state, city, locality, sublocality, pincode)
router.post('/add', addLocation);  // POST request for adding locations

// Route to get states
router.get('/states', getStatesController);  // GET request for fetching states

// Route to get cities by stateId
router.get('/cities', getCitiesByStateController);  // GET request for fetching cities by stateId

// Route to get localities by cityId
router.get('/localities', getLocalitiesByCityController);  // GET request for fetching localities by cityId

// Route to get sublocalities by localityId
router.get('/sublocalities', getSublocalitiesByLocalityController);  // GET request for fetching sublocalities by localityId

// Route to get pincodes by localityId
router.get('/pincodes', getPincodesByLocalityController);  // GET request for fetching pincodes by localityId

export default router;
