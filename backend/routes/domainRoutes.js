const express = require('express')
const router = express.Router()
const domainController = require('../controllers/domainController')

// Authentication middleware
const {
    checkRequiredPermissions,
    validateAccessToken,
} = require("../middleware/auth0.middleware.js");

// Route definitions
router.post('/search-for-domains', express.json(), validateAccessToken, domainController.searchForDomains)
router.post('/get-domain-info', express.json(), validateAccessToken, domainController.getDomainInfo)

module.exports = router