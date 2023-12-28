const Router = require('express');
const router = new Router();
const restaurantController = require('../controllers/restaurantController')

router.post('/', restaurantController.create);
router.get('/', restaurantController.getAll);

module.exports = router;