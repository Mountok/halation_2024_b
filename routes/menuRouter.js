const Router = require('express');
const router = new Router();
const menuController = require('../controllers/menuController')

router.post('/', menuController.create);
router.get('/', menuController.getAll);

module.exports = router;