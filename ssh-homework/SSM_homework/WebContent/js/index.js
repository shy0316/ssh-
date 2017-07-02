/*
 *create by perany 
 *彭杨丽 14卓工班 
 *2017年6月20日
 */

//--------------------导航链接-------------------------
$(function () {
    $(".nav #home").click(function () {
        $("body").animate({
            scrollTop: '0px'
        }, 650);
    });
    $(".nav #news").click(function () {
        $("body").animate({
            scrollTop: '720px'
        }, 650);
    });
    $(".nav #tuling").click(function () {
        $("body").animate({
            scrollTop: '1600px'
        }, 650);
    });
    $(".nav #yiyuan").click(function () {
        $("body").animate({
            scrollTop: '2420px'
        }, 650);
    });
    $(".nav #bendi").click(function () {
        $("body").animate({
            scrollTop: '3200px'
        }, 650);
    });
});


//---------------------RSS新闻-----------------------
$(function () {
    //请求百度提供的新闻信息
    $.ajax({
        url: 'getRssNews.action',
        type: 'post',
        dataType: 'xml',
        data: {
            "url": 'http://news.baidu.com/n?cmd=1&class=civilnews&tn=rss'
        },
        success: function (data) {
            eachnews(data);
        },
        error: function () {
            alert("error");
        }
    });

    function eachnews(newsdata) {
        var table_body_left = "";
        var table_body_right = "";
        $(newsdata).find('channel').find('item').each(function (index, value) {
            var titles = $(value).find('title').text();
            var links = $(value).find('link').text();
            //            console.log(links);
            if (index < 10) {
                table_body_left += "<li><a href=\"" + links + "\" target=\"_blank\">" + titles + "</a></li>";
            } else if (index >= 10 && index < 20) {
                table_body_right += "<li><a href=\"" + links + "\" target=\"_blank\">" + titles + "</a></li>";
            }
        })
        $(".news-page .content .left ul").html(table_body_left);
        $(".news-page .content .right ul").html(table_body_right);
    }

});



//---------------------图灵机器人-----------------------



