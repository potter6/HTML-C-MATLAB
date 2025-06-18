var esri = new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    })
    //许可
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YTIyZmYwNC1lOWZlLTRmN2ItYTA0YS1jMTAxZWIyOGY3ZWEiLCJpZCI6MTIwNzU1LCJpYXQiOjE2NzMyNjMzMDl9.Jkr5hkEYBr4y5Wr9PrbJ1VQIj1eSiMAesFeT6KUrf28";
const viewer = new Cesium.Viewer(cesiumContainer, {
    baseLayerPicker: false,
    imageryProvider: esri,
    animation: false,
    timeline: false,
    terrainProvider: new Cesium.CesiumTerrainProvider({
        url: Cesium.IonResource.fromAssetId(1),
        requestVertexNormals: true,
        requestWaterMask: true //水面流动的效果
    }),
});

//导入DEM数据
const tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(75343),
    })
);

//去掉Cesium的底部水印
viewer._cesiumWidget._creditContainer.style.display = "none";

//摄像头的初始位置
viewer.scene.camera.setView({
    // destination: Cesium.Cartesian3.fromDegrees(113.008943, 28.06775, 20000000)
    destination: Cesium.Cartesian3.fromDegrees(113.008943, 28.06885, 2000)
        // orientation: {
        //     heading: 0,
        //     pitch: -90,
        //     roll: 0,
        // }
})