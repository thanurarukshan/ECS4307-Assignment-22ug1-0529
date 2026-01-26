import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Property extends Model {
    declare id: number;
    declare title: string;
    declare description: string;
    declare price: number;
    declare location: string;
    declare listingType: string;
    declare imageUrl: string;
    declare ownerId: number;
}

Property.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        listingType: {
            type: DataTypes.STRING, // 'sale', 'rent'
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'properties',
    }
);

export default Property;
