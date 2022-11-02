const hash = require("object-hash");

module.exports = (sequelize, Sequelize) => {
    const tableName = "INGREDIENTS";
    const ingredients = sequelize.define(
        tableName, {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            category: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            order_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            selected: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
        }, {
            freezeTableName: true,
            tableName: tableName,
        }
    );

    ingredients.associate = (Models) => {
        console.log("Models===", Models);
        ingredients.belongsTo(Models.Order, {
            as: "ingredients",
            foreignKey: "order_id",
            sourceKey: "id",
        });
    };

    // ingredients.associate = (Models) => {
    //     console.log('Models===', Models)
    //     ingredients.hasMany(Models.Ingredients_Items, {
    //         as: 'ingredients_items',
    //         foreignKey: 'ingredient_id',
    //         sourceKey: 'ingredientCategory_id',
    //     })
    // }

    return ingredients;
};