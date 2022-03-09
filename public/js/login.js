$("#dashBoardLogin").submit(function(e){
  e.preventDefault(); $(this).find(".response_div").fadeIn();
  var process='<span class="spinner-border text-success" role="status"><span class="sr-only">Loading...</span></span>';
  $(this).find(".response").html(`${process}`); var form=$(this);
  $.ajax({
    type:"POST",url:"/login", data:form.serialize(),
    success:function(rs){
      $(".response").html("");
      if(rs.code==1){
        $("#dashBoardLogin").find("input[type=text], input[type=file],textarea").val('');
        window.location='./dashboard';
        /* Swal.fire({title: '',html: rs.message,icon: 'success',confirmButtonText: 'Ok'}); */}
      else{Swal.fire({title: '',text: rs.message,icon: 'info',confirmButtonText: 'Ok'});}
    }
  });
});

//toggle the password
$(".pass_toggler").click(function(){
  let istype=$(`#${$(this).data("id")}`).attr("type"),id=$(this).data("id");
  if(istype=="password"){$(`#${id}`).prop('type','text');$(this).html("<i class='bi bi-eye'></i>");}
  else{$(`#${id}`).prop("type","password");$(this).html("<i class='bi bi-eye-slash'></i>");}
});

