const mongoose = require('mongoose')

const services = {

    connectToDatabase () {        

        mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }, () => console.log('Connected to Database'))

    }

}

module.exports = services