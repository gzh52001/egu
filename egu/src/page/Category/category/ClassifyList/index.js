import React, { Component } from 'react'
import ClassfiyContext from "../../CategoryContext";
import ClassifyListItem from "../ClassifyListItem";

export default class index extends Component {
    render() {
        return (
            <div className="classify-list">
                <ClassfiyContext.Consumer>
                   {
                        ({ state }) => {
                            let {list} = state;
                            let items = state.ClassifyList;  // 分类商品列表

                            // 判断Category/index.js中数据是否已经获取到
                            if(!list.length > 0) {
                                return
                            }
                            return (
                                items.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <ClassifyListItem data={item}>
                                            </ClassifyListItem>
                                        </div>
                                    )
                                })
                            )
                        }
                   }
                </ClassfiyContext.Consumer>
                
            </div>
        )
    }
}
