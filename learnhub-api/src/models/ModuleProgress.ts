import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

interface ModuleProgressAttributes {
    id: number;
    enrollmentId: number;
    moduleId: number;
    completed: boolean;
    completedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ModuleProgressCreationAttributes extends Optional<ModuleProgressAttributes, 'id' | 'completed' | 'completedAt'> { }

class ModuleProgress extends Model<ModuleProgressAttributes, ModuleProgressCreationAttributes> implements ModuleProgressAttributes {
    public id!: number;
    public enrollmentId!: number;
    public moduleId!: number;
    public completed!: boolean;
    public completedAt?: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ModuleProgress.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        enrollmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'enrollments',
                key: 'id'
            }
        },
        moduleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'course_modules',
                key: 'id'
            }
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        completedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'module_progress',
        timestamps: true,
    }
);

export default ModuleProgress;
