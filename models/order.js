const hash = require('object-hash')

module.exports = (sequelize, Sequelize) => {
    const tableName = 'ORDER_CATEGORY'
    const order = sequelize.define(
        tableName, {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },

            orderPrice: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
        }, {
            freezeTableName: true,
            tableName: tableName,
        },
    )

    order.associate = (Models) => {
        console.log('Models===', Models)
        order.hasMany(Models.Ingredients, {
            as: 'ingredients',
            foreignKey: 'order_id',
            sourceKey: 'id',
        })
    }

    return order
}