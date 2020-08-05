import request from "@/utils/http";

// 订单接口请求
export default {
    // 添加数据
    add(data) {
        return request.post("/order/add", data);
    },
    // 修改：支付状态  orderId userId
    updatePayStatus(data) {
        return request.put("/order/updataPayStatus", data);
    },
    // 查询：用户订单信息
    getOrderList(userId) {
        return request.get(`/order/getUserOrder/${userId}`)
    },
    // 修改： 取消订单  userId, orderId  statusType: isCancel 
    updateStatus(data) {
        return request.put(`/order/updateStatus`, data)
    },
    // 删除订单信息
    delOrder(orderId) {
        return request.delete(`/order/delete/${orderId}`)
    }


}