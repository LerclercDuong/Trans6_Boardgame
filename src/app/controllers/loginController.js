const user = require('../models/user')

class loginController{
    authen(req, res){
        user.findOne({
            username: req.body.username,
            password: req.body.password
        
        })
        .then(function(data){
            if(data){
                req.session.isAuth = true;
                 req.session.User = data.username;
                 res.redirect('/home')
                 
            }else{
                res.send('sai mat khau')
            }
        })
    }

    in(req, res){
        
    }

}

module.exports =new loginController;