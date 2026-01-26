import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Enrollment extends Model {
    declare id: number;
    declare paymentAmount: number;
    declare enrollmentStatus: string;
    declare studentId: number;
    declare courseId: number;
    declare enrollmentDate: Date;
    declare progressPercent: number;
    declare completionDate: Date | null;
    declare certificateIssued: boolean;
}

Enrollment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        paymentAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        enrollmentStatus: {
            type: DataTypes.STRING, // 'pending', 'enrolled', 'rejected'
            defaultValue: 'pending',
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'courses',
                key: 'id',
            },
        },
        enrollmentDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        progressPercent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        completionDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        certificateIssued: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'enrollments',
    }
);

export default Enrollment;
