const Router = require("express");
const router = new Router();

const userRouter = require('./userRouter');
const restaurantRouter = require('./restaurantRouter')
const menuRouter = require('./menuRouter')
const armorRouter = require('./armorRouter')
const mqrCodeRouter = require('./QrCodeRouter')



router.use('/user', userRouter);
router.use('/restaurant', restaurantRouter);
router.use('/menu', menuRouter);
router.use('/armor', armorRouter);



router.use('/qr_data', mqrCodeRouter);


module.exports = router;