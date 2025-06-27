const {constants} = require("../constants");

const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;
console.log("Error handler called with status code:", statusCode);
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({
                title: "Bad Request",
                message: err.message,
                stack: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;

        case constants.UNAUTHORIZED:
            res.status(statusCode).json({
                title: "Unauthorized access",
                message: err.message,
                stack: err.stack,
            });
            break;

        case constants.FORBIDDEN:
            res.status(statusCode).json({
                title: "Forbidden",
                message: err.message,
                stack: process.env.NODE_ENV === "production" ? null : err.stack,
            });;
            break;

        case constants.NOT_FOUND:
            res.status(statusCode).json({
                title: "Not found",
                message: err.message,
                stack: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;

        case constants.SERVER_ERROR:
            res.status(statusCode).json({
                title: "Internal Server Error",
                message: err.message,
                stack: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;


        default:
            console.log("No error, all good!");
            break;
    }


};
module.exports = errorHandler;