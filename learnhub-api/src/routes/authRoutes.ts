import express from 'express';
import { register, login, getProfile, updateProfile, changePassword, deleteAccount } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   GET api/auth/profile
// @desc    Get current user
// @access  Private
router.get('/profile', authMiddleware, getProfile);

// @route   PUT api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, updateProfile);

// @route   PUT api/auth/password
// @desc    Change password
// @access  Private
router.put('/password', authMiddleware, changePassword);

// @route   DELETE api/auth/profile
// @desc    Delete user account
// @access  Private
router.delete('/profile', authMiddleware, deleteAccount);

export default router;
