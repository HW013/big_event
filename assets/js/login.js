$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //从layui获取form对象
    const form = layui.form
    const layer = layui.layer
    //自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value){
            let pwd = $('.reg-box [name=password]').val();
            if(pwd !== value){
                return '两次密码不一致';
            }
        }
    })
    let data = {username: $('#form-reg [name=username]').val(),
    password: $('#form-reg [name=password]').val()}
    $('#form-reg').on('submit',function(e){
        e.preventDefault();
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link-login').click();
        })
    })
    $('#form-login').submit(function(e){
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败！');
                }
                console.log(res.token);
                layer.msg("登录成功！");
                //将登录成功后的token字符串保存到localstorage
                localStorage.setItem('token',res.token);
                location.href = '/index.html'
            }
        })
    })
})