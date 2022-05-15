const { body } = require('express-validator');
const validationReview = require('./validation-review');

exports.validateCreateAg = [
    body('title')
        .notEmpty()
        .withMessage('title cannot be null'),
    body('email')
        .notEmpty()
        .withMessage('email cannot be null')
        .bail() // continue only when previous check is valid
        .isString()
        .withMessage('email must be a string'),
    validationReview
];
 
exports.validateUpdateAg = [
    body('title')
        .notEmpty()
        .withMessage('title cannot be null'),
    validationReview
];
 