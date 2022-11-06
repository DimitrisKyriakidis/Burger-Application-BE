const router = require("express").Router();
const routeName = "/api/burgers";

router.get("/getAllBurgers", require("../apis/burgers/getAllBurgers"));

router.post("/createOrder", require("../apis/burgers/createOrder"));

router.put("/editOrder/:id", require("../apis/burgers/editOrder"));

router.delete("/deleteOrder/:id", require("../apis/burgers/deleteOrder"));

module.exports = { routeName, router };