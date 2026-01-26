import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Bid extends Model {
    declare id: number;
    declare amount: number;
    declare status: string;
    declare bidderId: number;
    declare propertyId: number;
}

Bid.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING, // 'pending', 'accepted', 'rejected'
            defaultValue: 'pending',
        },
        bidderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        propertyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'properties',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'bids',
    }
);

export default Bid;
