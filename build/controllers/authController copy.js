"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postBlog = async (req, res, next) => {
    const { title, content } = req.body;
    try {
    }
    catch (err) {
        return next(err);
    }
};
exports.default = { postBlog };
