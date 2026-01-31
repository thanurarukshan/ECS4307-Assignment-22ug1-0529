# System Architecture - LearnHub LMS

**Author:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis

---

## 1. Introduction

This document presents the comprehensive system architecture for the LearnHub Learning Management System. The architecture defines the high-level structure, components, and interactions that enable the system to deliver its educational platform capabilities.

### 1.1 Purpose

The architecture documentation serves to:
- Provide a clear understanding of system structure
- Guide development and deployment decisions
- Facilitate communication among stakeholders
- Support system maintenance and evolution
- Document technical decisions and rationale

### 1.2 Scope

This document covers:
- System context and boundaries
- Container architecture (frontend, backend, database)
- Technology stack and justification
- Integration patterns
- Deployment architecture

---

## 2. System Context Diagram

The system context diagram shows LearnHub LMS in relation to its external entities and users.

![System Architecture](architectural%20design%20-%20system%20architecture.png)

### 2.1 External Systems

| System | Type | Description | Integration |
|--------|------|-------------|-------------|
| Web Browser | Client | User interface access point | HTTPS, REST API |
| Email System | External | Notification delivery | SMTP (Future) |
| Payment Gateway | External | Course payment processing | REST API (Future) |
| Cloud Storage | External | Media file storage | S3-compatible API (Future) |

---

## 3. Container Diagram

The container diagram shows the high-level technology choices and how containers communicate.

![Data Flow Diagram](architectural%20design%20-%20data%20flow%20diagram.png)

### 3.1 Frontend Container

**Technology:** Next.js 16 with React 19  
**Language:** TypeScript  
**Styling:** Tailwind CSS  
**Icons:** Lucide React  
**HTTP Client:** Axios

**Responsibilities:**
- Render user interface
- Handle user interactions
- Make API requests to backend
- Manage client-side state
- Display data from API responses
- Implement responsive design

**Key Pages:**
- Landing/Home page
- Login/Register pages
- Student Dashboard
- Instructor Dashboard
- Course Catalog
- Course Details with Modules
- Profile Management
- Notifications

### 3.2 Backend Container

**Technology:** Express.js on Node.js  
**Language:** TypeScript  
**ORM:** Sequelize  
**Authentication:** JWT (jsonwebtoken)  
**Password:** bcrypt for hashing

**Responsibilities:**
- Expose REST API endpoints
- Authenticate and authorize requests
- Implement business logic
- Interact with database via ORM
- Validate input data
- Handle errors and exceptions
- Generate JWT tokens

**API Structure:**
- `/api/auth/*` - Authentication endpoints
- `/api/courses/*` - Course management
- `/api/enrollments/*` - Enrollment management
- `/api/modules/*` - Module management
- `/api/notifications/*` - Notification system

### 3.3 Database Container

**Technology:** MySQL 8.0  
**Character Set:** UTF8MB4 (Unicode support)  
**Collation:** utf8mb4_unicode_ci  
**Port:** 3306 (local), 3307 (Docker)

**Responsibilities:**
- Store persistent data
- Enforce data integrity via constraints
- Support transactions
- Manage relationships between entities
- Enable efficient querying via indexes

**Tables:**
- `users` - User accounts
- `courses` - Course information
- `course_modules` - Course content modules
- `enrollments` - Student course enrollments
- `module_progress` - Module completion tracking
- `notifications` - User notifications

---

## 4. Technology Stack

### 4.1 Frontend Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| Next.js | 16.x | React Framework | Server-side rendering, routing, optimization |
| React | 19.x | UI Library | Component-based architecture, virtual DOM |
| TypeScript | Latest | Type Safety | Catch errors at compile time, better IDE support |
| Tailwind CSS | 3.x | Styling | Utility-first CSS, rapid development |
| Lucide React | Latest | Icons | Lightweight, customizable icon library |
| Axios | Latest | HTTP Client | Promise-based, interceptor support |

### 4.2 Backend Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| Node.js | 20.x | Runtime | JavaScript on server, non-blocking I/O |
| Express.js | 4.x | Web Framework | Minimal, flexible, robust routing |
| TypeScript | Latest | Type Safety | Type checking for Node.js code |
| Sequelize | 6.x | ORM | Database abstraction, schema migrations |
| JWT | Latest | Authentication | Stateless auth, scalable |
| bcryptjs | Latest | Password Hashing | Industry-standard password security |

### 4.3 Database Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| MySQL | 8.0.x | RDBMS | Mature, reliable, supports complex queries |
| UTF8MB4 | - | Character Set | Full Unicode support including emojis |

