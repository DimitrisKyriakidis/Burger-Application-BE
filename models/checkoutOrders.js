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
            order_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            history_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: "Completed",
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

    checkoutOrders.associate = (Models) => {
        checkoutOrders.belongsTo(Models.Order, {
            as: "orders",
            foreignKey: "order_id",
            sourceKey: "id",
        });
        checkoutOrders.belongsTo(Models.History, {
            as: "historyOrders",
            foreignKey: "history_id",
            sourceKey: "id",
        });
    };

    return checkoutOrders;
};