import express from 'express';
import { 
  getStatesController, 
  getCitiesByStateController, 
  getLocalitiesByCityController, 
  getSublocalitiesByLocalityController, 
  getPincodesByLocalityController 
} from '../controllers/projectLocationController.js';

const router = express.Router();

// Route to get all states
router.get('/states', getStatesController);

// Route to get cities by state
router.get('/cities/:stateId', getCitiesByStateController);

// Route to get localities by city
router.get('/localities/:cityId', getLocalitiesByCityController);

// Route to get sublocalities by locality
router.get('/sublocalities/:localityId', getSublocalitiesByLocalityController);

// Route to get pincodes by sublocality
router.get('/pincodes/:localityId', getPincodesByLocalityController);

export default router;
