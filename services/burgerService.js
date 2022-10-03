const { Model } = require('sequelize')
const uuid = require('uuid').v4
const Models = require('../database/DB').Models
const Op = require('sequelize').Op

class Burgers {
    async getAllBurgers() {
        return await Models.Order.findAll({
            include: [{
                as: 'ingredients',
                model: Models.Ingredients,
            }, ],
        })
    }

    async createOrder(orderData) {
        console.log("orderData==", orderData);
        let order = await Models.Order.create({ id: uuid() })
        let ingredients_items
            //let tempObj = Object.keys(orderData).map((key) => orderData[key])
        orderData.forEach(async(element) => {
            let ingredients = await Models.Ingredients.create({
                category: element.category,
                name: element.name,
                price: element.price,
                order_id: order.id,
            })

            // ingredients_items = await Models.Ingredients_Items.create({

            //     name: element.ingredient_name,
            //     price: element.price,
            //     quantity: element.quantity,
            //     ingredient_id: ingredients.ingredientCategory_id,
            // })
        })
        let orderPrice = 0
        await Promise.all(orderData).then(async(value) => {
            orderPrice = value.reduce((acc, item) => {
                return acc + item.price
            }, 0)
            await Models.Order.update({ orderPrice: orderPrice }, {
                where: {
                    id: order.id,
                },
            }, )
        })

        return {...orderData, orderPrice }
    }
}

module.exports = { Burgers }