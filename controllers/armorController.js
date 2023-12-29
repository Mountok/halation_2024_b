const {Armor, User} = require('../models/models')
const ApiError = require('../error/ApiError');

class ArmorController {
    async create (req,res,next) {
        const {
            time,
            data,
            owner,
            place_number,
            restaurant,
            email
        } = req.body;
        
        const user = await User.findOne({
            where: {email: email}
        })

        const armor = await Armor.create({
            time,
            data,
            owner,
            place_number,
            restaurant,
            email,
            user_id: user.id 
        })

        return res.json({armor})
        


    }
    async getOne (req,res,next) {
        const {id} = req.query;
        const armor = await Armor.findOne({
            where: {id: id}
        })
        res.json(armor)
    }

    async getAll (req,res,next){
        const {email} = req.query;
        const armor = await Armor.findAll({
            where: {email: email}
        })

        return res.json(armor)
    }
}

module.exports = new ArmorController()