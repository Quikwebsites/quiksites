const express = require('express')
const router = express.Router()
const statusController = require('../controllers/statusController')

// Authentication middleware
const {
    checkRequiredPermissions,
    validateAccessToken,
} = require("../middleware/auth0.middleware.js");

// Route definitions
router.get('/ping', statusController.ping)
router.get('/protected-ping', validateAccessToken, statusController.protectedPing)  
router.get('/admin-ping', validateAccessToken, checkRequiredPermissions(["admin-access"]), statusController.adminPing)

module.exports = router
