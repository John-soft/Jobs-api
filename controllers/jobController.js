const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAlljobs = async (req, res, next) => {
    const jobs = await Job.find({createdBy: req.user.id}).sort('createdAt')
    res.status(StatusCodes.OK).json({
        length: jobs.length,
        data: jobs 
        
    })
}

const createJob = async (req, res, next) => {
    req.body.createdBy = req.user.id
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const getJob = async (req, res, next) => {
    const user = req.user
    const jobId = req.params.id
    const job = await Job.findOne({_id: jobId, createdBy: user.id})
    if (!job) {
        throw new NotFoundError(`Job with the ID ${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({
        job
        
    })

    
}

const updateJob = async (req, res, next) => {
    
}

const deleteJob = async (req, res, next) => {
    
}

module.exports = {
    getAlljobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}