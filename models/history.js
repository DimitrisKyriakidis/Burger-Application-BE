const hash = require("object-hash");
const Models = require("../database/DB").Models;

module.exports = (sequelize, Sequelize) => {
    const tableName = "HISTORY";
    const history = sequelize.define(
        tableName, {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            totalPrice: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },

            deliveredDate: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()"),
            },
        }, {
            freezeTableName: true,
            tableName: tableName,
        }
    );

    history.associate = (Models) => {
        history.belongsToMany(Models.Order, {
            through: Models.Order_History,
            as: "historyOrders",
            foreignKey: "history_id",
        });
    };

    return history;
};