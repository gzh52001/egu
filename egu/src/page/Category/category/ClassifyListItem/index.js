import React from 'react'
import { withRouter } from "react-router-dom";
import { Toast } from "antd-mobile";

import "./index.scss"
import cartApi from "@/api/cart";
import detailApi from "@/api/detail";

// @withRouter
 function index(props) {
     let {data} = props;
     // { id:goodsId} = data 结构重命名 原名:另起名称
     let { id:goodsId, goodsName, mallPrice, slogan, goodsImg } = data;
     let userId = localStorage.getItem("egu_userId");
     
     function toDetail(e) {
        if(e.target.tagName !== "I") {
            // 跳转到详情页
            props.history.push(`/detail/${data.id}`)
        } else {  
            // 添加商品到购物车
            console.log(data);
            addToCart();
        }
     }

    // 加入购物车请求
    async function addToCart() {
       
        // 如果该用户第一次加入该商品
        let data = {
            userId,
            goodsId,
            goodsName,
            param2:slogan ? slogan : "", // 推广语
            mallPrice,
            goodsImg,
            num:1,
            sum:mallPrice,
            isSelect:1, // 默认勾选
        }
        
        // 是否第一次加入
        let checkRes = await detailApi.isFirstAdd({userId, goodsId});
        if(Number(checkRes.code)) { // 第一次加入
            let res = await detailApi.addToCart(data); // 发送添加请求
            if(Number(res.code)) {
                // 添加成功提示
                Toast.info("添加成功");
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
                Toast.info("添加成功");
            }
        }
    }
  
     return (
        <div className="classify-list-item"  onClick={toDetail}>
            <div className="item-img">
                <img src={data.icoImg}></img>
            </div>
            <div className="item-desc">
            <div className="desc-top">
                <h4>{data.goodsName}</h4>
                <p>{data.slogan}</p>
            </div>
            <div className="desc-bottom">
                <div className="price-cart">
                    <span>￥{data.salePrice}</span>
                    <i className="iconfont icon-gouwuche"></i> 
                </div>
            </div>
                <div className="desc-content"></div>
            </div>
        </div>
    )
}

export default withRouter(index)
