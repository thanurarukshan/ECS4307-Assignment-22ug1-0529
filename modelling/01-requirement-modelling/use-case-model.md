# Use Case Model - LearnHub LMS

**Author:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis

---

## 1. Introduction

This document presents a comprehensive use case model for the LearnHub Learning Management System. The use case model identifies all actors and their interactions with the system, providing a clear understanding of the system's functional requirements from a user perspective.

## 2. System Actors

### 2.1 Primary Actors

1. **Student**
   - Users who enroll in courses to learn
   - Track their progress through course modules
   - Complete assignments and receive certifications

2. **Instructor**
   - Users who create and manage courses
   - Manage course content and modules
   - Approve/reject student enrollments
   - Monitor student progress

3. **Guest/Visitor**
   - Unauthenticated users browsing the system
   - Can view course catalog
   - Can register for an account

### 2.2 Secondary Actors

1. **System Administrator** (Future Enhancement)
   - Manages user accounts
   - Monitors system health
   - Manages system configuration

2. **Email System** (External)
   - Sends notification emails
   - Sends password reset emails

3. **Payment Gateway** (External - Future)
   - Processes course payments
   - Handles refunds

## 3. Use Case Diagram

![Use Case Diagram](use%20case%20diagram.png)

## 4. Detailed Use Case Specifications

### UC-01: Register Account

**Actor:** Guest/Visitor  
**Description:** A new user creates an account in the system  
**Preconditions:** User is not authenticated  
**Postconditions:** User account is created and stored in the database

**Main Flow:**
1. User navigates to registration page
2. System displays registration form
3. User enters username, email, and password
4. User selects role (Student/Instructor)
5. User submits the form
6. System validates input data
7. System checks for duplicate username/email
8. System hashes the password
9. System creates user account
10. System displays success message
11. System redirects to login page

**Alternative Flows:**
- **A1: Validation Error**
  - 6a. System detects invalid input
  - 6b. System displays error message
  - 6c. Return to step 3

- **A2: Duplicate Account**
  - 7a. System finds existing username/email
  - 7b. System displays error message
  - 7c. Return to step 3

**Exception Flows:**
- **E1: Database Error**
  - System displays generic error message
  - User can retry registration

---

### UC-02: Login

**Actor:** Student, Instructor  
**Description:** User authenticates to access the system  
**Preconditions:** User has a registered account  
**Postconditions:** User is authenticated and receives JWT token

**Main Flow:**
1. User navigates to login page
2. System displays login form
3. User enters email and password
4. User submits the form
5. System validates credentials
6. System generates JWT token
7. System returns token to client
8. System redirects to dashboard
9. System displays personalized dashboard

**Alternative Flows:**
- **A1: Invalid Credentials**
  - 5a. System detects invalid credentials
  - 5b. System displays error message
  - 5c. Return to step 3

- **A2: Account Not Found**
  - 5a. System cannot find user account
  - 5b. System displays error message
  - 5c. Return to step 3

---

### UC-03: Browse Courses

**Actor:** Guest, Student, Instructor  
**Description:** User views available courses in the system  
**Preconditions:** None  
**Postconditions:** User sees list of available courses

**Main Flow:**
1. User navigates to courses page
2. System retrieves all available courses
3. System displays course list with details (name, description, instructor, fee, level)
4. User views course information

**Alternative Flows:**
- **A1: No Courses Available**
  - 2a. System finds no courses
  - 2b. System displays empty state message

---

### UC-04: Search Courses

**Actor:** Guest, Student, Instructor  
**Description:** User searches for specific courses  
**Preconditions:** None  
**Postconditions:** User sees filtered course results

**Main Flow:**
1. User enters search criteria (category, level, type)
2. System applies filters to course database
3. System returns matching courses
4. System displays filtered results

**Alternative Flows:**
- **A1: No Results Found**
  - 3a. System finds no matching courses
  - 3b. System displays "no results" message

---

### UC-05: Request Enrollment

**Actor:** Student  
**Description:** Student requests to enroll in a course  
**Preconditions:** Student is authenticated, course exists  
**Postconditions:** Enrollment request is created with pending status

**Main Flow:**
1. Student views course details
2. Student clicks "Enroll" button
3. System displays enrollment form
4. Student enters payment amount
5. Student submits enrollment request
6. System validates course capacity
7. System creates enrollment record with "pending" status
8. System creates notification for instructor
9. System displays success message
10. System sends notification to instructor

**Alternative Flows:**
- **A1: Course Full**
  - 6a. System detects course at maximum capacity
  - 6b. System displays error message
  - 6c. Use case ends

- **A2: Already Enrolled**
  - 6a. System finds existing enrollment
  - 6b. System displays error message
  - 6c. Use case ends

