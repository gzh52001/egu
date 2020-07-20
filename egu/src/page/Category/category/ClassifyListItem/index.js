import React from 'react'
import { withRouter } from "react-router-dom";
import "./index.scss"

// @withRouter
 function index(props) {
   let {data} = props

   // 跳转到详情页
   function toDetail() {
     props.history.push(`/detail/${data.id}`)
   }
    return (
          // 最外层
        <div 
          className="classify-list-item"
          onClick={toDetail}
        >
           <div className="item-img">
                <img src={data.icoImg}></img>
           </div>
           <div className="item-desc">
               <div className="desc-top">
                    <h4>{data.goodsName}</h4>
                    <p>{data.slogan}</p>
               </div>
               <div className="desc-bottom">
                    <div className="price-cart">
                        <span>￥{data.salePrice}</span>
                        <i className="iconfont icon-gouwuche"></i> 
                    </div>
               </div>
    
                <div className="desc-content"></div>
           </div>
        </div>
    )
}

export default withRouter(index)
