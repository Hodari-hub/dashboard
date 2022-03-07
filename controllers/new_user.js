const _conn=require("../modals/connection");
var bcrypt = require('bcryptjs');

const new_user=async(user_email,user_password)=>{
    let hashpassword = bcrypt.hashSync(user_password, 8);
    let response= false;
    await _conn.query(`INSERT INTO users SET ?`,{user_email:user_email,users_pass:hashpassword}, 
    function(error, results) {
        if (error) throw error;
        if(results.affectedRows){response=true;}
    });
    return response;
}

module.exports={new_user}