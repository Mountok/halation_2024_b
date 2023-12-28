const {Menu} = require('../models/models')
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class MenuController {
    async create (req,res,next){
        try {
            const {menu_id, title, price} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname,'..','static',fileName));

            const menu = await Menu.create({
                title,
                menu_id,
                price,
                img: fileName,
            })

            return res.json(menu);

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

        
    }




    async getAll (req,res,next) {
        const {menu_id} = req.query;

        try {
            const restaurants = await Menu.findAll(
                {where:{menu_id}}
            )
            return res.json(restaurants);
        } catch (error) {
            next(ApiError.badRequest('Не предвиденная ошибка'))
        }
    }
}

module.exports = new MenuController()