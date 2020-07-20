import React, { Component } from 'react'
import { NavBar, Icon,Grid, } from 'antd-mobile';
import { data ,data2,data3  } from "./data";  
import  Gyl from "../../components/getGuessYouLike";
import GoTop from "../../components/GoTop"
import Top from "@/components/Top"
import './style.scss';

class Mine extends Component{

    render() {
        return (
            <div className="mine">
                        {/* 导航栏 */}
            <div className="top">
                <Top 
                    left = {<img src="http://m.egu365.com/img/not_user.jpg" style={{borderRadius:"50%",width:"65%"}}></img>}
                    right = {<i className="iconfont icon-gengduo"></i>}
                    center = {{
                        contentStyle:{fontWeight:600,}
                    }}
                >
                   <span style={{fontSize:"17.25px"}}>我的</span>
                </Top>
            </div>
                        {/* 头部 */}
            <div className="user-wrap">
                    <div className="user-ht flx"><img src="http://m.egu365.com/img/not_user.jpg" lazy="error"/>
                        <div className="user-t flx-1">
                            <div className="greet">下午好</div>
                            <div className="ellipsis">点击登录/注册用户</div>
                        </div>
                    </div>
            </div>
                        {/* 完成订单 */}
            <div className="card-view-box">
                <Grid data={data}
                columnNum={5}
                hasLine={false}
                renderItem={dataItem => (
                    <div className='card-view'>
                            <img src={dataItem.icon}/>
                            <div className='card-view-text' style={{ color: '#282828', }}>
                             {dataItem.name}
                            </div>
                    </div>
                )} />
           </div>
            <div className="card-view-box">
                <Grid data={data2}
                columnNum={5}
                hasLine={false}
                renderItem={dataItem => (
                    <div className='card-view'>
                            <img src={dataItem.icon} />
                            <div  style={{ color: '#282828', }}>
                               {dataItem.name}
                            </div>
                     </div>
                )} />
            </div>  
            <div className="card-view-box">
                <Grid data={data3}
                columnNum={5}
                hasLine={false}
                renderItem={dataItem => (
                    <div className='card-view'>
                            <img src={dataItem.icon}  />
                            <div style={{ color: '#282828',}}>
                              {dataItem.name}
                            </div>
                    </div>
                )} />
            </div>    
                        {/* 猜你喜欢*/}
            <div className='guess-you-like'>
                <img src='http://m.egu365.com/img/guess_you_like.jpg'/>
                <Gyl/>
                <GoTop/>
            </div>

        </div>)
    }
}

export default Mine;