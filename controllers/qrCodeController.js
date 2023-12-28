const {Menu, User} = require('../models/models')
const ApiError = require('../error/ApiError');

class QrCodeController {
    async open (req,res,next){
        const {menu_list, user_id} = req.body;
        const result = [];
        const user = await User.findOne({
            where:{id: user_id}
        })
        for(let item of menu_list){
            result.push(await Menu.findAll({
                where: {id: item}
            }))
        }
        return res.json({
            for: user,
            result: result,
        })
    }




}

module.exports = new QrCodeController()