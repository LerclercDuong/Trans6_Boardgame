const express = require('express');
const router = express.Router();
const CoursesController = require('../app/controllers/CoursesController.js')

router.use('/', CoursesController.show);


module.exports = router;