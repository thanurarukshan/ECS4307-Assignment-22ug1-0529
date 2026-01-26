import { Request, Response } from 'express';
import { Notification } from '../models/index.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const notifications = await Notification.findAll({
            where: { userId: req.user.user.id },
            order: [['isRead', 'ASC'], ['createdAt', 'DESC']],
            limit: 50,
        });
        res.json(notifications);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const getUnreadCount = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const count = await Notification.count({
            where: { userId: req.user.user.id, isRead: false },
        });
        res.json({ count });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const notification = await Notification.findByPk(Number(req.params.id));
        if (!notification) {
            res.status(404).json({ message: 'Notification not found' });
            return;
        }

        if (notification.userId !== req.user.user.id) {
            res.status(403).json({ message: 'Not authorized' });
            return;
        }

        notification.isRead = true;
        await notification.save();
        res.json(notification);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const markAllAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        await Notification.update(
            { isRead: true },
            { where: { userId: req.user.user.id, isRead: false } }
        );
        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};
