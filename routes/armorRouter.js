const Router = require('express');
const router = new Router();

const armorController = require('../controllers/armorController')

router.get('/', armorController.getAll)
router.get('/one', armorController.getOne)
router.post('/', armorController.create)

module.exports = router;