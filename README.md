# LearnHub - Learning Management System

LearnHub is a comprehensive Learning Management System (LMS) built with modern web technologies. It enables instructors to create courses with structured modules and allows students to enroll, track progress, and complete courses with an intuitive interface.

## 🌟 Features

### For Instructors
- **Course Management**: Create, edit, and delete courses
- **Module Creation**: Structure courses into modules with titles and descriptions
- **Enrollment Management**: Review and approve/reject student enrollment requests
- **Student Analytics**: Track student progress and completion rates
- **Course Customization**: Set course fees, difficulty levels, duration, and capacity

### For Students
- **Course Discovery**: Browse and search courses by category, level, and type
- **Enrollment System**: Request enrollment in courses with payment submission
- **Progress Tracking**: Mark modules as complete and track overall progress
- **Completion Badges**: Earn "Course Completed" badges upon finishing all modules
- **Dashboard**: View all enrolled courses with real-time progress percentages
- **Profile Management**: View and edit user profile information
- **Password Management**: Change password securely
- **Account Management**: Delete account with password confirmation

### System Features
- **Authentication**: Secure JWT-based authentication system
- **Role-Based Access**: Separate views and permissions for students and instructors
- **Real-time Updates**: Progress updates reflect immediately across the system
- **Notifications**: Get notified about enrollment status changes
- **Responsive Design**: Modern, mobile-friendly UI with gradient themes

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** with React 19
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Sequelize ORM** with MySQL
- **JWT** for authentication
- **bcryptjs** for password hashing

### Database
- **MySQL 8.0**
- Comprehensive schema with 6 core tables
- Foreign key constraints and relationships

## 📁 Project Structure

```
softwareTestingAndQA/
├── learnhub-api/              # Backend API
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── models/           # Sequelize models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth middleware
│   │   ├── config/           # Database config
│   │   └── app.ts            # Express app entry
│   ├── Dockerfile
│   └── package.json
├── learnhub-frontend/         # Frontend  application
│   ├── app/                  # Next.js app directory
│   │   ├── courses/         # Course pages
│   │   ├── dashboard/       # User dashboard
│   │   ├── add-course/      # Course creation
│   │   ├── edit-course/     # Course editing
│   │   ├── profile/         # User profile page
│   │   ├── change-password/ # Password change page
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   └── page.tsx         # Home/landing page
│   ├── components/          # Reusable components
│   ├── lib/                 # Utilities (API client)
│   ├── Dockerfile
│   └── package.json
├── db/                       # Database files
│   ├── learnhub_schema_fresh.sql  # Fresh DB schema
│   └── dbsetup.txt          # Setup instructions
├── docker-compose.yml        # Docker orchestration
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ and npm
- **MySQL** 8.0+
- **Docker** and Docker Compose (optional)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd softwareTestingAndQA
   ```

2. **Set up the database**
   ```bash
   # Create database
   mysql -u root -p -e "CREATE DATABASE learnhub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   
   # Import schema
   mysql -u root -p learnhub < db/learnhub_schema_fresh.sql
   ```

3. **Configure backend**
   ```bash
   cd learnhub-api
   
   # Create .env file
   cat > .env << EOF
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=learnhub
   DB_USER=root
   DB_PASS=Hello_there123
   JWT_SECRET=learnhub_secret_key_2024
   PORT=5000
   EOF
   
   # Install dependencies
   npm install
   
   # Build and start
   npm run build
   npm run dev
   ```

