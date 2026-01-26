import express from 'express';
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST api/courses
// @desc    Create a new course
// @access  Private (Instructor)
router.post('/', authMiddleware, createCourse);

// @route   GET api/courses
// @desc    Get all courses with filters
// @access  Public
router.get('/', getCourses);

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', getCourseById);

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private (Instructor)
router.put('/:id', authMiddleware, updateCourse);

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private (Instructor)
router.delete('/:id', authMiddleware, deleteCourse);

export default router;
