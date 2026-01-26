import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './config/database.js';
import { User, Course, Enrollment, Notification, CourseModule, ModuleProgress } from './models/index.js'; // Import to ensure associations are loaded

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', moduleRoutes); // Module routes include both /courses/:id/modules and /enrollments/:id/progress

app.get('/', (req, res) => {
    res.send('LearnHub API is running');
});

const startServer = async () => {
    await connectDB();

    // Sync models with database
    // force: false will not drop tables, safe for production
    await sequelize.sync({ force: false });
    console.log('Database synced');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();

