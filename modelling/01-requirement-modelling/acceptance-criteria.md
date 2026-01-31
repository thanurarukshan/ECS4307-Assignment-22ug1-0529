# Acceptance Criteria - LearnHub LMS

**Author:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis

---

## 1. Introduction

This document defines comprehensive acceptance criteria for all user stories in the LearnHub Learning Management System. Acceptance criteria specify the conditions that must be satisfied for a user story to be considered complete and are written in **Given-When-Then** format to ensure testability.

## 2. Guest/Visitor Acceptance Criteria

### G-001: Account Registration

**Given** I am on the registration page  
**When** I enter a valid username, email, and password and select a role  
**Then** my account should be created successfully  
**And** I should be redirected to the login page  
**And** I should see a success message

**Given** I am on the registration page  
**When** I enter a username that already exists  
**Then** I should see an error message "Username already exists"  
**And** my account should not be created

**Given** I am on the registration page  
**When** I enter an email that is already registered  
**Then** I should see an error message "Email already exists"  
**And** my account should not be created

**Given** I am on the registration page  
**When** I enter an invalid email format  
**Then** I should see a validation error  
**And** the form should not submit

**Given** I am on the registration page  
**When** I leave required fields empty  
**Then** I should see validation errors for empty fields  
**And** the form should not submit

---

### G-002: Browse Course Catalog

**Given** I am on the courses page (not logged in)  
**When** the page loads  
**Then** I should see a list of all available courses  
**And** each course should display name, description, instructor, fee, and level

**Given** I am on the courses page  
**When** no courses exist in the system  
**Then** I should see a message "No courses available"

**Given** I am on the courses page  
**When** I click on a course card  
**Then** I should be navigated to the course details page

---

### G-003: Search Courses

**Given** I am on the courses page  
**When** I select a category filter  
**Then** I should see only courses in that category

**Given** I am on the courses page  
**When** I select a level filter (beginner/intermediate/advanced)  
**Then** I should see only courses at that level

**Given** I am on the courses page  
**When** I select a course type filter (free/paid/premium)  
**Then** I should see only courses of that type

**Given** I am on the courses page  
**When** I apply multiple filters simultaneously  
**Then** I should see courses that match all applied filters

**Given** I am on the courses page  
**When** my filter combination yields no results  
**Then** I should see a "No courses found" message

---

### G-004: View Course Details

**Given** I am viewing a course details page  
**When** the page loads  
**Then** I should see course name, full description, instructor name, duration, level, fee, and capacity information

**Given** I am viewing a course details page  
**When** the course has modules  
**Then** I should see the number of modules listed

**Given** I am viewing a course details page as a guest  
**When** I try to access course modules  
**Then** I should be prompted to log in or create an account

---

## 3. Student Acceptance Criteria

### S-001: Student Login

**Given** I have a registered student account  
**When** I enter correct email and password  
**Then** I should be logged in successfully  
**And** I should be redirected to my dashboard  
**And** I should receive a JWT token for authentication

**Given** I am on the login page  
**When** I enter an incorrect password  
**Then** I should see an error message "Invalid credentials"  
**And** I should remain on the login page

**Given** I am on the login page  
**When** I enter an email that does not exist  
**Then** I should see an error message "Invalid credentials"  
**And** I should not be logged in

**Given** I am on the login page  
**When** I leave required fields empty  
**Then** I should see validation errors  
**And** the form should not submit

---

### S-002: Request Course Enrollment

**Given** I am logged in as a student  
**And** I am viewing a course details page  
**When** I click the "Enroll" button  
**And** I submit a payment amount  
**Then** an enrollment request with "pending" status should be created  
**And** I should see a success message  
**And** the instructor should receive a notification

**Given** I am viewing a course I am already enrolled in  
**When** I try to enroll again  
**Then** I should see an error message "Already enrolled"  
**And** no duplicate enrollment should be created

