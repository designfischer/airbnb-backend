const { Router } = require('express')

const UserController = require('../controllers/UserController')
const PlaceController = require('../controllers/PlaceController')
const PublicPlaceController = require('../controllers/PublicPlaceController')
const BookingController = require('../controllers/BookingController')

const routes = Router()

routes.get('/', (req, res) => { res.send('Olá mundo') })

routes.post('/users', UserController.createUser)
routes.delete('/users/:user_id', UserController.deleteUser)

routes.get('/users', UserController.getUsers)

routes.post('/users/:user_id/places', PlaceController.createPlace)
routes.delete('/users/:user_id/places/:place_id', PlaceController.deletePlace)
routes.get('/users/:user_id/places', PlaceController.getUsersPlaces)

routes.get('/places/:place_id', PublicPlaceController.getPlaceById)
routes.get('/places', PublicPlaceController.getPlaces)

routes.get('/places/:place_id/bookings', BookingController.getPlacesBookingsByDate)

routes.post('/clients/:client_id/places/:place_id/bookings', BookingController.CreateBooking)
routes.get('/client/:client_id/bookings', BookingController.getBookingsByClient)

routes.get('/bookings/:booking_id', BookingController.getBookingById)

module.exports = routes