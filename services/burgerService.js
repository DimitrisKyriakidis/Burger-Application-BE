const { Model } = require('sequelize')

const Models = require('../database/DB').Models
const Op = require('sequelize').Op

class Burgers {
    async getAllBurgers() {
        return await Models.Order.findAll({
            include: [{
                as: 'ingredients',
                model: Models.Ingredients,
                include: {
                    as: 'ingredients_items',
                    model: Models.Ingredients_Items,
                },
            }, ],
        })
    }

    async createOrder(body) {
        let order = await Models.Order.create({})
        let ingredients_items
        let subTotalPrice

        body.forEach(async(element) => {
            let ingredients = await Models.Ingredients.create({
                ingredientCategory_name: element.category_name,
                order_id: order.id,
            })

            ingredients_items = await Models.Ingredients_Items.create({
                name: element.ingredient_name,
                price: element.price,
                quantity: element.quantity,
                ingredient_id: ingredients.ingredientCategory_id,
            })

            let allIngredientsItems = []
            allIngredientsItems.push(ingredients_items)
            subTotalPrice = allIngredientsItems.reduce((acc, item) => {
                console.log('VALUEEE==', item.dataValues)
                return acc + item.dataValues.price * item.dataValues.quantity
            }, 0)
            console.log('subTotalPrice', subTotalPrice)
        })

        console.log('body=', body)

        return body
    }
}

module.exports = { Burgers }