const express = require('express');
const router = express.Router();
const SiteController = require('../app/controllers/SiteController.js')


router.get('/create', SiteController.create);
router.post('/store', SiteController.store);
router.get('/delete/:id', SiteController.deleteCourse);
router.get('/:slug', SiteController.chitiet);



router.get('/', SiteController.cout);


module.exports = router;