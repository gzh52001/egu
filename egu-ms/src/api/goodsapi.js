import require from './http'


//全部数据
function getGoods() {
    let url = '/goods/goodslist'
    return require.get(url)
}

// 修改
function editGoods(id,obj) {
    let url = `/goods/editgoods/${id}`
    return require.put(url,obj)
}

//添加 
function addGoods(obj) {
    let url = `/goods/addgoods`
    return require.post(url,obj)
}


// 删除
function delGoods(id) {
    let url = `/goods/deletegoods/${id}`
    return require.delete(url)
}

//查询
function searchgGoods(goodsId){
    let url =`/goods/searchgoods/${goodsId}`
    return require.get(url)

}

export default {
    getGoods,
    editGoods,
    addGoods,
    delGoods,
    searchgGoods
}