# Layered Architecture - LearnHub LMS

**Author:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis

## 1. Layered Architecture Overview

![Layered Architecture](layred%20architecture.png)

## 2. Layer Details

### Presentation Layer
- **Location:** `learnhub-frontend/app/`
- **Technologies:** React 19, Next.js 16, Tailwind CSS
- **Components:** Login, Dashboard, Course List, Profile
- **Responsibility:** User interface and user experience

### API Layer  
- **Location:** `learnhub-api/src/routes/`
- **Files:** `authRoutes.ts`, `courseRoutes.ts`, `enrollmentRoutes.ts`
- **Responsibility:** HTTP endpoint definition and routing

### Business Logic Layer
- **Location:** `learnhub-api/src/controllers/`, `src/middleware/`
- **Files:** Controllers, `authMiddleware.ts`
- **Responsibility:** Business rules, validation, authorization

### Data Access Layer
- **Location:** `learnhub-api/src/models/`
- **Files:** `User.ts`, `Course.ts`, `Enrollment.ts`, etc.
- **Responsibility:** ORM models, database abstraction

### Database Layer
- **Technology:** MySQL 8.0
- **Schema:** 6 tables with foreign key relationships
- **Responsibility:** Data persistence and integrity
