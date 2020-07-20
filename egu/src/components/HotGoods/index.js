import React, { Component } from 'react'
import { WhiteSpace  } from 'antd-mobile';
import {ShoppingCartOutlined} from '@ant-design/icons';
import homeApi from '@/api/home.js'

import Swiper from 'swiper';
import "swiper/swiper.scss"
import './style.scss';


class HotGoods extends Component {
    state = {
        hotList: [],
        rushBuyLidt: [],
        freshGoodsList:[],
        dateTimeOne:{}
    }

    // hotGoods 图片id：140
    async getData() {
        let { data } = await homeApi.getDataByIdAndGoods(140);
        let res = await homeApi.getDataByIdAndGoods(143);
        this.setState({
            hotList: data,
            freshGoodsList:res.data
        })
    }
    //hotGoods 立刻买id：140
    getRushBuyData = async()=> {
        let {
            data
        } = await homeApi.getDataByIdAndImage(142)
        this.setState({
            rushBuyLidt: data
        })

        // let arr =[];
        // for (let i = 0; i < data.length; i++) {
        //      let expireTime = (new Date(data[i].expire)).getTime();
        //      setInterval(()=>{
        //         let res = this.cutDown(expireTime)
        //         // arr.push(res);
        //         // arr.slice(-2);
        //      },1000)
        // }

        // setInterval(()=>{
        //     let res = this.cutDown(data[0].expire)
        //     this.setState({dateTimeOne:res})
        // },1000)
    }

    cutDown = (futureTime)=> {
        let nowDate = (new Date()).getTime();
        let expireTime = (new Date(futureTime)).getTime();
        let timer = (expireTime - nowDate) / 1000;
        let o={}
        let d = parseInt(timer / 60 / 60 / 24);
        let h = parseInt(timer / 60 / 60 % 24);
        let m = parseInt(timer / 60 % 60);
        let s = parseInt(timer % 60);
        o.d = d
        o.h = this.addzero(h);
        o.m = this.addzero(m);
        o.s = this.addzero(s);
       return o
    }

    // 补零
     addzero(num) {
        return ("00" + num).slice(-2);
    }

    goDetail = (id) => {
        console.log(id)
    }

    renderData=(title,data)=>{
        return (
            <>
                <div className="line">
                <h1 className="title">{title}</h1>
                <p className="more">更多 &gt;</p>
                </div>
                <div className="hot-goods-one-swiper-container">
                    <div className="swiper-wrapper">
                        {
                        data.map(item=>(
                            <div className="swiper-slide" key={item.goodsId}>
                                <img src={item.bseGoodsEo.goodsImg} alt={item.goodsName} onClick={this.goDetail.bind(null,item.goodsId)} />
                                    <p className="goods-name">{item.goodsName}</p>
                                    <span className="goods-price">￥ {item.mallPrice}</span>
                                    <span className="goods-icon"><ShoppingCartOutlined style={{fontSize:26}} /></span>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        this.getData();
        this.getRushBuyData();

        new Swiper('.hot-goods-one-swiper-container', {
            loop: true,
            slidesPerView: 2.3,
            slidesOffsetBefore: 10,
        })

        new Swiper('.hot-goods-two-swiper-container', {
            loop: true,
            slidesPerView: 2,
            spaceBetween: -10,
            slidesOffsetBefore: 10,
        })
    }

    render() {
        let {hotList,rushBuyLidt,freshGoodsList} = this.state;
        return (
            <div className="hot-goods">
                {this.renderData('热卖商品',hotList)}
                <div className="hot-goods-two-swiper-container">
                    <div className="swiper-wrapper">
                        {
                            rushBuyLidt.map(item=>(
                                <div className="swiper-slide" key={item.id}>
                                    <img src={item.img} alt="" />
                                    {/* <span>{dateTimeOne.h}</span> */}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <WhiteSpace size="md" style={{backgroundColor: "#ebebef",marginTop:10}}/>
                {this.renderData('尝鲜推荐',freshGoodsList)}
            </div>
        )
    }
}

export default HotGoods