**Given** I am viewing a course that is at maximum capacity  
**When** I try to enroll  
**Then** I should see an error message "Course is full"  
**And** no enrollment should be created

**Given** I am not logged in  
**When** I try to enroll in a course  
**Then** I should be redirected to the login page

---

### S-003: View Enrollment Status

**Given** I am logged in as a student  
**And** I have enrollment requests  
**When** I view my dashboard  
**Then** I should see the status (pending/enrolled/rejected) for each enrollment

**Given** I have a pending enrollment  
**When** the instructor approves it  
**Then** the status should update to "enrolled" in real-time or on page refresh  
**And** I should receive a notification

---

### S-004: Access Enrolled Courses

**Given** I am logged in as a student  
**And** I have enrolled courses (status = enrolled)  
**When** I view my dashboard  
**Then** I should see all my enrolled courses displayed as cards  
**And** each card should show course name, progress percentage, and thumbnail

**Given** I am on my dashboard  
**When** I click on an enrolled course card  
**Then** I should be navigated to that course's details page with modules

**Given** I have no enrolled courses  
**When** I view my dashboard  
**Then** I should see a message "No enrolled courses yet"

---

### S-005: View Course Modules

**Given** I am enrolled in a course  
**When** I navigate to the course details page  
**Then** I should see all course modules listed in order  
**And** each module should show title and description

**Given** I am viewing course modules  
**When** modules have an order index  
**Then** modules should be displayed in sequential order

---

### S-006: Complete Course Modules

**Given** I am enrolled in a course (status = enrolled)  
**And** I am viewing course modules  
**When** I click the checkbox next to a module  
**Then** the module should be marked as completed  
**And** the completion should be saved to the database  
**And** the checkbox should remain checked on page refresh

**Given** I have completed a module  
**When** I click the checkbox again  
**Then** the module should remain completed (checkbox should stay checked)

**Given** I am viewing course modules but not enrolled  
**When** I try to mark a module as complete  
**Then** the action should be prevented  
**And** I should see an error message

---

### S-007: Track Learning Progress

**Given** I am enrolled in a course  
**And** I have completed some modules  
**When** I view my dashboard  
**Then** I should see the correct progress percentage calculated as (completed modules / total modules * 100)

**Given** I have completed 3 out of 5 modules  
**When** I view my progress  
**Then** it should show 60 percent progress

**Given** I complete another module  
**When** the page refreshes  
**Then** my progress percentage should update accordingly

---

### S-008: View Progress Bar

**Given** I am viewing my dashboard  
**And** I have enrolled courses with varying completion  
**When** the dashboard loads  
**Then** each course card should display a visual progress bar  
**And** the progress bar should fill according to completion percentage  
**And** the progress color should indicate status (e.g., green for completion)

---

### S-009: Receive Completion Badge

**Given** I am enrolled in a course with 5 modules  
**When** I complete all 5 modules  
**Then** a "Course Completed" badge should appear on the course card  
**And** the progress percentage should show 100 percent  
**And** the completion date should be recorded

**Given** I have completed a course  
**When** I view my dashboard  
**Then** the completed course should be visually distinguished with a badge

---

### S-010: View Notifications

**Given** I am logged in as a student  
**When** I navigate to the notifications section  
**Then** I should see all my notifications sorted by most recent first

**Given** I have received an enrollment approval notification  
**When** I view my notifications  
**Then** I should see the notification message with course name and approval status

**Given** I have both read and unread notifications  
**When** I view my notifications  
**Then** unread notifications should be visually distinguished (e.g., different background color or bold text)

---

### S-011: Mark Notifications as Read

**Given** I have unread notifications  
**When** I click on a notification  
**Then** it should be marked as read  
**And** the visual distinction for unread should be removed  
**And** the read status should persist on page refresh

---

### S-012: View Profile Information

**Given** I am logged in  
**When** I navigate to my profile page  
**Then** I should see my current username, email, and role  
**And** sensitive information like password should not be displayed

---

### S-013: Edit Profile

