const Place = require('../../models/Place')

const PlaceController = {

    async createPlace(req, res) {

        const { title, price, features, city, state, latitude, longitude } = req.body
        const { user_id } = req.params

        const rawFeaturesArray = features.split(',')
        const formattedFeaturesArray = rawFeaturesArray.map(feature => feature.trim())
        
        const data = {
            user: user_id,
            title,
            price,
            features: formattedFeaturesArray,
            address: {
                city,
                state,
                location: {
                    type: 'Point',
                    coordinates: [latitude, longitude]
                }
            }
        }

        try {

            const newPlace = await Place.create(data)
            return res.status(201).json(newPlace)

        } catch(err) {
            return res.status(400).json(err)
        }

    },

    async deletePlace(req, res) {

        const { place_id, user_id } = req.params

        try {

            const belongsToUser = await Place.findOne({ user: user_id })
            if (!belongsToUser) return res.status(400).json({
                messasge: 'Operation not allowed'
            })

            const deletedPlace = await Place.findByIdAndRemove(place_id)
            if (deletedPlace) {
                return res.status(200).json({
                    message: 'Place deleted successfully'
                })
            } 

        } catch(err) {
            return res.status(400).json(err)
        }

    },

    async getUsersPlaces(req, res) {

        const { user_id } = req.params

        try {

            const usersPlaces = await Place.find({ user: user_id })
            return res.status(200).json(usersPlaces)

        } catch(err) {
            return res.status(400).json(err)
        }

    }

}

module.exports = PlaceController