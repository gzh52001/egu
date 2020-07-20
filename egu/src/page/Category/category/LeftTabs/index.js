import React, { Component } from 'react'
import "./lefttabs.scss";
import categoryApi from "@/api/category";
import CategoryContext from "../../CategoryContext";


export default class Lefttabs extends Component {
    constructor() {
        super();
        this.state = {
            list:[],
            classifyCurrent: 0, // 当前分类高光
        }
        this.handleChange = this.handleChange.bind(this)
    }
    async getList() {
        let res = await categoryApi.getClassify();
        this.setState({
            list:res.list,
        }, () => { // 在回调例拿到最新的state
            console.log("list", this.state.list);
        })
    }
    componentDidMount() {
        this.getList();
    }
    // 切换分类
    handleChange(index, change) {
        this.setState({
            classifyCurrent:index // 当前left tabs下标
        })
        change(index);
        return index
    }
    render() {
        let { list, classifyCurrent} = this.state;
        return (
            <ul className="classify">
                <CategoryContext.Consumer>
                    {
                        ({change}) => {
                            return list.map((item, index) => {
                                return (
                                    <li 
                                        className={classifyCurrent === index ? "active classify-item" : "classify-item"} 
                                        key={item.tid}
                                        onClick={this.handleChange.bind(this, index, change)}>
                                        {item.tname}
                                        <i></i>
                                    </li>
                                )
                            })
                        }
                    }
                </CategoryContext.Consumer>
                {/* {

                    list.map((item, index) => {
                        return (
                            <li 
                                className={classifyCurrent === index ? "active classify-item" : "classify-item"} 
                                key={item.tid}
                                onClick={this.handleChange.bind(this, index)}>
                                {item.tname}
                                <i></i>
                            </li>
                        )
                    })
                } */}
            </ul>            
        )
    }
}