**Given** I am on my profile page  
**When** I change my username to a new valid username  
**And** I submit the form  
**Then** my username should be updated successfully  
**And** I should see a success message

**Given** I am editing my profile  
**When** I enter a username that is already taken  
**Then** I should see an error message "Username already exists"  
**And** my profile should not be updated

**Given** I am editing my profile  
**When** I enter an invalid email format  
**Then** I should see a validation error  
**And** the form should not submit

---

### S-014: Change Password

**Given** I am on the change password page  
**When** I enter my current password correctly  
**And** I enter a valid new password and confirm it  
**And** I submit the form  
**Then** my password should be updated  
**And** the new password should be hashed before storage  
**And** I should see a success message

**Given** I am changing my password  
**When** I enter an incorrect current password  
**Then** I should see an error message "Current password is incorrect"  
**And** my password should not be changed

**Given** I am changing my password  
**When** my new password does not meet minimum requirements  
**Then** I should see an error message indicating password requirements  
**And** the form should not submit

**Given** I am changing my password  
**When** my new password and confirmation do not match  
**Then** I should see an error message "Passwords do not match"  
**And** the form should not submit

---

### S-015: Delete Account

**Given** I am on my profile page  
**When** I click "Delete Account"  
**And** I enter my correct password to confirm  
**And** I confirm the deletion  
**Then** my account should be permanently deleted  
**And** all my enrollments and data should be removed  
**And** I should be logged out  
**And** I should be redirected to the home page

**Given** I am attempting to delete my account  
**When** I enter an incorrect password  
**Then** I should see an error message  
**And** my account should not be deleted

---

### S-017: Real-time Progress Updates

**Given** I am viewing my dashboard  
**And** I have the course details page open in another tab  
**When** I complete a module in the course details page  
**Then** my dashboard should reflect the updated progress when I return to it or refresh

---

## 4. Instructor Acceptance Criteria

### I-002: Create New Course

**Given** I am logged in as an instructor  
**When** I navigate to the create course page  
**And** I enter valid course details (name, description, category, level, duration, fee, capacity)  
**And** I submit the form  
**Then** a new course should be created in the database  
**And** the course should be associated with my instructor ID  
**And** I should be redirected to the course details page  
**And** I should see a success message

**Given** I am creating a course  
**When** I leave required fields empty  
**Then** I should see validation errors  
**And** the course should not be created

**Given** I am creating a course  
**When** I enter invalid data types (e.g., negative fee, invalid capacity)  
**Then** I should see appropriate validation errors  
**And** the course should not be created

---

### I-003: Upload Course Thumbnail

**Given** I am creating or editing a course  
**When** I upload a valid image file as a thumbnail  
**Then** the image should be converted to base64 and stored  
**And** the thumbnail should be displayed in the course catalog

**Given** I am uploading a course thumbnail  
**When** the file is not a valid image type  
**Then** I should see an error message  
**And** the upload should be rejected

---

### I-006: Edit Course Details

**Given** I am logged in as an instructor  
**And** I own a course  
**When** I navigate to the edit course page  
**Then** the form should be pre-populated with current course data

**Given** I am on the edit course page  
**When** I modify course details and submit  
**Then** the course should be updated in the database  
**And** I should see a success message  
**And** the updated information should be reflected in the course catalog

**Given** I am trying to edit a course  
**When** I do not own the course  
**Then** I should see an error message "Unauthorized"  
**And** I should not be able to access the edit page

---

### I-007: Delete Course

**Given** I own a course  
**When** I click "Delete Course" and confirm the deletion  
**Then** the course should be removed from the database  
**And** all associated enrollments, modules, and progress should be deleted (cascade)  
**And** I should be redirected to my dashboard  
**And** I should see a success message

**Given** I try to delete a course  
**When** I do not own the course  
**Then** the deletion should be prevented  
**And** I should see an error message

---

### I-008: Add Course Modules

