import express from 'express';
import { addBuilder, fetchBuilders, 
    verifyBuilder, getAllBuildersDetails, 
    fetchVerifiedBuilders, getBuilderDetails,
    rejectBuilder } 
from '../controllers/builderController.js';

const router = express.Router();


// Route to add a new builder
router.post('/', addBuilder);

//Route to get Builder id and names
router.get('/names_id', fetchBuilders);

// Route to verify a builder by their ID
router.post('/verifyByid', verifyBuilder);

// Route to reject a builder by their ID
router.post('/rejectByid', rejectBuilder);

// Route to fetch all builders' information
router.get('/details', getAllBuildersDetails);

// Route to fetch only verified builders
router.get('/verified-builders', fetchVerifiedBuilders);

// Route to fetch builder details by builderId
router.get('/builder/:id', getBuilderDetails);




export default router;
