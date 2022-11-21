const { Model } = require("sequelize");
const uuid = require("uuid").v4;
const Models = require("../database/DB").Models;
const Op = require("sequelize").Op;
const Sequelize = require("sequelize");
const { sequelize } = require("../database/DB");

class Burgers {
    async getAllBurgers(searchString) {
        const whereOptions = {
            ...(!!searchString && {
                name: {
                    [Op.like]: `%${searchString}%`,
                },
            }),
        };

        return await Models.Order.findAll({
            include: [{
                as: "ingredients",
                model: Models.Ingredients,
            }, ],
            where: {...whereOptions },
            order: [
                ["creationDate", "DESC"]
            ],
        });
    }

    async createOrder(orderData) {
        for (const key in orderData) {
            if (orderData[key] === null) {
                delete orderData[key];
            }
        }

        let order = await Models.Order.create({
            id: uuid(),
            name: orderData.name ? orderData.name : null,
            comment: orderData.comment ? orderData.comment : null,
            progress: orderData.progress ? orderData.progress : null,
        });

        let createData = Object.keys(orderData)
            .map((key) => orderData[key])
            .filter(
                (val) =>
                val !== null && typeof val !== "string" && typeof val !== "number"
            );

        createData.forEach(async(element) => {
            await Models.Ingredients.create({
                category: element.category ? element.category : null,
                name: element.name ? element.name : null,
                price: element.price ? element.price : null,
                order_id: order.id,
                selected: element.selected ? element.selected : null,
            });
        });
        let orderPrice = 0;
        await Promise.all(createData).then(async(value) => {
            orderPrice = value.reduce((acc, item) => {
                return acc + item.price;
            }, 0);

            await Models.Order.update({ orderPrice: orderPrice }, {
                where: {
                    id: order.id,
                },
            });
        });

        return {...createData, orderPrice };
    }

    async updateOrder(id, body) {
        await Models.Order.update({
            id: id,

            comment: body.comment ? body.comment : null,
            progress: body.progress ? body.progress : null,
        }, {
            where: {
                id: id,
            },
        });
        let updateData = Object.keys(body)
            .map((key) => body[key])
            .filter(
                (val) =>
                val !== null && typeof val !== "string" && typeof val !== "number"
            );

        //for update we need to destroy the existing ingredients and then create again in order to avoid database errors
        await Models.Ingredients.destroy({
            where: {
                order_id: id,
            },
        });
        updateData.forEach(async(element) => {
            await Models.Ingredients.create({
                category: element.category,
                name: element.name,
                price: element.price,
                selected: element.selected,
                order_id: id,
            }, {
                where: {
                    id: id,
                },
            });
        });

        calculateOrderPrice(updateData, id);

        return {...updateData, ...calculateOrderPrice(updateData, id) };
    }

    async deleteOrder(id) {
        return await Models.Order.destroy({
            where: {
                id: id,
            },
        });
    }

    async sendOrderToHistory(data) {
        console.log(data);
        const orderHistory = await Models.History.create({
            totalPrice: data.totalPrice,
        });
        for (let item of data.shoppingCartData) {
            await Models.Order_History.create({
                order_id: item.id,
                quantity: item.quantity,
                history_id: orderHistory.id,
            });
        }
    }

    async getAllHistoryOrders(searchString) {
        const whereOptions = {
            ...(!!searchString && {
                id: {
                    [Op.like]: `%${searchString}%`,
                },
            }),
        };
        return await Models.History.findAll({
            include: [{
                as: "historyOrders",
                model: Models.Order,
                include: [{
                    as: "ingredients",
                    model: Models.Ingredients,
                }, ],
            }, ],
            where: {...whereOptions },
            order: [
                ["deliveredDate", "DESC"]
            ],
        });
    }
    async deleteHistoryOrders(historyIds) {
        historyIds.forEach(async(id) => {
            await Models.History.destroy({
                where: {
                    id: id,
                },
            });
        });
    }
}

const calculateOrderPrice = async(data, id) => {
    let orderPrice = 0;
    await Promise.all(data).then(async(value) => {
        orderPrice = value.reduce((acc, item) => {
            return acc + item.price;
        }, 0);

        await Models.Order.update({ orderPrice: orderPrice }, {
            where: {
                id: id,
            },
        });
    });
    return orderPrice;
};

module.exports = { Burgers };