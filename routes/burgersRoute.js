const router = require("express").Router();
const routeName = "/api/burgers";

router.get("/getAllBurgers", require("../apis/burgers/getAllBurgers"));

router.post("/createOrder", require("../apis/burgers/createOrder"));

router.put("/editOrder/:id", require("../apis/burgers/editOrder"));

module.exports = { routeName, router };