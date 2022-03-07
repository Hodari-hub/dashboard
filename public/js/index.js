/* const Tags=require("./tags_class");
const Service=require("./service");
const bot_func=require("./bot_func");
  */
//wait for the document to full loaded
/* $( document ).ready(function() {
    //view app now
    $("body").on('click','.viewApp',function(){
         let appid=$(this).data("appid"),
         appname=$(this).data("appname");  
         boat_app.viewapp(appid,appname); 
         Tags.viewTags(appid,appname); 

         Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete '${accountName}' BOT from the system`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                tag_db.run(`DELETE FROM tags WHERE app_id='${tagId}'`,function(err){
                    if(err){Swal.fire({title:"Error",text:err,icon:'error',confirmButtonColor: '#f27474',}); return;}
                    bot_db.run(`DELETE FROM botapp WHERE app_id='${tagId}'`,function(err){
                        if(err){Swal.fire({title:"Error",text:err,icon:'error',confirmButtonColor: '#f27474',}); return;}
                        Swal.fire('Deleted!',`BOT named '${accountName}' has been deleted successfully!`,'success');
                        $("body").find(`#app_${tagId}`).fadeOut(1000);
                        $("body").find(`.tagsList`).fadeOut();
                        setTimeout(()=>{$("body").find(`#app_${tagId}`).remove();},1000);
                        setTimeout(()=>{$("body").find(`.tagsList`).remove();},1000);
                        $("body").find("#current_app").html("..");
                        $("body").find("#current_view").html("");
                    });
                });
            }
        });
    });
    //add tag
    $("body").on('click','#addTag',function(){ let appid=$("body").find("#appId_holder").val(); if (!appid) { Swal.fire({title:"Error",text:"Please choose app first!",icon:'error',confirmButtonColor: '#f27474',}); return;};  Tags.addTag(appid); });
    //delete bot
    $("body").on('click','.delet_bot',function(){ 
        let botname=$(this).data("id"),name=$(this).data("name");
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete '${botname}' BOT from the system`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                tag_db.run(`DELETE FROM tags WHERE app_id='${tagId}'`,function(err){
                    if(err){Swal.fire({title:"Error",text:err,icon:'error',confirmButtonColor: '#f27474',}); return;}
                    bot_db.run(`DELETE FROM botapp WHERE app_id='${tagId}'`,function(err){
                        if(err){Swal.fire({title:"Error",text:err,icon:'error',confirmButtonColor: '#f27474',}); return;}
                        Swal.fire('Deleted!',`BOT named '${accountName}' has been deleted successfully!`,'success');
                        $("body").find(`#app_${tagId}`).fadeOut(1000);
                        $("body").find(`.tagsList`).fadeOut();
                        setTimeout(()=>{$("body").find(`#app_${tagId}`).remove();},1000);
                        setTimeout(()=>{$("body").find(`.tagsList`).remove();},1000);
                        $("body").find("#current_app").html("..");
                        $("body").find("#current_view").html("");
                    });
                });
            }
        });
    });

    //click tab
    $("body").on('dblclick',".tagsList",function(){let tagId=$(this).data("tagid"),tagName=$(this).data("tagname"),status=$(this).data("tagcond"),tagtime=$(this).data("tagtime");Tags.deleteTag(tagId,tagName,status,tagtime);});
    
    //return the current time
    let now = function(){var d = new Date();let h=d.getHours(),m=d.getMinutes();if(h<=9){h=`0${h}`;}else{h=`${h}`;}if(m<=9){m=`0${m}`;}else{m=`${m}`;} return `${h}:${m}`;}

    //run the check every seconds to see if the is a event to attend
    setInterval(function(){
        //get the tag to run 
        for(let i=0;i< tagsTime.length;i++){
            let tag=tagsTime[i].split("-")[0];
            let time=tagsTime[i].split("-")[1];
            let status=tagsTime[i].split("-")[2];
            let appid=tagsTime[i].split("-")[3];
            console.log(time,now());
            if(time==now()){
                //run the first tweet
                bot_func.run_tweet(appid,tag);
            }
            else{
                console.log("we have not get anything to post yet!");
            }
        }
    },1000);
});
 */

