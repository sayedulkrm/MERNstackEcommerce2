const ErrorHandler = require('../utils/errorHander');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"; 

      // Validation Error
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message).join(", ");
            err = new ErrorHandler(message, 400);
        }

    // Wrong MongoDB id Error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err= new ErrorHandler(message, 400);
    }

    // Moongose Duplicate Key Error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err= new ErrorHandler(message, 400);

    }

    // Wrong  JWT Error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again`;
        err= new ErrorHandler(message, 400);
    }

    //  JWT Expire Error
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is expired, Try again`;
        err= new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}