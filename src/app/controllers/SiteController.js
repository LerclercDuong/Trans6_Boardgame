const mongoose = require('mongoose')
const khoahoc = require('../models/khoahoc')
const {mongooseToObject} = require('../../util/mongoose')

class SiteController{
    xuat(req,res) {
        res.render('site')
    }

cout(req, res) {
    console.log(req.session.id)
    khoahoc.find({}, function(err,khoahocs){
        if(!err){
           var course= khoahocs.map(function(a){
                return a.toObject();
            })
            res.render('site',{ course })
        }else {
            res.status(400).json({error: 'error'});
        }
    })
}
 
chitiet(req, res) {
    khoahoc.findOne({slug: req.params.slug})
    .then(function(chitiet) {
        res.render('course', { course: chitiet.toObject()})
    })
    .catch(function(err){
        res.send('loi')
    })
}

show(req, res){
    res.send('hello' + req.params.slug)
}

create(req, res){
    res.render('create')
}

store(req, res){
    req.body.img= `https://i.ytimg.com/vi/${req.body.videoID}/maxresdefault.jpg`
    var course = new khoahoc(req.body)
    course.save()
    
    res.redirect("http://localhost:3000/site")
}

deleteCourse(req, res){
    khoahoc.deleteOne({_id: req.params.id})
    .then(function(){
        res.redirect("http://localhost:3000/site")
    })
   
}
}



module.exports = new SiteController;

