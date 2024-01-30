import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../clients/db/database";

export class User extends Model {};

User.init(
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        extra: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            // defaultValue: DataTypes.NOW,
            allowNull: true
        },
    },
    {
       sequelize: sequelizeConnection,
       timestamps: true,
       modelName: "Users",
       tableName: "users" 
    }
);
