const status = require('../models/status')
const comments = require('../models/comments')

class homeController{
    writeStatus(req,res){
        req.body.name = req.session.User
        var tus = new status(req.body)
        tus.save()
        res.redirect("/home")
        
        // status.find({}, function(err,status){
        //     if(!err){
        //         var sta = status.map(function(e){
        //             return e.toObject()
        //         })
        //         res.render('home', {sta})
        //     }else {
        //         res.status(400).json({error: 'error'});
        //     }
        // })
    }

    writeComment(req, res){
        console.log(req.body)
       comments.insert({
           statusID: 'wewefwef',
           name: 'messi2',
           content: 'ronaldo number 1'
       })
    }
}


module.exports = new homeController;