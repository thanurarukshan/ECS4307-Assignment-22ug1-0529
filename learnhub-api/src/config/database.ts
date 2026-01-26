import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Credentials for LearnHub EdTech LMS
const DB_NAME = process.env.DB_NAME || 'learnhub';
const DB_USER = process.env.DB_USER || 'learnhub';
const DB_PASS = process.env.DB_PASS || 'LearnHub2024!';
const DB_HOST = process.env.DB_HOST || 'localhost';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};
