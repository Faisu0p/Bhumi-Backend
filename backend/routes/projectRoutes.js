import express from 'express';
import { submitProject } from '../controllers/projectController.js';

const router = express.Router();

// POST route to submit project data
router.post('/submitProject', submitProject);

// Route to fetch property details based on project ID
router.get('/properties', fetchPropertyDetails);


export default router;