$(function () {

    $(".choose .fun-1").click(function () {
        noparamsendajax("text", "讲个笑话");
    });
    $(".choose .fun-2").click(function () {
        noparamsendajax("text", "讲个故事");
    });
    $(".choose .fun-3").click(function () {
        noparamsendajax("news", "今日新闻");
    });
    $(".choose .fun-4").click(function () {
        noparamsendajax("text", "图灵的简介");
    });
    $(".choose .fun-5").click(function () {
        setModal($(this), "图灵机器人-菜谱大全", "请在聊天输入栏内输入：菜名+“菜谱”", "OK");
    });
    $(".choose .fun-6").click(function () {
        setModal($(this), "图灵机器人-成语接龙", "请在聊天输入栏内输入：成语+“成语接龙”", "OK");
    });
    $(".choose .fun-7").click(function () {
        setModal($(this), "图灵机器人-吉凶查询", "请在聊天输入栏内输入：吉凶查询的内容", "OK");
    });
    $(".choose .fun-8").click(function () {
        setModal($(this), "图灵机器人-星座运势", "请在聊天输入栏内输入：星座+“星座运势”", "OK");
    });
    $(".choose .fun-9").click(function () {
        setModal($(this), "图灵机器人-天气查询", "请在聊天输入栏内输入：城市+“天气”", "OK");
    });
    $(".choose .fun-10").click(function () {
        setModal($(this), "图灵机器人-数字运算", "请在聊天输入栏内输入：数字运算表达式”", "OK");
    });
    $(".choose .fun-11").click(function () {
        setModal($(this), "图灵机器人-日期查询", "请在聊天输入栏内输入：日期+“农历”", "OK");
    });
    $(".choose .fun-12").click(function () {
        setModal($(this), "图灵机器人-中英互译", "请在聊天输入栏内输入：内容+“英文单词/中文翻译”", "OK");
    });
    $(".choose .fun-13").click(function () {
        setModal($(this), "图灵机器人-汽油报价", "请在聊天输入栏内输入：城市+“汽油价格”", "OK");
    });
    $(".choose .fun-14").click(function () {
        setModal($(this), "图灵机器人-城市邮编", "请在聊天输入栏内输入：城市+“邮编”", "OK");
    });


    //手动输入发送内容事件  按键发送
    var $sendbt = $(".talk_word #talksend");
    $sendbt.click(function () {
        sendmybox();
        appendusersth($talktext); //发送文本内容
    });
    //手动输入发送内容事件   回车发送
    $(".talk_word .messages").keydown(function (e) {
        if (e.keyCode == 13) {
            sendmybox();
            $(".talk_word .messages").focus();
            $(".talk_word .messages").val("");
        }
    });
    //手动输入 发送函数定义
    function sendmybox() {
        var $talktext = $(".talk_word .messages").val(); //获取输入内容
        if (!sendsth($talktext)) {
            return false;
        } //检测发送内容,发送ajax请求
        appendusersth($talktext); //发送文本内容
    }


    //点击右侧模拟输入发送内容
    $sendbt.bind("robertsendevent", function (event, msg) {
        //        console.log(msg);
        appendrobertsth(msg);
    });

    //文本框提示语控制
    $(".talk_word .messages").focus(function () {
        $(this).val("");
    }).blur(function () {
        var now_ = $(this).val();
        if (now_ == "") {
            $(this).val("请在这里输入文字,按回车键enter发送");
        }
    });

    //时间格式化
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    //无需输入模块的请求发送    type_:返回的数据格式类型
    function noparamsendajax(type_, datamsg) {

        //定义返回的list格式
        function resultlistformat(object_, type) {
            var str = new Array();
            var perstr = "";
            $.each(object_, function (idx, obj) {
                if (type == "food") {
                    perstr = object_.name + ":" + object_.info + "[" + object_.detailurl + "]";
                } else if (type == "news") {
                    perstr = object_.source + ":" + object_.article + "[" + object_.detailurl + "]";
                }
                str.push(perstr);
            });
            return str.join(";");
        }

        //发送请求，获取返回数据
        $.ajax({
            url: 'http://www.tuling123.com/openapi/api',
            type: 'post',
            data: {
                "key": "0b013cd563ca4f04bde873b772e218f5",
                "info": datamsg,
                "userid": "2121"
            },
            dataType: 'json',
            success: function (data) {
                if (data != null) {
                    switch (type_) {
                    case "text":
                        $sendbt.trigger("robertsendevent", data.text + "");
                        break;
                    case "news":
                        $sendbt.trigger("robertsendevent", data.text + "! [https://www.toutiao.com/]");
                        break;
                    case "food":
                        $sendbt.trigger("robertsendevent", data.text + "! [http://www.haodou.com/]");
                        break;
                    case "oil":
                        $sendbt.trigger("robertsendevent", data.text + "[" + data.url + "]");
                        break;
                    default:
                        break;
                    }
                } else {
                    alert("ajax get a null object!");
                }
            },
            error: function () {
                alert("error");
            }
        });

    }

    //检测发送内容
    function sendsth(talktext) {
        if (talktext == "" || talktext == "请在这里输入文字,按回车键enter发送") {
            alert("请重新输入内容后再发送");
            return false;
        }
        $(".talk_word .messages").val("请在这里输入文字,按回车键enter发送");
        //发送ajax请求
        if (talktext.indexOf("菜谱") > 0) {
            noparamsendajax("food", talktext);
        } else if (talktext.indexOf("成语接龙") > 0) {
            noparamsendajax("text", talktext);
        } else if (talktext.indexOf("运势") > 0) {
            noparamsendajax("text", talktext);
        } else if (talktext.indexOf("天气") > 0) {
            noparamsendajax("text", talktext);
        } else if (talktext.indexOf("汽油") > 0) {
            noparamsendajax("oil", talktext);
        } else {
            noparamsendajax("text", talktext);
        }
        return true;
    }

    //追加我方发送节点至聊天框函数
    function appendusersth(inp_text) {
        //获取当前时间
        var nowtime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");

        //追加节点
        var appendnode = "<div class=\"talk_recordboxme\"> <div class = \"user\"> <img src = \"images/user.jpg\"width = \"46px\" height = \"46px\" /> </div> <div class = \"talk_recordtextbg\" ></div> <div class = \"talk_recordtext\" > <h3> " + inp_text + "</h3> <span class = \"talk_time\">" + nowtime + "</span > </div> </div > ";
        $(".jspPane").append(appendnode);

        //重新加载执行js文件
        $.getScript("./js/jquery.mousewheel.js", function () {
            //            console.log("jquery.mousewheel.js重新加载js");
        });
        $.getScript("./js/jquery.jscrollpane.min.js", function () {
            //            console.log("jquery.jscrollpane.min.js重新加载js");
        });
        $.getScript("./js/tulingpage.js", function () {
            //            console.log("tulingpage.js重新加载js");
        });

        //自动定位到最末端
        var panetop = $(".jspPane").height() - 400;
        $(".jspPane").animate({
            "top": -panetop
        }, 350);
        var dragtop = $(".jspTrack").height() - $(".jspDrag").height() - 0;
        $(".jspDrag").animate({
            "top": dragtop + "px"
        }, 650);
        //        $(".jspDrag").css("top", dragtop + "px");
    }

    //追加图灵机器人发送节点至聊天框函数
    function appendrobertsth(inp_text) {
        //获取当前时间
        var nowtime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");

        //追加节点
        var appendnode = "<div class=\"talk_recordbox\"> <div class = \"user\"> <img src = \"images/robert.png\"width = \"46px\" height = \"46px\" /> </div> <div class = \"talk_recordtextbg\" ></div> <div class = \"talk_recordtext\" > <h3> " + inp_text + "</h3> <span class = \"talk_time\">" + nowtime + "</span > </div> </div > ";
        $(".jspPane").append(appendnode);

        //重新加载执行js文件
        $.getScript("./js/jquery.mousewheel.js", function () {
            //            console.log("jquery.mousewheel.js重新加载js");
        });
        $.getScript("./js/jquery.jscrollpane.min.js", function () {
            //            console.log("jquery.jscrollpane.min.js重新加载js");
        });
        $.getScript("./js/tulingpage.js", function () {
            //            console.log("tulingpage.js重新加载js");
        });

        // 若超过一定长度，自定改变长度
        var con_height = $(".jspPane").children().last().children(".talk_recordtext").height();
        if (con_height > 50) {
            $(".jspPane").children(".talk_recordbox:last").children(".talk_recordtext").css("height:", con_height + "px");
            $(".jspPane").children(".talk_recordbox:last").height(con_height + 10);
        }

        //自动定位到最末端
        var panetop = $(".jspPane").height() - 400;
        $(".jspPane").animate({
            "top": -panetop
        }, 350);
        var dragtop = $(".jspTrack").height() - $(".jspDrag").height() - 0;
        $(".jspDrag").animate({
            "top": dragtop + "px"
        }, 650);
    }
});



