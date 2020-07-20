import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import "./style/Tabbar.scss";

import {HomeOutlined,UserOutlined,ShoppingCartOutlined,AppstoreOutlined,CreditCardOutlined  } from '@ant-design/icons';

 class Tabbar extends Component {
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
                <li className="botton-aciton cart">
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
