import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Course, User } from '../models/index.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const createCourse = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { courseName, courseDescription, courseFee, category, courseType, courseThumbnail, duration, level, maxStudents } = req.body;
        const course = await Course.create({
            courseName,
            courseDescription,
            courseFee,
            category,
            courseType,
            courseThumbnail,
            duration,
            level,
            maxStudents: maxStudents || 50,
            enrolledStudents: 0,
            instructorId: req.user.user.id,
        });
        res.status(201).json(course);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const getCourses = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, minPrice, maxPrice, courseType, search, instructorId, level } = req.query;
        const whereClause: any = {};

        if (category) {
            whereClause.category = { [Op.like]: `%${category}%` };
        }
        if (courseType) {
            whereClause.courseType = courseType;
        }
        if (level) {
            whereClause.level = level;
        }
        if (minPrice || maxPrice) {
            whereClause.courseFee = {};
            if (minPrice) whereClause.courseFee[Op.gte] = minPrice;
            if (maxPrice) whereClause.courseFee[Op.lte] = maxPrice;
        }
        if (search) {
            whereClause[Op.or] = [
                { courseName: { [Op.like]: `%${search}%` } },
                { courseDescription: { [Op.like]: `%${search}%` } }
            ];
        }
        if (instructorId) {
            whereClause.instructorId = instructorId;
        }

        const courses = await Course.findAll({
            where: whereClause,
            include: [{ model: User, as: 'instructor', attributes: ['username', 'email'] }],
        });
        res.json(courses);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const getCourseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const course = await Course.findByPk(Number(req.params.id), {
            include: [{ model: User, as: 'instructor', attributes: ['username', 'email'] }],
        });
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.json(course);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const updateCourse = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const course = await Course.findByPk(Number(req.params.id));
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        // Check ownership
        if (course.instructorId !== req.user.user.id) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        const { courseName, courseDescription, courseFee, category, courseType, courseThumbnail, duration, level, maxStudents } = req.body;

        // Update fields
        if (courseName) course.courseName = courseName;
        if (courseDescription) course.courseDescription = courseDescription;
        if (courseFee !== undefined) course.courseFee = courseFee;
        if (category) course.category = category;
        if (courseType) course.courseType = courseType;
        if (courseThumbnail) course.courseThumbnail = courseThumbnail;
        if (duration) course.duration = duration;
        if (level) course.level = level;
        if (maxStudents) course.maxStudents = maxStudents;

        await course.save();
        res.json(course);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const deleteCourse = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const course = await Course.findByPk(Number(req.params.id));
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        // Check ownership
        if (course.instructorId !== req.user.user.id) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        await course.destroy();
        res.json({ message: 'Course removed' });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};
