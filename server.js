const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const conn = require("./database/conn")
const studentRouter = require("./router/student/studentRoute")
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
require("dotenv").config()

//create a mongoDB connection
conn()

app.use(express.urlencoded({extended:true})); //set urlencoded to true
app.use(express.json()); //set json to true
app.use(cookieParser()); //set cookie parser

// // for passport oAuth2
//set seesion
app.use(expressSession({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// app.use(passport.initialize()); //initialize passport
// app.use(passport.session()); // persistent login sessions

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    res.json({msg:"hi"})
})

app.use('/api/company', studentRouter) // authenticated router
// app.use('/api/student', studentRouter) //unauthenticated router

app.use('/api/*',(req, res)=>{
    res.send("<h1>404 page not found</h1>");
})
 
app.use('/*',(req, res)=>{
    res.send("<h1>404 page not found</h1>");
})

// app.use('/logout', (req, res) => {
//     res.clearCookie("jwtoken",{path:"/"})
//     res.status(200).json({msg:"logout"})
// })

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})