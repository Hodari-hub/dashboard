const express = require("express");
const reg_route = express.Router();
const conn=require("../modals/connection");
var bcrypt = require('bcryptjs');

//login 
reg_route.post('/login',async (req,res)=>{
    const {user_email,user_password} = req.body;
    conn.query(`SELECT * FROM users WHERE user_email='${user_email}'`, 
        function (error, results) {
            if(error) throw error;
            if(bcrypt.compareSync(user_password, results[0].users_pass)){
                    res.cookie('userId',results[0].users_id); res.cookie('userEmail',results[0].user_email);
                    res.cookie('userPass',results[0].users_pass); res.json({code: 1,message:"Succesfuly login"});
                    res.end();
                }
                else{res.json({code: 0,message:"Login failed!"});res.end();}
        });
});

//logout 
reg_route.post('/logout', async (req,res)=>{
    res.clearCookie("userId");
    res.clearCookie("userEmail");
    res.clearCookie("userPass");
    res.json({code: 1,message:"Succesfuly login"});
    res.end();
});

module.exports=reg_route;