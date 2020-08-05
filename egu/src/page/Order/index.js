import React, { Component } from 'react'
import { Tabs, Button } from "antd-mobile";
import moment from "moment";

import Top from "@/components/Top";
import Pop from './../Bubble/bubble'
import "./index.scss";
import orderApi from "@/api/order";
import { RetweetOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

let tabs = [
    {title:"全部"},
    {title:"待付款"},
    {title:"待收货"},
    {title:"已完成"},
    {title:"已取消"},
]

export default class Order extends Component {
    constructor() {
        super();
        this.state = {
            orderList: [],
            currTabData:[],
						userId: localStorage.getItem('egu_userId'),
						currTab: ""
        }
    }
    goback = () => {
        this.props.history.push("/cart");
		}
		
		// 支付
		handlerPay = (orderId) => {
			let data = {
				orderId,
				userId:this.state.userId
				
			}
			orderApi.updatePayStatus(data).then(res => {
				this.getOrderList();
			}).catch(err => {
				console.log(err);
			})
		}

    // 取消订单
    handlerCancelPay = (id) => {
        let data = {
            userId:localStorage.getItem("egu_userId"),
            orderId: id,
            statusType: "isCancel"
        }

        orderApi.updateStatus(data).then(res => {
					this.getOrderList()
        }) 
        console.log(id);
		}
		
		// 删除订单
		handlerDelOrder = (orderId) => {
			orderApi.delOrder(orderId).then(res => {
				this.getOrderList();
			}).catch(err => {
				console.log(err)
			})
		}

		filterData = (title, orderList) => {
			switch(title) {
				case "全部":
						this.setState({ currTabData:orderList, currTab: "全部" })
						break;
				case "待付款":
					  // 已支付  没有取消订单 
						var list = orderList.filter(item => !Boolean(item.isPayed) && !Boolean(item.isCancel) )
						this.setState({ currTabData:list, currTab:"待付款" })
						break;
				case "待收货":
					  // 已支付  没有完成订单 
						var list = orderList.filter(item => Boolean(item.isPayed) && !item.isDone )
						this.setState({ currTabData:list, currTab:"待收货" })
						break;
				case "已完成":
						var list = orderList.filter(item => Boolean(item.isDone))
						this.setState({currTabData:list, currTab:"已完成"})
						break;
				case "已取消":
						var list = orderList.filter(item => Boolean(item.isCancel))
						this.setState({currTabData:list, currTab:"已取消"})
						break;
				default:
					break;
			}
		}

    // 切换tabs
    handlerChangeTabs = (tab, index) => {
        let { orderList} = this.state;
        let title = tab.title
        this.filterData(title, orderList)
    }

    // 获取列表数据
    getOrderList = () => {
        let { userId } = this.state;
        orderApi.getOrderList(userId).then(res => {
					let { currTab } = this.state
					if(currTab !== "") { // 点击按钮操作时根据当前所在tab筛选数据
						this.filterData(currTab, res) 
					} else { // 刷新时
						this.setState({ currTabData:res })
					}
					this.setState({ orderList:res })
        }).catch(err => {
            console.log(err);
        })
		}
		
    componentDidMount() {
        this.getOrderList() // 获取列表数据
    }
    render() {
        let { currTabData } = this.state;
        // if(!currTabData) return;
        return (
            <div className="egu-app-order">
                <Top
                    left = {<i className="iconfont icon-zuojiantou" onClick={this.goback}></i>}
                    right = {<Pop />}
                >
                    我的订单
                </Top>

                {/* tabs */}
                <Tabs
                  tabs={tabs}
                  initialPage={0}
                  onChange={this.handlerChangeTabs}
                  swipeable={false}
                >
                </Tabs>
             
                <div className="order-list">
                    {
												currTabData ? 	
                        currTabData.map(item => {
                            return (
                            <div className="order-item" key={item.id}>
                                <div className="order-list-top">
                                <span>{item.id}</span>
                                { item.isPayed ? <span>已支付</span> : <span>未支付</span>}
                                    
                                </div>
                                <ul className="order-list-center">
                                    {
                                        item.goods.map(item => {
                                            return (
                                                <li key={item.goodsId}>
                                                    <img src={item.goodsImg}></img>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="order-list-bottom">
                                    <span>{moment(Number(item.date)).format("YYYY-MM-DD")}</span>
                                    <p>
                                        共{item.goods.length}件商品 合计：
                                        <span>￥{
                                            // 第一次循环返回 0 + item.mallPrice
                                            item.goods.reduce((total, item) => {
                                                return total + Number(item.mallPrice)
                                            }, 0).toFixed(2)
                                        }
                                        </span>
                                    </p>
                                </div>
                                {
																	  // 是否支付
																		item.isPayed ? 
																		  // 是否完成订单 
																			item.isDone ? 
																				<div className="bottom-btn">
																					<Button 
																							type="ghost" 
																							inline 
																							style={{ marginRight: '4px'}} 
																							className="del-pay-btn"
																							onClick={this.handlerDelOrder.bind(this,item.id)}
																					>
																							删除订单
																					</Button>
																				</div>
																			: 
																				<div className="bottom-btn">
																						{item.isSend ? "已发货" : "未发货"}
																				</div>
                                    :   
                                        // 是否取消订单
                                        item.isCancel ? 
                                        <div className="bottom-btn">
                                            <Button 
                                                type="ghost" 
                                                inline 
                                                style={{ marginRight: '4px'}} 
                                                className="del-pay-btn"
                                                onClick={this.handlerDelOrder.bind(this,item.id)}
                                            >
                                                删除订单
                                            </Button>
                                        </div>
                                        :
                                        <div className="bottom-btn">
                                            <Button 
                                                type="primary" 
                                                inline 
                                                style={{ marginRight: '4px'}} 
                                                className="cancel-pay-btn"
                                                onClick={this.handlerCancelPay.bind(this,item.id)}
                                            >
                                                取消订单
                                            </Button>
                                            <Button 
                                                type="warning" 
                                                inline 
                                                style={{ marginRight: '4px' }}
																								className="pay-btn"
																								onClick={this.handlerPay.bind(this, item.id)}
                                            >   
                                                立即支付
                                            </Button>
                                        </div>
                                }
                                
                            </div>
                            )
												})
												:""
                    }
                    
                </div>
            </div>
        )
    }
}
