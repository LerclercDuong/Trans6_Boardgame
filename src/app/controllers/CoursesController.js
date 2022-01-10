const khoahoc = require('../models/khoahoc')

class CoursesController{
   show(req, res){
       res.send(req.params.slug)
   }

   
   chitiet(req, res) {
    khoahoc.findOne({slug: req.params.slug}, function(err,chitiet){
        if(!err){
             res.render('course',{course: chitiet.toObject()})
        }else {
            res.status(400).json({error: 'error'});
        }
    })
}
 }
 module.exports =new CoursesController;