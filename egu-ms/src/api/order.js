import request from "@/utils/require";

export default {
    // 查询订单列表数据
    searchList() {
        return request.get("/order/search/list");
    },
    // 删除
    delList(orderId) {
        return request.delete(`/order/delete/${orderId}`)
    },
    // 根据 orderId 查询一条数据
    searchOne(orderId) {
        return request.get(`/order/searchOne/${orderId}`);
    },
    // 分页查询 page, size
    searchPage(data) {
        return request.get(`/order/searchPage`,{
            params: data
        });
    },
    // 修改：发货状态
    updateIsSend(orderId) {
        return request.put(`/order/update/${orderId}`);
    }
    
}