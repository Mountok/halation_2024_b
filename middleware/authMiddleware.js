const jwt = require('jsonwebtoken');
module.exports = function (req,res, next) {
    if (req.method === 'OPTIONS'){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer #token#
        console.log(token)
        if(!token){
            return res.status(401).json({
                message: "Пользователь не авторизован token"
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next()
    } catch (e) {
        console.log(e)
        res.status(401).json({
            message: "Пользователь не авторизован (middleware catch error)"
        })
    }
}