//handle new app submission
$("body").on('click','#addApp',function(){
    Swal.fire({
        title: 'New App',
        html: `<input type="text" id="appName" class="swal2-input" placeholder="App Name">
        <input type="text" id="appKey" class="swal2-input" placeholder="API Key"> <input type="password" id="appSecrete" class="swal2-input" placeholder="API Secrete">
        <input type="text" id="appToken" class="swal2-input" placeholder="Access Token"> <input type="password" id="accessSecrete" class="swal2-input" placeholder="Access Token Secret">`,
        confirmButtonText: 'Add',focusConfirm: false,
        preConfirm: () => {
            let appName = Swal.getPopup().querySelector('#appName').value,appKey = Swal.getPopup().querySelector('#appKey').value;
            let appSecrete = Swal.getPopup().querySelector('#appSecrete').value,appToken = Swal.getPopup().querySelector('#appToken').value;
            let accessSecrete = Swal.getPopup().querySelector('#accessSecrete').value;
            if (!appName || !appKey || !appSecrete || !appToken || !accessSecrete) {Swal.showValidationMessage(`All Input Field are needed!`);}
            return { appName: appName, appKey: appKey, appSecrete: appSecrete, appToken: appToken, accessSecrete: accessSecrete }
        }
    })
    .then((result) => {
        if(result.isConfirmed){
            $.ajax({
                type:"POST",url:"/addapp", data:{appName: result.value.appName, appKey: result.value.appKey, keySecrete: result.value.appSecrete, accessToken: result.value.appToken, accessSecrete: result.value.accessSecrete},
                success:function(rs){
                    if(rs.code==1){
                        $("#account_List").prepend(`<li class="list-group-item borderless viewApp" data-appid='${rs.appid}' data-appname='${result.value.appName}'>${result.value.appName}</li>`);
                        Swal.fire({title: '',html: rs.message,icon: 'success',confirmButtonText: 'Ok'});
                    }
                    else{Swal.fire({title: '',text: rs.message,icon: 'info',confirmButtonText: 'Ok'});}
                }
            });
        }
    });
});


$("body").on('click','#colorPlate',function(){
    Swal.fire({
        html: `<select id='theme' class='swal2-input'><option selected>Choose Theme</option><option value='light'>Light Theme</option><option value='dark'>Dark Theme</option></select>`,
        confirmButtonText: 'Change',
        focusConfirm: false,
        preConfirm: () => {
            const theme = Swal.getPopup().querySelector('#theme').value;
            if (!theme) {Swal.showValidationMessage(`Something went wrong, please! try again later`);}
            return { theme: theme}
        }
    })
    .then((result) => {
        if(result.value.theme=="light"){
            Swal.fire(`set the light theme`);
            let index_light,login_light,index_Path,login_Path,queryString;
            index_light=`:root {--bodyColor:#fff;--borderColor:#dedede;--listGroupBg:#fff;--sideMenuBg:#eee;--mainBodyColor:#e1e1e1;--innerBarandTag:#f1f1f1;--danger:#e00510;--textColor:#000;--textColor2:#444;--addButton:#ccc;--btnColor:#fff;--hoverColor:#9cdcfe;}`;
            login_light=`:root{--anmclr:#eee;--transclr:#151515;--body:#fff;--de:#dedede;--theClr:#45aae7;}`;
            index_Path=path.join(__dirname,"../css/theme.css");
            login_Path=path.join(__dirname,"../css/login_theme.css");
            fs.writeFileSync(index_Path,index_light);
            fs.writeFileSync(login_Path,login_light);
            queryString = '?reload=' + new Date().getTime();
            $('link[rel="stylesheet"]').each(function () {this.href = this.href.replace(/\?.*|$/, queryString);});
        }
        else{
            Swal.fire(`set the dark theme`);
            let index_dark,login_dark,index_Path,login_Path,queryString;
            index_dark=`:root {--bodyColor:#3c3c3c;--borderColor:#414141;--sideMenuBg:#252526;--listGroupBg:#37373d;--mainBodyColor:#1e1e1e;--innerBarandTag:#2d2d2d;--danger:#e00510;--textColor:#fff;--textColor2:#aaa;--addButton:#d0a653;--btnColor:#ad5334;--hoverColor:#9cdcfe;}`;
            login_dark=`:root{--anmclr:#eee;--transclr:#fff;--body:#151515;--de:#dedede;--theClr:#45aae7;}`;
            index_Path=path.join(__dirname,"../css/theme.css");
            login_Path=path.join(__dirname,"../css/login_theme.css");
            fs.writeFileSync(index_Path,index_dark);
            fs.writeFileSync(login_Path,login_dark);
            queryString = '?reload=' + new Date().getTime();
            $('link[rel="stylesheet"]').each(function () {this.href = this.href.replace(/\?.*|$/, queryString);});
        }
    });
});

