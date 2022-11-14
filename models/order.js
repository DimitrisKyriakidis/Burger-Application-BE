const hash = require("object-hash");
const Models = require("../database/DB").Models;

module.exports = (sequelize, Sequelize) => {
    const tableName = "ORDER";
    const order = sequelize.define(
        tableName, {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            orderPrice: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            comment: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            progress: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            status: {
                type: Sequelize.ENUM,
                values: ["Pending", "Completed"],
                defaultValue: "Pending",
            },

            creationDate: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()"),
            },
        }, {
            freezeTableName: true,
            tableName: tableName,
        }
    );

    order.associate = (Models) => {
        order.hasMany(Models.Ingredients, {
            as: "ingredients",
            foreignKey: "order_id",
            sourceKey: "id",
        });
    };

    // order.associate = (Models) => {
    //     order.hasOne(Models.OrderHistory, {
    //         as: "orders",
    //         foreignKey: "order_id",
    //         sourceKey: "id",
    //         onDelete: "cascade",
    //         hooks: true,
    //     });
    // };

    order.seedData = async() => {
        const seedData = await require("../seeders/orders");
        const dbData = (await order.findAll({ logging: false })).map((el) => {
            el.toJSON();
        });

        const seedDataIngredients = await require("../seeders/ingredients");
        if (hash(dbData) !== hash(seedData)) {
            await order.destroy({ where: {} });
            await order.bulkCreate(seedData, { logging: false });
            await sequelize.models.INGREDIENTS.bulkCreate(seedDataIngredients, {
                logging: false,
            });
        }
    };

    return order;
};