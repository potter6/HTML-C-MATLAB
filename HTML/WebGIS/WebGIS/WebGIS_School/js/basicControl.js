//创建地图
var map = new AMap.Map("container", {
    center: [108.946609, 34.262324],
    zoom: 5.87,
    zooms: [4, 20], //限制地图的缩放等级范围
    resizeEnable: true,
    viewMode: '3D',
    putch: 40, //仰角
});

//通过类名隐藏组件
function hiddenByClassName(className) {
    var element = document.getElementsByClassName(className);
    for (var i = 0; i < element.length; i += 1) {
        element[i].getElementsByClassName.display = "none";
    }
}

//通过类名显示控件
function showByClassName(className) {
    var element = document.getElementsByClassName(className);
    for (var i = 0; i < element.length; i += 1) {
        element[i].style.display = "block";
    }
}

// 信息窗口对象
var nav_info = document.getElementById("nav-info");
var search_info = document.getElementById("search-info");

// 隐藏信息窗口
function closeNavInfo() {
    nav_info.style.display = "none";
}

function closeSearchInfo() {
    search_info.style.display = "none";
}

// 显示信息窗口
function showNavInfo() {
    nav_info.style.display = "block";
}

function showSearchInfo() {
    search_info.style.display = "block";
}

// 隐藏功能选项界面
function closeTools() {
    hidddenByClassName("input-card");
    hidddenByClassName("measureTools");
    hidddenByClassName("drawTools");
    hidddenByClassName("navigationTools");
    closeNavInfo();
}