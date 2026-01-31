# Entity Relationship Diagram - LearnHub LMS

**Author:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis

## 1. ER Diagram

![ER Diagram](structural%20design%20-%20erd%20-%20er%20diagram.png)

## 2. Table Descriptions

### USERS
- Primary Key: `id`
- Unique: `username`, `email`
- Stores: Students and Instructors
- Role: `'user'` (student) or `'instructor'`

### COURSES
- Primary Key: `id`
- Foreign Key: `instructorId` references USERS(id) CASCADE DELETE
- Indexes: `instructorId`, `category`, `level`, `courseType`

### COURSE_MODULES
- Primary Key: `id`
- Foreign Key: `courseId` references COURSES(id) CASCADE DELETE
- Indexes: `courseId`, `orderIndex`

### ENROLLMENTS
- Primary Key: `id`
- Foreign Keys:
  - `studentId` references USERS(id) CASCADE DELETE
  - `courseId` references COURSES(id) CASCADE DELETE
- Indexes: `studentId`, `courseId`, `enrollmentStatus`
- Status: `'pending'`, `'enrolled'`, `'rejected'`

### MODULE_PROGRESS
- Primary Key: `id`
- Unique: `(enrollmentId, moduleId)` composite
- Foreign Keys:
  - `enrollmentId` references ENROLLMENTS(id) CASCADE DELETE
  - `moduleId` references COURSE_MODULES(id) CASCADE DELETE

### NOTIFICATIONS
- Primary Key: `id`
- Foreign Key: `userId` references USERS(id) CASCADE DELETE
- Types: `enrollment_request`, `enrollment_approved`, `enrollment_rejected`

## 3. Cardinality

- User (1) creates (0..*) Courses
- User (1) requests (0..*) Enrollments
- Course (1) contains (0..*) Modules
- Course (1) has (0..*) Enrollments
- Enrollment (1) tracks (0..*) Module Progress
- Module (1) tracked by (0..*) Module Progress
