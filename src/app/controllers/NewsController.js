

class NewsController{
   index(req,res){
       res.render('news')
   }
   slug(req, res){
       res.send('aloalo day la slug')
   }
  
}
module.exports =new NewsController;