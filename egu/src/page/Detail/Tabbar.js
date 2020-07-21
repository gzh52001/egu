import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import detailApi from "@/api/detail";
import "./style/Tabbar.scss";

import axios from "axios";

import {HomeOutlined,ShoppingCartOutlined,AppstoreOutlined  } from '@ant-design/icons';

 class Tabbar extends Component {
     constructor(){
         super();
         this.addToCart = this.addToCart.bind(this);
     }
    //  事件
    // 加入购物车
    addToCart() {
        let data = {
            userId:200,
            goodId:123,
            goodName:123,
            goodDesc:123,
            price:123,
            img:123,
            num:123,
            sum:123,
            isSelect:0,
        }
        detailApi.addToCart(data).then(res => {
            console.log(33333333333, res);
        });
        // axios.post("/api/aa").then(res => console.log(res));
        
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
                <li className="botton-aciton buy">
                    立即购买
                </li>
            </ul>
        )
    }
}

export default withRouter(Tabbar)
