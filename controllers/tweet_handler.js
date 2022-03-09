const conn=require("../modals/connection");
const twit = require('twit');
//initialize retweet variables
let T="";

//search tweet and retweet
var retweet=(err,data,access_token,access_secret,api_key,api_secrete,app_name,rt_id,app_id,day_name)=>{
    console.log(err);
    let tweet_list=data.statuses;
    T = new twit({consumer_key:api_key,consumer_secret:api_secrete,access_token:access_token,access_token_secret:access_secret});
    
    for(let i=0;i<tweet_list.length;i++){
        //check if there is the retweete_status property in the status object first 
        if(tweet_list[i].hasOwnProperty('retweeted_status')){

            //save the retwweed reference
            let txt=tweet_list[i].text.replace(/'/gi, "&#39;");
            let usernames=tweet_list[i].retweeted_status.user.name.replace(/'/gi, "&#39;");

            T.post('statuses/retweet/:id', { id: tweet_list[i].retweeted_status.id_str }, function (error, data, response) {
                if(error){
                    let erromsg="You have already retweeted this Tweet.";
                    //if you have find err then record the result or rerun the process
                    conn.query(`INSERT INTO failed_attempt(id_str,user_name,screen_name,post_text,profile_picture,retweeted_count,reson_note,app_id,app_name) 
                    VALUES('${tweet_list[i].retweeted_status.id_str}','${usernames}','${tweet_list[i].retweeted_status.user.screen_name}','${txt}','${tweet_list[i].retweeted_status.user.profile_image_url}','${tweet_list[i].retweet_count}','${erromsg}','${app_id}','${app_name}')`,function(err){
                        if(err){console.log(err);}
                        console.log("retweet failed");
                    });
                }
                else{
                    //if no error found then save the report
                    conn.query(`INSERT INTO retweeted_post(id_str,user_name,screen_name,post_text,profile_picture,retweeted_count,app_id,app_name) 
                    VALUES('${tweet_list[i].retweeted_status.id_str}','${usernames}','${tweet_list[i].retweeted_status.user.screen_name}','${txt}','${tweet_list[i].retweeted_status.user.profile_image_url}','${tweet_list[i].retweet_count}','${app_id}','${app_name}')`,function(err){
                        if(err){console.log(err);}
                        console.log("retweet success");
                    });
                }
            });
        }
        else{
            //save the retwweed reference
            let txt=tweet_list[i].text.replace(/'/gi, "&#39;");
            let usernames=tweet_list[i].user.name.replace(/'/gi, "&#39;");

            T.post('statuses/retweet/:id', { id: tweet_list[i].id_str }, function (error, data, response) {
                if(error){
                    //if you have find err then record the result or rerun the process
                    conn.query(`INSERT INTO failed_attempt(id_str,user_name,screen_name,post_text,profile_picture,retweeted_count,reson_note,app_id,app_name) 
                    VALUES('${tweet_list[i].id_str}','${usernames}','${tweet_list[i].user.screen_name}','${txt}','${tweet_list[i].user.profile_image_url}','${tweet_list[i].retweet_count}','${err}','${app_id}','${app_name}')`,function(err){
                        if(err){console.log(err);}
                        console.log("retweet failed");
                    });
                }
                else{
                    //if no error found then save the report
                    conn.query(`INSERT INTO retweeted_post(id_str,user_name,screen_name,post_text,profile_picture,retweeted_count,app_id,app_name) 
                    VALUES('${tweet_list[i].id_str}','${usernames}','${tweet_list[i].user.screen_name}','${txt}','${tweet_list[i].user.profile_image_url}','${tweet_list[i].retweet_count}','${app_id}','${app_name}')`,function(err){
                        if(err){console.log(err);}
                        console.log("retweet success");
                    });
                }
            });
        }
    }
}

//search tweet
var serch_tweet=(rt_id,app_id,tag_name,day_name,app_name,api_key,api_secrete,access_token,access_secret,numofretweet)=>{
    //initialize twit
    let params={q:tag_name,count: numofretweet};
    T = new twit({consumer_key:api_key,consumer_secret:api_secrete,access_token:access_token,access_token_secret:access_secret});
    T.get('search/tweets',params,function(err, data){retweet(err,data,access_token,access_secret,api_key,api_secrete,app_name,rt_id,app_id,day_name);});
}

module.exports={serch_tweet}