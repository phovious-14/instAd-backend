const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const conn = require("./database/conn")
const studentRouter = require("./router/student/studentRoute")
const authRouter = require("./router/student/google-auth")
const authCheck = require("./middleware/authStudent")
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const passport = require('passport')
const swaggerui = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
require("./config/passport-setup")
require("dotenv").config()

//create a mongoDB connection
conn()

const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'NodeJS API for student-portal-gecg',
            version: '2.0'
        },
        servers:[
            {
                url: 'http://localhost:4000'
            }
        ]
    },
    apis: ['./server.js']
}

const swaggerSpec = swaggerJsDoc(options)

app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec))
/**
 * @swagger
 * /api/auth/google:
 *  get:
 *      summary: This is get request
 *      description: This api used for testing
 *      responses:
 *          200:
 *              description: To test get method
 */

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
app.use(passport.initialize()); //initialize passport
app.use(passport.session()); // persistent login sessions

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

app.use('/api/auth', authRouter)

app.use('/api/student', studentRouter) // authenticated router
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