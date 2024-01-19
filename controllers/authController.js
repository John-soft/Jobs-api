const { BadRequestError } = require('../errors')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')

const register = async (req, res, next) => {

    const {name , email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const tempUser = {name,email,password:hashedPassword}
    const user = await User.create({...tempUser})
    res.status(StatusCodes.CREATED).json({
        status: 'Success',
        data:[
            user
        ]
    })

}


const login = async (req, res, next) => {
    res.send('Login here')
}

module.exports = {
    register,
    login
}