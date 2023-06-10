"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        res.json({
            email,
            password,
            firstName,
            lastName,
        });
    }
    catch (err) {
        console.log(err);
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        res.json({
            email,
            password,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = {
    register,
    login,
};
