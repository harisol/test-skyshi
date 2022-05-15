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

    // res.status(400).json({
    //     message: 'bad request',
    //     errors: errors.array().map(err => err.msg)
    // });

    res.status(400).json({
      status: 'Bad Request',
      message: errors.array().map(err => err.msg)[0],
      
      // "code": 400,
      // "className": "bad-request",
      // "data": {},
      // errors: errors.array().map(err => {
      //   return {
      //     "message": err.msg,
      //     "type": "notNull Violation",
      //     "path": "title",
      //     "value": null,
      //     "origin": "CORE",
      //     "instance": {
      //         "created_at": "2022-05-15T16:11:10.135Z",
      //         "updated_at": "2022-05-15T16:11:10.135Z",
      //         "id": null
      //     },
      //     "validatorKey": "is_null",
      //     "validatorName": null,
      //     "validatorArgs": []
      //   }
      // })
  });
};
