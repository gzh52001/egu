import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import cartActions from "@/store/action/cart";

import detailApi from "@/api/detail";
import cartApi from "@/api/cart";
import "./style/Tabbar.scss";

import {HomeOutlined,ShoppingCartOutlined,AppstoreOutlined  } from '@ant-design/icons';

@withRouter
 class Tabbar extends Component {
     constructor(props){
         super();
         this.state = {
             cartList:[],
             userId:localStorage.getItem("egu_userId"),
             count:0,
             cartList2:props.cartList
         }
        //  console.log("conse00", this.state.cartList2);
         this.addToCart = this.addToCart.bind(this);
     }

     
    //  事件-----------------
    // 加入购物车
    async addToCart() {
        let { goodsId, goodsName, mallPrice } = this.props.goodInfo;
        let { param2, goodsImg } = this.props.goodInfo.bseGoodsEo;
        
        // 如果该用户第一次加入该商品
        let data = {
            userId:this.state.userId,
            goodsId,
            goodsName,
            param2,
            mallPrice,
            goodsImg,
            num:1,
            sum:mallPrice,
            isSelect:1, // 默认勾选
        }

        
        // 是否第一次加入
        let checkRes = await detailApi.isFirstAdd({userId:this.state.userId, goodsId});
        if(Number(checkRes.code)) { // 第一次加入
            let res = await detailApi.addToCart(data); // 发送添加请求
            if(Number(res.code)) {
                // window.alert("添加成功")
                this.getCartList();
            } else {
                window.alert("添加失败")
            }
        } else {  // 不是第一次，添加数量
            let data = {
                userId:this.state.userId,
                goodsId,
                type:1
            }
            let res = await cartApi.update(data);
            if(Number(res.code)) {
                // window.alert("添加成功");
            }
        }

    }

    // 立即购买
    buyNew=()=>{
        this.addToCart()
        this.props.history.push("/cart")
    }

    // 获取购物车数据
    getCartList = async () => {
        let {userId} =  this.state;
        try{
            let res = await cartApi.getCartList(userId);
            this.props.getCartList(res.data);
            this.setState({cartList:res.data}, () => {
                this.setState({ // 更新购物车数量
                    count:this.state.cartList.length
                })
            })
        } catch(err) {
            console.log(err);
        }
    }

    // 周期函数------------------
    componentDidMount() {
       this.getCartList(); // 获取购物车列表
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
                <li className="icon-aciton" 
                    onClick = {() => this.props.history.push("/cart")}
                >
                    <ShoppingCartOutlined />
                    <span>购物车</span>
                    <i>{this.state.count}</i>
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
// 是一个函数,把redux里的状态映射到props
let mapSateTopProps = state => {
    return state.cart
}

// dispach后自动更新state,不用订阅
let mapDispatchToProps = cartActions;

// 通过connet高阶组件给props添加东西
Tabbar = connect(mapSateTopProps, mapDispatchToProps)(Tabbar)

export default Tabbar

