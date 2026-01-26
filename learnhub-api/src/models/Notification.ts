import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Notification extends Model {
    declare id: number;
    declare userId: number;
    declare type: string;
    declare message: string;
    declare relatedId: number;
    declare isRead: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Notification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        type: {
            type: DataTypes.STRING, // 'bid_placed', 'bid_accepted', 'bid_rejected'
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        relatedId: {
            type: DataTypes.INTEGER, // bidId or propertyId
            allowNull: true,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'notifications',
    }
);

export default Notification;
