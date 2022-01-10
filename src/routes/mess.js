const express = require('express');
const router = express.Router();
const messController= require('../app/controllers/messController')

// router.use('/:slug', newsController.slug);
router.use('/', messController.display);
router.post('/', function(req, res) {
   
})


module.exports = router;