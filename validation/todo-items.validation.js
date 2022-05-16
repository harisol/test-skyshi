const { body } = require('express-validator');
const { TodoItem } = require('../database/models');
const validationReview = require('./validation-review');

exports.validateCreateTodo = [
    body('activity_group_id')
        .notEmpty()
        .withMessage('activity_group_id cannot be null')
        .bail()
        .isInt()
        .withMessage('activity_group_id must be number'),
    body('title')
        .notEmpty()
        .withMessage('title cannot be null'),
    body('priority')
        .if(body('priority').notEmpty())
        .isIn(TodoItem.enumPriority)
        .withMessage('invalid priority value'),
    validationReview
];
 
exports.validateUpdateTodo = [
    body('is_active')
        .if(body('is_active').notEmpty())
        .isIn([true, false])
        .withMessage('is_active must be 1 or 0'),
    body('title')
        .if(body('title').notEmpty())
        .notEmpty()
        .withMessage('title cannot be null'),
    body('priority')
        .if(body('priority').notEmpty())
        .isIn(TodoItem.enumPriority)
        .withMessage('invalid priority value'),
    validationReview
];
 