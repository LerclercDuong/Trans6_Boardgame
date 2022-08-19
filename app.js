const session = require('express-session')
const user = require('./src/app/models/user');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const db = require("./src/config/db")
const mongoose = require("mongoose");
// const { next } = require('cheerio/lib/api/traversing');
obj = {}


app.use(
    session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  
  }))
const action = [
    {number: 'A1', ques: '', answer: 'tubular(adj)' },
    {number: 'A2', ques: '', answer: 'coupled with (phrasal verb)'},
    {number: 'A3', ques: '', answer: 'fluctuate(v)'},
    {number: 'A4', ques: '', answer: 'fracture(v)'},
    {number: 'A5', ques: '', answer: 'denture(n)'},
    {number: 'A6', ques: '', answer: 'confer (v)'},
    {number: 'A7', ques: '', answer: 'hold still (v)'},
    {number: 'A8', ques: '', answer: 'safeguard (n)'},
    {number: 'A10', ques: '', answer: 'trauma(n)'},
    {number: 'A11', ques: '', answer: 'anthem(n)'},
    {number: 'A12', ques: '', answer: 'slanted(adj)'},
    {number: 'A13', ques: '', answer: 'nourish(v)'},
    {number: 'A14', ques: '', answer: 'aesthetic (adj)'},
    {number: 'A15', ques: '', answer:'flagging (n) (adj)'},
    {number: 'A16', ques: '', answer:'mimic(v)'},
    {number: 'A17', ques: '', answer:'infiltrate (v)'}
    ]




// let rawdata = fs.readFileSync('data.json');
// let anime = JSON.parse(rawdata);

// Basically jQuery for node.js
 const doit = async function(){
    var data = []
    for (var j = 1; j < 15; j++) {

       
         const URL =  `https://vuighe.net/movie/trang-${j}`;
        var options = {
            uri: URL,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

    await   rp(options)
        .then(function ($) {
            const title = $(".tray-item-title")
            const view = $(".tray-film-views")
            const link = $(".movie-item > a")
            for (var i=0; i < title.length ; i++ ) {
 
                const crw = [$(title[i]).text(), $(view[i]).text(), $(link[i]).attr("href")] 
                
                   data.push(crw)
                        }
              })
    
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
        });
      }
      
      
      
    
console.log(data)
fs.writeFileSync('data.json', JSON.stringify(data))

 }
 
  
    // doit();
    


//  console.log(data);
 

db.connect()
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views',path.join(__dirname, 'src/resources/views'))
app.set('view engine', 'ejs');

app.use(expressLayouts)
app.set('layout', path.join(__dirname, 'src/resources/views/layouts'))


app.get('/', function(req, res){
    res.render('partials/page',{layout: 'layouts/full-width'});
 })

// app.get('/game', function(req, res){
//    res.render('partials/gamemain',{layout: 'layouts/full-width'});
// })


app.get('/login', function(req, res){
    res.render('partials/login', {layout: 'layouts/login'});
})

app.get('/game/:slug', function(req, res, next){
    if(req.session.isAuth){
        next()
    }else{
      
        // res.send('Bạn cần đăng nhập để xem nội dung này')
        res.redirect('/login')
    }
  } ,function(req, res){
     res.render('partials/details', {layout: 'layouts/full-width', slug: req.params.slug});
})

app.get('/game/:slug/:id', function(req, res, next){
    if(req.session.isAuth){
    next()
}else{
  
    // res.send('Bạn cần đăng nhập để xem nội dung này')
    res.redirect('/login')
}
} ,function(req, res){
    res.render('partials/question', {layout: 'layouts/full-width', content: req.params.slug, no: req.params.id})
})
app.post('/login',function(req, res, next){
   user.findOne({username: req.body.account, password: req.body.password})
   .then(function(data){
    if(data){
        next()
    }
        else{
            res.send('tên đăng nhập hoặc mật khẩu không đúng')
            
        }
    })
   }, function(req, res){
    req.session.isAuth = true;
    res.redirect('/')
   })



   app.get('/game', function(req, res,next){
    if(req.session.isAuth){
        next()
    }else{
      
        // res.send('Bạn cần đăng nhập để xem nội dung này')
        res.redirect('/login')
    }
  } ,function(req, res){
    res.render('partials/gamemain',{layout: 'layouts/full-width'});
    
    
    
  })
app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})


