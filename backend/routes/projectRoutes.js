import express from 'express';
import { createProject, fetchAllProjects, verifyProject} from '../controllers/projectController.js';

const router = express.Router();

// POST route to submit project data
router.post('/submitProject', createProject);

// Route to fetch property details based on project ID
router.get('/all_projects', fetchAllProjects);

// Route to verify a project by its ID
router.post('/verifyProjectById', verifyProject);


export default router;
