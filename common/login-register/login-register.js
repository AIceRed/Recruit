var isCandidate = 1;
function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('创建账号');
    });
    $('.error').removeClass('alert alert-danger').html('');
}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        $('.modal-title').html('登录');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(Candidate){
    isCandidate = Candidate;
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function registerAjax(){
    var username = $(".registerBox").find('[name="username"]').val();
    var password = $(".registerBox").find('[name="password"]').val();
    var repassword = $(".registerBox").find('[name="repassword"]').val();
    if(username == "" || password == "" || repassword == ""){
        shakeModal("账号或密码不能为空");
    }else if(password != repassword){
        shakeModal("请确认俩次输入密码相同");
    }else {
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: username,
                password: password,
                isCandidate:isCandidate
            },
            dataType: 'json',
            success: function (result) {
                if(result.code == 1){
                    openLoginModal();
                }else if (result.message) {
                    shakeModal(result.message);
                }
            }
        });
    }
}
function loginAjax() {
    var username = $(".loginBox").find('[name="username"]').val();
    var password = $(".loginBox").find('[name="password"]').val();
    if(username == "" || password == ""){
        shakeModal("账号或密码不能为空");
    }else {
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: username,
                password: password,
                isCandidate:isCandidate
            },
            dataType: 'json',
            success: function (result) {
                if(result.message == "登录成功"){
                    window.location.reload();
                }
                shakeModal(result.message);
            }
        });
    }
}
function shakeModal(msg){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html(msg);
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}
