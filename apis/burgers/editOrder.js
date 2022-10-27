const logger = require("../../Logger/winstonLogger").logger;
const loggingPolicy = require("../../Logger/loggingPolicy").loggingPolicy;

const Burgers = require("../../services/burgerService").Burgers;
const apiName = "editOrder";

module.exports = async(req, res) => {
    try {
        logger.info(
            `Code: ${loggingPolicy.functionEnter.code}  ${apiName}  ${loggingPolicy.functionEnter.message}`
        );

        const burgerService = new Burgers();

        const id = req.params.id;

        const result = await burgerService.updateOrder(id, req.body);
        logger.info(
            `Code: ${loggingPolicy.successResponse.code},  ${apiName}  ${loggingPolicy.successResponse.message}`
        );
        res.status(200).send({
            message: "Burger Updated!!",
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