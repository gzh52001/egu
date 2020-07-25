import React, { Component } from 'react'
import { connect } from "react-redux";

import Top from "@/components/Top";
import "./index.scss"; // 当前路径要加 ./


let mapStateTopProps = (state) => {
    return state.cart
}
@connect(mapStateTopProps)
class Settlement extends Component {
    handleBackToCart = () =>  {
        this.props.history.goBack();
    }
    render() {
        let { storeCartList } = this.props;
        let selectedItems = storeCartList.filter(item => item.isSelect);
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
                需支付：￥
                {
                    selectedItems.reduce((total,item) => {
                        return total + Number(item.mallPrice) * Number(item.num)
                    }, 0).toFixed(2)
                }
            </div>

            <div className="settlement-bottom">
                立即支付
            </div>
        </div>
        )
    }
}

export default Settlement;