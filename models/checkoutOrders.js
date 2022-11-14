const hash = require("object-hash");
const Models = require("../database/DB").Models;

module.exports = (sequelize, Sequelize) => {
    const tableName = "CHECKOUT_ORDERS";
    const checkoutOrders = sequelize.define(
        tableName, {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            history_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        }, {
            freezeTableName: true,
            tableName: tableName,
        }
    );

    checkoutOrders.associate = (Models) => {
        checkoutOrders.belongsTo(Models.History, {
            as: "historyOrders",
            foreignKey: "history_id",
            sourceKey: "id",
        });
    };

    return checkoutOrders;
};