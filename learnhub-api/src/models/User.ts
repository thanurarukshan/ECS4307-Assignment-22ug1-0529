import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class User extends Model {
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;
    declare role: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING, // 'user', 'admin'
            defaultValue: 'user',
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

export default User;
