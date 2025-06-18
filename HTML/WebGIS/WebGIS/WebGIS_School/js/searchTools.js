var searchName = '';
var placeSearch; // poi搜索对象
var searchInfoClose = document.getElementById("search-info-close");
var keywordSearch_CallBack;

// ! 引入搜索插件
AMap.plugin(["AMap.PlaceSearch"], function() {
    //构造地点查询类
    placeSearch = new AMap.PlaceSearch({
        pageSize: 5, // 单页显示结果条数
        pageIndex: 1, // 页码
        // city: "010", // 不要指定兴趣点城市, 不然搜索就只能搜这一个城市的结果了
        citylimit: true, //是否强制限制在设置的城市内搜索
        map: map, // 展现结果的地图实例
        panel: "search-info", // 结果列表将在此容器中进行展示。
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    });
});

// 除搜索结果
function clearSearch() {
    searchInfoClose.style.display = "none";
    // 清空地图的搜索结果
    placeSearch.clear();
}

// 初始关闭信息窗口
closeSearchInfo();
// 关闭按钮初始设置为不显示
searchInfoClose.style.display = "none";

// 获取用户输入搜索的地点名称
searchInput = document.getElementById("search_input");
searchInput.addEventListener("change", function(e) {
    // 当搜索框内有内容时才显示清除按钮
    if (searchInput.value != '') {
        searchInfoClose.style.display = "block";
    } else {
        searchInfoClose.style.display = "none";
    }
    searchName = searchInput.value;
});

// 绑定关闭搜索结果按扭
searchInfoClose.onclick = function() {
    // 清空搜索框
    search_input.value = '';
    // 关闭搜索结果
    closeSearchInfo();
    clearSearch();
}

// 绑定搜索按钮
document.getElementById("search").onclick = function() {
    // 打开信息窗口
    showSearchInfo();
    // 如果输入内容不为空，则进行地点搜索
    if (searchName != '') {
        // 进行高德地图 api 关键字查询 pois
        placeSearch.search(searchName, function(status, result) {
            // status=error 说明今天100次查询的额度用完了 
            if (status == "error") {
                alert("今日开发者POI搜索额度已用尽！")
            } else {
                showSearchInfo();
                closeNavInfo();
            }
        });
    }
}


var menu = document.getElementById('menu');

// 隐藏上下文菜单
menu.style.display = "none";

search_info.oncontextmenu = function(e) {
    //取消默认的浏览器自带右键
    e.preventDefault();
    // 设置上下文菜单位置
    menu.style.top = e.clientY + 'px';
    menu.style.left = e.clientX + 'px';
    // 显示上下文菜单
    menu.style.display = "block";
    // 获取右键点击的poi信息栏的某个信息框中的节点路径，从而得到对应的地名
    var path = e.path;
    // 遍历提取出右键选中的地点名称
    for (var i = 0; i < path.length - 2; i += 1) { // 最后两个不是element类型，无法获取classname，避免报错因此跳过
        // 解析每个 element 元素的类名，得到 "poi-name" 下的地名
        var className = path[i].getAttribute('class');
        if (className == "poibox") {
            poi_name = path[i].innerText.split("\n")[0]; // 获取标签内容
            break;
        }
    }
}

// 关闭右键上下文菜单(左键点击关闭)
document.onclick = function() {
    if (menu.style.display != "none") {
        menu.style.display = "none"
    }
}