**Given** I am editing a course I own  
**When** I click "Add Module"  
**And** I enter a module title, description, and order index  
**And** I submit the module form  
**Then** a new module should be created and associated with the course  
**And** the module should appear in the modules list

**Given** I am adding a module  
**When** I leave required fields empty  
**Then** I should see validation errors  
**And** the module should not be created

---

### I-009: Edit Course Modules

**Given** I am editing a course I own  
**When** I click "Edit" on an existing module  
**And** I modify the module title or description  
**And** I submit the changes  
**Then** the module should be updated in the database  
**And** the changes should be reflected immediately

---

### I-010: Delete Course Modules

**Given** I am editing a course I own  
**When** I click "Delete" on a module and confirm  
**Then** the module should be removed from the database  
**And** all student progress for that module should be deleted (cascade)  
**And** the module list should update to show remaining modules

---

### I-012: View Enrollment Requests

**Given** I am logged in as an instructor  
**When** I navigate to my dashboard or course details  
**Then** I should see all enrollment requests with "pending" status for my courses  
**And** each request should show student name, course name, and payment amount

**Given** I have no pending enrollment requests  
**When** I view enrollment requests  
**Then** I should see a message "No pending requests"

---

### I-013: Approve Student Enrollment

**Given** I have a pending enrollment request for my course  
**When** I click "Approve"  
**Then** the enrollment status should change to "enrolled"  
**And** the course enrolled count should increment  
**And** the student should receive an approval notification  
**And** the student should now be able to access course modules

**Given** I approve an enrollment  
**When** the course is at maximum capacity  
**Then** the approval should still proceed (instructor override)

---

### I-014: Reject Student Enrollment

**Given** I have a pending enrollment request  
**When** I click "Reject"  
**Then** the enrollment status should change to "rejected"  
**And** the student should receive a rejection notification  
**And** the student should not be able to access course modules

---

### I-016: Monitor Student Progress

**Given** I own a course with enrolled students  
**When** I view the course enrollments  
**Then** I should see a list of enrolled students  
**And** each student entry should show their progress percentage  
**And** I should see which modules each student has completed

---

### I-019: Receive Enrollment Notifications

**Given** I am an instructor with created courses  
**When** a student requests enrollment in my course  
**Then** I should receive a notification  
**And** the notification should include student name and course name  
**And** the notification should be marked as unread initially

---

## 5. Cross-Functional Acceptance Criteria

### X-003: Error Handling

**Given** I encounter an error (e.g., network failure, validation error)  
**When** the error occurs  
**Then** I should see a clear error message explaining what went wrong  
**And** the error message should not expose sensitive system information  
**And** I should be able to retry the action or navigate away

---

### X-004: Data Security

**Given** I create an account  
**When** my password is stored in the database  
**Then** it should be hashed using bcrypt  
**And** the plain text password should never be stored

**Given** I am making API requests  
**When** I am authenticated  
**Then** my requests should include a valid JWT token  
**And** the token should be validated server-side

---

### X-005: Session Management

**Given** I log in successfully  
**When** I receive a JWT token  
**Then** the token should remain valid for my session  
**And** I should notbe automatically logged out during active usage  
**And** the token should be stored securely in the client

**Given** my token expires  
**When** I make an authenticated request  
**Then** I should be redirected to login  
**And** I should see a message "Session expired, please log in again"

---

## 6. Summary

This document provides comprehensive acceptance criteria for all critical user stories in the LearnHub LMS system. Each criterion follows the Given-When-Then format to ensure:

- **Clarity:** Stakeholders understand exactly what is expected
- **Testability:** QA team can create test cases directly from criteria
- **Completeness:** All scenarios including happy path, alternative flows, and error cases are covered
- **Traceability:** Each criterion maps to specific user stories

These acceptance criteria serve as the foundation for:
- Test case development
- Quality assurance validation
- Definition of done for sprint planning
- User acceptance testing (UAT)

The criteria ensure that all features meet user expectations and function correctly under various conditions before being released to production.
