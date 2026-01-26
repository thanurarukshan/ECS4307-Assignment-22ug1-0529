import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Course extends Model {
    declare id: number;
    declare courseName: string;
    declare courseDescription: string;
    declare courseFee: number;
    declare category: string;
    declare courseType: string;
    declare courseThumbnail: string;
    declare instructorId: number;
    declare duration: string;
    declare level: string;
    declare maxStudents: number;
    declare enrolledStudents: number;
}

Course.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        courseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        courseFee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseType: {
            type: DataTypes.STRING, // 'free', 'paid', 'premium'
            allowNull: false,
            defaultValue: 'free',
        },
        courseThumbnail: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        instructorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '4 weeks',
        },
        level: {
            type: DataTypes.STRING, // 'beginner', 'intermediate', 'advanced'
            allowNull: false,
            defaultValue: 'beginner',
        },
        maxStudents: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50,
        },
        enrolledStudents: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'courses',
    }
);

export default Course;
