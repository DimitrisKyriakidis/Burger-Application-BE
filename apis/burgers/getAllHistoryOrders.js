const logger = require("../../Logger/winstonLogger").logger;
const loggingPolicy = require("../../Logger/loggingPolicy").loggingPolicy;
const paginator = require("../../utils/paginator");
const Burgers = require("../../services/burgerService").Burgers;
const apiName = "getAllHistoryOrders";

module.exports = async(req, res) => {
    try {
        logger.info(
            `Code: ${loggingPolicy.functionEnter.code}  ${apiName}  ${loggingPolicy.functionEnter.message}`
        );

        let burgerService = new Burgers();
        const result = await burgerService.getAllHistoryOrders();

        logger.info(
            `Code: ${loggingPolicy.successResponse.code},  ${apiName}  ${loggingPolicy.successResponse.message}`
        );
        res.status(200).send({
            message: "History Orders retrivied!!",
            data: result,
        });
    } catch (err) {
        logger.error(
            `Code: ${loggingPolicy.catchError.code},  ${apiName}  ${loggingPolicy.catchError.message}`
        );
        return res
            .status(400)
            .send({ message: "Sorry, something went wrong: " + err });
    }
};