import { Request, Response } from 'express';
import { Enrollment, Course, User, Notification } from '../models/index.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const requestEnrollment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { courseId, paymentAmount } = req.body;

        const course = await Course.findByPk(Number(courseId), {
            include: [{ model: User, as: 'instructor', attributes: ['username'] }],
        });
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        if (course.instructorId === req.user.user.id) {
            res.status(400).json({ message: 'Instructor cannot enroll in their own course' });
            return;
        }

        // Check if student already enrolled
        const existingEnrollment = await Enrollment.findOne({
            where: {
                courseId: Number(courseId),
                studentId: req.user.user.id
            }
        });

        if (existingEnrollment) {
            res.status(400).json({ message: 'You have already requested enrollment for this course' });
            return;
        }

        // Check enrollment capacity
        if (course.enrolledStudents >= course.maxStudents) {
            res.status(400).json({ message: 'Course is full. Maximum capacity reached.' });
            return;
        }

        // Get student info
        const student = await User.findByPk(req.user.user.id);

        const enrollment = await Enrollment.create({
            courseId,
            studentId: req.user.user.id,
            paymentAmount: paymentAmount || course.courseFee,
            enrollmentStatus: 'pending',
            progressPercent: 0
        });

        // Create notification for course instructor
        await Notification.create({
            userId: course.instructorId,
            type: 'enrollment_request',
            message: `${student?.username} has requested to enroll in your course "${course.courseName}"`,
            relatedId: enrollment.id,
            isRead: false,
        });

        res.status(201).json(enrollment);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const approveEnrollment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const enrollmentId = Number(req.params.id);
        const enrollmentResult: any = await Enrollment.findByPk(enrollmentId, {
            include: [
                { model: Course, as: 'course' },
                { model: User, as: 'student', attributes: ['username'] }
            ],
        });

        if (!enrollmentResult) {
            res.status(404).json({ message: 'Enrollment request not found' });
            return;
        }

        // Verify user is the course instructor
        if (enrollmentResult.course.instructorId !== req.user.user.id) {
            res.status(403).json({ message: 'Not authorized' });
            return;
        }

        // Check if course is full
        if (enrollmentResult.course.enrolledStudents >= enrollmentResult.course.maxStudents) {
            res.status(400).json({ message: 'Course is full. Cannot approve more enrollments.' });
            return;
        }

        // Update enrollment status
        enrollmentResult.enrollmentStatus = 'enrolled';
        await enrollmentResult.save();

        // Increment enrolled students count
        enrollmentResult.course.enrolledStudents += 1;
        await enrollmentResult.course.save();

        // Create notification for student
        await Notification.create({
            userId: enrollmentResult.studentId,
            type: 'enrollment_approved',
            message: `Your enrollment in "${enrollmentResult.course.courseName}" has been approved! You can now start learning.`,
            relatedId: enrollmentResult.id,
            isRead: false,
        });

        res.json(enrollmentResult);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const rejectEnrollment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const enrollmentId = Number(req.params.id);
        const enrollmentResult: any = await Enrollment.findByPk(enrollmentId, {
            include: [
                { model: Course, as: 'course' },
                { model: User, as: 'student', attributes: ['username'] }
            ],
        });

        if (!enrollmentResult) {
            res.status(404).json({ message: 'Enrollment request not found' });
            return;
        }

        // Verify user is the course instructor
        if (enrollmentResult.course.instructorId !== req.user.user.id) {
            res.status(403).json({ message: 'Not authorized' });
            return;
        }

        // Update enrollment status
        enrollmentResult.enrollmentStatus = 'rejected';
        await enrollmentResult.save();

        // Create notification for student
        await Notification.create({
            userId: enrollmentResult.studentId,
            type: 'enrollment_rejected',
            message: `Your enrollment request for "${enrollmentResult.course.courseName}" has been declined.`,
            relatedId: enrollmentResult.id,
            isRead: false,
        });

        res.json(enrollmentResult);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
};

export const getEnrollmentsByCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { courseId } = req.params;
        const enrollments = await Enrollment.findAll({
            where: { courseId: Number(courseId) },
            include: [{ model: User, as: 'student', attributes: ['username', 'email'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(enrollments);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
}

export const getMyEnrollments = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const enrollments = await Enrollment.findAll({
            where: { studentId: req.user.user.id },
            include: [{
                model: Course,
                as: 'course',
                include: [{ model: User, as: 'instructor', attributes: ['username'] }]
            }],
            order: [['createdAt', 'DESC']]
        });
        res.json(enrollments);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server Error');
    }
}
