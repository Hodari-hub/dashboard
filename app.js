const express = require("express");
const app = express();
const path = require("path");
const _tables=require("./controllers/create_tables");
const core_route=require("./routes/core_route");
const auth_route=require("./routes/auth_route");
const cookieParser = require('cookie-parser');
const twiter_route=require("./routes/twiter_bot_route");
const checktags=require("./controllers/checkTags");
const twt=require("./controllers/tweet_handler");
//const _new_user=require("./controllers/new_user");

//establish express ejs
app.set("view engine","ejs");

//listern on this port
app.listen(3000);

//passcookies to the browser
app.use(cookieParser());

//create tables if not exist
_tables.create_tables();
//_new_user.new_user('admin@gmail.com','1234');

//run the check in every second
checktags.watchman();

//set static file to be public
app.use("/static",express.static(path.join(__dirname,'public')));

//handle incoming form post
app.use(express.urlencoded({extended: true}));

//registraion routre
app.use(auth_route);

//handle all route
app.use(core_route);

//registraion routre
app.use(twiter_route);

//registraion routre
app.use(number_route);

//handle unknown  url
app.use((req,res)=>{res.status(404).render("404",{title:"Losted!"});});

