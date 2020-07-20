import React, { Component } from 'react'
import Swiper from "swiper";
import "swiper/swiper.scss"

import "./index.scss";

export default class MySwiper extends Component {
   
    componentDidMount() {
        // 实例化swiper
        let {className, getBannerIndex} = this.props.setting;
        new Swiper("." + className, { // 自定义实例化的类名，一个页面有多个轮播图时就不会出错
            on: {
                // 滑动事件
                slideChange:function() {
                    getBannerIndex(this.activeIndex); // 父组件的方法
                }
            }
        }); 
        
    
    }
    render() { 
        let { height, width, className} = this.props.setting;
        return (
            <div  style ={{width, height}} className="my-swiper">
                {/* Swiper  */}
                <div className={className + " swiper-container"}>
                    <div className="swiper-wrapper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
