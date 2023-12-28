const Router = require('express');
const router = new Router();

const qrCodeController = require('../controllers/qrCodeController')

router.get('/', qrCodeController.open)

module.exports = router;