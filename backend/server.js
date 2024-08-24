// Backend package dependencies
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const axios = require('axios')

// Middlewares
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");


// Permission check middleware
const {
  checkRequiredPermissions,
  validateAccessToken,
} = require("./middleware/auth0.middleware.js");

// Mongoose models
const User = require('./models/userModel')
const Admin = require('./models/adminModel')

// Stripe object 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10', // Latest at the time
});


// ENV dependencies
dotenv.config()
const port = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

// Import routes
const statusRoutes = require('./routes/statusRoutes')
const stripeRoutes = require('./routes/stripeRoutes')
const databaseRoutes = require('./routes/databaseRoutes')
const domainRoutes = require('./routes/domainRoutes')
const macroRoutes = require('./routes/macroRoutes')

// Create express app
const app = express()

// CORS config
const corsOpts = {
    origin: '*',
    
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
};

app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
});

app.use(cors(corsOpts))

// Routes
app.use('/', statusRoutes)
app.use('/', stripeRoutes)
app.use('/', databaseRoutes)
app.use('/', domainRoutes)
app.use('/', macroRoutes)

app.use(errorHandler)
app.use(notFoundHandler)

// Connect to db/start server
mongoose.connect(MONGO_URI)
.then(() => {
  console.log("Connected to database")

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
})
.catch((err) => {
  console.log(err)
})
  