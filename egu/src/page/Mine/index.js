import React, { Component } from 'react'
import { Grid, } from 'antd-mobile';
import { data ,data2,data3  } from "./data";  
import  Gyl from "../../components/getGuessYouLike";
import Top from "@/components/Top"
import './style.scss';
import { SettingOutlined} from '@ant-design/icons';

class Mine extends Component{
    state={
        yon:false
    }
    getChildrenMsg = (result, msg) => {
        this.setState({
            yon: msg
        })
    }
    
    componentDidMount(){
        this.getChildrenMsg();
    }
    render() {
        const{yon}=this.state;
        return (
            <div className="mine">
                        {/* 导航栏 */}
            <div className="top">
              {yon ?  <Top 
                    left = {<img src="http://m.egu365.com/img/not_user.jpg" style={{borderRadius:"50%",width:"65%"}}></img>}
                    right = {<SettingOutlined style={{
                        fontSize:"5.8vw",color:"#c0c0c0"}}/>}
                    center = {{
                        contentStyle:{fontWeight:600,}
                    }}
                >
                   <span style={{fontSize:"17.25px"}}>我的</span>
                </Top> :<div className="top-icon"><SettingOutlined  style={{
                        fontSize:"5.8vw",color:"#fff"}}/></div>}
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
                <Gyl  parent={ this }/>
                {/* <GoTop/> */}
            </div>

        </div>)
    }
}

export default Mine;