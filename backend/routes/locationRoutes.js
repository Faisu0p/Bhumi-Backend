import express from 'express';
import {addStateController, addCityController, 
  getStatesController, addLocalityController, 
  getCitiesController, addSubLocalityController, 
  addPincodeController, getLocalitiesController} from '../controllers/locationController.js';

const router = express.Router();

// Route for adding a state
router.post('/add-state', addStateController);

// Route for adding a city
router.post('/add-city', addCityController);

// Route for adding a locality
router.post('/add-locality', addLocalityController);

// Route for adding a sublocality
router.post('/add-sublocality', addSubLocalityController);

// Route for adding a pincode
router.post('/add-pincode', addPincodeController);

// Route for fetching all states
router.get('/states', getStatesController);

// Route for getting all cities
router.get('/cities', getCitiesController);

// Route for getting all localities
router.get('/localities', getLocalitiesController);


export default router;
