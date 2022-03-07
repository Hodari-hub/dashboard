const express = require("express");
const route = express.Router();
const conn=require("../modals/connection");

//authed check
const isAuth=(req,res,next)=>{
    //run the database check and log user in if success or redirect incase of fuiler
    if(req.cookies.userId){next();}
    //if cookies is not set then redirect user to the login page
    else{res.redirect("index");}
}

//login check
const isLogedIn=(req,res,next)=>{
    //if user is already loged in then redirect them to the dashboard page
    if(req.cookies.userId){res.redirect("dashboard");}
    //if not then let them access the login page
    else{next();}
}

//handle user when comes to the home page
route.get("/",isLogedIn,(req,res)=>{res.render("index",{title:"Log In"});});
//handle user when comes to the home page
route.get("/index",isLogedIn,(req,res)=>{res.render("index",{title:"Log In"});});
//handle dashboard accessor
route.get("/dashboard",isAuth,(req,res)=>{
    conn.query(`SELECT app_name,app_id FROM botapp ORDER BY app_id DESC`, 
        function (error, results) {
            if(error) throw error;
            let acc="",tags="";
            if(results.length){
                for(let i =0; i<results.length; i++){acc+=`<li class="list-group-item borderless" data-appid='${results[i].app_id}' data-appname='${results[i].app_name}'>${results[i].app_name}</li>`;}
                conn.query('SELECT * FROM tags ORDER BY tag_id DESC',(err,rs)=>{
                    if(err) throw err;
                    if(rs.length){
                        for(let i =0; i<rs.length; i++){
                            tags+=`<div id='tag_id_${rs[i].tag_id}' data-tagid='${rs[i].tag_id}' class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 my-1 tagsList p-1">
                                        <div class='d-flex p-2'><i class="bi bi-twitter"></i>&nbsp; ${rs[i].tag_Name}</div> <div class='d-flex p-2'><i class="bi bi-clock"></i>&nbsp; timeTorun</div>
                                    </div>`;
                        }
                        res.render("dashboard",{title:"Dashboard",accounts:[acc],tags:[tags]});
                    }
                    else{
                        res.render("dashboard",{title:"Dashboard",accounts:[""],tags:[""]});
                    }
                });
            }
            else{
                res.render("dashboard",{title:"Dashboard",accounts:[""],tags:[""]});
            }
        });
});

//handle schedule accessor
route.get("/schedule",isAuth,(req,res)=>{
    conn.query(`SELECT app_name,app_id FROM botapp ORDER BY app_id DESC`, 
        function (error, results) {
            if(error) throw error;
            let acc="",tags="";
            if(results.length){
                for(let i =0; i<results.length; i++){acc+=`<li class="list-group-item borderless viewApp" data-appid='${results[i].app_id}' data-appname='${results[i].app_name}'>${results[i].app_name}</li>`;}
                conn.query('SELECT * FROM tags ORDER BY tag_id DESC',(err,rs)=>{
                    if(err) throw err;
                    if(rs.length){
                        for(let i =0; i<rs.length; i++){
                            tags+=`<option value='${rs[i].tag_Name}'>${rs[i].tag_Name}</option>`;
                        }
                        res.render("schedule",{title:"Schedule",accounts:[acc],tags:[tags]});
                    }
                    else{
                        res.render("schedule",{title:"Schedule",accounts:[""],tags:[""]});
                    }
                });
            }
        });
});

module.exports= route;