const express = require('express')
const router = express.Router()

const {getAlljobs, createJob, getJob, updateJob, deleteJob} = require('../controllers/jobController')
const {protect} = require('../controllers/authController')

router.route('/').get(getAlljobs).post(protect, createJob)
router.route('/:id').get(protect, getJob).patch(protect, updateJob).delete(protect, deleteJob)

module.exports = router


