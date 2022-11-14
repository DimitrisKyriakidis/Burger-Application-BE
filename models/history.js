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
        }, {
            freezeTableName: true,
            tableName: tableName,
        }
    );

    history.associate = (Models) => {
        history.hasMany(Models.CheckoutOrders, {
            as: "historyOrders",
            foreignKey: "history_id",
            sourceKey: "id",
        });
    };

    return history;
};