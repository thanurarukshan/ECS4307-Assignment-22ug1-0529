# Class Diagrams - LearnHub LMS

**Author:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis

## 1. Main Class Diagram

![Main Class Diagram](structural%20design%20-%20class%20diagrams%20-%20main%20class%20diagrams.png)

## 2. Controller Classes

![Controller Classes](structural%20design%20-%20class%20diagrams%20-%20controller%20classes.png)

## 3. Design Patterns

### MVC Pattern
- Models: Data structure (User, Course, etc.)
- Controllers: Business logic
- Views: JSON responses (REST API)

### Repository Pattern
- Sequelize models act as repositories
- Abstract database operations

### Middleware Pattern
- authMiddleware for JWT verification
- Applied to protected routes
