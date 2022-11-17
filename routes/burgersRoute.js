const router = require("express").Router();
const routeName = "/api/burgers";

router.get("/getAllBurgers", require("../apis/burgers/getAllBurgers"));

router.post("/createOrder", require("../apis/burgers/createOrder"));

router.put("/editOrder/:id", require("../apis/burgers/editOrder"));

router.delete("/deleteOrder/:id", require("../apis/burgers/deleteOrder"));

router.post(
    "/sendOrderToHistory",
    require("../apis/burgers/sendOrderToHistory")
);

router.get(
    "/getAllHistoryOrders",
    require("../apis/burgers/getAllHistoryOrders")
);

router.post(
    "/deleteHistoryOrders",
    require("../apis/burgers/deleteHistoryOrders")
);

module.exports = { routeName, router };