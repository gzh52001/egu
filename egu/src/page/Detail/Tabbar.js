import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import detailApi from "@/api/detail";
import "./style/Tabbar.scss";

import {HomeOutlined,ShoppingCartOutlined,AppstoreOutlined  } from '@ant-design/icons';

 class Tabbar extends Component {
     constructor(){
         super();
         this.addToCart = this.addToCart.bind(this);
     }

     
    //  事件
    // 加入购物车
    addToCart() {

        let { goodsId, goodsName, mallPrice } = this.props.goodInfo;
        let { param2, goodsImg } = this.props.goodInfo.bseGoodsEo;
        
        // 如果该用户第一次加入该商品
        let data = {
            userId:123,
            goodsId,
            goodsName,
            param2,
            mallPrice,
            goodsImg,
            num:1,
            sum:mallPrice,
            isSelect:0,
        }

        // 发送添加请求
        detailApi.addToCart(data).then(res => {
            console.log(res);
        });
        
    }
    buyNew=()=>{
        this.addToCart()
        this.props.history.push("/cart")
    }
    render() {
        return (
            <ul className="detail-tabbar">
                <li className="icon-aciton"
                    onClick={() => this.props.history.push("/home")} 
                >
                    <HomeOutlined />
                    <span>首页</span>
                </li>
                <li className="icon-aciton"
                    onClick={() => this.props.history.push("/category")} 
                >
                    <AppstoreOutlined />
                    <span>分类</span>
                </li>
                <li className="icon-aciton">
                    <ShoppingCartOutlined />
                    <span>购物车</span>
                    <i>0</i>
                </li>
                <li className="botton-aciton cart" onClick={this.addToCart}>
                    加入购物车
                </li>
                <li className="botton-aciton buy" onClick={this.buyNew}>
                    立即购买
                </li>
            </ul>
        )
    }
}

export default withRouter(Tabbar)
