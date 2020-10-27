const User = require('../../models/User')

const UserController = {

    async createUser(req, res) {

        const data = req.body
        const { email } = data

        try {

            const hasUser = await User.findOne({ email })
            if (hasUser) return res.status(400).json({
                message: 'User already exists',
                hasUser
            })

            const newUser = await User.create(data)
            return res.status(201).json(newUser)

        } catch(err) {
            return res.status(400).json(err)
        }
    },

    async deleteUser(req, res) {

        const { user_id } = req.params
        
        try {

            const deletedUser = await User.findByIdAndRemove(user_id)
            if (deletedUser) {
                return res.status(200).json({
                    message: 'User deleted successfully'
                })
            } else {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            
        } catch(err) {
            return res.status(400).json(err)
        }

    },

    async getUsers(req, res) {

        try {

            const users = await User.find()
            return res.status(200).json(users)

        } catch(err) {
            return res.status(400).json(err)
        }

    }

}

module.exports = UserController