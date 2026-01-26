import User from './User.js';
import Course from './Course.js';
import Enrollment from './Enrollment.js';
import Notification from './Notification.js';
import CourseModule from './CourseModule.js';
import ModuleProgress from './ModuleProgress.js';

// Associations
User.hasMany(Course, { foreignKey: 'instructorId', as: 'courses' });
Course.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

User.hasMany(Enrollment, { foreignKey: 'studentId', as: 'enrollments' });
Enrollment.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

Course.hasMany(Enrollment, { foreignKey: 'courseId', as: 'enrollments' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

Course.hasMany(CourseModule, { foreignKey: 'courseId', as: 'modules' });
CourseModule.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

Enrollment.hasMany(ModuleProgress, { foreignKey: 'enrollmentId', as: 'moduleProgress' });
ModuleProgress.belongsTo(Enrollment, { foreignKey: 'enrollmentId', as: 'enrollment' });

CourseModule.hasMany(ModuleProgress, { foreignKey: 'moduleId', as: 'progress' });
ModuleProgress.belongsTo(CourseModule, { foreignKey: 'moduleId', as: 'module' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User, Course, Enrollment, Notification, CourseModule, ModuleProgress };
