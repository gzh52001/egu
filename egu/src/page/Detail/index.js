import React, { Component } from 'react'

import detailApi from "@/api/detail";
import MySwiper from "@/components/Swiper";
import InfoList from "./InfoList";
import InfoItem from "./InfoItem";
import Top from "@/components/Top";
import Tabbar from "./Tabbar";
import "./style/index.scss";

const Qs = require('qs'); // 格式化传给后端的数据

export default class Detail extends Component {
    constructor() {
        super();
        this.state = {
            bannerImgs:[] ,// 轮播图图片
            bannerIndex: 1, // 当前轮播图
            goodInfo:{}, // 商品信息
            bseGoodsEo:{}, // 商品信息
            descImgs:[], // 简介图片，返回的是html结构代码
            isTopShow: false // 
        }

        // 改变自定义函数的this指向，bind返回一个改变指向的函数
        this.getBannerImgs = this.getBannerImgs.bind(this);
        this.getDescImgs = this.getDescImgs.bind(this);
    }

    // 子传父
    getBannerIndex = (index) => {
        this.setState({
            bannerIndex:index + 1, // swiper activeIndex从0开始
        })
    }

    // 请求数据---------------------------------------------------------
    // 获取轮播图图片
    async getBannerImgs() {
        let { id } = this.props.match.params;
        try{
            let res = await detailApi.getBannerImgs(id);
            if(res.state === 200) {
                this.setState({
                    bannerImgs: res.list
                })
            }
        } catch(err) {
            console.log(err);
        }
    }

    // 获取商品信息
    async getGoodInfo() {
        let { id } = this.props.match.params;
        let data = Qs.stringify({id}); // 因为传递参数的格式为application/x-www-form-urlencoded
        // 所以要转化一下携带参数的格式
        try{
            let res = await detailApi.getGoodInfo(data);
            if(res.state === 200) {
                this.setState({
                    goodInfo:res.obj,
                    bseGoodsEo:res.obj.bseGoodsEo
                })
            } 
        } catch(err) {
            console.log(err);
        }
    }

    // 获取简介图片
    async getDescImgs() {
        try {
            let res = await detailApi.getDescImgs();
            if(res.state === 200) this.setState({descImgs:res.obj});
        } catch(err) {
            console.log(err);
        }
    }

    // 生命周期---------------------------------------------------------------
    componentDidMount() {
        this.getBannerImgs(); // 请求数据：获取轮播图图片
        this.getGoodInfo();  // 请求数据：获取商品信息
        this.getDescImgs(); // 请求数据：获取简介图片

        this.elAppDetail.style.height = window.innerHeight - 40 * window.innerWidth / 375  + "px";
        this.elAppDetail.style.overflowY = "auto";

        let _this = this;
        this.elAppDetail.onscroll = function(e) {
            if(e.target.scrollTop > 4) {
                _this.setState({
                    isTopShow: true
                });
            } else {
                _this.setState({
                    isTopShow: false
                });
            }
            // console.log(e.target.scrollTop);
        }
    }

