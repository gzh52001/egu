import React  from 'react'
import {  Checkbox, Flex, Toast } from 'antd-mobile';
import { Button } from 'antd';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { orderId } from "@/utils/tool";
import orderApi from "@/api/order";
import "./index.scss";
import actions from "@/store/action/cart";

const AgreeItem = Checkbox.AgreeItem;

let mapStateToProps = (state) => {
    return state.cart
}

let mapDispatchToProps = actions;

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class Cartbottom extends React.Component{
    
   state={
        yon:true,
        isSelect: false,
        totalPrice:0,
        isSettlementShow: false
    }

    countTotalPrice = (cartList) => {
        let total = 0
        if(cartList.length > 0) {
            cartList.forEach(item => {
                if(item.isSelect) {
                    total += Number(item.mallPrice) * Number(item.num)
                }
            })
        }
        this.setState({totalPrice:total})
    }

    // let pitch= props.data.cartData.every(item=>item.isSelect)
    // 事件----------
    // 点击全选
    allSelect = () => {
        this.props.allChange();
        this.countTotalPrice(this.props.cartList);
    }

    // 去结算
    handleBuyNow = () => {
        this.props.history.push('/cart/settlement');
        this.props.getCartList([...this.props.cartList]);
        // order表数据-------
        let order = {
            id:orderId("EGU", 5), // EGU + 时间戳 + 5位随机数
            userId:localStorage.getItem("egu_userId"),
            date: new Date().getTime(), // 当前时间戳
            isSend: 0 // 默认不发货
        }

        // orderGoods表数据-------
        let { cartList } = this.props;
        order.goods = cartList.filter(item => item.isSelect); // 筛选出来勾选的商品
        this.add(order);
    }

    // 支付
    handlePay = () => {

    }

    // 结算 --》 购物车
    handleBackToCart = () => {
        this.setState({isSettlementShow:false})
    }

    // ajax异步请求-------------------------------------
    // 添加订单信息
    add = async (data) => {
        try {
            let res =  await orderApi.add(data);
            if(Number(res.code)) {
                Toast.success(res.msg);
                this.setState({
                    isSettlementShow:true
                })
            }
        } catch(err) {
            console.log(err);
        }
    }
           
    render(){
        // let {yon,click} = this.state
        // 控制全選
        let { isAllSelect, cartList} = this.props;
        return(
            <div 
                className="bottom" 
                style={{ 
                    width:"100%",
                    height:"11.3vw",zIndex:"99",position: "fixed",bottom:"0",backgroundColor:'#fff'}}>
                <Flex justify="between"> 
                    <AgreeItem inline style={{color:'red'}} checked={isAllSelect}
                        onClick={this.allSelect}
                        >
                        全选
                    </AgreeItem>    
                    <div className="van-submit-bar__text" style={{fontSize:"13.1px"}}>
                        <span>合计：</span>
                        <span 
                            className="van-submit-bar__price" 
                            style={{fontSize:"16.87px",color:"red"}}
                        >
                            {/* ￥{this.state.totalPrice.toFixed(2)} */}
                            {/* 如果不赋初始值会把第一个元素当做初始值进行计算,指定初始值后数组为空也不会报错、
                            数组元素是对象也不会错， */}
                            ￥{
                                cartList ? 
                                cartList.reduce((total,currentVal) => {
                                    var x = total;
                                    if(currentVal.isSelect) {
                                        x = total + (Number(currentVal.mallPrice) * Number(currentVal.num))
                                    } 
                                    return x
                                }, 0).toFixed(2)
                                : ""
                            }
                        </span>
                    </div>
                    <Button 
                        type="primary" 
                        style={{width:"24.5vw",height:"11.3vw"}} 
                        danger
                        onClick={this.handleBuyNow}
                    >
                         去结算
                    </Button>   
                </Flex>
            </div>
        )
    }
}
export default Cartbottom;