4. **Configure frontend**
   ```bash
   cd ../learnhub-frontend
   
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:5000

### Docker Deployment

1. **Start all services**
   ```bash
   docker compose up -d
   ```

2. **Check service status**
   ```bash
   docker compose ps
   ```

3. **View logs**
   ```bash
   docker compose logs -f
   ```

4. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:5000
   - MySQL: localhost:3307

5. **Stop services**
   ```bash
   docker compose down
   ```

6. **Reset everything (including database)**
   ```bash
   docker compose down -v
   docker compose up -d
   ```

## 📊 Database Schema

### Tables
- **users**: User accounts (students, instructors)
- **courses**: Course information
- **course_modules**: Course content modules
- **enrollments**: Student enrollments
- **module_progress**: Module completion tracking
- **notifications**: System notifications

See `db/dbsetup.txt` for detailed schema information.

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (auth required)
- `PUT /api/auth/profile` - Update user profile (auth required)
- `PUT /api/auth/password` - Change password (auth required)
- `DELETE /api/auth/profile` - Delete account (auth required)

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (auth required)
- `PUT /api/courses/:id` - Update course (auth required)
- `DELETE /api/courses/:id` - Delete course (auth required)

### Modules
- `GET /api/courses/:courseId/modules` - Get course modules
- `POST /api/courses/:courseId/modules` - Create module (auth required)
- `PUT /api/modules/:id` - Update module (auth required)
- `DELETE /api/modules/:id` - Delete module (auth required)

### Enrollments
- `POST /api/enrollments` - Request enrollment (auth required)
- `GET /api/enrollments/my-enrollments` - Get student enrollments (auth required)
- `GET /api/enrollments/course/:courseId` - Get course enrollments (auth required)
- `PUT /api/enrollments/:id/approve` - Approve enrollment (auth required)
- `PUT /api/enrollments/:id/reject` - Reject enrollment (auth required)

### Progress Tracking
- `POST /api/enrollments/:enrollmentId/modules/:moduleId/complete` - Mark module complete (auth required)
- `GET /api/enrollments/:enrollmentId/progress` - Get progress (auth required)

## 🎨 UI Features

- **Modern Design**: Clean, professional interface with gradient accents
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Progress Visualization**: Interactive progress bars and completion badges
- **Real-time Updates**: Auto-refresh on window focus
- **Role-Based UI**: Different views for students and instructors
- **Interactive Modules**: Checkbox-based module completion

## 🧪 Testing

### Run API Tests
```bash
# From project root
./test_learnhub_api.sh
```

### Manual Testing Checklist
See `brain/comprehensive_test_plan.md` for detailed testing procedures covering:
- Authentication flows
- Course creation and management
- Enrollment workflows
- Module completion tracking
- Dashboard functionality

## 📝 Development

### Backend Development
```bash
cd learnhub-api
npm run dev        # Start with hot reload
npm run build      # Build TypeScript
npm start          # Start production build
```

### Frontend Development
```bash
cd learnhub-frontend
npm run dev        # Start development server
npm run build      # Create production build
npm start          # Start production server
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running: `systemctl status mysql`
- Check credentials in `.env` file
- Ensure database exists: `SHOW DATABASES;`

### Docker Issues
- Check logs: `docker compose logs <service-name>`
- Restart services: `docker compose restart`
- Reset everything: `docker compose down -v && docker compose up -d`

### Port Conflicts
- Backend (5000): Change `PORT` in `.env`
- Frontend (3001): Change port in `package.json` dev script
- MySQL (3307): Change port mapping in `docker-compose.yml`

## 📦 Production Deployment

### Build for Production
```bash
# Backend
cd learnhub-api
npm run build

# Frontend
cd learnhub-frontend
npm run build
```

### Environment Variables
Ensure all production environment variables are set:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`
- `JWT_SECRET` (use a strong secret)
- `NODE_ENV=production`

### Docker Production
```bash
docker compose -f docker-compose.yml up -d --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of academic coursework for ECS4308 - Software Testing and QA.

## 👥 Authors

- **Student ID:** 22ug1-0529
- **Name:** T.R.S. Wickramarathna
- **Course:** ECS4308 - Software Testing and Quality Assurance

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Sequelize for ORM functionality
- Tailwind CSS for styling utilities
- Lucide for beautiful icons

---

**Version:** 2.0.0  
**Last Updated:** January 2026  
**Status:** ✅ Production Ready
