require('dotenv').config()

const mongoose = require('mongoose')

module.exports = async () => {
    await mongoose.connect(process.env.PAIMON_MONGO, { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })

    return mongoose
}