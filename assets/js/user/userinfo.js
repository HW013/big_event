$(function(){
    const form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return "昵称长度应在1~6个字符之间！"
            }
        }
    })
    initUserinfo();
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUserinfo();
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0)
                {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！');
                //子页面调用父页面的方法
                window.parent.getUserinfo();
            }
        })
    })
    function initUserinfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res){
                if(res.status !== 0){
                    return layer.msg("获取用户信息失败！")
                }
                console.log(res);
                //快速为表单赋值
                form.val("formUserInfo",res.data);
            }
        })
    }
})
