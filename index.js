require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = require('./routes/index'); // * основной роутер
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path')
const PORT = process.env.PORT || 7000

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api',router);

// * Обработка ошибок послдений  middleware
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate() // утсанавливаем подключение к бд
        await sequelize.sync() //  сверяет состояние бд со схемой данных которую мы описываем
        app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))
    } catch (error) {
        console.log(error)
    }
}

start()
