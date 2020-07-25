import request from "@/utils/http";

// 订单接口请求
export default {
    
    // 添加数据
    add(data) {
        return request.post("/order/add", data);
    }



}