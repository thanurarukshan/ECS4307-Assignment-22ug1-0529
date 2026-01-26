import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ where: { email } });
        if (user) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'user', // All users have same role
        });

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(400).json({ message: 'Invalid Credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ message: 'Invalid Credentials' });
            return;
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role, id: user.id, username: user.username });
    } catch (err) {
        console.error('Login Error:', (err as Error).message);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.user.user.id, {
            attributes: { exclude: ['password'] },
        });
        res.json(user);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    const { username } = req.body;
    try {
        const user = await User.findByPk(req.user.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (username) user.username = username;

        await user.save();
        res.json({ username: user.username, email: user.email });
    } catch (err) {
        console.log((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findByPk(req.user.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Current password is incorrect' });
            return;
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const deleteAccount = async (req: AuthRequest, res: Response): Promise<void> => {
    const { password } = req.body;

    try {
        const user = await User.findByPk(req.user.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Verify password for security
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }

        await user.destroy();
        res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};
