import express from 'express';
import { addBuilder, fetchBuilders, verifyBuilder, getAllBuildersDetails } from '../controllers/builderController.js';

const router = express.Router();


// Route to add a new builder
router.post('/', addBuilder);

//Route to get Builder id and names
router.get('/names_id', fetchBuilders);

// Route to verify a builder by their ID
router.post('/verifyByid', verifyBuilder);

// Route to fetch all builders' information
router.get('/details', getAllBuildersDetails);


export default router;
