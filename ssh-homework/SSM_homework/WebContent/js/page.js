    var options = {
        "id": "perpage", //显示页码的元素
        "data": null, //显示数据
        "maxshowpageitem": 3, //最多显示的页码个数
        "pagelistcount": 9, //每页显示数据个数
        "callBack": function (result, currentPage, pagelistcount) {
//            var cHtml = "";
//            for (var i = 0; i < result.length; i++) {
//                var num = (currentPage - 1) * pagelistcount + i; //计算当前数据在数组中的下标值
//                //                console.log(num);
//                cHtml += "<li><a id=\"song" + num + "\" href=\"" + result[i].url + "\" target=\"_blank\" onclick=\"songclick(this,event)\">" + result[i].songname + "</a></li>"; //处理数据
//                //onclick=\"songclick(this,event)\"
//            }
//            $("#demoContent").html(cHtml); //将数据增加到页面中
        }
    };
    var page = {
        "pageId": "perpage",
        "data": null,
        "maxshowpageitem": 3, //最多显示的页码个数
        "pagelistcount": 9, //每一页显示的内容条数
        "init": function (listCount, currentPage, options) {
            this.data = options.data,
                this.pageId = options.id,
                this.maxshowpageitem = options.maxshowpageitem, //最多显示的页码个数
                this.pagelistcount = options.pagelistcount //每一页显示的内容条数
            page.initPage(listCount, currentPage);
        },
        /**
         * 初始化数据处理
         * @param listCount 列表总量
         * @param currentPage 当前页
         */
        "initPage": function (listCount, currentPage) {
            var maxshowpageitem = page.maxshowpageitem;
            if (maxshowpageitem != null && maxshowpageitem > 0 && maxshowpageitem != "") {
                page.maxshowpageitem = maxshowpageitem;
            }
            var pagelistcount = page.pagelistcount;
            if (pagelistcount != null && pagelistcount > 0 && pagelistcount != "") {
                page.pagelistcount = pagelistcount;
            }
            page.pagelistcount = pagelistcount;
            if (listCount < 0) {
                listCount = 0;
            }
            if (currentPage <= 0) {
                currentPage = 1;
            }
            page.setPageListCount(listCount, currentPage);
        },
        /**
         * 初始化分页界面
         * @param listCount 列表总量
         */
        "initWithUl": function (listCount, currentPage) {
            var pageCount = 1;
            if (listCount >= 0) {
                var pageCount = listCount % page.pagelistcount > 0 ? parseInt(listCount / page.pagelistcount) + 1 : parseInt(listCount / page.pagelistcount);
            }
            var appendStr = page.getPageListModel(pageCount, currentPage);
            $("#" + page.pageId).html(appendStr);
        },
        /**
         * 设置列表总量和当前页码
         * @param listCount 列表总量
         * @param currentPage 当前页码
         */
        "setPageListCount": function (listCount, currentPage) {
            listCount = parseInt(listCount);
            currentPage = parseInt(currentPage);
            page.initWithUl(listCount, currentPage);
            page.initPageEvent(listCount);
            //            console.log(listCount);
            page.viewPage(currentPage, listCount, page.pagelistcount, page.data)
                //      fun(currentPage);
        },
        //页面显示功能
        "viewPage": function (currentPage, listCount, pagelistcount, data) {
            var NUM = listCount % pagelistcount == 0 ? listCount / pagelistcount : parseInt(listCount / pagelistcount) + 1;
            if (currentPage == NUM) {
                var result = data.slice((currentPage - 1) * pagelistcount, data.length);
            } else {
                var result = data.slice((currentPage - 1) * pagelistcount, (currentPage - 1) * pagelistcount + pagelistcount);
            }
            options.callBack(result, currentPage, pagelistcount);
        },
        "initPageEvent": function (listCount) {
            $("#" + page.pageId + ">li[class='perpageItem']").click(function () {
                page.setPageListCount(listCount, $(this).attr("page-data"), page.fun);
            });
        },
        "getPageListModel": function (pageCount, currentPage) {
            var prePage = currentPage - 1;
            var nextPage = currentPage + 1;
            var prePageClass = "perpageItem";
            var nextPageClass = "perpageItem";
            if (prePage <= 0) {
                prePageClass = "perpageItemDisable";
            }
            if (nextPage > pageCount) {
                nextPageClass = "perpageItemDisable";
            }
            var appendStr = "";
            appendStr += "<li class='" + prePageClass + "' page-data='1' page-rel='firstpage'>首页</li>";
            appendStr += "<li class='" + prePageClass + "' page-data='" + prePage + "' page-rel='prepage'>&lt;&lt;</li>";
            var miniPageNumber = 1;
            if (currentPage - parseInt(page.maxshowpageitem / 2) > 0 && currentPage + parseInt(page.maxshowpageitem / 2) <= pageCount) {
                miniPageNumber = currentPage - parseInt(page.maxshowpageitem / 2);
            } else if (currentPage - parseInt(page.maxshowpageitem / 2) > 0 && currentPage + parseInt(page.maxshowpageitem / 2) > pageCount) {
                miniPageNumber = pageCount - page.maxshowpageitem + 1;
                if (miniPageNumber <= 0) {
                    miniPageNumber = 1;
                }
            }
            var showPageNum = parseInt(page.maxshowpageitem);
            if (pageCount < showPageNum) {
                showPageNum = pageCount;
            }
            for (var i = 0; i < showPageNum; i++) {
                var pageNumber = miniPageNumber++;
                var itemPageClass = "perpageItem";
                if (pageNumber == currentPage) {
                    itemPageClass = "perpageItemActive";
                }

                appendStr += "<li class='" + itemPageClass + "' page-data='" + pageNumber + "' page-rel='itempage'>" + pageNumber + "</li>";
            }
            appendStr += "<li class='" + nextPageClass + "' page-data='" + nextPage + "' page-rel='nextpage'>&gt;&gt;</li>";
            appendStr += "<li class='" + nextPageClass + "' page-data='" + pageCount + "' page-rel='lastpage'>尾页</li>";
            return appendStr;

        },

    }