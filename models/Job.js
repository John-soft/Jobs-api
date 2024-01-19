const {Schema , model, Types} = require('mongoose')

const jobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['Interview', 'Declined', 'Pending'],
        default: 'Pending'
    },
    createdBy:{
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }

}, {timestamps: true})

const Job = model('Job', jobSchema)

module.exports = Job