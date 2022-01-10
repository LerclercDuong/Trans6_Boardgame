const express = require('express');
const router = express.Router();
const PageController= require('../app/controllers/PageController')

router.use('/', PageController.display);

// router.use('/', newsController.cout);

module.exports = router;