//---------------------易源音乐播放器-----------------------
var songclick;
var getwillplaysong;

$(function () {
    var songs = [];

    //ajax获取歌曲
    function getsongs() {
        $.ajax({
            type: 'get',
            url: "http://route.showapi.com/213-4?showapi_appid=39134&showapi_sign=f4d12ea90fb6451cb2fe9b96b393f62b&topid=5&",
            async: false,
            success: function (data) {
                var songList = data.showapi_res_body.pagebean.songlist;
                $.each(songList, function (idx, obj) {
                    songs.push(new Object(obj));
                });
            },
            error: function () {
                alert("error");
            }
        });
    }
    getsongs();

    //歌曲列表分页展示
    options.data = songs;
    options.id = "perpage";
    options.pagelistcount = 9;
    options.callBack = function (result, currentPage, pagelistcount) {
        var cHtml = "";
        for (var i = 0; i < result.length; i++) {
            var num = (currentPage - 1) * pagelistcount + i; //计算当前数据在数组中的下标值
            //                console.log(num);
            cHtml += "<li><a id=\"song" + num + "\" href=\"" + result[i].url + "\" target=\"_blank\" onclick=\"songclick(this,event)\">" + result[i].songname + "</a></li>"; //处理数据
            //onclick=\"songclick(this,event)\"
        }
        $("#demoContent").html(cHtml); //将数据增加到页面中
    };
    page.init(songs.length, 1, options);

    //点击左侧播放列表触发的函数
    document.songclick = function (obj, event) {
        var songnum = ($(obj).attr("id") + "").substring(4);
        var willplaynum = Number(songnum);
        setcontrolbtns(songs, willplaynum);
    }

    //点击上一首、下一首
    document.getwillplaysong = function (obj, event) {
        var willplaynum = Number($(obj).parent().attr("id").substring(4));
        setcontrolbtns(songs, willplaynum);
    };

    //设置当前播放、上一首、下一首播放按钮的链接
    function setcontrolbtns(songs, willplaynum) {
        //设置当前播放
        $(".audio .play .control .playsong").parent().attr("href", songs[willplaynum].url);
        $(".audio .play .img img").attr("src", songs[willplaynum].albumpic_big);
        $(".audio .play .song-info .songname").html(songs[willplaynum].songname);
        $(".audio .play .song-info .singer").html(songs[willplaynum].singername);
        $(".audio .play .control .playsong").parent().attr("id", "now" + willplaynum);

        //设置上一首、下一首
        var lastsong = willplaynum - 1;
        var nextsong = willplaynum + 1;
        if (willplaynum == 0) {
            lastsong = willplaynum;
        }
        if (willplaynum == songs.length - 1) {
            nextsong = willplaynum;
        }
        $(".audio .play .control .last").parent().attr("href", songs[lastsong].url);
        $(".audio .play .control .next").parent().attr("href", songs[nextsong].url);
        $(".audio .play .control .last").parent().attr("id", "last" + lastsong);
        $(".audio .play .control .next").parent().attr("id", "next" + nextsong);


    }
});