### 4.4 DevOps Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| Docker | Latest | Containerization | Consistent environments, easy deployment |
| Docker Compose | Latest | Container Orchestration | Multi-container application management |
| Git | Latest | Version Control | Industry standard for source control |
| npm | Latest | Package Management | Node.js ecosystem standard |

---

## 5. Architectural Patterns

### 5.1 Model-View-Controller (MVC) Pattern

The backend follows MVC pattern:

- **Model:** Sequelize models define data structure (`User`, `Course`, `Enrollment`, etc.)
- **View:** JSON responses (REST API has no traditional view layer)
- **Controller:** Controllers handle request/response logic (`authController`, `courseController`, etc.)

### 5.2 RESTful API Architecture

The system uses REST architectural principles:

- **Resources:** Courses, Users, Enrollments, Modules
- **HTTP Methods:** GET (read), POST (create), PUT (update), DELETE (remove)
- **Stateless:** Each request contains all necessary information
- **JSON:** Data exchange format

### 5.3 Single Page Application (SPA)

The frontend is a Next.js app that:

- Loads once and dynamically updates content
- Communicates with backend via AJAX (Axios)
- Provides fast, responsive user experience
- Uses client-side routing

### 5.4 Layered Architecture

The system is organized in layers (detailed in layered-architecture.md):

1. Presentation Layer (React Components)
2. API Layer (Express Routes)
3. Business Logic Layer (Controllers)
4. Data Access Layer (Sequelize Models)
5. Database Layer (MySQL)

---

## 6. Communication Patterns

### 6.1 Client-Server Communication

```
Browser → HTTP Request → Frontend (Next.js)
Frontend → AJAX/Axios → Backend API (Express)
Backend → SQL via ORM → Database (MySQL)
Database → Results → Backend
Backend → JSON Response → Frontend
Frontend → Updated UI → Browser
```

### 6.2 Authentication Flow

Refer to the authentication sequence diagrams in the behavioral design section for detailed authentication flow.

### 6.3 Data Flow Patterns

**Create Course Flow:**
```
Instructor (UI) → Create Course Form → POST /api/courses
→ Controller validates → Model creates record → Database INSERT
→ Response with new course → UI updates → Instructor sees new course
```

**Enroll in Course Flow:**
```
Student (UI) → Click Enroll → POST /api/enrollments
→ Controller validates (capacity, auth) → Create enrollment (pending)
→ Create notification for instructor → Database transactions
→ Response with enrollment → UI confirms → Instructor receives notification
```

**Complete Module Flow:**
```
Student (UI) → Check module checkbox → POST /api/enrollments/{id}/modules/{moduleId}/complete
→ Controller verifies enrollment → Create/update module_progress
→ Recalculate course progress → Update enrollment.progressPercent
→ If 100%, mark course complete → Response → UI updates progress bar
```

---

## 7. Deployment Architecture

### 7.1 Docker Deployment

The system uses Docker Compose for multi-container deployment. See deployment documentation for detailed Docker architecture.

**docker-compose.yml Structure:**
- **learnhub-frontend:** Built from `learnhub-frontend/Dockerfile`, exposed on port 3001
- **learnhub-backend:** Built from `learnhub-api/Dockerfile`, exposed on port 5000
- **learnhub-db:** MySQL 8.0 image, exposed on port 3307 (host) → 3306 (container)
- **Network:** All containers on same Docker network for inter-communication
- **Volume:** `mysql_data` volume persists database data

### 7.2 Local Development Deployment

For development without Docker:

```
Terminal 1: cd learnhub-api && npm run dev (Port 5000)
Terminal 2: cd learnhub-frontend && npm run dev (Port 3001)
MySQL Service: Running on localhost:3306
```

**Environment Variables (.env):**
- `DB_HOST=localhost`
- `DB_PORT=3306`
- `DB_NAME=learnhub`
- `DB_USER=root`
- `DB_PASS=<password>`
- `JWT_SECRET=<secret>`
- `PORT=5000`

---

## 8. Security Architecture

### 8.1 Authentication Security

- **Password Storage:** Passwords hashed with bcrypt (salt rounds = 10)
- **JWT Tokens:** Stateless authentication, tokens include user ID and role
- **Token Validation:** Middleware verifies JWT on protected routes
- **HTTPS:** Production should use HTTPS for encrypted communication

### 8.2 Authorization

- **Role-Based:** Student vs Instructor roles determine access
- **Ownership:** Users can only modify their own data (verified in controllers)
- **API Protection:** All sensitive endpoints require authentication

