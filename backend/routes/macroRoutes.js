const express = require('express')
const router = express.Router()
const macroController = require('../controllers/macroController')

// Authentication middleware
const {
    checkRequiredPermissions,
    validateAccessToken,
} = require("../middleware/auth0.middleware.js");

// Route definitions
router.post('/new-page-request', express.json(), validateAccessToken, macroController.newPageRequest)
router.post('/add-page-edit-request', express.json(), validateAccessToken, macroController.addPageEditRequest)
router.post('/request-plan-change', express.json(), validateAccessToken, macroController.requestPlanChange)
router.post('/resolve-request', express.json(), validateAccessToken, checkRequiredPermissions(["admin-access"]), macroController.resolveRequest)
router.post('/reopen-request', express.json(), validateAccessToken, checkRequiredPermissions(["admin-access"]), macroController.reopenRequest)
router.post('/delete-user-page', express.json(), validateAccessToken, macroController.deleteUserPage)

module.exports = router