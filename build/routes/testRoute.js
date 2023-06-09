"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// routes
router.get('/', (req, res) => {
    res.status(200).json('Hello from the server');
});
module.exports = router;
