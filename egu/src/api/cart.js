import request from '@/utils/http';

// 修改数量
function update(data) {
    return request.put("/cart/update", data)
}

// 查询购物车数据
function getCartList(userId) {
    return request.get(`/cart/search/${userId}`)
}

// 删除
function del(data) {
    return request({
        url: "/cart/del",
        method: "delete",
        data
    });
}

export default {
    update,
    getCartList,
    del
}