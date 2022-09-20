const router = require('express').Router();
const routeName = '/api/burgers';


router.get('/getAllBurgers', require('../apis/burgers/getAllBurgers'));

router.post('/createOrder', require('../apis/burgers/createOrder'));








module.exports = { routeName, router };