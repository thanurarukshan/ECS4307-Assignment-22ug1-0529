# Sequence Diagrams - LearnHub LMS

**Author:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis

---

## 1. Introduction

This document presents comprehensive sequence diagrams for key workflows in the LearnHub Learning Management System. Sequence diagrams show how objects interact over time to accomplish specific use cases.

## 2. User Registration Sequence

![User Registration Sequence](behavioral%20design%20-%20sequence%20diagram%20-%20user%20registration%20sequence.png)

## 3. User Login Sequence

![User Login Sequence](behavioral%20design%20-%20sequence%20diagram%20-%20user%20login%20sequence.png)

## 4. Create Course Sequence (Instructor)

![Create Course Sequence](behavioral%20design%20-%20sequence%20diagram%20-%20create%20course%20sequence.png)

## 5. Student Enrollment Request Sequence

![Student Enrollment Request Sequence](behavioral%20design%20-%20sequence%20diagram%20-%20student%20enrollment%20request%20sequence.png)

## 6. Enrollment Approval Sequence (Instructor)

![Enrollment Approval Sequence](behavioral%20design%20-%20sequence%20diagram%20-%20enrollment%20approval%20sequence.png)

## 7. Module Completion Sequence (Student)

![Module Completion Sequence](behavioral%20design%20-%20sequence%20diagram%20-%20module%20completion%20sequence.png)

## 8. Change Password Sequence

![Delete Password Sequence](behavioral%20design%20-%20sequence%20diagram%20-%20delete%20password%20sequence.png)

## 9. Delete Account Sequence

![Delete Account Sequence](behavioral%20design%20-%20sequence%20diagram%20-%20delete%20account%20sequence.png)

## 10. Summary

These sequence diagrams illustrate the key interactions in LearnHub LMS:

1. **Authentication:** Registration and login with JWT tokens
2. **Course Management:** Instructor creates courses
3. **Enrollment Workflow:** Student requests → Instructor approves → Student accesses
4. **Progress Tracking:** Module completion with automatic progress calculation
5. **Account Management:** Password changes and account deletion

All sequences demonstrate:
- Proper authentication and authorization
- Database integrity through validation
- Error handling for edge cases
- Notification system integration
- Cascade operations for data consistency

These diagrams align with the implemented codebase and provide clear documentation for developers and stakeholders.
