var map = new AMap.Map('GaoDecontainer', {
    zoom: 13,
    viewMode: '3D',
    center: [113.008943, 28.06775]
})

AMap.plugin(
    [
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.MapType',
        'AMap.Geolocation',
        'AMap.ControlBar'
    ],
    function() {
        map.addControl(new AMap.ToolBar({
            position: {
                top: '100px',
                left: '20px'
            }
        }));
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.MapType());
        map.addControl(new AMap.Geolocation({
            position: {
                top: '180px',
                left: '20px'
            }
        }));
        map.addControl(new AMap.ControlBar({
            position: {
                top: '1px',
                left: '1px'
            }
        }));
    })

var mouseTool = new AMap.MouseTool(map);

function draw(type) {
    switch (type) {
        case 'rule':
            {
                mouseTool.rule({
                    startMarkerOptions: { //可缺省
                        icon: new AMap.Icon({
                            size: new AMap.Size(19, 31), //图标大小
                            imageSize: new AMap.Size(19, 31),
                            image: "https://webapi.amap.com/theme/v1.3/markers/b/start.png"
                        })
                    },
                    endMarkerOptions: { //可缺省
                        icon: new AMap.Icon({
                            size: new AMap.Size(19, 31), //图标大小
                            imageSize: new AMap.Size(19, 31),
                            image: "https://webapi.amap.com/theme/v1.3/markers/b/end.png"
                        }),
                        offset: new AMap.Pixel(-9, -31)
                    },
                    midMarkerOptions: { //可缺省
                        icon: new AMap.Icon({
                            size: new AMap.Size(19, 31), //图标大小
                            imageSize: new AMap.Size(19, 31),
                            image: "https://webapi.amap.com/theme/v1.3/markers/b/mid.png"
                        }),
                        offset: new AMap.Pixel(-9, -31)
                    },
                    lineOptions: { //可缺省
                        strokeStyle: "solid",
                        strokeColor: "#FF33FF",
                        strokeOpacity: 1,
                        strokeWeight: 2
                    }
                    //同 RangingTool 的 自定义 设置，缺省为默认样式
                });
                break;
            }
        case 'measureArea':
            {
                mouseTool.measureArea({
                    strokeColor: '#80d8ff',
                    fillColor: '#80d8ff',
                    fillOpacity: 0.3
                        //同 Polygon 的 Option 设置
                });
                break;
            }
    }
}
var radios = document.getElementsByName('func');
for (var i = 0; i < radios.length; i += 1) {
    radios[i].onchange = function(e) {
        draw(e.target.value)
    }
}
draw('rule')

document.getElementById('close').onclick = function() {
    mouseTool.close(true) //关闭，并清除覆盖物
    for (var i = 0; i < radios.length; i += 1) {
        radios[i].checked = false;
    }
}

map.on('click', function(event) {
    console.log(event)
    console.log(`经度: ${event.lnglat.lng},纬度: ${event.lnglat.lat}`)
        // var marker = new AMap.Marker({
        //     position: event.lnglat,
        // })
        // map.add(marker)
})

// //地图覆盖物-两点推拽测距
// //地图覆盖物-两点推拽测距
// var m1 = new AMap.Marker({
//     map: map,
//     draggable: true,
//     position: new AMap.LngLat(113.014498, 28.07043),
// })
// var m2 = new AMap.Marker({
//     map: map,
//     draggable: true,
//     position: new AMap.LngLat(113.002095, 28.066985),
// })

// //↑创建几个点↑
// map.setFitView()
//     //准备一条线
// var line1 = new AMap.Polyline({
//     strokeColor: '$80d8ff',
//     isOutline: true,
//     outerlineColor: 'white',
// })
// line1.setMap(map)

// //准备一个文本
// var text = new AMap.Text({
//     text: '',
//     style: {
//         'background-color': '#29b6f6',
//         'border-color': '#elf5fe',
//         'font-size': '16px',
//     },
// })
// text.setMap(map)

// //计算
// function compute1() {
//     var p1 = m1.getPosition()
//     var p2 = m2.getPosition()

//     // 将text⽂本显示在两个经纬度的中间
//     var textPos = p1.divideBy(2).add(p2.divideBy(2)) //(p1+p2)/2
//     var dist = Math.round(p1.distance(p2))
//     var path = [p1, p2]
//     line1.setPath(path) // 绘制线段
//     text.setText('距离为' + dist + '⽶')
//     text.setPosition(textPos)
// }
// compute1()
// m1.on('dragging', compute1)
// m2.on('dragging', compute1)