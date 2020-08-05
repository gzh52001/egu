import React, { Component } from 'react'
import { connect } from "react-redux";

import Top from "@/components/Top";
import "./index.scss"; // 当前路径要加 ./
import cartApi from '@/api/cart'
import orderApi from "@/api/order";
import { orderId } from "@/utils/tool"
import { Toast } from "antd-mobile"
import { Modal, Button } from 'antd'


// 确认订单要请求购物车数据，如果从redux获取，刷新页面会初始化store
// 而结算组件不是购物车组件的子组件，确认订单页组件刷新了不会使购物车组件刷新

let mapStateTopProps = (state) => {
    return state.cart
}
@connect(mapStateTopProps)
class Settlement extends Component {
    constructor() {
        super();
        this.state = {
            cartList:[],
            userId:localStorage.getItem("egu_userId"),
            selectedItems:[],
            isPayModelShow:false,
            confirmLoading: false,
            orderId:""
        }
    }
    handleBackToCart = () =>  {
        this.props.history.goBack();
    }

    // 事件： 确认订单
    handleAddOrder = () =>  {
        // order表数据-------
        let order = {
            id:orderId("EGU", 5), // EGU + 时间戳 + 5位随机数
            userId:localStorage.getItem("egu_userId"),
            date: new Date().getTime(), // 当前时间戳
            isSend: 0 // 默认不发货
        }
        // orderId
        this.setState({orderId:order.id})

        // orderGoods表数据-------
        let { selectedItems } = this.state;
        // 筛选出来勾选的商品
        order.goods = selectedItems
        this.addOrder(order) // 调用异步函数请求添加
    }

    // 事件： 取消支付
    handlePayCancel = () => {
        this.setState({
            isPayModelShow:false
        }, () => {
            this.props.history.push("/order")
        })
    }

    // 事件： 支付
    handlePay= () => {
        let { userId, orderId } = this.state;
        let data = {
            userId,
            orderId
        }
        // 支付请求
        orderApi.updatePayStatus(data).then(res => {
            this.setState({isPayModelShow:false}, () => {
                Toast.info(res.msg, 1.5)
            })  
            if(Number(res.code)) {
                // 跳转
                this.props.history.push("/order")
            }              
        }).catch(err => {
            console.log(err)
        })
    }


    // 异步------------

    // 请求购物车数据
    async getCartList() {
        let {userId} = this.state;
        
        // 请求数据
        // 等待：异步请求结束后再执行后面的代码
        // try一下：为防止异步代码错误造成阻塞
        try {
            let result = await cartApi.getCartList(userId);
            // 如果返回的数据为空 result.data 就会得到undefined
            if(Number(result.code)) {
                this.setState({
                    cartList: result.data
                }, () => {
                    console.log("state1", this.state);
                })
            }
           
        } catch(err) {
            console.log(err);
        }
        
        // 如果没有使用 async await 先执行
        this.setState({
            selectedItems:this.state.cartList.filter(item => item.isSelect)
        })
    }

    // 确认订单：添加订单信息
    async addOrder(order) {
        try{
            let res = await orderApi.add(order)
            if(Number(res.code)) {
                // 跳转到支付
                this.setState({
                    isPayModelShow:true
                })
            } else {
                // 停留在本页
            }
        } catch(err) {
            console.log(err);
        }

    }

    componentDidMount() {
         //this.getNum() // 周期函数的this指向实例，
        // 这里调用函数可以让函数的this指向实例
        this.getCartList()
       
    }
    render() {
        let { selectedItems, isPayModelShow, confirmLoading } = this.state;
        return (
            <div className="settlement">
                <Top 
                    left = {<i 
                        onClick={this.handleBackToCart}
                        className="iconfont icon-zuojiantou"></i>}
                    right = {<i className="iconfont icon-gengduo"></i>}
                    center = {{
                        contentStyle:{
                            fontWeight:600,
                        }
                    }}
                    containerStyle = {{
                        fontSize:"16px",
                        fontWeight:500
                    }}
                >
                    订单信息
                </Top>

                <ul className="settlement-goods">
                {
                    selectedItems.map(item => {
                        {
                            return (
                                <li key={item.goodsId}>
                                    <div className="goodsImg">
                                        <img src={item.goodsImg} />
                                    </div>
                                    <div className="goodsDesc">
                                        <h4>{item.goodsName}</h4>
                                        <p>{item.param2}</p>
                                        <span>￥{item.mallPrice}</span>
                                                    
                                        <span>&times; {item.num}</span>
                                    </div>
                                </li>
                            )
                        }
                    })
                }
            </ul>

                <div className="should-pay">
                    总金额：￥
                    {
                        selectedItems.reduce((total,item) => {
                            return total + Number(item.mallPrice) * Number(item.num)
                        }, 0).toFixed(2)
                    }
                </div>

            <div className="settlement-bottom" onClick={this.handleAddOrder}>
                确认订单
            </div>

            <Modal
                title="支付订单"
                visible={isPayModelShow}
                confirmLoading={confirmLoading}
                okText="确定"
                cancelText="取消"
                onCancel={this.handlePayCancel}
                onOk={this.handlePay}
                maskClosable={false}
            >
                <p>
                    支付金额：￥
                    {
                        selectedItems.reduce((total,item) => {
                            return total + Number(item.mallPrice) * Number(item.num)
                        }, 0).toFixed(2)
                    }
                </p>
            </Modal>
        </div>
        )
    }
}

export default Settlement;