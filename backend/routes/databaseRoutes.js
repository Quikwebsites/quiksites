const express = require('express')
const router = express.Router()
const databaseController = require('../controllers/databaseController')

// Mongoose models
const User = require('../models/userModel')
const Admin = require('../models/adminModel')

// Authentication middleware
const {
    checkRequiredPermissions,
    validateAccessToken,
} = require("../middleware/auth0.middleware.js");

// Route definitions
router.post('/get-user-webpages', express.json(), validateAccessToken, databaseController.getUserWebpages)
router.post('/get-active-user-webpage', express.json(), validateAccessToken, databaseController.getActiveUserWebpage)
router.post('/get-user-subscription-type', express.json(), validateAccessToken, databaseController.getUserSubscriptionType)
router.post('/activate-website',express.json(), validateAccessToken, databaseController.activateWebsite)
router.post('/get-new-domain-bool', express.json(), validateAccessToken, databaseController.getNewDomainBool)
router.post('/get-new-autorenewal-bool', express.json(), validateAccessToken, databaseController.getNewAutorenewalBool)
router.post('/deactivate-website', express.json(), validateAccessToken, databaseController.deactivateWebsite) 
router.get('/log-page-load', databaseController.logPageLoad)
router.get('/get-user-requests', validateAccessToken, checkRequiredPermissions(["admin-access"]), databaseController.getUserRequests)
router.post('/get-user-page-requests', express.json(), validateAccessToken, checkRequiredPermissions(["admin-access"]), databaseController.getUserPageRequests)
router.post('/update-user-url', express.json(), validateAccessToken, checkRequiredPermissions(["admin-access"]), databaseController.updateUserUrl)
router.get('/get-web-traffic', validateAccessToken, checkRequiredPermissions(["admin-access"]), databaseController.getWebTraffic)
router.get('/create-blank-admin', databaseController.createBlankAdmin)
router.get('/get-lifetime-value', validateAccessToken, checkRequiredPermissions(["admin-access"]), databaseController.getLifetimeValue)
router.get('/get-subscription-activations', validateAccessToken, checkRequiredPermissions(["admin-access"]), databaseController.getSubscriptionActivations)
router.get('/get-subscription-cancellations', validateAccessToken, checkRequiredPermissions(["admin-access"]), databaseController.getSubscriptionCancellations)
router.get('/increment-conversion-rate', validateAccessToken, databaseController.incrementConversionRate)
router.get('/get-conversion-rates', validateAccessToken, checkRequiredPermissions(["admin-access"]), databaseController.getConversionRates)
router.post('/update-conversion-rates', express.json(), validateAccessToken, checkRequiredPermissions(["admin-access"]), databaseController.updateConversionRates)
router.post('/search-for-users', express.json(), validateAccessToken, checkRequiredPermissions(["admin-access"]), databaseController.searchForUsers)

module.exports = router