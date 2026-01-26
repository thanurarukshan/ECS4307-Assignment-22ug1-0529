import express from 'express';
import {
    createModule,
    getModulesByCourse,
    updateModule,
    deleteModule,
    markModuleComplete,
    getModuleProgress
} from '../controllers/moduleController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Course modules routes
router.post('/courses/:courseId/modules', authMiddleware, createModule);
router.get('/courses/:courseId/modules', getModulesByCourse); // Public - can view before enrolling
router.put('/modules/:id', authMiddleware, updateModule);
router.delete('/modules/:id', authMiddleware, deleteModule);

// Progress tracking routes
router.post('/enrollments/:enrollmentId/modules/:moduleId/complete', authMiddleware, markModuleComplete);
router.get('/enrollments/:enrollmentId/progress', authMiddleware, getModuleProgress);

export default router;
