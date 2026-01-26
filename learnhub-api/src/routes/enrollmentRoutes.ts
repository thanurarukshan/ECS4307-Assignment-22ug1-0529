import express from 'express';
import { requestEnrollment, getEnrollmentsByCourse, getMyEnrollments, approveEnrollment, rejectEnrollment } from '../controllers/enrollmentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST api/enrollments
// @desc    Request enrollment in a course
// @access  Private (Student)
router.post('/', authMiddleware, requestEnrollment);

// @route   GET api/enrollments/course/:courseId
// @desc    Get enrollments for a course
// @access  Public
router.get('/course/:courseId', getEnrollmentsByCourse);

// @route   GET api/enrollments/my-enrollments
// @desc    Get my enrollments
// @access  Private (Student)
router.get('/my-enrollments', authMiddleware, getMyEnrollments);

// @route   PUT api/enrollments/:id/approve
// @desc    Approve an enrollment request
// @access  Private (Instructor)
router.put('/:id/approve', authMiddleware, approveEnrollment);

// @route   PUT api/enrollments/:id/reject
// @desc    Reject an enrollment request
// @access  Private (Instructor)
router.put('/:id/reject', authMiddleware, rejectEnrollment);

export default router;
