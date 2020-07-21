import require from "@/utils/require";
import node_request from "@/utils/http";

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
    return node_request({
        url: "/cart/add",
        method: "post",
        data
    })
}

// 导出
export default {
    getBannerImgs,
    getGoodInfo,
    getDescImgs,
    addToCart
}