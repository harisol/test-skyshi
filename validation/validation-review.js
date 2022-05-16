const { validationResult } = require("express-validator");

/** 
 * check validation result of express validator
 * @type {import("express").RequestHandler} 
 */
 module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const msgs = errors.array().map(err => err.msg);
    res.status(400).json({
        status: 'Bad Request',
        message: msgs[0]
    });
};
