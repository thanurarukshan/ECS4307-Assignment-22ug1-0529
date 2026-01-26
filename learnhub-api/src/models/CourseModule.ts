import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

interface CourseModuleAttributes {
    id: number;
    courseId: number;
    title: string;
    description?: string;
    orderIndex: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CourseModuleCreationAttributes extends Optional<CourseModuleAttributes, 'id' | 'description' | 'orderIndex'> { }

class CourseModule extends Model<CourseModuleAttributes, CourseModuleCreationAttributes> implements CourseModuleAttributes {
    public id!: number;
    public courseId!: number;
    public title!: string;
    public description?: string;
    public orderIndex!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CourseModule.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'courses',
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        orderIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'course_modules',
        timestamps: true,
    }
);

export default CourseModule;
