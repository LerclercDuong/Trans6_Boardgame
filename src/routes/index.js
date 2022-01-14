const newsRouter= require('./mess')
const SiteRouter= require('./site')
const PageRouter= require('./page')
const CoursesRouter= require('./course')
const loginRouter= require('./login')
const homeRouter= require('./home')
const status = require('../app/models/status.js')
const messRouter = require('./mess')
const comments = require('../app/models/comments.js')
var ObjectId = require('mongodb').ObjectId;

function route(app){
app.post('/login',loginRouter)
app.post('/home',homeRouter)
// app.use('/mess',messRouter)
// app.post('/mess', function(req, res){
//      console.log(req.body)
// })
app.put('/home/:id', function(req, res, next){
    req.body.name = req.session.User
    status.updateOne({ _id : ObjectId(req.params.id) }, { 
         $push:{
             comments: {
                 name: req.body.name,
                 content: req.body.content
             }
         }
    }
         ) .then((obj) => {
            console.log('Updated - ' + obj);
            
        })
         .catch((err) => {
            console.log('Error: ' + err);
        })
    res.redirect('/home')
    
})
app.get('/logout',function(req, res){
    
    req.session.isAuth =false
    res.redirect('/login')
})
app.use('/news',newsRouter)
app.use('/site',function(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.send('Bạn cần đăng nhập để xem nội dung này')
    }
},SiteRouter)
// app.use('/course',CoursesRouter)
app.get('/home',function(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
      
        res.send('Bạn cần đăng nhập để xem nội dung này')
    }
},(req, res) =>{
  
    
//     status.find({}, function(err,status){
//         if(!err){
//             var sta = status.map(function(e){
//                 return e.toObject()
//             })       
//             sta.forEach(function(tus){
//                 tus.time = tus.createdAt.toString().slice(0,tus.createdAt.toString().indexOf('GMT'))
//             })
            
//             res.render('home', {sta, username: req.session.User, });
//         }else {
//             res.status(400).json({error: 'error'});
//         }
//     })
    
// })

status.find({}).sort({createdAt: -1})
.then(function(status){
    var sta = status.map(function(e){
        return e.toObject()
    })       
    sta.forEach(function(tus){
        tus.time = tus.createdAt.toString().slice(0,tus.createdAt.toString().indexOf('GMT'))
    })
    
    res.render('home', {sta, username: req.session.User, })
})
})
    
app.get('/login',(req, res) =>{
    res.render('login')
})
app.get('/page',(req, res) =>{
 
    res.render('page')
})
// app.post('/page',(req, res) =>{
//     console.log(req.body)
//     res.render('page')
// })
app.use('/page',PageRouter)
}

module.exports = route;