---

### UC-06: Track Progress

**Actor:** Student  
**Description:** Student views their progress in enrolled courses  
**Preconditions:** Student is authenticated and enrolled in courses  
**Postconditions:** Student sees current progress information

**Main Flow:**
1. Student navigates to dashboard
2. System retrieves student's enrollments
3. System calculates progress for each course
4. System displays progress percentage and completed modules
5. Student views progress information

---

### UC-07: Complete Module

**Actor:** Student  
**Description:** Student marks a course module as completed  
**Preconditions:** Student is enrolled in course with approved status  
**Postconditions:** Module is marked as completed, progress is updated

**Main Flow:**
1. Student views course modules
2. Student clicks checkbox to complete module
3. System validates enrollment status
4. System creates/updates module progress record
5. System marks module as completed
6. System recalculates overall course progress
7. System updates enrollment progress percentage
8. System displays updated progress
9. If all modules completed, system marks course as complete

**Alternative Flows:**
- **A1: Not Enrolled**
  - 3a. System detects no valid enrollment
  - 3b. System displays error message
  - 3c. Use case ends

---

### UC-08: View Dashboard

**Actor:** Student, Instructor  
**Description:** User views their personalized dashboard  
**Preconditions:** User is authenticated  
**Postconditions:** User sees role-specific dashboard

**Main Flow (Student):**
1. Student logs in
2. System retrieves student's enrollments
3. System calculates progress for each enrollment
4. System displays enrolled courses with progress bars
5. System shows recent notifications
6. System displays course completion badges

**Main Flow (Instructor):**
1. Instructor logs in
2. System retrieves instructor's courses
3. System retrieves pending enrollment requests
4. System displays created courses
5. System shows enrollment statistics
6. System displays recent notifications

---

### UC-09: Manage Profile

**Actor:** Student, Instructor  
**Description:** User views and updates their profile information  
**Preconditions:** User is authenticated  
**Postconditions:** User profile is updated

**Main Flow:**
1. User navigates to profile page
2. System displays current profile information
3. User modifies profile fields (username, email)
4. User submits changes
5. System validates new data
6. System checks for duplicate username/email
7. System updates user record
8. System displays success message

**Alternative Flows:**
- **A1: Validation Error**
  - 5a. System detects invalid data
  - 5b. System displays error message
  - 5c. Return to step 3

---

### UC-10: Change Password

**Actor:** Student, Instructor  
**Description:** User changes their account password  
**Preconditions:** User is authenticated  
**Postconditions:** User password is updated

**Main Flow:**
1. User navigates to change password page
2. System displays password change form
3. User enters current password
4. User enters new password
5. User confirms new password
6. User submits form
7. System validates current password
8. System validates new password strength
9. System hashes new password
10. System updates user record
11. System displays success message

**Alternative Flows:**
- **A1: Current Password Incorrect**
  - 7a. System detects incorrect current password
  - 7b. System displays error message
  - 7c. Return to step 3

- **A2: Weak Password**
  - 8a. System detects weak password
  - 8b. System displays error message
  - 8c. Return to step 3

---

### UC-11: View Notifications

**Actor:** Student, Instructor  
**Description:** User views their notifications  
**Preconditions:** User is authenticated  
**Postconditions:** User sees their notifications

**Main Flow:**
1. User navigates to notifications
2. System retrieves user's notifications
3. System displays notifications (read/unread)
4. User clicks notification to mark as read
5. System updates notification status

---

### UC-12: Create Course

**Actor:** Instructor  
**Description:** Instructor creates a new course  
**Preconditions:** User is authenticated as instructor  
**Postconditions:** New course is created in the system

**Main Flow:**
1. Instructor navigates to create course page
2. System displays course creation form
3. Instructor enters course details (name, description, category, fee, level, duration, capacity)
4. Instructor uploads course thumbnail
5. Instructor submits form
6. System validates course data
7. System creates course record
8. System associates course with instructor
9. System displays success message
10. System redirects to course details

**Alternative Flows:**
- **A1: Validation Error**
  - 6a. System detects invalid data
  - 6b. System displays error message
  - 6c. Return to step 3

---

### UC-13: Edit Course

**Actor:** Instructor  
**Description:** Instructor modifies an existing course  
**Preconditions:** Instructor owns the course  
**Postconditions:** Course information is updated

**Main Flow:**
1. Instructor navigates to course edit page
2. System verifies instructor ownership
3. System displays course edit form with current data
4. Instructor modifies course details
5. Instructor submits changes
6. System validates course data
7. System updates course record
8. System displays success message

**Alternative Flows:**
- **A1: Not Course Owner**
  - 2a. System detects instructor does not own course
  - 2b. System displays error message
  - 2c. Use case ends

