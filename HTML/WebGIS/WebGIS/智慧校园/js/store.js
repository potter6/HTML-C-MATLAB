//从localstorage钟读取数据
function getData() {
    // 如果本地localstorage钟不存在数据
    if (!localStorage.getItem('geojson')) {
        localStorage.setItem('geojson', '[]')
    }

    return JSON.parse(localStorage.getItem('geojson'))
}

//将数据 保存到 LocalStorage 中
function saveData(data) {
    localStorage.setItem('geojson', JSON.stringify(data))
}