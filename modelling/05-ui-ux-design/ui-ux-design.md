# UI/UX Design - LearnHub LMS

**Author:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis

---

## 1. Introduction

This document presents the comprehensive UI/UX design for the LearnHub Learning Management System, including mockups for key interfaces, navigation flow, and usability principles applied throughout the system.

## 2. UI Mockups

### 2.1 Login Page

![Login Page](mockups/login-page.png)

**Features:**
- Clean, centered login form
- LearnHub branding with logo
- Email and password inputs with icons
- Blue gradient "Login" button
- "Register" and "Forgot Password?" links
- Minimalist design with light background

**Design Rationale:**
- Reduces friction in authentication process
- Clear call-to-action with prominent login button
- Professional education theme
- Mobile-responsive design

---

### 2.2 Student Dashboard

![Student Dashboard](mockups/student-dashboard.png)

**Features:**
- Top navigation bar with logo,  search, and user menu
- "My Enrolled Courses" heading
- Grid layout of course cards
- Each card shows:
  - Course thumbnail
  - Course title
  - Progress bar with percentage
  - "Course Completed" badge (when 100%)
  - "Continue" or "View Certificate" button
- Notification bell icon
- Clean card-based design with shadows

**Design Rationale:**
- Visual progress indicators motivate students
- Grid layout provides quick overview
- Completion badges provide sense of achievement
- Easy navigation to course content

---

### 2.3 Instructor Dashboard

![Instructor Dashboard](mockups/instructor-dashboard.png)

**Features:**
- "My Courses" section with course cards
- "Create New Course" button (prominent blue)
- "Pending Enrollments" table showing:
  - Student name
  - Course name
  - Date requested
  - Approve/Reject buttons (green/red)
- "Enrollment Statistics" chart
- "Notification Panel" with recent alerts
- Professional educator theme

**Design Rationale:**
- Separate sections for courses and enrollment management
- Clear action buttons for enrollment decisions
- Visual analytics provide course insights
- Centralized notification management

---

### 2.4 Course Management Interface

![Course Management](mockups/course-management.png)

**Features:**
- Form sections:
  - Course Name input
  - Description textarea
  - Category dropdown
  - Level selector (Beginner/Intermediate/Advanced)
  - Duration and Fee inputs
  - Thumbnail upload with preview
- "Course Structure" section:
  - List of modules
  - Each module shows title, description
  - Edit/Delete buttons per module
  - Reorder handles (drag-and-drop visual)
  - "Add Module" button
- "Save Draft" and "Publish Course" buttons

**Design Rationale:**
- Organized form layout reduces cognitive load
- Visual module management simplifies course structure
- Drag-and-drop interface for module ordering
- Clear distinction between save and publish actions

---

### 2.5 Notifications Center

![Notifications](mockups/notifications.png)

**Features:**
- "NOTIFICATIONS" heading
- List of notification items
- Each notification shows:
  - Icon (bell, checkmark, info)
  - Notification message
  - Timestamp
- Unread notifications highlighted (light blue background)
- Read notifications on white background
- Clean, organized list layout

**Design Rationale:**
- Visual distinction between read/unread
- Icons provide quick categorization
- Chronological order with timestamps
- Minimal design reduces distraction

---

## 3. Navigation Flow

![Navigation Flow](uiux%20design%20-%20navigation%20flow.png)

### 3.1 Key Navigation Patterns

**Global Navigation:**
- Logo (top-left) → Always returns to dashboard/home
- User menu (top-right) → Profile, settings, logout
- Notification bell → Notifications center

**Student Navigation:**
- Dashboard → Enrolled courses
- Browse → Course catalog
- Course card → Course details & modules

**Instructor Navigation:**
- Dashboard → My courses & pending enrollments
- Create Course → Course creation form
- Course card → Edit course & manage modules

---

## 4. Usability Principles

### 4.1 Nielsen's 10 Usability Heuristics

#### 1. Visibility of System Status
✅ **Implementation:**
- Progress bars show learning progress
- Loading indicators during API calls
- Success/error messages after actions
- Enrollment status badges (pending, enrolled, rejected)

#### 2. Match Between System and Real World
✅ **Implementation:**
- Educational metaphors (courses, modules, enrollment)
- "Enroll" instead of "subscribe"
- "Dashboard" instead of "control panel"
- Natural language error messages

