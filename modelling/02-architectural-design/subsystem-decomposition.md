# Subsystem Decomposition - LearnHub LMS

**Author:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis

---

## 1. Introduction

This document decomposes the LearnHub LMS into logical subsystems to better understand system organization, responsibilities, and interactions.

## 2. Subsystem Overview

![Subsystem Decomposition](subsystem%20Decomposition%20-%20System%20overview.png)

## 3. Authentication Subsystem

**Purpose:** Secure user authentication and authorization

**Components:**
- `authController.ts` - Login, register, profile management
- `authMiddleware.ts` - JWT token verification
- Password hashing (bcrypt)

**Responsibilities:**
- User registration
- User login with JWT generation
- Password hashing and verification
- Token-based authentication
- Protected route authorization

**Database Tables:** `users`

**Key APIs:**
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/profile`
- PUT `/api/auth/profile`
- PUT `/api/auth/password`
- DELETE `/api/auth/profile`

## 4. Course Management Subsystem

**Purpose:** Manage course creation, editing, and module content

**Components:**
- `courseController.ts`
- `moduleController.ts`
- `Course.ts` model
- `CourseModule.ts` model

**Responsibilities:**
- Create new courses
- Edit course details
- Delete courses
- Add/edit/delete course modules
- Query courses by filters
- Maintain course-instructor relationship

**Database Tables:** `courses`, `course_modules`

**Key APIs:**
- GET `/api/courses` - List all courses
- GET `/api/courses/:id` - Get course details
- POST `/api/courses` - Create course
- PUT `/api/courses/:id` - Update course
- DELETE `/api/courses/:id` - Delete course
- POST `/api/courses/:courseId/modules` - Add module
- PUT `/api/modules/:id` - Update module
- DELETE `/api/modules/:id` - Delete module

## 5. Enrollment Subsystem

**Purpose:** Handle student enrollment requests and instructor approvals

**Components:**
- `enrollmentController.ts`
- `Enrollment.ts` model

**Responsibilities:**
- Create enrollment requests (pending status)
- Approve enrollments (instructor)
- Reject enrollments (instructor)
- Query enrollments by student/course
- Validate course capacity
- Update enrolled student count

**Database Tables:** `enrollments`

**Key APIs:**
- POST `/api/enrollments` - Request enrollment
- GET `/api/enrollments/my-enrollments` - Student's enrollments
- GET `/api/enrollments/course/:courseId` - Course enrollments (instructor)
- PUT `/api/enrollments/:id/approve` - Approve enrollment
- PUT `/api/enrollments/:id/reject` - Reject enrollment

## 6. Progress Tracking Subsystem

**Purpose:** Track student progress through course modules

**Components:**
- Progress tracking in `enrollmentController.ts`
- `ModuleProgress.ts` model

**Responsibilities:**
- Mark modules as completed
- Calculate course progress percentage
- Update enrollment progress
- Determine course completion
- Persist progress across sessions

**Database Tables:** `module_progress`, `enrollments.progressPercent`

**Key APIs:**
- POST `/api/enrollments/:enrollmentId/modules/:moduleId/complete` - Mark complete
- GET `/api/enrollments/:enrollmentId/progress` - Get progress

**Progress Calculation:**
```
Progress % = (Completed Modules / Total Modules) × 100
```

## 7. Notification Subsystem

**Purpose:** Notify users of important events

**Components:**
- `notificationController.ts`
- `Notification.ts` model

**Responsibilities:**
- Create notifications for enrollment events
- Mark notifications as read
- Query user notifications
- Notify instructor of new enrollment requests
- Notify student of enrollment approval/rejection

**Database Tables:** `notifications`

**Key APIs:**
- GET `/api/notifications` - Get user notifications
- PUT `/api/notifications/:id/read` - Mark as read

**Notification Types:**
- `enrollment_request` - Student requested enrollment (to instructor)
- `enrollment_approved` - Enrollment approved (to student)
- `enrollment_rejected` - Enrollment rejected (to student)

## 8. User Management Subsystem

**Purpose:** Manage user profiles and account settings

**Components:**
- User-related functions in `authController.ts`
- `User.ts` model

**Responsibilities:**
- View profile information
- Update username/email
- Change password
- Delete account (cascade delete data)

**Database Tables:** `users`

**Key APIs:**
- GET `/api/auth/profile` - View profile
- PUT `/api/auth/profile` - Update profile
- PUT `/api/auth/password` - Change password
- DELETE `/api/auth/profile` - Delete account

## 9. Subsystem Interactions

### Enrollment Flow
```
Student → Enrollment Subsystem → Course Subsystem (validate)
→ Notification Subsystem (notify instructor) → Database
```

### Course Completion Flow
```
Student → Progress Subsystem → Calculate progress
→ Update Enrollment → If 100% → Mark complete
```

### Authentication Flow
```
User → Authentication Subsystem → Verify credentials
→ Generate JWT → Return token → Authorize subsequent requests
```

## 10. Subsystem Dependencies

| Subsystem | Depends On | Reason |
|-----------|------------|--------|
| Course Management | Authentication | Verify instructor ownership |
| Enrollment | Authentication, Course | Verify user, validate course |
| Progress Tracking | Enrollment, Course | Verify enrollment, get modules |
| Notification | Authentication, Enrollment | Target users, enrollment events |
| User Management | Authentication | Identity verification |

## 11. Data Flow Between Subsystems

Refer to sequence diagrams in the behavioral design section for detailed data flow interactions between subsystems.

## 12. Conclusion

The subsystem decomposition shows clear separation of concerns, minimal coupling, and high cohesion. Each subsystem has well-defined responsibilities and clear interfaces, making the system modular and maintainable.