//---------------------本地服务-----------------------

$(function () {

    //标签页
    $(".bendi-page .content #content>div").hide(); // Initially hide all content
    $(".bendi-page .content #tabs li:first").attr("id", "current"); // Activate first tab
    $(".bendi-page .content #content div:first").fadeIn(); // Show first tab content

    $('.bendi-page .content #tabs a').click(function (e) {
        e.preventDefault();
        $(".bendi-page .content #content>div").hide(); //Hide all content
        $(".bendi-page .content #tabs li").attr("id", ""); //Reset id's
        $(this).parent().attr("id", "current"); // Activate this
        $('.bendi-page .content #' + $(this).attr('title')).fadeIn(); // Show content for current tab
    });


    //==============================音乐播放============================

    //获取左侧音乐播放列表
    $.ajax({
        url: 'http://localhost:8080/SSM_homework/getMusic.action?action=ajaxDatas&pageSize=9',
        type: 'get',
        data: {
            "action": "ajaxDatas",
            "pageSize": 9
        },
        dataType: 'json',
        async: false,
        success: function (data) {
            each(data);
        },
        error: function () {
            alert("error");
        }
    });

    //下一页
    $(".bendi-page .content #content #audio .perpage #nextPage").click(function () {
        $.ajax({
            url: 'getMusic.action',
            type: 'get',
            data: {
                "action": "ajaxDatasNext",
                "pageSize": 9
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                each(data);
            },
            error: function () {
                alert(" error");
            }
        });
    });

    //上一页
    $(".bendi-page .content #content #audio .perpage #frontPage").click(function () {
        $.ajax({
            url: 'getMusic.action',
            type: 'get',
            async: false,
            data: {
                "action": "ajaxDatasFront",
                "pageSize": 9
            },
            dataType: 'json',
            success: function (data) {
                each(data);
            },
            error: function () {
                alert(" error");
            }
        });
    });

    //点击控制按钮：歌曲开始、暂停播放
    $(".bendi-page .content #content #audio .play .control .playsong").bind("click", function (event) {
        event.preventDefault();
        var songid = $(this).attr("id").substring(9);
        //        alert(songid);
        var songinfo = getsonginfo("getMusicById", songid);
        if ($(this).hasClass("glyphicon-play")) {
            songcontrol("play", songinfo);
        } else {
            songcontrol("pause", songinfo);
        }

    });

    //点击控制按钮：上一首
    $(".bendi-page .content #content #audio .play .control .last").bind("click", function (event) {
        event.preventDefault();
        var songid = $(this).attr("id").substring(9);
        //        alert(songid);
        var songinfo = getsonginfo("getMusicById", songid);
        updateplayingsong(songinfo);
        songcontrol("play", songinfo);
    });

    //点击控制按钮：下一首
    $(".bendi-page .content #content #audio .play .control .next").bind("click", function (event) {
        event.preventDefault();
        var songid = $(this).attr("id").substring(9);
        //        alert(songid);
        var songinfo = getsonginfo("getMusicById", songid);
        updateplayingsong(songinfo);
        songcontrol("play", songinfo);
    });

    //更新左侧音乐列表选项
    function each(jsondata) {
        var table_body = "";
        $.each(jsondata, function (index, value) {
            table_body += "<li><a id=\"localsong" + value.id + "\" href=\"#\" >" + value.mName + "</a></li>";
        });
        $(".bendi-page .content #content #audio #demoContent").html(table_body);
        $(".bendi-page .content #content #audio #demoContent li").bind("click", function (event) {
            playlistlocalsong($(this).children("a"), event);
        });
    };

    //根据id获取指定音乐信息
    function getsonginfo(actionname, songid) {
        var songinfo = {};
        $.ajax({
            url: "http://localhost:8080/SSM_homework/getMusic.action?action=" + actionname + "&mid=" + songid,
            type: 'get',
            data: {
                "action": actionname
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                //                console.log(data);
                songinfo = data;
            },
            error: function () {
                alert("getsonginfo error");
            }
        });
        return songinfo;
    }

    //点击列表播放音乐
    function playlistlocalsong(obj, event) {
        event.preventDefault();
        //        alert("ok");
        var songid = obj.attr("id").substring(9);
        //        alert(songid);
        var songinfo = getsonginfo("getMusicById", songid);
        //        alert(songinfo.mName);
        updateplayingsong(songinfo);
        songcontrol("play", songinfo);
    }

    //更新音乐播放栏信息
    function updateplayingsong(songinfo) {
        //设置歌名、歌手
        $(".bendi-page .content #audio .play .song-info .songname").html(songinfo.mName);
        $(".bendi-page .content #audio .play .song-info .singer").html(songinfo.mSinger);
        //设置专辑图片
        $(".bendi-page .content #audio .play .img img").attr("src", "musicPhoto/" + songinfo.mPic);
        //设置播放控制按钮
        var willplaysongid = songinfo.id;
        var lastsong = willplaysongid - 1;
        var nextsong = willplaysongid + 1;
        if (willplaysongid == 1) {
            lastsong = willplaysongid;
        }
        if (willplaysongid == 14) {
            nextsong = willplaysongid;
        }
        $(".bendi-page .content #audio .play .control .last").attr("id", "localsong" + lastsong);
        $(".bendi-page .content #audio .play .control .playsong").attr("id", "localsong" + willplaysongid);
        $(".bendi-page .content #audio .play .control .next").attr("id", "localsong" + nextsong);
    }

    //播放或暂停指定歌曲
    function songcontrol(opera, songinfo) {
        var songdom = $(".bendi-page .content #content #audio .play .control audio");
        var songsrc = "music/" + songinfo.mPath;
        songdom.attr("src", songsrc);
        if (opera == "play") {
            songdom[0].play();
            $(".bendi-page .content #content #audio .play .control .playsong")
                .addClass("glyphicon-pause")
                .removeClass("glyphicon-play");
        } else if (opera == "pause") {
            songdom[0].pause();
            $(".bendi-page .content #content #audio .play .control .playsong")
                .addClass("glyphicon-play")
                .removeClass("glyphicon-pause");
        }
    }

    //==============================视频播放============================

    //获取左侧视频播放列表
    $.ajax({
        url: 'http://localhost:8080/SSM_homework/getVideo.action?action=ajaxDatas',
        type: 'get',
        data: {
            "action": "ajaxDatas",
            "pageSize": 9
        },
        dataType: 'json',
        async: false,
        success: function (data) {
            videoeach(data);
        },
        error: function () {
            alert("error");
        }
    });

    //下一页 视频
    $(".bendi-page .content #content #video .list .perpage #nextPage").click(function () {
        $.ajax({
            url: 'getVideo.action',
            type: 'get',
            data: {
                "action": "ajaxDatasNext",
                "pageSize": 9
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                //                console.log(data);
                videoeach(data);
            },
            error: function () {
                alert(" error");
            }
        });
    });

    //上一页 视频
    $(".bendi-page .content #content #video .list .perpage #frontPage").click(function () {
        $.ajax({
            url: 'getVideo.action',
            type: 'get',
            async: false,
            data: {
                "action": "ajaxDatasFront",
                "pageSize": 9
            },
            dataType: 'json',
            success: function (data) {
                //                console.log(data);
                videoeach(data);
            },
            error: function () {
                alert(" error");
            }
        });
    });


    //更新左侧视频列表选项
    function videoeach(jsondata) {
        var table_body = "";
        $.each(jsondata, function (index, value) {
            table_body += "<li><a id=\"localvideo" + value.id + "\" href=\"#\" >" + value.vName + "</a></li>";
        });
        $(".bendi-page .content #content #video #demoContent").html(table_body);
        $(".bendi-page .content #content #video .list #demoContent li").bind("click", function (event) {
            playlistlocalvideo($(this).children("a"), event);
        });
    };

    //根据id获取指定视频信息
    function getvideoinfo(actionname, videoid) {
        var videoinfo = {};
        $.ajax({
            url: "http://localhost:8080/SSM_homework/getVideo.action?action=" + actionname + "&vid=" + videoid,
            type: 'get',
            data: {
                "action": actionname
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                //                console.log(data);
                videoinfo = data;
            },
            error: function () {
                alert("getvideoinfo error");
            }
        });
        return videoinfo;
    }

    //点击列表播放视频
    function playlistlocalvideo(obj, event) {
        event.preventDefault();
        var videoid = obj.attr("id").substring(10);
        var videoinfo = getvideoinfo("getVideoById", videoid);
        //        alert(videoinfo.vName);
        videocontrol("play", videoinfo);
    }

    //播放或暂停指定视频
    function videocontrol(opera, videoinfo) {
        var videodom = $(".bendi-page .content #content #video .play video");
        var videosrc = "video/" + videoinfo.vPath;
        videodom.attr("src", videosrc);
        videodom[0].play();
    }

});


//-------------------------模态框-----------------------------
function setModal(showbtn, title, content, close_btn_con) {
    //    console.log(showbtn);
    showbtn.attr({
        "data-toggle": "modal",
        "data-target": "#myModal"
    });
    $(".modal-title").html(title);
    $(".modal-body p").html(content);
    $(".modal-footer button").html(close_btn_con);
}