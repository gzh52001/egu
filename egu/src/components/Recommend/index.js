import React, { Component } from 'react'
import {ShoppingCartOutlined} from '@ant-design/icons';
import homeApi from '@/api/home';
import './style.scss';

class Recommend extends Component{
    state={
        backgroungImg:[],
        fruitData:[],
        greenData:[],
        oilData:[],
        specialData:[],
        drinkData:[],
        wineData:[],
        presentData:[],
        houseData:[],
        homeApplicationData:[],
    }

    async getBackgroundImg(){
        let {data} = await homeApi.getDataByType(17);
        this.setState({backgroungImg:data});
    }

    // 新鲜水果id:144,绿色菜篮id:145,粮油调料id：146
    async getData(){
        let res1 = await homeApi.getRecommendData(144)
        let res2 = await homeApi.getRecommendData(145)
        let res3 = await homeApi.getRecommendData(146)
        let res4 = await homeApi.getRecommendData(147)
        let res5 = await homeApi.getRecommendData(148)
        let res6 = await homeApi.getRecommendData(149)
        let res7 = await homeApi.getRecommendData(150)
        let res8 = await homeApi.getRecommendData(151)
        let res9 = await homeApi.getRecommendData(152)
        this.setState({
            fruitData:res1.data,
            greenData:res2.data,
            oilData:res3.data,
            specialData:res4.data,
            drinkData:res5.data,
            wineData:res6.data,
            presentData:res7.data,
            houseData:res8.data,
            homeApplicationData:res9.data
        })
        
    }

    // 跳转详情页
    goDetail = (id)=>{
        console.log(id)
    } 

    // 渲染列表
    renderList = (index,currentIndex,data)=>{
       return index === currentIndex ? data.map(ele=>(
            <div className="recommand-list-item" key={ele.goodsId}>
                <img src ={ele.bseGoodsEo.goodsImg} alt={ele.goodsName} onClick={this.goDetail.bind(null,ele.goodsId)} />
                <p className="goods-name">{ele.goodsName}</p>
                <span className="goods-price">￥ {ele.mallPrice}</span>
                <span className="goods-icon"><ShoppingCartOutlined style={{fontSize:20}} /></span>
            </div>
         )):''
    }


    componentDidMount(){
        this.getBackgroundImg();
        this.getData();
    }

    render(){
        let {backgroungImg,fruitData,greenData,oilData,specialData,drinkData,wineData,presentData,houseData,homeApplicationData} =  this.state;
        return (
            <div className="recommend">
                    {
                        backgroungImg.map((item,index)=>(
                            <div className="recommend-container" style={{backgroundImage:`url(${item.bgImg1}`} } key={item.id}>
                                <div className="recommand-list">
                                    {this.renderList(index,0,fruitData)}
                                    {this.renderList(index,1,greenData)}
                                    {this.renderList(index,2,oilData)}
                                    {this.renderList(index,3,specialData)}
                                    {this.renderList(index,4,drinkData)}
                                    {this.renderList(index,5,wineData)}
                                    {this.renderList(index,6,presentData)}
                                    {this.renderList(index,7,houseData)}
                                    {this.renderList(index,8,homeApplicationData)}
                                </div> 
                            </div>
                        ))
                    }
            </div>
        )
    }
}

export default  Recommend;