const { BadRequestError , UnauthenticatedError} = require('../errors')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const asyncWrapper = require('../utils/asyncWrapper')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    const user = await User.create({...req.body})
    const token = user.generateToken()
    res.status(StatusCodes.CREATED).json({
        token,
        user: {name: user.name}
        
    })

}

const login = async (req, res, next) => {
    const {email, password} = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = User.findOne({email})
    const token = user.generateToken()
    
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Password is incorrect')
    }
    res.status(StatusCodes.OK).json({
        token,
        user : {name: user.name}
    })

}

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        throw new UnauthenticatedError('Token is missing')
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT)
            //Attach user to the job route
        req.user = {id: decodedToken.id, name: decodedToken.name}
    next()

    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }


    //It can also be implemented this way to decode the user id
    /*const user = User.findById(decodedToken.id).select('-password)
    req.user = user*/



    
    }



module.exports = {
    register,
    login,
    protect
}