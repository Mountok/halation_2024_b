const {Restaurant} = require('../models/models')
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError')

class RestaurantController {

    async create (req,res,next){
        try {
            const {title,description} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname,'..','static',fileName));

            const restaurant = await Restaurant.create({
                title,
                description,
                img: fileName,
            })

            return res.json(restaurant);

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

        
    }




    async getAll (req,res,next) {
        try {
            const restaurants = await Restaurant.findAll()
            return res.json(restaurants);
        } catch (error) {
            next(ApiError.badRequest('Не предвиденная ошибка'))
        }
    }
}


module.exports = new RestaurantController()