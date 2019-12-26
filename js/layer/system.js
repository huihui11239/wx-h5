$(function(){
  var getTimestamp=new Date().getTime();
  function autoPlay(){
    var getNowTimestamp = new Date().getTime();
    var BoxType = $("#BoxType").html();
    var BoxSpeed = $("#BoxSpeed").html();
    var ActiveLink = $("#ActiveLink").html();
    var BoxCPU = $("#BoxCPU").html();
    var BoxMEM = $("#BoxMEM").html();
    $.ajax({
      type:"get",
      url:"cgi_bin/get_box_info.cgi"+"?timestamp="+getNowTimestamp,
      dataType:"json",
      async : true,
      success: function(data){
        $("#BoxType").html(data.BoxType);
        $("#BoxSpeed").html(data.BoxSpeed);
        $("#ActiveLink").html(data.ActiveLink);
        $("#BoxCPU").html(data.BoxCPU);
        $("#BoxMEM").html(data.BoxMEM);
      },
      error:function(data){

      }
    });
  }

  //定时器1
  var timer = setInterval(autoPlay,2000);

  //恢复出厂unbind('click')
  $("#RestoreFactory").unbind('click').click(function(){
    $(".alert-wipe-data").css("display","block");
    $("#RestFactory").unbind('click').click(function(){
      $(".Rsysbutton").css({"background":"url(images/loading22.gif) no-repeat","top":"5px"});
      $(".Rsysbutton:hover").css({"background":"url(images/loading22.gif) no-repeat","top":"5px"});
      $.ajax({
        type:"post",
        url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
        async:true,
        dataType:"json",
        data:{
          "DataCode":1101
        },
        success: function(data){
          if(data.Result == 0){
            $(".alert-wipe-data").css("display","none");
            alert(data.Message);
            $(".Rsysbutton").css({"background":"url(../images/ok_bg30.png) no-repeat","top":"4px"});
            $(".Rsysbutton:hover").css({"background":"url(../images/ok_hover30.png) no-repeat","top":"4px"});
            $.ajax({
              type:"get",
              url:"cgi_bin/reboot.cgi"+"?timestamp="+getTimestamp,
              async:true,
              success: function(){}
            });
          } else if(data.Result == -1){
            window.location.href="前端搜索.html";
          } else {
            alert(data.ErrMessage);
          }
        },
        success: function(data){
          if(data.Result == 0){
            $(".alert-wipe-data").css("display","none");
            alert(data.Message);
            $(".Rsysbutton").css({"background":"url(../images/ok_bg30.png) no-repeat","top":"4px"});
            $(".Rsysbutton:hover").css({"background":"url(../images/ok_hover30.png) no-repeat","top":"4px"});
            $.ajax({
              type:"get",
              url:"cgi_bin/reboot.cgi"+"?timestamp="+getTimestamp,
              async:true,
              success: function(){}
            });
          } else if(data.Result == -1){
            window.location.href="前端搜索.html";
          } else {
            alert(data.ErrMessage);
          }
        },
        error: function(){
          alert("出错啦！");
        }
      });
    });
  });

  $("#NoRestFactory").unbind('click').click(function(){
    $(".alert-wipe-data").css("display","none");
  });

  //数据分析
  $("#DataSystem").click(function(){
    var SysData = $("#sysdata").val() ;
    var DataTime = $("#datatime").val() ;
    if($("#sysdata").val() ==""){
      alert("请输入数据分析值");
      $("#sysdata").focus();
    }
    else if($("#datatime").val() ==""){
      alert("请输入时间");
      $("#datatime").focus();
    }
    else{
      $(".Dsysbutton").css({"background":"url(images/loading22.gif) no-repeat","top":"8px"});
      $(".Dsysbutton:hover").css({"background":"url(images/loading22.gif) no-repeat","top":"8px"});
      $.ajax({
        type:"post",
        url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
        async:true,
        dataType:"json",
        data:{
          "DataCode":1102,
          "SysData" :SysData,
          "DataTime" :DataTime
        },
        success: function(data){
          if(data.Result == 0){
            alert(data.Message);
            $(".Dsysbutton").css({"background":"url(images/ok_bg30.png) no-repeat","top":"8px"});
            $(".Dsysbutton:hover").css({"background":"url(images/ok_hover30.png) no-repeat","top":"8px"});
          } else if(data.Result == -1){
            window.location.href="前端搜索.html";
          } else {
            alert(data.ErrMessage);
            $(".Dsysbutton").css({"background":"url(images/ok_bg30.png) no-repeat","top":"8px"});
            $(".Dsysbutton:hover").css({"background":"url(images/ok_hover30.png) no-repeat","top":"8px"});
          }
        },
        error: function(){
          alert("出错啦！");
        }
      });
    }
  });

  //系统升级
  /*$("#SystemUpdate").click(function(){
        $(".Usysbutton").css({"background":"url(images/loading22.gif) no-repeat","top":"21px"});
        $.ajax({
            type:"post",
            url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
            async:true,
            dataType:"json",
            data:{
                "DataCode":1103
            },
            success: function(data){
                if(data.Result == 0){
                    alert(data.Message);
                    $(".Usysbutton").css({"background":"url(images/ok_bg30.png) no-repeat","top":"8px"});
                }
                else if(data.Result == -1){
                    window.location.href="前端搜索.html";
                }
                else {
                    alert(data.ErrMessage);
                }
            },
            error: function(){
                alert("出错啦！");
            }
        });
    });*/

  //修改一点通盒子账户信息
  $("#InforSubmit").click(function(){
    var NewName = $("#NewName").val() ; //新用户名
    var NewPas = hex_md5($("#NewPas").val()) ; //新密码
    var AffNewPas = hex_md5($("#AffNewPas").val()); //确认新密码
    var OldPas = hex_md5($("#OldPas").val()); // 原密码
    if($("#NewName").val() ==''){
      alert("请输入用户名！");
      $("#NewName").focus();
      return false ;
    }
    if($("#NewPas").val() == ''){
      alert("请输入新密码");
      $("#NewPas").focus();
      return false ;
    }
    if($("#AffNewPas").val() == ''){
      alert("请确认新密码！");
      $("#AffNewPas").focus();
      return false ;
    }
    if( NewPas != AffNewPas ){
      alert("两次密码输入不一致！");
      $("#AffNewPas").focus();
      return false ;
    }
    if($("#OldPas").val() ==''){
      alert("原密码不能为空！");
      $("#OldPas").focus();
      return false ;
    }
    else{
      $.ajax({
        type:"post",
        url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
        async:true,
        dataType:"json",
        data:{
          "DataCode":1104,
          "NewName":NewName,
          "NewPas":NewPas,
          "AffNewPas":AffNewPas,
          "OldPas":OldPas
        },
        success: function(data){
          if(data.Result == 0){
            alert(data.Message);
            window.location.href = "前端搜索.html";
          } else if(data.Result == -1) { //登录超时
            window.location.href = "前端搜索.html";
          } else if (data.Result < 0) { //错误
            alert(data.ErrMessage);
          }
        }
      });
    }

  });

  //当前版本号
  $(window).load(function(){
    $.ajax({
      type:"post",
      url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
      async:true,
      dataType:"json",
      data:{
        "DataCode":1105
      },
      success:function(data){
        console.log(data)
        if(data.Result == 0){
          //当前版本号
          $("#CurrentNum").html("当前版本号："+ data.CurrentNum);
          //盒子名称
          var BoxName = data.BoxName
          $("#nameValue").val(decodeURI(BoxName))
            //判断初始的时候是PE哪个模式，触发他的点击事件
            if(data.BoxMode == 1){
                $(".mode-wrap .mode").eq(0).trigger("click")
            }
            if(data.BoxMode == 2){
                $(".mode-wrap .mode").eq(1).trigger("click")
            }

            //判断初始的时候本机服务、在线服务哪个默认勾选状态,0 是未勾选，1是勾选
            if(data.StandaloneService == 0){
                $(".server-wrap .local").attr("checked",false);
                //$("#local").trigger("click");
            }
            if(data.StandaloneService == 1){
                $(".server-wrap .local").attr("checked",true);
                //$("#local").trigger("click");
            }
            if(data.InternetService == 0){
                $("#onlineNone").show();
                $("#online").hide();
                //$(".server-wrap .online").attr("checked",false);
                //$("#online").trigger("click");
            }
            if(data.InternetService == 1){
                $("#onlineNone").hide();
                $("#online").show();
                //$(".server-wrap .online").attr("checked",true);
                //$("#online").trigger("click");
            }
            //初始的时候，填写e模式的信息
            var CMSServerIp = data.CMSServerIp;
            var CMSServerPort = data.CMSServerPort;
            $("#masterIp").val(CMSServerIp);
            $("#masterPort").val(CMSServerPort);


          //云端验证
          if(data.CloudVerify == 1){
            $(".p1").addClass('pCurrrent');
          }
          else {
            $(".p2").addClass('pCurrrent');
          }

          //启用广域网
          if(data.WanConnection == 1){
            $(".p3").addClass('pCurrrent');
          }
          else {
            $(".p4").addClass('pCurrrent');
          }

        }
        else if(data.Result == -1){ //超时
          window.location.href="前端搜索.html";
        }
      }
    });

    //设置盒子名称
    $("#boxNameBtn").click(function() {
      $.ajax({
        type: "post",
        url: "cgi_bin/system.cgi" + "?timestamp=" + getTimestamp,
        async: true,
        dataType: "json",
        data: {
          "DataCode": 1110,
          "BoxName": $.trim($("#nameValue").val())
        },
        success: function (data) {
          console.log(data)
          if (data.Result == 0) {
            /*var BoxName = data.BoxName
            ("#nameValue").val(decodeURI(BoxName))*/
          }
          else if (data.Result < 0) {
            alert(data.Message);
          }

        }
      })
    })
    //二维码
    $.ajax({
      type:"post",
      url:"cgi_bin/getqrcode.cgi"+"?timestamp="+getTimestamp,
      async:true,
      dataType:"json",
      data:{
        "DataCode":1201
      },
      success:function(data){
        if(data.Result == 0){
          var QrCodeImg = '<img src="/tmp/qrcode_mac.png"/>'
          $(QrCodeImg).appendTo($("#qrcodeTable"));
        }
        else if(data.Result == -1){
          window.location.href="前端搜索.html";
        }
        else {
          alert(data.ErrMessage);
        }
      }
    });

    //云端验证click事件
    $(".validation .p1").click(function(){
      $.ajax({
        type:"post",
        url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
        async:true,
        dataType:"json",
        data:{
          "DataCode":1106,
          "CloudVerify":1
        },
        success:function(data){
          if (data.Result == 0) {
            $(".validation .p1").addClass("pCurrrent").siblings("p").removeClass('pCurrrent');
          }
          else if (data.Result < 0) {
            alert(data.Message);
          }

        }
      });

    });
    $(".validation .p2").click(function(){
      $.ajax({
        type:"post",
        url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
        async:true,
        dataType:"json",
        data:{
          "DataCode":1106,
          "CloudVerify":0
        },
        success:function(data){
          if (data.Result == 0) {
            $(".validation .p2").addClass("pCurrrent").siblings("p").removeClass('pCurrrent');
          }
          else if (data.Result < 0) {
            alert(data.Message);
          }
        }
      });

    });

    //启用广域网click事件
    $(".wanConnection .p3").click(function(){
      $.ajax({
        type:"post",
        url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
        async:true,
        dataType:"json",
        data:{
          "DataCode":1107,
          "WanConnection":1
        },
        success:function(data){
          if (data.Result == 0) {
            $(".wanConnection .p3").addClass("pCurrrent").siblings("p").removeClass('pCurrrent');
          }
          else if (data.Result < 0) {
            alert(data.Message);
          }

        }
      });

    });
    $(".wanConnection .p4").click(function(){
      $(".closeWan-alert").css("display","block");
      $("#CloseWanSubmit").unbind('click').click(function(){
        $.ajax({
          type:"post",
          url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
          async:true,
          dataType:"json",
          data:{
            "DataCode":1107,
            "WanConnection":0
          },
          success:function(data){
            if (data.Result == 0) {
              $(".closeWan-alert").css("display","none");
              $(".wanConnection .p4").addClass("pCurrrent").siblings("p").removeClass('pCurrrent');
            }
            else if (data.Result < 0) {
              alert(data.Message);
            }
          }
        });
      });
    });
    $("#CloseWanCancel").unbind('click').click(function(){
      $(".closeWan-alert").css("display","none");
    });
  });

    //重启
    $("#masterRestart").click(function () {
      layer.confirm('确认重启吗？', {
          btn: ['取消','确认']
      }, function(){
          layer.msg('已取消', {icon: 1});
      }, function(){
          layer.msg('确认重启', {
              time: 500,  //.5s后自动关闭
          });
          reset()   //重启函数
      });
      //重启函数
      function reset(){
          $.ajax({
              type:"post",
              url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
              async:true,
              dataType:"json",
              data:{
                  "DataCode":1020
              },
              success:function(data){
                  if(data.Result == 0){

                  }
                  else if(data.Result == -1){ //超时
                      window.location.href="前端搜索.html";
                  }
              }
          });
      }
  });

    //点击【本机服务】
    $("#local").click(function () {
        if(this.checked){
            $.ajax({
                type: "post",
                url: "cgi_bin/system.cgi" + "?timestamp=" + getTimestamp,
                async: true,
                dataType: "json",
                data: {
                    "DataCode": 1111,
                    "StandaloneService":1
                },
                success: function (data) {
                    console.log("点击【本机服务】")
                    console.log(data)
                }
            })
        }else{     /*取消【本机服务】*/
            $.ajax({
                type: "post",
                url: "cgi_bin/system.cgi" + "?timestamp=" + getTimestamp,
                async: true,
                dataType: "json",
                data: {
                    "DataCode": 1111,
                    "StandaloneService":0
                },
                success: function (data) {
                    console.log("取消【本机服务】")
                    console.log(data)
                }
            })
        }

    });

    //先点击【在线服务】，再点击 P 模式
    $("#online").click(function () {
        var type=$(this).attr('data-type');
        if(type==1){
            $("#pMode").click(function () {    //p
              if(this.checked){
                  $.ajax({
                      type: "post",
                      url: "cgi_bin/system.cgi" + "?timestamp=" + getTimestamp,
                      async: true,
                      dataType: "json",
                      data: {
                          "DataCode": 1109,
                          "InternetService":1,
                          "BoxMode":1
                      },
                      success: function (data) {
                          console.log("先点击【在线服务】，再点击 P 模式");
                          console.log(data)
                      }
                  })
              }
            })
            $("#EMode").click(function () {   //e
                if(this.checked){
                    //点击ok按钮
                    $("#hMasterOk").click(function () {
                        var CMSServerIp = $.trim($("#masterIp").val());
                        var CMSServerPort = $.trim($("#masterPort").val());
                        $.ajax({
                            type: "post",
                            url: "cgi_bin/system.cgi" + "?timestamp=" + getTimestamp,
                            async: true,
                            dataType: "json",
                            data: {
                                "DataCode": 1109,
                                "InternetService":1,
                                "BoxMode":2,
                                "CMSServerIp":CMSServerIp,
                                "CMSServerPort":CMSServerPort
                            },
                            success: function (data) {
                                console.log("先点击【在线服务】，再点击 e 模式")
                                console.log(data)
                            }
                        })
                    })
                }
            });
        }else{           /*取消已经勾选的【在线服务】*/
            $.ajax({
                type: "post",
                url: "cgi_bin/system.cgi" + "?timestamp=" + getTimestamp,
                async: true,
                dataType: "json",
                data: {
                    "DataCode": 1109,
                    "InternetService":0
                },
                success: function (data) {
                    console.log(data)
                    console.log("取消【在线服务】")
                    if(data.Result < 0){
                        console.log(111)
                        // $("#online").attr("checked",false);
                        $.ajax({
                            type:"post",
                            url:"cgi_bin/system.cgi"+"?timestamp="+getTimestamp,
                            async:true,
                            dataType:"json",
                            data:{
                                "DataCode":1105
                            },
                            success:function(data){
                                console.log(data)
                                //判断初始的时候是PE哪个模式，触发他的点击事件
                                if(data.BoxMode == 1){
                                    $(".mode-wrap .mode").eq(0).trigger("click")
                                }
                                if(data.BoxMode == 2){
                                    $(".mode-wrap .mode").eq(1).trigger("click")
                                }

                                //判断初始的时候本机服务、在线服务哪个默认勾选状态,0 是未勾选，1是勾选
                                if(data.StandaloneService == 0){
                                    $(".server-wrap .local").attr("checked",false);
                                }
                                if(data.StandaloneService == 1){
                                    $(".server-wrap .local").attr("checked",true);
                                }
                                if(data.InternetService == 0){
                                    $("#online").attr("checked",false);
                                }


                                if(data.InternetService == 1){     //在线，勾选
                                    $("#online").show();
                                    $("#onlineNone").hide();
                                }
                                else{
                                    $("#onlineNone").show();
                                    $("#online").hide();
                                }
                            }
                        })

                    }else if(data.Result == 0){
                        console.log("此时data.result = 0")
                    }
                }
            })
        }
    });


    //点击p模式，样式
    $("#pMode").click(function () {
        $("#masterIp").attr('disabled',true);
        $("#masterPort").attr('disabled',true);
        $(".tips").show();
        $(".hContent").hide();
        //$("#hMasterOk").hide();
    });
     //点击e模式，样式
    $("#EMode").click(function () {
        $("#masterIp").attr('disabled',false);
        $("#masterPort").attr('disabled',false);
        $(".tips").hide();
        $(".hContent").show();
    });
});




/*//选择模式P、E、S函数，在上边调用
function tabChange(msg,that) {
    if(msg=='p'){
        $("#masterIp").attr('disabled',true);
        $("#masterPort").attr('disabled',true);
        $(".tips").show()
        $("#hMasterOk").hide()
    }
    if(msg=='e'){
        $("#masterIp").attr('disabled',false);
        $("#masterPort").attr('disabled',false);
        $(".tips").hide()
        $("#hMasterOk").show()
        //如果不先点击【在线服务】，直接点击E模式下的ok按钮
        setMode();
    }
}*/