#### 3. User Control and Freedom
✅ **Implementation:**
- Back buttons on all pages
- Cancel options in forms
- Ability to delete account
- Undo-friendly (modules can be recompleted)

#### 4. Consistency and Standards
✅ **Implementation:**
- Consistent color scheme (blue primary, green success, red error)
- Standard button placements
- Uniform card layouts
- Consistent typography

#### 5. Error Prevention
✅ **Implementation:**
- Client-side form validation
- Confirmation dialogs for destructive actions (delete account/course)
- Disabled buttons when forms incomplete
- Maximum course capacity checks

#### 6. Recognition Rather Than Recall
✅ **Implementation:**
- Visible course progress percentages
- Module completion checkboxes
- Breadcrumb navigation
- Visible notification count

#### 7. Flexibility and Efficiency of Use
✅ **Implementation:**
- Search and filter for courses
- Quick-action buttons on cards
- Keyboard navigation support
- Responsive design for multiple devices

#### 8. Aesthetic and Minimalist Design
✅ **Implementation:**
- Clean, uncluttered interfaces
- White space for readability
- Focused content per page
- Card-based layouts

#### 9. Help Users Recognize, Diagnose, and Recover from Errors
✅ **Implementation:**
- Clear error messages ("Username already exists")
- Suggestions for recovery
- Validation feedback inline
- Error highlighting on form fields

#### 10. Help and Documentation
⚠️ **Future Enhancement:**
- Inline help tooltips
- FAQ section
- User guide
- Video tutorials

### 4.2 Accessibility Considerations

**Current Implementation:**
- Semantic HTML structure
- Sufficient color contrast ratios
- Form labels properly associated with inputs
- Keyboard navigation support

**Future Enhancements:**
- ARIA labels for screen readers
- Alt text for all images
- Focus indicators
- WCAG 2.1 AA compliance

### 4.3 Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Responsive Strategies:**
- Tailwind CSS utility classes
- Flexbox and Grid layouts
- Mobile-first approach
- Touch-friendly buttons (min 44px)

---

## 5. Design System

### 5.1 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #2196F3 | Buttons, links, student theme |
| Secondary Orange | #FF9800 | Instructor theme, accents |
| Success Green | #4CAF50 | Completion badges, approve buttons |
| Error Red | #F44336 | Error messages, reject buttons |
| Warning Yellow | #FFC107 | Pending status |
| Neutral Gray | #757575 | Text, borders |
| Background | #F5F5F5 | Page background |
| White | #FFFFFF | Cards, forms |

### 5.2 Typography

**Fonts:**
- Headings: System fonts (San Francisco, Segoe UI, Roboto)
- Body: System fonts
- Code: Monospace (Consolas, Monaco)

**Sizes:**
- H1: 2.5rem (40px)
- H2: 2rem (32px)
- H3: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)

### 5.3 Components

**Buttons:**
- Primary: Blue background, white text, rounded corners
- Secondary: Outlined, transparent background
- Danger: Red background, white text
- Sizes: Small (32px), Medium (40px), Large (48px)

**Cards:**
- White background
- Subtle shadow (0 2px 4px rgba(0,0,0,0.1))
- Rounded corners (8px)
- Padding: 16px - 24px

**Forms:**
- Input height: 40px
- Border: 1px solid #E0E0E0
- Focus: Blue border
- Error: Red border with error message

---

## 6. User Experience Enhancements

### 6.1 Micro-interactions
- Button hover effects
- Progress bar animations
- Card hover lift effect
- Smooth page transitions

### 6.2 Feedback Mechanisms
- Toast notifications for actions
- Loading spinners
- Success animations
- Error shaking effect

### 6.3 Progressive Disclosure
- Course details revealed on click
- Module descriptions expandable
- Advanced filters collapsible

---

## 7. Conclusion

The LearnHub LMS UI/UX design prioritizes:
- **Clarity:** Clear visual hierarchy and information architecture
- **Consistency:** Uniform design patterns across all pages
- **Efficiency:** Minimal clicks to accomplish tasks
- **Accessibility:** Designed for diverse users and devices
- **Aesthetics:** Modern, professional appearance appropriate for education

The mockups demonstrate a clean, professional interface that supports both student learning journeys and instructor course management workflows. The design adheres to established usability principles and provides a solid foundation for future enhancements.
