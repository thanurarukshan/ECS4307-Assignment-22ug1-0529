# LearnHub LMS - Software Modelling and Analysis
## Final Project Report

**Student Name:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis  
**Project:** LearnHub - Learning Management System  
**Date:** January 2026

---

## Executive Summary

This document presents a comprehensive overview of the software modeling and analysis conducted for LearnHub, a modern Learning Management System. The project demonstrates end-to-end software modeling covering requirement analysis, architectural design, behavioral modeling, structural design, UI/UX design, and design evaluation.

LearnHub is a full-stack web application built with Next.js (frontend), Express.js (backend), and MySQL (database), featuring JWT authentication, role-based access control, and real-time progress tracking for both students and instructors.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [How to Run the Project](#2-how-to-run-the-project)
3. [Requirement Modelling](#3-requirement-modelling)
4. [Architectural Design](#4-architectural-design)
5. [Behavioral Design](#5-behavioral-design)
6. [Structural Design](#6-structural-design)
7. [UI/UX Design](#7-uiux-design)
8. [Design Evaluation](#8-design-evaluation)
9. [Appendices](#9-appendices)

---

## 1. Project Overview

### 1.1 Introduction

LearnHub is a comprehensive Learning Management System that facilitates online education by connecting instructors with students. The system enables instructors to create structured courses with modules, while students can enroll, track their progress, and complete courses through an intuitive web interface.

### 1.2 Key Features

**For Instructors:**
- Create, edit, and delete courses with customizable details
- Structure courses into sequential modules
- Review and approve/reject student enrollment requests
- Monitor student progress and completion rates
- Set course parameters (fees, difficulty, duration, capacity)

**For Students:**
- Browse and search courses by category, level, and type
- Request enrollment in courses with payment submission
- Track learning progress with visual indicators
- Mark modules as complete and earn completion badges
- Access personalized dashboard with real-time progress

**System Features:**
- Secure JWT-based authentication
- Role-based access control (Student/Instructor)
- Real-time progress calculation and updates
- Notification system for enrollment events
- Responsive, modern UI design

### 1.3 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16 + React 19 | UI framework with server-side rendering |
| **Frontend** | TypeScript | Type safety and better development experience |
| **Frontend** | Tailwind CSS | Utility-first styling framework |
| **Backend** | Node.js + Express.js | RESTful API server |
| **Backend** | TypeScript | Type-safe backend development |
| **Backend** | Sequelize ORM | Database abstraction layer |
| **Backend** | JWT | Stateless authentication |
| **Database** | MySQL 8.0 | Relational database management |
| **DevOps** | Docker + Docker Compose | Containerization and orchestration |

---

## 2. How to Run the Project

### 2.1 Prerequisites

- **Node.js** 20+ and npm
- **MySQL** 8.0+
- **Docker** and Docker Compose (optional)

### 2.2 Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone <repository-url>
cd LearnHub-LMS

# 2. Set up the database
mysql -u root -p -e "CREATE DATABASE learnhub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p learnhub < db/learnhub_schema_fresh.sql

# 3. Configure and start backend
cd learnhub-api
cat > .env <<EOF
DB_HOST=localhost
DB_PORT=3306
DB_NAME=learnhub
DB_USER=root
DB_PASS=<your-password>
JWT_SECRET=learnhub_secret_key_2024
PORT=5000
EOF
npm install
npm run dev

# 4. Configure and start frontend (in new terminal)
cd learnhub-frontend
npm install
npm run dev

# 5. Access the application
# Frontend: http://localhost:3001
# Backend API: http://localhost:5000
```

### 2.3 Docker Deployment

```bash
# Start all services
docker compose up -d

# Access the application
# Frontend: http://localhost:3001
# Backend API: http://localhost:5000
# MySQL: localhost:3307

# Stop services
docker compose down
```

For detailed deployment instructions, database schema, and API documentation, refer to the main [README.md](../README.md).

---

## 3. Requirement Modelling

Requirement modeling establishes the foundation for the system by identifying stakeholder needs, defining functional requirements, and prioritizing features.

### 3.1 Documentation

- **[User Stories](01-requirement-modelling/user-stories.md)** - User-centric requirement descriptions
- **[Use Case Model](01-requirement-modelling/use-case-model.md)** - Complete use case specifications
- **[Acceptance Criteria](01-requirement-modelling/acceptance-criteria.md)** - Definition of done for each feature
- **[MoSCoW Prioritization](01-requirement-modelling/moscow-prioritization.md)** - Feature prioritization framework

### 3.2 Use Case Diagram

The system identifies 19 distinct use cases across three primary actors (Student, Instructor, Guest/Visitor) and two secondary actors (Email System, Payment Gateway).

**Use Case Diagram:**

[use case diagram.png]

**Key Use Cases:**
- **Authentication:** UC-01 Register Account, UC-02 Login
- **Course Management:** UC-12 Create Course, UC-13 Edit Course, UC-14 Delete Course, UC-15 Manage Modules
- **Enrollment Workflow:** UC-05 Request Enrollment, UC-16 Approve Enrollment, UC-17 Reject Enrollment
- **Progress Tracking:** UC-06 Track Progress, UC-07 Complete Module
- **Account Management:** UC-09 Manage Profile, UC-10 Change Password, UC-19 Delete Account

---

## 4. Architectural Design

The architectural design defines the high-level structure of the system, including subsystem decomposition, layered architecture, and technology integration patterns.

### 4.1 Documentation

- **[System Architecture](02-architectural-design/system-architecture.md)** - Comprehensive system architecture documentation
- **[Layered Architecture](02-architectural-design/layered-architecture.md)** - 5-layer architecture pattern
- **[Subsystem Decomposition](02-architectural-design/subsystem-decomposition.md)** - Modular subsystem organization

### 4.2 System Architecture Diagram

The system follows a three-tier architecture with clear separation between presentation (Next.js), business logic (Express.js), and data (MySQL) layers.

**System Architecture:**

[architectural design - system architecture.png]

**Data Flow Diagram:**

[architectural design - data flow diagram.png]

### 4.3 Layered Architecture

The application implements a 5-layer architecture ensuring separation of concerns and maintainability.

**Layered Architecture Diagram:**

[layred architecture.png]

**Layers:**
1. **Presentation Layer** - React components, Next.js pages, Tailwind CSS
2. **API Layer** - Express routes, HTTP endpoints
3. **Business Logic Layer** - Controllers, middleware, validation
4. **Data Access Layer** - Sequelize models, database queries
5. **Database Layer** - MySQL database with schema and constraints

### 4.4 Subsystem Decomposition

The system is organized into six logical subsystems with clear responsibilities and minimal coupling.

**Subsystem Overview:**

[subsystem Decomposition - System overview.png]

**Subsystems:**
1. **Authentication Subsystem** - User registration, login, JWT tokens
2. **Course Management Subsystem** - Course and module CRUD operations
3. **Enrollment Subsystem** - Enrollment requests and approvals
4. **Progress Tracking Subsystem** - Module completion and progress calculation
5. **Notification Subsystem** - User notifications for system events
6. **User Management Subsystem** - Profile and account management

---

## 5. Behavioral Design

Behavioral design models capture the dynamic aspects of the system, illustrating how objects interact over time and how system state transitions occur.

### 5.1 Documentation

- **[Sequence Diagrams](03-behavioral-design/sequence-diagrams.md)** - Object interaction sequences
- **[State Machine Diagrams](03-behavioral-design/state-machine-diagrams.md)** - State transition models

### 5.2 Activity Diagrams

Activity diagrams illustrate the workflow of key user journeys and business processes.

**Student Enrollment Workflow:**

[behavioral design - activity diagram - student enrollment workflow.png]

**Instructor Course Creation Workflow:**

[behavioral design - activity diagram - instructor course creation workflow.png]

**Course Completion Workflow:**

[behavioral design - activity diagram - course completion workflow.png]

**User Authentication Workflow:**

[behavioral design - activity diagram - user authentication workflow.png]

### 5.3 Sequence Diagrams

Sequence diagrams detail the message passing between system components for critical operations.

**User Registration Sequence:**

[behavioral design - sequence diagram - user registration sequence.png]

**User Login Sequence:**

[behavioral design - sequence diagram - user login sequence.png]

**Create Course Sequence:**

[behavioral design - sequence diagram - create course sequence.png]

**Student Enrollment Request Sequence:**

[behavioral design - sequence diagram - student enrollment request sequence.png]

**Enrollment Approval Sequence:**

[behavioral design - sequence diagram - enrollment approval sequence.png]

**Module Completion Sequence:**

[behavioral design - sequence diagram - module completion sequence.png]

**Change Password Sequence:**

[behavioral design - sequence diagram - delete password sequence.png]

**Delete Account Sequence:**

[behavioral design - sequence diagram - delete account sequence.png]

### 5.4 State Machine Diagrams

State machines model the lifecycle of key domain entities.

**Enrollment State Machine:**

[behavioral design - state machine - entorllment.png]

States: Pending → Enrolled/Rejected → In Progress → Completed

**Module Progress State Machine:**

[behavioral design - state machine - module progress.png]

States: Not Started → In Progress → Completed

**User Session State Machine:**

[behavioral design - state machine - user session.png]

States: Unauthenticated ↔ Authenticated → Active Session

**Course Lifecycle State Machine:**

[behavioral design - state machine - source lifecycle.png]

States: Draft → Published → Archived/Deleted

---

## 6. Structural Design

Structural design defines the static organization of the system through class diagrams and entity-relationship models.

### 6.1 Documentation

- **[Class Diagrams](04-structural-design/class-diagrams.md)** - Object-oriented class structure
- **[Entity Relationship Diagram](04-structural-design/erd.md)** - Database schema design

### 6.2 Class Diagrams

**Main Class Diagram:**

[structural design - class diagrams - main class diagrams.png]

**Core Classes:**
- **User** - User account management (students, instructors)
- **Course** - Course information and metadata
- **CourseModule** - Course content modules
- **Enrollment** - Student course enrollments
- **ModuleProgress** - Module completion tracking
- **Notification** - System notifications

**Controller Classes:**

[structural design - class diagrams - controller classes.png]

**Controllers:**
- **AuthController** - Authentication operations
- **CourseController** - Course CRUD operations
- **EnrollmentController** - Enrollment management
- **ModuleController** - Module management
- **NotificationController** - Notification handling

### 6.3 Entity Relationship Diagram

The database schema consists of 6 interrelated tables with foreign key constraints ensuring referential integrity.

**ER Diagram:**

[structural design - erd - er diagram.png]

**Tables:**
- **users** (PK: id, UK: username, email)
- **courses** (PK: id, FK: instructorId → users.id)
- **course_modules** (PK: id, FK: courseId → courses.id)
- **enrollments** (PK: id, FK: studentId → users.id, courseId → courses.id)
- **module_progress** (PK: id, FK: enrollmentId → enrollments.id, moduleId → course_modules.id)
- **notifications** (PK: id, FK: userId → users.id)

---

## 7. UI/UX Design

UI/UX design focuses on creating an intuitive, accessible, and visually appealing user interface that enhances the learning experience.

### 7.1 Documentation

- **[UI/UX Design](05-ui-ux-design/ui-ux-design.md)** - Complete UI/UX documentation with mockups

### 7.2 Navigation Flow

The navigation flow diagram illustrates the user journey through the application for both student and instructor roles.

**Navigation Flow Diagram:**

[uiux design - navigation flow.png]

### 7.3 User Interface Mockups

The system features modern, responsive interfaces designed for optimal user experience:

- **Login Page** - Clean authentication interface
- **Student Dashboard** - Course overview with progress tracking
- **Instructor Dashboard** - Course management and enrollment approvals
- **Course Management** - Intuitive course creation interface
- **Notifications Center** - Centralized notification management

### 7.4 Design Principles

**Usability Heuristics Applied:**
- ✅ Visibility of system status (progress bars, loading indicators)
- ✅ Match between system and real world (educational terminology)
- ✅ User control and freedom (cancellation, undo options)
- ✅ Consistency and standards (uniform colors, layouts)
- ✅ Error prevention (validation, confirmations)
- ✅ Recognition rather than recall (visible progress, checkboxes)
- ✅ Flexibility and efficiency (search, filters, quick actions)
- ✅ Aesthetic and minimalist design (clean, focused interfaces)
- ✅ Error recovery (clear error messages, suggestions)

**Design System:**
- **Primary Blue (#2196F3)** - Student theme, primary actions
- **Secondary Orange (#FF9800)** - Instructor theme, accents
- **Success Green (#4CAF50)** - Completions, approvals
- **Error Red (#F44336)** - Errors, rejections
- **Warning Yellow (#FFC107)** - Pending states

---

## 8. Design Evaluation

Design evaluation assesses the quality of the implemented design against established software engineering principles.

### 8.1 Documentation

- **[SOLID Principles](06-design-evaluation/solid-principles.md)** - SOLID principle adherence analysis
- **[Complete Design Evaluation](06-design-evaluation/design-evaluation-complete.md)** - Comprehensive design evaluation

### 8.2 SOLID Principles Compliance

**Single Responsibility Principle (SRP):**
✅ Each controller handles one domain (Auth, Course, Enrollment)
✅ Models only represent data structure
✅ Middleware focused solely on authentication

**Open/Closed Principle (OCP):**
✅ Sequelize models extendable through associations
✅ Middleware can be composed without modification
✅ New routes added without changing existing ones

**Liskov Substitution Principle (LSP):**
✅ All authentication middleware implementations interchangeable
✅ Sequelize models follow consistent interface

**Interface Segregation Principle (ISP):**
✅ Specific route handlers for specific operations
✅ No forced implementation of unused methods

**Dependency Inversion Principle (DIP):**
✅ Controllers depend on model abstractions (Sequelize ORM)
✅ High-level modules don't depend on low-level implementation details

### 8.3 Design Patterns

**Applied Patterns:**
- **MVC (Model-View-Controller)** - Architectural pattern
- **Repository Pattern** - Data access abstraction via Sequelize
- **Middleware Pattern** - Request processing pipeline
- **Factory Pattern** - Model instantiation
- **Singleton Pattern** - Database connection management

### 8.4 Quality Attributes

**Maintainability:** ✅ Modular structure, TypeScript type safety, clear separation of concerns
**Scalability:** ✅ Stateless JWT authentication, horizontal scaling ready, connection pooling
**Security:** ✅ Password hashing (bcrypt), JWT tokens, input validation, SQL injection prevention
**Performance:** ✅ Database indexing, ORM query optimization, caching ready
**Usability:** ✅ Intuitive UI, responsive design, clear feedback, error handling

---

## 9. Appendices

### 9.1 Complete Modeling Documentation

**Requirement Modelling:**
- [User Stories](01-requirement-modelling/user-stories.md)
- [Use Case Model](01-requirement-modelling/use-case-model.md)
- [Acceptance Criteria](01-requirement-modelling/acceptance-criteria.md)
- [MoSCoW Prioritization](01-requirement-modelling/moscow-prioritization.md)

**Architectural Design:**
- [System Architecture](02-architectural-design/system-architecture.md)
- [Layered Architecture](02-architectural-design/layered-architecture.md)
- [Subsystem Decomposition](02-architectural-design/subsystem-decomposition.md)

**Behavioral Design:**
- [Sequence Diagrams](03-behavioral-design/sequence-diagrams.md)
- [State Machine Diagrams](03-behavioral-design/state-machine-diagrams.md)

**Structural Design:**
- [Class Diagrams](04-structural-design/class-diagrams.md)
- [Entity Relationship Diagram](04-structural-design/erd.md)

**UI/UX Design:**
- [UI/UX Design](05-ui-ux-design/ui-ux-design.md)

**Design Evaluation:**
- [SOLID Principles](06-design-evaluation/solid-principles.md)
- [Design Evaluation Complete](06-design-evaluation/design-evaluation-complete.md)

**Additional Documentation:**
- [Modelling Overview](README.md)
- [Software Design Document](software-design-document.md)

### 9.2 Diagram Index

**Requirement Diagrams:**
- [use case diagram.png]

**Architectural Diagrams:**
- [architectural design - system architecture.png]
- [architectural design - data flow diagram.png]
- [layred architecture.png]
- [subsystem Decomposition - System overview.png]

**Behavioral Diagrams - Activity:**
- [behavioral design - activity diagram - student enrollment workflow.png]
- [behavioral design - activity diagram - instructor course creation workflow.png]
- [behavioral design - activity diagram - course completion workflow.png]
- [behavioral design - activity diagram - user authentication workflow.png]

**Behavioral Diagrams - Sequence:**
- [behavioral design - sequence diagram - user registration sequence.png]
- [behavioral design - sequence diagram - user login sequence.png]
- [behavioral design - sequence diagram - create course sequence.png]
- [behavioral design - sequence diagram - student enrollment request sequence.png]
- [behavioral design - sequence diagram - enrollment approval sequence.png]
- [behavioral design - sequence diagram - module completion sequence.png]
- [behavioral design - sequence diagram - delete password sequence.png]
- [behavioral design - sequence diagram - delete account sequence.png]

**Behavioral Diagrams - State Machines:**
- [behavioral design - state machine - entorllment.png]
- [behavioral design - state machine - module progress.png]
- [behavioral design - state machine - user session.png]
- [behavioral design - state machine - source lifecycle.png]

**Structural Diagrams:**
- [structural design - class diagrams - main class diagrams.png]
- [structural design - class diagrams - controller classes.png]
- [structural design - erd - er diagram.png]

**UI/UX Diagrams:**
- [uiux design - navigation flow.png]

### 9.3 Project Statistics

**Documentation:**
- Total Sections: 6 (Requirement, Architecture, Behavioral, Structural, UI/UX, Evaluation)
- Total Documents: 16 markdown files
- Total Diagrams: 25 visualization artifacts

**System Metrics:**
- Database Tables: 6
- API Endpoints: 25+
- Use Cases: 19
- Classes: 11 (6 models + 5 controllers)
- Subsystems: 6

**Technology:**
- Languages: TypeScript, JavaScript, SQL
- Frameworks: Next.js 16, React 19, Express.js
- Database: MySQL 8.0
- Deployment: Docker + Docker Compose

---

## Conclusion

This comprehensive modeling effort demonstrates a systematic approach to software development, from initial requirement gathering to detailed design evaluation. The LearnHub LMS represents a well-architected, maintainable, and scalable learning management platform built on industry best practices and solid software engineering principles.

The modeling process has provided:
- **Clear Requirements** through user stories, use cases, and acceptance criteria
- **Robust Architecture** via layered design and subsystem decomposition
- **Detailed Behavior Models** capturing system dynamics and workflows
- **Well-Defined Structure** through class diagrams and ER modeling
- **User-Centric Design** following established UX principles
- **Quality Assurance** via SOLID principles and design pattern application

The resulting system successfully addresses the educational needs of both instructors and students while maintaining high standards of code quality, security, and user experience.

---

**Document Version:** 1.0  
**Last Updated:** January 31, 2026  
**Status:** ✅ Complete

**Prepared by:**  
T.R.S. Wickramarathna (22ug1-0529)  
Software Modelling and Analysis  
Department of Computer Science
