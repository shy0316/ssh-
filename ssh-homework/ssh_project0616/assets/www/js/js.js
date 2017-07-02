$(function(){

    var i = 0;
    var width = $(".li").width();
    console.log(width)
    var time;
    
    function setTime(){
        time = setInterval(function(){
            if(i < 2){
                i ++;
            } else {
                i = 0;
            }
            $(".ppt-per").animate({"left": - i*width + "px"});
            $(".cc").eq(i).addClass("h").siblings(".cc").removeClass("h");
        }, 3000)        
    }

    setTime();
    
    $(".ppt").mouseover(function(){
        clearInterval(time);
    })
    $(".ppt").mouseleave(function(){
        setTime();
    })

    
    $(".left").click(function(){
            if(i < 2){
                i ++;
            } else {
                i = 0;
            }
            $(".ppt-per").animate({"left": - i*width + "px"});
$(".cc").eq(i).addClass("h").siblings(".cc").removeClass("h");        
    })
    
    $(".right").click(function(){
            if(i > 0){
                i --;
            } else {
                i = 2;
            }
            $(".ppt-per").animate({"left": - i*width + "px"});
$(".cc").eq(i).addClass("h").siblings(".cc").removeClass("h");        
    })    
    
    $(".cc").click(function(){

        var index_ = $(this).index();

        i = index_;
            $(".ppt-per").animate({"left": - i*width + "px"});
$(".cc").eq(i).addClass("h").siblings(".cc").removeClass("h");         
    })
    
    $(".cc").mouseover(function(){
        var index_ = $(this).index();
        i = index_;
            $(".ppt-per").animate({"left": - i*width + "px"});
$(".cc").eq(i).addClass("h").siblings(".cc").removeClass("h");         
    })
    /*首页点击右上角展开*/
    $(".openlist").click(function () {
        /*来回切换*/
        $(this).next().slideToggle(500);
    })
    /*页面跳转*/
    $(".tulingren").click(function () {
        window.location.href="tuling-list1.html";
    })
    $(".music").click(function () {
        window.location.href="songlist.html";
    })
    $(".yiyuan").click(function () {
        window.location.href="mobile_musicinfo1.html";
    })
    $(".rss").click(function () {
        window.location.href="rss.html";
    })
    $(".video").click(function () {
        window.location.href="video-list.html"
    })
    $(".phone").click(function () {
        window.location.href="phone-list1.html";
    })
    $(".home").click(function () {
        window.location.href="phone-list1.html";
    })

})