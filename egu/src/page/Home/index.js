import React, { Component } from 'react'
import { Tabs,WhiteSpace  } from 'antd-mobile';
import { Input, Row, Col  } from 'antd';
import { StickyContainer  } from 'react-sticky';
import {cancel} from '@/api/myaxios'
import Swiper from 'swiper';
import "swiper/swiper.scss"  

import Banner from '@/components/Banner/index.js';
import HotGoods from '@/components/HotGoods';
import Recommend from '@/components/Recommend';
import NavListData from '@/components/NavListData';
import GoTop from '@/components/GoTop';
import GetGuessYouLike from '@/components/getGuessYouLike';

import homeApi from '@/api/home';
import navList from './navList'
import './style.scss';


class Home extends Component{
    state={
        navList, // 导航
        menuList:[],
        taiguoImg:{},
        swiperImg:[],
        isShow:true,
        currentIndex:0,
        isBottom:false,
        page:1
    }

    // 菜单 id：136
    async getMenuData(){
        let {data} = await homeApi.getDataByIdAndImage(136);
        this.setState({menuList:data})
    }

    // 泰国椰青 id：138
    async getImgTaiGuo(){
        let {data} = await homeApi.getDataByIdAndImage(138);
        console.log(data)
        this.setState({taiguoImg:data[0]})
    }

    // swiper 多个小图片 type:18
    async getSwiperImg(){
        let {data} = await homeApi.getDataByType(18)
        this.setState({swiperImg:data})
    }

    // 4个菜单跳转
     goPage = (id)=>{
        console.log(id)
    }

    // swiper跳转列表页 (啃一啃。。。)
    goSwiperList=(id)=>{
        console.log(id)
    }

    componentDidUpdate(){
        new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            slidesPerView: 3.7, // 显示3.5个
            centeredSlides: true, // 居中
            // spaceBetween : 40, // 每个slide间距
            centeredSlidesBounds: true, // 使得第一个和最后一个Slide 始终贴合边缘。
            slidesOffsetBefore : 2, // 第一个与左边偏移量
          
          }) 
       
    }
 

    componentDidMount(){
        this.getMenuData();
        this.getImgTaiGuo();
        this.getSwiperImg();
        
    }
    componentWillUnmount(){
        // cancel('get_http://api.egu365.com/news/recommend/seats/136/images','被拦截')
        // cancel('get_http://api.egu365.com/news/recommend/seats/138/images','被拦截')
    }
  

    render() {
      let {navList,menuList,taiguoImg,swiperImg,isShow,currentIndex} = this.state;
        return (
            <div className="home">
                <StickyContainer>
                    <Tabs tabs={navList}
                        swipeable={false}
                        animated={false}
                        tabBarBackgroundColor="transparent"
                        initialPage={0}
                        tabBarActiveTextColor="#ff8800"
                        tabBarTextStyle={{color:'#333',fontSize:14}}
                        renderTabBar={ props => <Tabs.DefaultTabBar {...props} page={4} />}
                        onChange={(tab,index) => {
                            if(index === 0){ this.setState({isShow:true})
                            }else{ this.setState({ isShow:false })}
                            this.setState({currentIndex:index})
                        }}
                        >
                       
                            <div style={{height:40,display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Input  placeholder="依谷扶贫"/>
                            </div>

                    </Tabs>
                </StickyContainer>
                
                {
                  isShow ?  
                    <>
                        <Banner />
                        <div className="menu">
                            <Row>
                                {
                                    menuList.map(item=>(
                                        <Col span={6} key={item.id} onClick={this.goPage.bind(null,item.id)}>
                                            <img src={item.img} alt="" width="50" />
                                            <p style={{fontSize:13,color:"#373737"}}>{item.name}</p>
                                        </Col>))
                                }
                            </Row>
                        </div>
                        {/* <div className="taiguo-img">
                            <img src={taiguoImg.img } alt="" />
                        </div> */}
                        <div className="swiper-img">
                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    {
                                        swiperImg.map(item=>(
                                            <div className="swiper-slide" key={item.id} onClick={this.goSwiperList.bind(null,item.id)}>
                                                <img src={item.bgImg1} alt={item.name} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <WhiteSpace size="md" style={{backgroundColor: "#ebebef"}}/>
                        <HotGoods />
                        <div className="advise">
                            <img src='http://m.egu365.com/img/today_advise.jpg' alt="今日推荐" />
                        </div>
                        <Recommend />
                        <div className="advise">
                            <img src='http://m.egu365.com/img/guess_you_like.jpg' alt="猜你喜欢" />
                        </div>
                        <GetGuessYouLike />
                        <GoTop />
                    </> :''          
                } 
                {currentIndex === 1 ? <NavListData id={144} /> : ''}
                {currentIndex === 2 ? <NavListData id={145} /> : ''}
                {currentIndex === 3 ? <NavListData id={146} /> : ''}
                {currentIndex === 4 ? <NavListData id={147} /> : ''}
                {currentIndex === 5 ? <NavListData id={148} /> : ''}
                {currentIndex === 6 ? <NavListData id={149} /> : ''}
                {currentIndex === 7 ? <NavListData id={150} /> : ''}
                {currentIndex === 8 ? <NavListData id={151} /> : ''}
                {currentIndex === 9 ? <NavListData id={152} /> : ''}
              
            </div>
        )
    }
}

export default Home;