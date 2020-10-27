const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    checkinDate: Date,
    checkoutDate: Date,
    status: String    
})

module.exports = mongoose.model('Booking', Schema)