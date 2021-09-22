require('dotenv').config();
const express = require("express");
const configViewEngine = require('./configs/viewEngine');
const initWebRouter = require("./routes/webRoutes");
const db = require("./configs/connectingDB");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// console.log(process.env);

let app = express();

// Enable  body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//******************************************************************************************* */
// To use flash you must use cookie-parser and session as below

// use cookie parser
app.use(cookieParser("secret"));


// config session
app.use(session({
    secret:"secret",
    resave: true,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 *60 *24  // 1 day
    }
}));

// Enable flash message
app.use(connectFlash());
//******************************************************************************************* */


// configring view sources
configViewEngine(app);


// config passport middleware
app.use(passport.initialize());
app.use(passport.session());


// configering routes
initWebRouter(app);

 
app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});