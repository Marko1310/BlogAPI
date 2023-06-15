"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
const sequelize_1 = __importDefault(require("sequelize"));
const globallErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    const handleSequelizeErrors = (err) => {
        const errMessage = err.errors[0].message;
        return new appErrorServices_1.default(errMessage, 400);
    };
    const handleJWTError = () => {
        return new appErrorServices_1.default('Invalid token. Please log in again.', 401);
    };
    const handleJWTExpiredError = () => {
        return new appErrorServices_1.default('Token expired. Please log in again.', 401);
    };
    const sendErrorDev = (err, res) => {
        if (err instanceof sequelize_1.default.ValidationError) {
            res.status(err.statusCode).json({
                status: err.status,
                error: err,
                message: err.errors[0].message,
            });
        }
        else {
            res.status(err.statusCode).json({ status: err.status, error: err, message: err.message });
        }
    };
    const sendErrorProd = (err, res) => {
        // Operational error
        if (err.isOperational) {
            res.status(err.statusCode).json({ status: err.status, message: err.message });
        }
        else {
            // Programming error
            res.status(500).json({ status: 'error', message: 'Something went wrong' });
        }
    };
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        // Sequelize error
        if (err instanceof sequelize_1.default.ValidationError || err instanceof sequelize_1.default.UniqueConstraintError) {
            const seqError = handleSequelizeErrors(err);
            sendErrorProd(seqError, res);
        }
        if (err.name === 'JsonWebTokenError') {
            const jwtError = handleJWTError();
            sendErrorProd(jwtError, res);
            return;
        }
        if (err.name === 'TokenExpiredError') {
            const jwtExpiredError = handleJWTExpiredError();
            sendErrorProd(jwtExpiredError, res);
            return;
        }
        sendErrorProd(err, res);
    }
};
exports.default = globallErrorHandler;
