const express = require('express')
const router = express.Router()

const {getAlljobs, createJob, getJob, updateJob, deleteJob} = require('../controllers/jobController')

router.route('/').get(getAlljobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router


