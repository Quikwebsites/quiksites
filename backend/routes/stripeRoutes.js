const express = require('express')
const router = express.Router()
const stripeController = require('../controllers/stripeController')

const {
    checkRequiredPermissions,
    validateAccessToken,
} = require("../middleware/auth0.middleware.js");

// Route definitions
router.post('/create-user', express.json(), validateAccessToken, stripeController.createUser)
router.post('/create-checkout-session', express.json(), validateAccessToken, stripeController.createCheckoutSession)
router.post('/create-billing-portal-session', express.json(), validateAccessToken, stripeController.createBillingPortalSession)
router.post('/create-product-and-checkout-session', express.json(), validateAccessToken, stripeController.createProductCheckoutSession)
router.post('/create-subscription-and-checkout-session', express.json(), validateAccessToken, stripeController.createSubscriptionCheckoutSession)
router.get('/stripe-session', validateAccessToken, stripeController.stripeSession)
router.post('/cancel-autorenew', express.json(), validateAccessToken, stripeController.cancelAutorenew)
router.post('/webhook', express.raw({type: 'application/json'}), stripeController.webhook)

module.exports = router