---

### UC-14: Delete Course

**Actor:** Instructor  
**Description:** Instructor deletes a course  
**Preconditions:** Instructor owns the course  
**Postconditions:** Course is removed from system

**Main Flow:**
1. Instructor selects delete course option
2. System displays confirmation dialog
3. Instructor confirms deletion
4. System verifies instructor ownership
5. System cascades delete (removes enrollments, modules, progress)
6. System removes course record
7. System displays success message
8. System redirects to dashboard

---

### UC-15: Manage Modules

**Actor:** Instructor  
**Description:** Instructor creates, edits, or deletes course modules  
**Preconditions:** Instructor owns the course  
**Postconditions:** Course modules are updated

**Main Flow (Create Module):**
1. Instructor navigates to course edit page
2. Instructor clicks "Add Module"
3. System displays module form
4. Instructor enters module title and description
5. Instructor sets module order
6. Instructor submits form
7. System creates module record
8. System displays updated module list

**Main Flow (Edit Module):**
1. Instructor clicks edit on existing module
2. System displays module edit form
3. Instructor modifies module details
4. Instructor submits changes
5. System updates module record

**Main Flow (Delete Module):**
1. Instructor clicks delete on module
2. System displays confirmation dialog
3. Instructor confirms deletion
4. System removes module and associated progress records
5. System displays updated module list

---

### UC-16: Approve Enrollment

**Actor:** Instructor  
**Description:** Instructor approves a student's enrollment request  
**Preconditions:** Enrollment request exists with pending status  
**Postconditions:** Enrollment status is set to enrolled, student can access course

**Main Flow:**
1. Instructor views enrollment requests
2. Instructor selects pending request
3. Instructor clicks "Approve"
4. System verifies course ownership
5. System updates enrollment status to "enrolled"
6. System updates course enrolled count
7. System creates notification for student
8. System displays success message
9. System sends approval notification to student

---

### UC-17: Reject Enrollment

**Actor:** Instructor  
**Description:** Instructor rejects a student's enrollment request  
**Preconditions:** Enrollment request exists with pending status  
**Postconditions:** Enrollment status is set to rejected

**Main Flow:**
1. Instructor views enrollment requests
2. Instructor selects pending request
3. Instructor clicks "Reject"
4. System verifies course ownership
5. System updates enrollment status to "rejected"
6. System creates notification for student
7. System displays success message
8. System sends rejection notification to student

---

### UC-18: View Student Progress

**Actor:** Instructor  
**Description:** Instructor views progress of enrolled students  
**Preconditions:** Instructor owns the course  
**Postconditions:** Instructor sees student progress information

**Main Flow:**
1. Instructor navigates to course details
2. Instructor selects "View Enrollments"
3. System retrieves course enrollments
4. System displays list of enrolled students
5. System shows progress percentage for each student
6. Instructor views student analytics

---

### UC-19: Delete Account

**Actor:** Student, Instructor  
**Description:** User permanently deletes their account  
**Preconditions:** User is authenticated  
**Postconditions:** User account and associated data are removed

**Main Flow:**
1. User navigates to profile page
2. User selects "Delete Account"
3. System displays confirmation dialog
4. User enters current password to confirm
5. User confirms deletion
6. System validates password
7. System cascades delete (removes enrollments, courses, notifications)
8. System removes user record
9. System logs out user
10. System redirects to home page

**Alternative Flows:**
- **A1: Incorrect Password**
  - 6a. System detects incorrect password
  - 6b. System displays error message
  - 6c. Return to step 4

---

## 5. Use Case Relationships

### 5.1 Include Relationships
- UC-05 (Request Enrollment) includes validation of course capacity
- UC-07 (Complete Module) includes progress calculation
- UC-16, UC-17 (Approve/Reject Enrollment) include notification creation

### 5.2 Extend Relationships
- UC-08 (View Dashboard) extends with notification display
- UC-07 (Complete Module) extends with course completion when all modules done

### 5.3 Generalization
- UC-02 (Login) is generalized for both Student and Instructor
- UC-08 (View Dashboard) is specialized into Student Dashboard and Instructor Dashboard

---

## 6. Summary

This use case model captures 19 distinct use cases across the LearnHub LMS system. The model demonstrates clear separation of concerns between student-facing features (enrollment, progress tracking) and instructor-facing features (course management, enrollment approval). The system follows a role-based access control model where different actors have different permissions and capabilities.

The use cases provide comprehensive coverage of:
- Authentication and user management
- Course discovery and browsing
- Enrollment workflow
- Learning and progress tracking
- Course creation and management
- Notification system

This model serves as the foundation for subsequent design activities including sequence diagrams, activity diagrams, and system architecture.
