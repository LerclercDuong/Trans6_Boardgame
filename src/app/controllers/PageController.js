

class PageController{
     display(req, res, next){
       console.log(req.query);
     }
}


module.exports = new PageController;