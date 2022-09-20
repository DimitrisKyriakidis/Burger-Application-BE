const router = require('express').Router();
const routeName = '/api/users';
// const passport = require('passport');

// //Users ROUTE
// router.put('/forgotPassword', require('../apis/Users/forgotPassword'));
router.post('/login', require('../apis/Users/login'));



router.get('/getAllUsers', require('../apis/Users/getAllUsers'));
// router.get('/getUsersList', passport.authRoute(), require('../apis/Users/getUsersList'));
// router.post('/createUser', passport.authRoute(), require('../apis/Users/createUser'));
// router.post('/deleteUser', passport.authRoute(), require('../apis/Users/deleteUser'));



module.exports = { routeName, router };