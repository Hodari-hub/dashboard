const conn=require("../modals/connection");
var create_tables=()=>{
    conn.query(`CREATE TABLE IF NOT EXISTS users(users_id INT(11) NOT NULL AUTO_INCREMENT, 
            users_pic TEXT NULL, users_name TEXT NULL, users_first_number VARCHAR(255) NULL,users_sec_number VARCHAR(255) NULL, user_email VARCHAR(255) NOT NULL, 
            users_pass VARCHAR(255) NOT NULL, activated ENUM('0','1') NOT NULL,joined_date DATETIME NULL, last_log DATETIME NULL, PRIMARY KEY(users_id))`, 
        function (error, result) {if (error) throw error;});
    
    conn.query(`CREATE TABLE IF NOT EXISTS botapp(app_id INTEGER PRIMARY KEY AUTO_INCREMENT,app_name TEXT NOT NULL,
            api_key TEXT NOT NULL,api_secrete TEXT NOT NULL,access_token TEXT NOT NULL,access_secret TEXT NOT NULL)`,
             function (error, result) {if (error) throw error;});
    
    conn.query(`CREATE TABLE IF NOT EXISTS tags(tag_id INTEGER PRIMARY KEY AUTO_INCREMENT,tag_Name TEXT NOT NULL)`, 
        function (error, result) {if (error) throw error;});
    
    conn.query(`CREATE TABLE IF NOT EXISTS retweets(rt_id INTEGER PRIMARY KEY AUTO_INCREMENT,time_interval INT(11) NOT NULL, 
            app_id INT(11) NOT NULL,tag_name VARCHAR(255) NOT NULL, day_name VARCHAR(255) NOT NULL,numofretweet INT(11) NOT NULL)`,
        function (error, result) {if (error) throw error;});

    conn.query(`CREATE TABLE IF NOT EXISTS retweeted_post(rted_id INTEGER PRIMARY KEY AUTO_INCREMENT, id_str INT(11) NOT NULL,
            app_id INT(11) NOT NULL,app_name VARCHAR(255) NOT NULL,user_name VARCHAR(255) NOT NULL, screen_name VARCHAR(255) NOT NULL,
            post_text LONGTEXT NOT NULL, profile_picture LONGTEXT NOT NULL,retweeted_count VARCHAR(255) NOT NULL)`,
        function (error, result) {if (error) throw error;});
        
    conn.query(`CREATE TABLE IF NOT EXISTS failed_attempt(rted_id INTEGER PRIMARY KEY AUTO_INCREMENT, id_str INT(11) NOT NULL,
            app_id INT(11) NOT NULL,app_name VARCHAR(255) NOT NULL, user_name VARCHAR(255) NOT NULL, screen_name VARCHAR(255) NOT NULL,
            post_text LONGTEXT NOT NULL, profile_picture LONGTEXT NOT NULL, retweeted_count VARCHAR(255) NOT NULL, reson_note LONGTEXT NOT NULL)`,
        function (error, result) {if (error) throw error;});
}
module.exports={create_tables};