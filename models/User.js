const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength:50
    },
    email:{
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false
    }
})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    
})

userSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id, name: this.name}, process.env.SECRET_JWT, {
        expiresIn: process.env.TOKEN_EXPIRES
    })

}

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)

}

const User = model('User', userSchema)

module.exports = User