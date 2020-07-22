import require from "@/utils/require";
import request from "@/utils/http";

// 获取详情页轮播图
function getBannerImgs(id) {
    return require.get(`/goods/images?id=${id}`);
}

// 获取商品信息
function getGoodInfo(data) {
    return require({
        url: "/goods/publish",
        method: "post",
        data
    })
}

// 获取简介图片
function getDescImgs() {
    return require.get("/goods/desc?id=790f3865f2c44e50ab64");
}

// 加入购物车
function addToCart(data) {
    return request({
        url: "/cart/add",
        method: "post",
        data
    })
}

// 判断用户是否第一次加入该商品
// userId goodId
function isFirstAdd(data) {
    return request.get("/cart/isFirstAdd", {
        params: data
    })
}

// 导出
export default {
    getBannerImgs,
    getGoodInfo,
    getDescImgs,
    addToCart
}