const router = require('express').Router();
const auth = require('../middlewares/auth');
const ctrl = require('../controllers/users.controller');

router.get('/sorts', auth('admin','evaluator','evaluatee'), ctrl.listServer);
router.get('/',       auth('admin','evaluator','evaluatee'), ctrl.list);
router.get('/:id',    auth('admin','evaluator','evaluatee'), ctrl.get);

router.post('/',      auth('admin'), ctrl.create);
// router.post('/',  ctrl.create);
router.put('/:id',    auth('admin'), ctrl.update);
router.delete('/:id', auth('admin'), ctrl.remove);

module.exports = router;