const path = require('path')
var session = require('express-session')
const express= require('express')
const handlebars= require('express-handlebars')
const app = express()
const port = 3000

const server = require('http').createServer(app);
const io = require('socket.io')(server);






var methodOverride = require('method-override')


// const newController = require('./app/controllers/NewsController')
const route = require('./routes/index')
const url = "https://api.apify.com/v2/key-value-stores/QubTry45OOCkTyohU/records/LATEST?fbclid=IwAR3Vp_SUYIkhc5ziZlZpAAX8mqVQLbH1uvUb68r6Ahjne_eP9QWH23XLNdg"

const db = require('./config/db')


app.use(
    session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  
  }))

db.connect()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views',path.join(__dirname, 'resources/views'))
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.engine('handlebars',handlebars())
app.set('view engine','handlebars')

app.use(methodOverride('_method'))


route(app);

app.get('/mess',function(req,res,next){
  if(req.session.isAuth){
      next()
  }else{
    
      res.send('Bạn cần đăng nhập để xem nội dung này')
  }
} ,function(req, res){
  res.render('messenger', {name: req.session.User})
  
  
  
})

io.on('connection', function(socket){
  socket.on('on-chat', function(data){
   io.emit('user-chat',data)
  
})
})


  

server.listen(port)