$("body").on('click','#addTag',function(){
    Swal.fire({
        title: 'New Tag',
        html: `<input type="text" id="tagName" class="swal2-input" placeholder="Enter Tag Name">`,
        confirmButtonText: 'Add',focusConfirm: false,
        preConfirm: () => {
            let tagName = Swal.getPopup().querySelector('#tagName').value;
            if (!tagName) {Swal.showValidationMessage(`All Input Field are needed!`);}
            return { tagName: tagName }
        }
    })
    .then((result) => {
        $.ajax({
            type:"POST",url:"/addTag", data:{newTag: result.value.tagName},
            success:function(rs){
                if(rs.code==1){
                    $("#tag_List").prepend(`<div id='tag_id_${rs.tag_id}' data-tagid='${rs.tag_id}' class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 my-1 tagsList p-1">
                    <div class='d-flex p-2'><i class="bi bi-twitter"></i>&nbsp; ${result.value.tagName}</div> <div class='d-flex p-2'><i class="bi bi-clock"></i>&nbsp; timeTorun</div>
                    </div>`);
                    Swal.fire({title: '',html: rs.message,icon: 'success',confirmButtonText: 'Ok'});
                }
                else{Swal.fire({title: '',text: rs.message,icon: 'info',confirmButtonText: 'Ok'});}
            }
        });
    });
});

$("#addRetweet").submit(function(e){
    e.preventDefault(); $(this).find(".response_div").fadeIn();
    if(!$("#app_id").val()){Swal.fire({title: '',text: 'Please select app from the left navigation!',icon: 'info',confirmButtonText: 'Ok'}); return;}
    var process='<span class="spinner-border text-success" role="status"><span class="sr-only">Loading...</span></span>';
    $(this).find(".response").html(`${process}`); var form=$(this);
    $.ajax({
        type:"POST",url:"/addRetweet", data:form.serialize(),
        success:function(rs){
            $(".response").html("");
            if(rs.code==1){
                $("#dashBoardLogin").find("select").val('');
                Swal.fire({title: '',html: rs.message,icon: 'success',confirmButtonText: 'Ok'});}
                else{Swal.fire({title: '',text: rs.message,icon: 'info',confirmButtonText: 'Ok'});}
            }
    });
});


$("body").on('click','.viewApp',function(){
    let appid=$(this).data("appid"),appname=$(this).data("appname");
    $("#app_id").val(appid);$("#current_view").html(appname);
});

$("body").on('click','#getTable',function(){
    let appid=$("#app_id").val();
    if(!appid){Swal.fire({title: '',text: 'Please select app!',icon: 'info',confirmButtonText: 'Ok'}); return;}
    $("#addRetweet").fadeOut(); $("#viewTag").fadeIn();
    $.ajax({
        type:"POST",url:"/getTable", data:{getTable: appid},
        success:function(rs){
            if(rs.code==1){$("#trSchedule").html(rs.list);}
            else{Swal.fire({title: '',text: rs.message,icon: 'info',confirmButtonText: 'Ok'});}
        }
    });
});

$("#returnForm").click(function(){ $("#addRetweet").fadeIn(); $("#viewTag").fadeOut();});

$("body").on('click','.deleteTag',function(){
    let day=$(this).data("day");
    let id=$(this).data("id");
    Swal.fire({
        title: '',
        html: `Are you sure? you want to delete <strong>${day}</strong> schedule from the list`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type:"POST",url:"/deleteTag", data:{day: day,id:id},
                success:function(rs){
                    if(rs.code==1){ $(`#tr_${id}`).remove(); Swal.fire({title: '',html: rs.message,icon: 'success',confirmButtonText: 'Ok'});}
                    else{Swal.fire({title: '',text: rs.message,icon: 'info',confirmButtonText: 'Ok'});}
                }
            });
        }
      });
});