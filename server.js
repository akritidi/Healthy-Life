const express     =  require('express') 
const mongoose    =  require('mongoose') 
const cookieParser = require('cookie-parser')
const morgan      =  require('morgan') 
const bodyParser  =  require('body-parser')
const path        =  require('path')



const AuthRoute     = require('./routes/auth')
const LostpassRoute = require('./routes/lostpass')
const CalRoute      = require('./routes/calRoute')
const ContactRoute  = require('./routes/contactus')

const User = require('./models/User')

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://dafal:1234567890@cluster0-tyzah.mongodb.net/testdb?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology:true })
//mongoose.connect(('mongodb://localhost:27017/testdb'),{ useNewUrlParser: true,useUnifiedTopology:true })

const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('Database Connection Established!')
})

const app = express()
app.use(cookieParser())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/api',AuthRoute)
app.use('/api/lostpass',LostpassRoute)
app.use('/api',CalRoute)
app.use('/api/contact',ContactRoute)

app.use('/uploads', express.static('uploads'))
app.use(express.static('public'))

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('Server is running on port ' + PORT)
})

app.get('/', function(req,res){
    res

        .status(200)
        .sendFile(path.join(__dirname, './public', 'index.html'));
})
app.get('/admin',function(req,res){
    const cookie = req.cookies
    console.log(cookie)
    let name = cookie.healthylifesession
    User.findOne({name : name},function(err,existingUser){
        if(existingUser==null){
            res

            .status(400)
            .sendFile(path.join(__dirname, './public', 'index.html'));
           return res.end()
        }
        if(existingUser.adminstatus){
            res

            .status(200)
            .sendFile(path.join(__dirname, './public', 'adminpage.html'));
        }
        else{
            res

            .status(400)
            .sendFile(path.join(__dirname, './public', 'index.html'));
        }
    })
})
app.get('/profile',function(req,res){
    const cookie = req.cookies
    if(cookie.healthylifesession!=null){
        res

        .status(200)
        .sendFile(path.join(__dirname, './public', 'profile.html'));
        
    }
    else{
        res

        .status(400)
        .sendFile(path.join(__dirname, './public', 'index.html'));
    }
    
    
    
    
})
app.get('/signin',function(req,res){
    const cookie = req.cookies
    if(cookie.healthylifesession==null){
        res

        .status(200)
        .sendFile(path.join(__dirname, './public', 'sign-in.html'));
    }
    else{
        res

        .status(400)
        .sendFile(path.join(__dirname, './public', 'index.html'));
    }
   
    

})
app.get('/signup',function(req,res){
    const cookie = req.cookies
    if(cookie.healthylifesession==null){
        res

        .status(200)
        .sendFile(path.join(__dirname, './public', 'sign-up.html'));
    }
    else{
        res

        .status(400)
        .sendFile(path.join(__dirname, './public', 'index.html'));
    }
   
    

})
app.get('/lostpass',function(req,res){
    const cookie = req.cookies
    if(cookie.healthylifesession==null){
        res

        .status(200)
        .sendFile(path.join(__dirname, './public', 'lostpass.html'));
    }
    else{
        res

        .status(400)
        .sendFile(path.join(__dirname, './public', 'index.html'));
    }
   
    

})

