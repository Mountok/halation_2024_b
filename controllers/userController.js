const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");
const path = require('path')
const uudi = require('uuid')


const generateJwt = (id,email,role) => {
    return jwt.sign(
        {id,email,role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    );
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role, username } = req.body;
    const {img} = req.files;
    let fileName = uudi.v4() + ".jpg";
    img.mv(path.resolve(__dirname,'..','static',fileName));

    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или пароль!"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("Пользователь с таким email уже существует"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword, username, img: fileName});
    const token = generateJwt(user.id,user.email,user.role)
    return res.json({token});
  }

  async login(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({where:{email}});
    if(!user){
        return next(ApiError.internal('пользователь не найден'))
    }
    let comparsePassword = bcrypt.compareSync(password, user.password);
    if(!comparsePassword){
        return next(ApiError.internal('Указан неверный пароль'))
    }
    const token = generateJwt(user.id,user.email,user.role);
    return res.json({token,user})
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({token})
  }
}
module.exports = new UserController();
