import React, { Component } from 'react'
import "./index.scss";
import CategoryContext from "../../CategoryContext.js";

export default class index extends Component {
    constructor(){
        super();
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(index, itemChange) {
        this.setState({
            classifyItemCurrent: index // 当前top tabs下标
        })
        itemChange(index); // 父组件中的方法
    }

    render() {
        return (
            <ul className="classify-items">
                {/* 获取CategoryContext中的值 */}
                <CategoryContext.Consumer>
                {
                    
                    ({list, itemChange, state}) => {
                        // 请求数据成功前Provider中的value为空，空就找不到list.bcProductTypeEos就会
                        // 报错,所以要判断一下，有值了再遍历
                        if(list && list.bcProductTypeEos.length > 0) {
                            // 在top tabs添加全部
                            if(list.bcProductTypeEos[0].tname !== "全部") {
                                list.bcProductTypeEos.unshift({
                                    tname: "全部"
                                })
                            }
                            // 遍历top tabs
                            return list.bcProductTypeEos.map((item, index) => {
                                return (
                                    <li key={index}
                                        className={state.currentClassifyItem == index ? "active" : ""}
                                        onClick={this.handleTabChange.bind(null, index, itemChange)}
                                    >
                                        {item.tname}
                                    </li>
                                )
                            })
                        }
                    }
                    // (list) => (
                    //     list[0].tid
                    // )
                   
                }
                </CategoryContext.Consumer>
            </ul>
        )
    }
}
