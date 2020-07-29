import React, { Component } from 'react'
import Top from "@/components/Top";
import EguSearch from "@/components/EguSearch"
import categoryApi from "@/api/category";
import Lefttabs from "./category/LeftTabs";
import TopTabs from "./category/TopTabs";
import ClassifyList from "./category/ClassifyList"; // 分类列表
import "./index.scss";
import CategoryContext from "./CategoryContext";

class Category extends Component{
    constructor() {
        super();
        this.state = {
            list:[],
            ClassifyList:[], // 全部，分页加载
            currentClassify:0,
            currentClassifyItem: 0,
            tid:"",
            currPage: 1,
            nextPage:1,
            isBottom: false,
            isFirst: false
        }

        this.handleClassifyChange = this.handleClassifyChange.bind(this)
        this.handleClassifyItemChange = this.handleClassifyItemChange.bind(this)
        this.getClassifyList = this.getClassifyList.bind(this);
    }

    // 一级菜单改变
    handleClassifyChange(index) {
        // 切换后返回顶部
        this.listContent.scrollTop = 0
        // console.log("offsetHeihgt", this.listContent.scrollHeight);
        this.setState({
            currentClassify:index,
            currentClassifyItem: 0,
            currPage:1,
            isBottom: false
        }, () => {
            let {list, currentClassify} = this.state;
            this.setState({
                tid:list[currentClassify].tid
            }, () => {
                this.getClassifyList()
            })
        }); // currentClassify改变后再根据currentClassify拿到tid请求数据
    }   

    // 二级菜单改变
    handleClassifyItemChange(index) {
         // 切换后返回顶部
       this.listContent.scrollTop = 0
       this.setState ({
            currentClassifyItem: index,
            currPage:1,
            isBottom: false
        }, () => {
            let {list, currentClassify} = this.state
            let tid = list[currentClassify].bcProductTypeEos[index].tid;
            // 判断点击的是否为全部
            if(index === 0) tid = list[currentClassify].tid;
            this.setState({tid}, () => this.getClassifyList());
        })
    }

     // 请求数据：获取分类目录
    async getClassify() {
        let res = await categoryApi.getClassify();
        this.setState({
            list:res.list,
            tid:res.list[0].tid
        })
    }

    // 请求数据：获取分类列表商品数据
    async getClassifyList() {
        let {tid, currPage} = this.state;
        let res = await categoryApi.getClassifyList(tid,currPage);
     
        this.setState({
            ClassifyList:res.list
        })
        
       
    }

    componentDidMount() {
        this.getClassify();
        this.getClassifyList();
        // 列表区域的高度， vw单位转化成px单位：1vw = window.innerWidth / 375 px
        this.listContent.style.height = window.innerHeight - 80 * window.innerWidth / 375 - 50 + "px";
        this.leftTabs.style.height = window.innerHeight - 80 * window.innerWidth / 375 - 50 + "px";
        let _this= this
    
        this.listContent.onscroll = function(e) {
            let box = e.target;
            if(
                // 因为移动端会多出1px所以要减
                box.scrollTop + box.offsetHeight >= box.scrollHeight - _this.state.currPage &&
                !_this.state.isBottom
            ){
               _this.setState({
                   currPage:_this.state.currPage + 1,
                   isBottom: true
               }, () => {
                    categoryApi.getClassifyList(_this.state.tid, _this.state.currPage).then(res => {
                       if(res.list.length === 0) return;
                       _this.setState({
                            ClassifyList: _this.state.ClassifyList.concat(res.list),
                            isBottom:false
                        })
                    }) 
               })
            }
        }

    
    }

    render() {
        let { list, currentClassify } = this.state
        return (
            // 向CategoryContext 中传值： value={list}
            <CategoryContext.Provider 
                value={{
                    list:list[currentClassify], // 只传递当前的tabs到context中
                    change:this.handleClassifyChange.bind(this),
                    itemChange: this.handleClassifyItemChange,
                    state: this.state
                }}>
                <div className="category">
                    <div className="category-top">
                        {/* top */}
                        <Top 
                            left = {<i 
                                onClick={() => this.props.history.push("/home")} 
                                className="iconfont icon-zuojiantou"></i>}
                            right = {<i className="iconfont icon-gengduo"></i>}
                        >
                           <EguSearch placeholder="搜索" />
                        </Top>
                        <TopTabs />
                    </div>
                    <div className="category-content">
                        <div ref = { el => this.leftTabs = el } className="left-tabs">
                            <Lefttabs />
                        </div>
                        <div ref= { el => this.listContent = el }className="classify-list-wrap">
                            <ClassifyList />
                        </div>
                    </div>
                </div>
            </CategoryContext.Provider>
        )
    }
}

export default Category;