import express from 'express';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from '../controllers/notificationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET api/notifications
// @desc    Get user notifications
// @access  Private
router.get('/', authMiddleware, getNotifications);

// @route   GET api/notifications/unread-count
// @desc    Get unread notification count
// @access  Private
router.get('/unread-count', authMiddleware, getUnreadCount);

// @route   PUT api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.put('/:id/read', authMiddleware, markAsRead);

// @route   PUT api/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.put('/read-all', authMiddleware, markAllAsRead);

export default router;
