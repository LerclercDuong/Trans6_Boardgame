
      
class messController{
        display(req, res){
           
      
     
        res.render('messenger')
        io.on('connection', function(socket){
                console.log('connection')
        })
        }

}


module.exports = new messController;