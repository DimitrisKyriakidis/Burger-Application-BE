const hash = require("object-hash");

module.exports = (sequelize, Sequelize) => {

    const tableName = 'BURGERS';
    const burgers = sequelize.define(tableName, {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        iconUrl: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.FLOAT,
        }


    }, {
        freezeTableName: true,
        tableName: tableName,
    });

    // burgers.associate = (Models) => {
    //     console.log("Models===", Models);
    //     burgers.hasMany(Models.Ingredients, {
    //         as: "ingredients",
    //     });
    // };


    burgers.seedData = async() => {
        const seedData = await require("../seeders/burgers");
        const dbData = (await burgers.findAll({ logging: false })).map(
            (el) => {
                el.toJSON();
            }
        );

        if (hash(dbData) !== hash(seedData)) {
            await burgers.destroy({ where: {} });
            await burgers.bulkCreate(seedData, { logging: false });
        }
    };

    return burgers;
};