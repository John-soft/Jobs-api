require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute')
const jobRouter = require('./routes/jobsRoute')
const {protect} = require('./controllers/authController')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', protect,jobRouter)// we can also use the protect middleware here to protect all jobs route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
 
module.exports = app




