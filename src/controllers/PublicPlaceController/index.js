const Place = require('../../models/Place')

const PublicPlaceController = {

    async getPlaceById(req, res) {

        const { place_id } = req.params
        
        try{

            const place = await Place.findById(place_id)            
            if (place) {
                return res.status(200).json(place)
            } else {
                return res.status(404).json({
                    message: 'Place not found'
                })
            }

        } catch(err) {
            return res.status(400).json(err)
        }

    },

    async getPlaces(req, res) {

        const places = await Place.find()
        return res.status(200).json(places)

    }

}

module.exports = PublicPlaceController