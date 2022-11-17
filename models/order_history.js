module.exports = (sequelize, Sequelize) => {
    const order_history = sequelize.define(
        "ORDER_HISTORY", {
            order_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            history_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        }, {
            tableName: "ORDER_HISTORY",
            freezeTableName: true,
        }
    );
    return order_history;
};