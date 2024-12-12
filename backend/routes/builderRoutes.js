import express from 'express';
import { getBuilders, addBuilder, getBuildersNames, verifyBuilderByName } from '../controllers/builderController.js';

const router = express.Router();

// Route to fetch all builders
router.get('/', getBuilders);



// Route to add a new builder
router.post('/', addBuilder);

// Route to fetch builder names and IDs
router.get('/names', getBuildersNames);

// Route to verify a builder by their complete name
router.post('/verify', verifyBuilderByName);

export default router;
