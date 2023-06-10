"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globallErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    const sendErrorDev = (err, res) => {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
        });
    };
    const sendErrorProd = (err, res) => {
        // Operational error
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        else {
            // Programming error
            console.error('Error', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
            });
        }
    };
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res);
    }
};
exports.default = globallErrorHandler;
