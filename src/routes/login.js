const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/loginController.js')

router.use('/', loginController.authen);


module.exports = router;