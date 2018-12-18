//*******************************************************************
//                          DEPENDENCIES
//*******************************************************************
const express       = require("express"),
      app           = express(),
      mongoose      = require("mongoose"),
      dotenv        = require("dotenv").config(),
      path          = require("path"),
      nodeMailer    = require("nodemailer"),
      bodyParser    = require("body-parser"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      site          = require("./site"),
      user          = require("./controllers/userController");
    
//*******************************************************************
//                     DATABASE CONFIGURATION
//*******************************************************************
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_URL);

//*******************************************************************
//                    EXPRESS.JS CONFIGURATION
//*******************************************************************
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//*******************************************************************
//                  AUTHENTICATION INITIALIZATION
//*******************************************************************
app.use(require("express-session")({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(user.showLogout);

//*******************************************************************
//                           ROUTING
//*******************************************************************
//-------------------------------------------------------------------
//                        General routes
//-------------------------------------------------------------------
app.get("/", site.index);
app.get("/about", site.about);
app.get("/pricing", site.pricing);
app.get("/reviews", site.reviews);
app.get("/careers", site.careers);
app.get("/contact", site.contact);
app.post("/send-email", site.sendMail);

//-------------------------------------------------------------------
//                     Authentication routes
//-------------------------------------------------------------------
app.get("/register", user.registerForm);
app.post("/register", user.register);
app.get("/login", user.loginForm);
app.post("/login", user.login);
app.get("/logout", user.logout);  

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The sofl-js server has started!"); 
});
