const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/homeController.js')

router.use('/comments', homeController.writeComment);
router.use('/', homeController.writeStatus);


module.exports= router;