### 8.3 Input Validation

- **Frontend:** Client-side validation for user experience
- **Backend:** Server-side validation (don't trust client)
- **ORM:** Sequelize validates data types and constraints
- **Database:** MySQL enforces constraints (NOT NULL, UNIQUE, FOREIGN KEY)

---

## 9. Scalability Considerations

### 9.1 Horizontal Scaling

**Current Limitations:**
- Single backend instance
- Single database instance
- Session state (JWT is stateless, good for scaling)

**Future Enhancements:**
- Load balancer in front of multiple backend instances
- Database replication (master-slave)
- Redis for caching and session management
- CDN for static assets

### 9.2 Vertical Scaling

- Increase container resources (CPU, RAM)
- Optimize database queries (indexes already in place)
- Connection pooling for database

### 9.3 Database Optimization

**Current Optimizations:**
- Indexes on foreign keys (`idx_studentId`, `idx_courseId`, etc.)
- Indexes on frequently queried fields (`idx_category`, `idx_level`, `idx_enrollmentStatus`)
- Cascading deletes reduce orphaned records

**Future Optimizations:**
- Query result caching
- Database connection pooling
- Read replicas for reporting

---

## 10. Architectural Decisions

### 10.1 Why Next.js over Create React App?

**Decision:** Next.js chosen for frontend

**Rationale:**
- Server-side rendering improves SEO (course catalog indexable)
- Built-in routing (no need for React Router)
- API routes capability (though we use separate backend)
- Optimized production builds
- Better performance out-of-the-box

### 10.2 Why TypeScript?

**Decision:** TypeScript for both frontend and backend

**Rationale:**
- Catch type errors at compile time
- Better IDE support (autocomplete, refactoring)
- Self-documenting code (types as documentation)
- Easier maintenance for growing codebase
- Industry best practice

### 10.3 Why MySQL over MongoDB?

**Decision:** MySQL (relational) chosen over MongoDB (NoSQL)

**Rationale:**
- Strong relationships between entities (users ↔ courses ↔ enrollments)
- ACID transactions required (enrollment approval must be atomic)
- Complex queries (JOIN heavy operations)
- Data integrity (foreign key constraints)
- Mature ecosystem and tooling

### 10.4 Why Monolithic Architecture (Initial)?

**Decision:** Single backend application, not microservices

**Rationale:**
- Simpler to develop and deploy initially
- Fewer moving parts to debug
- Lower infrastructure costs
- Team familiarity
- Easy to refactor to microservices later if needed

**Potential Microservices (Future):**
- User Service (authentication, profiles)
- Course Service (course management)
- Enrollment Service (enrollment workflow)
- Notification Service (notifications, emails)

---

## 11. System Constraints

### 11.1 Technical Constraints

- **Database:** MySQL 8.0+ required for features used
- **Node.js:** Version 20+ required
- **Browser:** Modern browsers with JavaScript enabled
- **Network:** Internet connection required (no offline mode)

### 11.2 Non-Functional Requirements

- **Performance:** Page load < 3 seconds on broadband
- **Availability:** 99% uptime target (24/7 with maintenance windows)
- **Concurrency:** Support 100 simultaneous users (current)
- **Data Retention:** Indefinite (until user deletes account)

---

## 12. Future Architecture Evolution

### 12.1 Short-term (6 months)

- Add caching layer (Redis)
- Implement email notifications (integrate SMTP)
- Add file upload service for profile pictures
- Optimize database queries

### 12.2 Medium-term (1 year)

- Implement payment gateway integration
- Add video content hosting (AWS S3 + CloudFront)
- Introduce API rate limiting
- Add comprehensive logging (ELK stack)

### 12.3 Long-term (2+ years)

- Microservices architecture
- Kubernetes for orchestration
- Event-driven architecture (message queues)
- GraphQL API alongside REST
- Mobile apps (React Native)

---

## 13. Conclusion

The LearnHub LMS architecture is designed as a modern, three-tier web application using industry-standard technologies. The architecture prioritizes:

- **Separation of Concerns:** Clear boundaries between frontend, backend, and data layers
- **Scalability:** Foundation for horizontal and vertical scaling
- **Maintainability:** TypeScript, modular code, clear patterns
- **Security:** Authentication, authorization, input validation
- **Developer Experience:** Docker for consistent environments, TypeScript for safety

This architecture supports the current MVP while providing a solid foundation for future enhancements including microservices, advanced analytics, and mobile applications. The technology choices reflect current industry best practices and position LearnHub for long-term success and evolution.
