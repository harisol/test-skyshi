const { Router } = require('express');
const agController = require('../controllers/activity-group.controller');
const { validateCreateAg, validateUpdateAg } = require('../validation/activity-group.validation');

const router = Router();

router.get('/', (_req, res) => {
    res.json({ message: `it works` });
});

router.get('/activity-groups', agController.list);
router.get('/activity-groups/:id', agController.detail);
router.post('/activity-groups', validateCreateAg, agController.create);
router.patch('/activity-groups/:id', validateUpdateAg, agController.update);
router.delete('/activity-groups/:pathId?', agController.remove);

module.exports = router;
