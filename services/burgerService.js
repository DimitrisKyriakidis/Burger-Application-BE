const { Model } = require("sequelize");
const uuid = require("uuid").v4;
const Models = require("../database/DB").Models;
const Op = require("sequelize").Op;

class Burgers {
    async getAllBurgers() {
        return await Models.Order.findAll({
            include: [{
                as: "ingredients",
                model: Models.Ingredients,
            }, ],
        });
    }

    async createOrder(orderData) {
        // if (typeof(orderData) === "string") { orderData = JSON.parse(orderData) }
        console.log("orderData==", orderData);
        let order = await Models.Order.create({
            id: uuid(),
            comment: orderData.comment ? orderData.comment : null,
        });

        let createData = Object.keys(orderData)
            .map((key) => orderData[key])
            .filter((val) => val !== null);

        console.log("createData", createData);
        createData.forEach(async(element) => {
            let ingredients = await Models.Ingredients.create({
                category: element.category ? element.category : null,
                name: element.name ? element.name : null,
                price: element.price ? element.price : null,
                order_id: order.id,
            });
        });
        let orderPrice = 0;
        await Promise.all(createData).then(async(value) => {
            console.log("promiseValue=", value);
            orderPrice = value.reduce((acc, item) => {
                return acc + item.price;
            }, 0);

            console.log("orderPrice==", orderPrice);
            await Models.Order.update({ orderPrice: orderPrice }, {
                where: {
                    id: order.id,
                },
            });
        });

        return {...createData, orderPrice };
    }

    async updateOrder(id, body) {
        let order = await Models.Order.update({
            id: id,

            comment: body.comment,
        }, {
            where: {
                id: id,
            },
        });
        let updateData = Object.keys(body)
            .map((key) => body[key])
            .filter((val) => val !== null);

        console.log("updateData", updateData);
        updateData.forEach(async(element) => {
            let ingredients = await Models.Ingredients.update({
                category: element.category ? element.category : null,
                name: element.name ? element.name : null,
                price: element.price ? element.price : null,
                order_id: id,
            }, {
                where: {
                    id: id,
                },
            });
        });
        calculateOrderPrice(updateData);

        return {...updateData, ...calculateOrderPrice(updateData) };
    }
}

const calculateOrderPrice = async(data) => {
    let orderPrice = 0;
    await Promise.all(data).then(async(value) => {
        console.log("promiseValue=", value);
        orderPrice = value.reduce((acc, item) => {
            return acc + item.price;
        }, 0);

        console.log("orderPrice==", orderPrice);
        await Models.Order.update({ orderPrice: orderPrice }, {
            where: {
                id: order.id,
            },
        });
    });
    return orderPrice;
};
// async function calculateOrderPrice(data) {
//     let orderPrice = 0;
//     await Promise.all(data).then(async(value) => {
//         console.log("promiseValue=", value);
//         orderPrice = value.reduce((acc, item) => {
//             return acc + item.price;
//         }, 0);

//         console.log("orderPrice==", orderPrice);
//         await Models.Order.update({ orderPrice: orderPrice }, {
//             where: {
//                 id: order.id,
//             },
//         });
//     });
// }

module.exports = { Burgers };