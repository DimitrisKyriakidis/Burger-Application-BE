const hash = require("object-hash");

module.exports = (sequelize, Sequelize) => {

    const tableName = 'INGREDIENTS_ITEMS';
    const ingredients_items = sequelize.define(tableName, {
        id: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,

        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true,

        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        ingredient_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }



    }, {
        freezeTableName: true,
        tableName: tableName,
    });

    ingredients_items.associate = (Models) => {
        console.log("Models===", Models);
        ingredients_items.belongsTo(Models.Ingredients, {
            as: "ingredients_items",
            foreignKey: "ingredient_id",
            sourceKey: "id",
        });
    };

    return ingredients_items;
};