const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: 'variables.env'});

const conectarDB = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO)
        mongoose.connect(process.env.DB_MONGO)
        console.log("base de datos conectada")

    } catch (error) {
        console.log(error);
    }
}

module.exports = conectarDB