require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute')
const jobRouter = require('./routes/jobsRoute')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app




