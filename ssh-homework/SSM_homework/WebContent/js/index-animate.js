$(function () {

    //    nav-bar
    $("#myscroll .nav li").click(function () {
        if (!$(this).is(":animated")) {
            $(this).addClass("animated delay-none infinite attention seekers pulse").stop(true, false).siblings().removeClass("infinite");
        }
    });

    //    main-page
    $(".main-page .title span:even").addClass("animated delay-none bouncing entrances bounceInRight");
    $(".main-page .title span:odd").addClass("animated delay-none bouncing entrances bounceInLeft");
    $(".main-page .title small").addClass("animated delay-none bouncing entrances bounceInUp");
    $(".main-page .title small").addClass("animated delay-none attention seekers flash");
    $(".nav #home").click(function () {
        if ($(".main-page").is(":visible")) {
            $(".main-page .title span:even").addClass("animated bouncing entrances bounceInRight");
            $(".main-page .title span:odd").addClass("animated bouncing entrances bounceInLeft");
            $(".main-page .title small").addClass("animated attention seekers flash");
        }
        var set = setTimeout(function () {
            $(".main-page .title span").removeClass();
            $(".main-page .title small").removeClass();
        }, 1500);
    });

    //     RSS-news
    $(".nav #news").click(function () {
        $(".news-page .page-title span").addClass("animated bouncing entrance bounceIn");
        $(".news-page .content .left").addClass("animated fading entrances fadeInRight");
        $(".news-page .content .right").addClass("animated fading entrances fadeInLeft");
        var set = setTimeout(function () {
            $(".news-page .page-title span").removeClass();
            $(".news-page .content .left").removeClass("animated fading entrances fadeInRight");
            $(".news-page .content .right").removeClass("animated fading entrances fadeInLeft");
        }, 1500);
    });

    //      tuling
    $(".nav #tuling").click(function () {
        $(".tuling-page .page-title span").addClass("animated bouncing entrance bounceIn");
        $(".tuling-page .content .talk").addClass("animated specials rollIn");
        $(".tuling-page .content .choose").addClass("animated flippers flipInX");
        var set = setTimeout(function () {
            $(".tuling-page .page-title span").removeClass();
            $(".tuling-page .content .talk").removeClass("animated specials rollIn");
            $(".tuling-page .content .choose").removeClass("animated flippers flipInX");
        }, 1500);
    });
    $(".tuling-page .content .choose div:even").hover(function () {
        $(this).css({
            "left": "15px",
            "position": "relative"
        });
    });
    $(".tuling-page .content .choose div:odd").hover(function () {
        $(this).css({
            "right": "15px",
            "position": "relative"
        });
    });
    $(".tuling-page .content .choose div:even").mouseout(function () {
        $(this).css({
            "left": "0px",
            "position": "relative"
        });
    });
    $(".tuling-page .content .choose div:odd").mouseout(function () {
        $(this).css({
            "right": "0px",
            "position": "relative"
        });
    });

    //      yiyuan
    $(".nav #yiyuan").click(function () {
        $(".yiyuan-page .page-title span").addClass("animated bouncing entrance bounceIn");
        $(".yiyuan-page .content .audio .list").addClass("animated rotating entrances rotateInUpLeft");
        $(".yiyuan-page .content .audio .play").addClass("animated rotating entrances rotateInUpRight");
        var set = setTimeout(function () {
            $(".yiyuan-page .page-title span").removeClass("animated bouncing entrance bounceIn");
            $(".yiyuan-page .content .audio .list").removeClass("animated rotating entrances rotateInUpLeft");
            $(".yiyuan-page .content .audio .play").removeClass("animated rotating entrances rotateInUpRight");
        }, 1500);
    });

    //      local
    $(".nav #bendi").click(function () {
        $(".bendi-page .page-title span").addClass("animated bouncing entrance bounceIn");
        $(".bendi-page .content #content #audio .list").addClass("animated sliders slideInLeft");
        $(".bendi-page .content #content #audio .play").addClass("animated sliders slideInRight");
        var set = setTimeout(function () {
            $(".bendi-page .page-title span").removeClass("animated bouncing entrance bounceIn");
            $(".bendi-page .content #content #audio .list").removeClass("animated sliders slideInLeft");
            $(".bendi-page .content #content #audio .play").removeClass("animated sliders slideInRight");
        }, 1500);
    });

});