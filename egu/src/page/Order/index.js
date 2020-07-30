import React, { Component } from 'react'

import Top from "@/components/Top";
import Pop from './../Bubble/bubble'

export default class Order extends Component {
    goback = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div className="egu-app-order">
                <Top
                    left = {<i className="iconfont icon-zuojiantou" onClick={this.goback}></i>}
                    right = {<Pop />}
                >
                    我的订单
                </Top>
            </div>
        )
    }
}