    render() {
        let { bannerImgs, bannerIndex, goodInfo, isTopShow } = this.state;
        let newPrice = parseFloat(goodInfo.mallPrice).toFixed(2);
        let originPrice = parseFloat(goodInfo.retailPrice).toFixed(2);
        let getBannerIndex = this.getBannerIndex;

        let { goodsStandard, goodsUnit, grossWeight } = this.state.bseGoodsEo; // 规格
        return (
            <div className="app-detail" ref = {el => this.elAppDetail = el}>
                {/* top */}
                <Top 
                    left = {<i onClick={() => this.props.history.push("/category")} className="iconfont icon-zuojiantou"></i>}
                    right = {<i className="iconfont icon-gengduo"></i>}
                    center = {{
                        contentStyle:{
                            fontWeight:600,
                            opacity:isTopShow ? "1" : "0"
                        }
                    }}
                    containerStyle = {{
                        backgroundColor:isTopShow ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0)",
                        fontSize:"16px",
                        fontWeight:500
                    }}
                >
                    {goodInfo.goodsName}
                </Top>
                {/* swiper */}
                <div className="detial-swiper">
                    {
                        // 数据请求回来后再调用
                        bannerImgs.length > 0 ?
                        <MySwiper setting={{
                            height: "vw(375)",
                            width: "100%",
                            className: "initialize-detail",
                            getBannerIndex
                        }}> 
                            {
                                // 插槽
                                bannerImgs.map(item => {
                                    return (
                                        <div key={item} className="swiper-slide">
                                            <img src={item} />
                                        </div>                        
                                    )
                                })
                            }
                        </MySwiper>
                        : 
                        ""
                    }
                    {/* 指示器 */}
                    <p className="indicator">
                        <span>{bannerIndex}</span>/<span>{bannerImgs.length}</span>
                    </p>
                </div>
                {/* 主要信息 */}
                <div className="main-desc">
                    <div className="price-collect">
                        <div className="price">
                            <p className="now-price"><span>{newPrice}</span></p>
                            <p className="origin-price"><span>{originPrice}</span></p>
                        </div>
                        <p className="collect">
                            <i className="iconfont icon-shoucang"></i>
                            <span>收藏</span>
                        </p>
                    </div>
                    <div className="about-express">
                        <span className="order">自营</span>
                        <span className="tag">次日达</span>
                        <span className="express-addr">深圳平仓湖</span>
                    </div>
                    <h4 className="good-name">{goodInfo.goodsName}</h4>
                </div>
                {/* 数量地址选择 */}
                <div className="select">
                    <InfoList>
                        <InfoItem data={{
                            title:"时效",
                            content: "当日16:00前下单，预计次日送达！", 
                        }}>  
                            <div style={{fontWeight:"bold", color: "#000"}}>
                                预售商品按预设时配送，不便之处，敬请谅解！
                            </div>
                        </InfoItem>
                    </InfoList>
                    <InfoList>
                        <InfoItem data={{
                                title:"已选",
                                content: `${goodsStandard}, ${goodsUnit}`,
                                contentStyle:{
                                    color:"#f80",
                                    fontSize:"14px", // 没有设置全局的vw单位，只在当前scss文件下生效
                                    fontWeight: 600
                                }
                            }}>
                        </InfoItem>
                    </InfoList>
                    <InfoList>
                        <InfoItem data={{
                                title:"送至",
                                content: "广东深圳市福田区",
                            }}>
                                <div style={{color: "#f80"}}>
                                现货
                                 </div>
                        </InfoItem>
                        <InfoItem data={{
                                title:"重量",
                                content: `${grossWeight}/ ${goodsUnit}`,
                            }}>
                        </InfoItem>
                        <InfoItem data={{
                                title:"运费",
                                content: "根据地区计算",
                                contentStyle:{
                                    color:"#f80",
                                }
                            }}>
                            <div>
                                全场满199元包邸（限深圳市），单笔不足运费8元起，生鲜类仅限深圳同城！
                            </div>
                        </InfoItem>
                        <InfoItem data={{
                                title:"提示",
                                content: "产品图片及其描述仅作参考，请您以收到的实物为准！",
                                contentStyle:{
                                    color:"#f80",
                                }
                            }}>
                            <div>
                            收货后商品如有损坏，请您当场拍下图片，并保留相关商品，在24小时之内及时联系售后客服，以便我们给您更换完好的商品！如非质量问题，概不退换！
                            </div>
                        </InfoItem>
                    </InfoList>
                </div>

                {/* 商品简介 */}
                <div className="more-desc">
                    <div 
                        dangerouslySetInnerHTML={{ __html:this.state.descImgs.goodsDesc}}>
                    </div>
                </div>
                
                {/* tabbar */}
                <Tabbar></Tabbar>
            {/* app-detail-end */}
            </div>
        )
    }
}
