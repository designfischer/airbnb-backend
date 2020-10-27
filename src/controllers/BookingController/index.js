const Booking = require('../../models/Booking')
const helper = require('./helpers')
const repository = require('./repository')

const BookingController = {

    async CreateBooking(req, res) {

        const { place_id, client_id } = req.params
        const bodyData = req.body

        const { checkinDay, checkinMonth, checkinYear, checkoutDay, checkoutMonth, checkoutYear } = bodyData

        const checkinDate = new Date(checkinYear, checkinMonth, checkinDay)                 
        const checkoutDate = new Date(checkoutYear, checkoutMonth, checkoutDay)
        
        const validPeriod = helper.isPeriodValid(checkinDate, checkoutDate)
        if (validPeriod === false) return res.status(400).json({ 
            message: 'CheckIn date must be before CheckOut date'
        })

        const verificationData = {
            place: place_id,
            checkinDate,
            checkoutDate
        }

        const creationData = {
            status: 'pending',
            place: place_id,
            client: client_id,
            checkinDate,
            checkoutDate
        }   
                 
        try {  
            
            const hasBooking = await repository.findPlacesBookingsByDate(verificationData) 

            if (hasBooking.length !== 0) return res.status(400).json({
                message: 'Place already booked for the date',
                hasBooking
            })           
            
            const newBooking = await Booking.create(creationData)
            await newBooking.populate('place').populate('client').execPopulate()
            
            return res.status(201).json(newBooking)

        } catch(err) {
            return res.status(400).json(err)
        }


    },

    async getPlacesBookingsByDate(req, res) {

        const { place_id } = req.params
        const bodyData = req.body

        const { checkinDay, checkinMonth, checkinYear, checkoutDay, checkoutMonth, checkoutYear } = bodyData

        const checkinDate = new Date(checkinYear, checkinMonth, checkinDay)                 
        const checkoutDate = new Date(checkoutYear, checkoutMonth, checkoutDay)
        
        const validPeriod = helper.isPeriodValid(checkinDate, checkoutDate)
        if (validPeriod === false) return res.status(400).json({ 
            message: 'CheckIn date must be before CheckOut date'
        })        

        const verificationData = {
            place: place_id,
            checkinDate,
            checkoutDate
        }
       
        try {

            const placesBookingsByDate = await repository.findPlacesBookingsByDate(verificationData)            
            return res.status(200).json(placesBookingsByDate)

        } catch(err) {
            return res.status(400).json(err)
        }

    },

    async getBookingById(req, res) {

    },

    async getBookingsByClient(req, res) {

    }

}

module.exports = BookingController