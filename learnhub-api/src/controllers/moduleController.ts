import { Request, Response } from 'express';
import { CourseModule, ModuleProgress, Enrollment, Course } from '../models/index.js';

// Create a module for a course (Instructor only)
export const createModule = async (req: Request, res: Response) => {
    try {
        const courseId = parseInt(req.params.courseId as string);
        const { title, description, orderIndex } = req.body;
        const userId = (req as any).user.user.id; // FIX: Access nested user.user.id

        // Verify the course belongs to this instructor
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (course.instructorId !== userId) {
            return res.status(403).json({ message: 'Not authorized to add modules to this course' });
        }

        const module = await CourseModule.create({
            courseId,
            title,
            description,
            orderIndex: orderIndex || 0
        });

        res.status(201).json(module);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all modules for a course (Public - can view before enrolling)
export const getModulesByCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        const modules = await CourseModule.findAll({
            where: { courseId },
            order: [['orderIndex', 'ASC']]
        });

        res.json(modules);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a module (Instructor only)
export const updateModule = async (req: Request, res: Response) => {
    try {
        const moduleId = parseInt(req.params.id as string);
        const { title, description, orderIndex } = req.body;
        const userId = (req as any).user.user.id; // FIX

        const module = await CourseModule.findByPk(moduleId, {
            include: [{ model: Course, as: 'course' }]
        });

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        const course = module.get('course') as any;
        if (course.instructorId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await module.update({ title, description, orderIndex });
        res.json(module);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a module (Instructor only)
export const deleteModule = async (req: Request, res: Response) => {
    try {
        const moduleId = parseInt(req.params.id as string);
        const userId = (req as any).user.user.id; // FIX

        const module = await CourseModule.findByPk(moduleId, {
            include: [{ model: Course, as: 'course' }]
        });

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        const course = module.get('course') as any;
        if (course.instructorId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await module.destroy();
        res.json({ message: 'Module deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Mark a module as complete (Student only)
export const markModuleComplete = async (req: Request, res: Response) => {
    try {
        const enrollmentId = parseInt(req.params.enrollmentId as string);
        const moduleId = parseInt(req.params.moduleId as string);
        const { completed } = req.body;
        const userId = (req as any).user.user.id; // FIX

        // Verify enrollment belongs to this student
        const enrollment = await Enrollment.findByPk(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        if (enrollment.studentId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Find or create progress record
        let progress = await ModuleProgress.findOne({
            where: { enrollmentId, moduleId }
        });

        if (progress) {
            await progress.update({
                completed,
                completedAt: completed ? new Date() : undefined
            });
        } else {
            progress = await ModuleProgress.create({
                enrollmentId,
                moduleId,
                completed,
                completedAt: completed ? new Date() : undefined
            });
        }

        // Check if all modules are complete and update enrollment
        const courseModules = await CourseModule.findAll({
            where: { courseId: enrollment.courseId }
        });

        const allProgress = await ModuleProgress.findAll({
            where: { enrollmentId }
        });

        const completedCount = allProgress.filter((p: any) => p.completed).length;
        const progressPercent = Math.round((completedCount / courseModules.length) * 100);

        await enrollment.update({
            progressPercent,
            completionDate: progressPercent === 100 ? new Date() : null
        });

        res.json({ progress, enrollment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get module progress for an enrollment (Student)
export const getModuleProgress = async (req: Request, res: Response) => {
    try {
        const enrollmentId = parseInt(req.params.enrollmentId as string);
        const userId = (req as any).user.user.id; // FIX

        // Verify enrollment belongs to this student
        const enrollment = await Enrollment.findByPk(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        if (enrollment.studentId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const progress = await ModuleProgress.findAll({
            where: { enrollmentId },
            include: [{ model: CourseModule, as: 'module' }],
            order: [[{ model: CourseModule, as: 'module' }, 'orderIndex', 'ASC']]
        });

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
