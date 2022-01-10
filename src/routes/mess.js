const express = require('express');
const router = express.Router();
const messController= require('../app/controllers/messController')

// router.use('/:slug', newsController.slug);
router.use('/', messController.display);
router.post('/', function(req, res) {
    server.on('connection', function(socket){
        console.log('a user connected');
      });
      
      http.listen(3000, function(){
        console.log('listening on *:3000');
      });
})


module.exports = router;