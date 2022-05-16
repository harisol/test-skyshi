const { Router } = require('express');
const agController = require('../controllers/activity-group.controller');
const todoController = require('../controllers/todo-items.controller');
const { validateCreateAg, validateUpdateAg } = require('../validation/activity-group.validation');
const { validateCreateTodo, validateUpdateTodo } = require('../validation/todo-items.validation');
const router = Router();

router.get('/', (_req, res) => {
    res.json({ message: `it works` });
});

router.get('/activity-groups', agController.list);
router.get('/activity-groups/:id', agController.detail);
router.post('/activity-groups', validateCreateAg, agController.create);
router.patch('/activity-groups/:id', validateUpdateAg, agController.update);
router.delete('/activity-groups/:pathId?', agController.remove);

router.get('/todo-items', todoController.list);
router.get('/todo-items/:id', todoController.detail);
router.post('/todo-items', validateCreateTodo, todoController.create);
router.patch('/todo-items/:id', validateUpdateTodo, todoController.update);
router.delete('/todo-items/:pathId?', todoController.remove);

module.exports = router;
