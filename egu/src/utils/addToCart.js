import { Toast } from "antd-mobile";

import detailApi from "@/api/detail";
import cartApi from "@/api/cart";

// 加入购物车请求
export async function addToCart(data,getCartList) {
    let { userId, goodsId } = data;
    // 是否第一次加入
    let checkRes = await detailApi.isFirstAdd({userId, goodsId});
    if(Number(checkRes.code)) { // 第一次加入
        let res = await detailApi.addToCart(data); // 发送添加请求
        if(Number(res.code)) {
            // 添加成功提示
            Toast.info("添加成功11", 1.5);
            // 如果是在购物车页的猜你喜欢添加成功后刷新
            if(typeof getCartList == "function") {
                getCartList()
            }
        } else {
            Toast.info("添加失败");
        }
    } else {  // 不是第一次，添加数量
        let data = {
            userId,
            goodsId,
            type:1
        }
        let res = await cartApi.update(data);
        if(Number(res.code)) {
            // 添加成功提示
            Toast.info("添加成功",1.5);
            if(typeof getCartList == "function") {
                getCartList()
            }
        }
    }
}