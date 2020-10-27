const Booking = require('../../../models/Booking')

const repository = {

    async findPlacesBookingsByDate(data) {

        const { place, checkinDate, checkoutDate } = data       

        const placesBookingsByDate = await Booking.find({ place: place })
            .where({
                checkoutDate: {
                    $gt: checkinDate
                }
            }).where({
                checkinDate: {
                    $lt: checkoutDate
                }
            })

        return placesBookingsByDate

    }

}

module.exports = repository