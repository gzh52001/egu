import React, { Component } from 'react'
import  getGYL from "@/api/mine";
import { WingBlank,WhiteSpace,Grid } from 'antd-mobile';
import {ShoppingCartOutlined } from '@ant-design/icons';

class Gyl extends Component{
    state={
        list:[]
    }
    async  componentDidMount(){
       let res = await getGYL.getGuessYouLike(1);
       this.setState({
           list:res.list
       },async ()=>{
        res = await getGYL.getGuessYouLike(2)
        this.setState({
            list:[...this.state.list, ...res.list]
        })
       })
    }
    render() {
        const datalist = this.state.list
        return <div className='gul-list' style={{paddingBottom:"52px"}}>
            <WingBlank  size="sm">
            <Grid data={datalist}
                columnNum={2}
                hasLine={false}
                itemStyle={{
                    height:"63vw",
                    color: '#555', 
                    fontSize: '14px',
                    backgroundColor:"#fefbfb",
                }}
                renderItem={dataItem => (
                    <WingBlank  size="sm">
                    <WhiteSpace  size="xs"/>
                       <div style={{ backgroundColor:"#fff",}}>
                            <img src={dataItem.icoImg} style={{ display:" inline-block"}} alt="" />
                            <div style={{height:"27px",margin:"0 5px",textOverflow: 'ellipsis',whiteSpace:'nowrap',overflow:'hidden',fontSize:"13.5px",textAlign: 'left'}}>{dataItem.goodsName}</div>
                            <div className="clearfix" style={{padding:'0 0 0 5.7px'}}>
                                <i style={{display:'inline-block',float: 'left',fontStyle:'normal',fontSize:"18.6px",color: '#f80'}}>{"￥"}{dataItem.salePrice}</i>
                                <i style={{display:'inline-block',float: 'right',margin:"0 8.15px 0 0",color: '#fff',borderRadius: '50%',backgroundColor:"#f80",width:"22.5px",height:"22.5px"}}><ShoppingCartOutlined style={{fontSize:'18px'}} /></i>
                            </div>
                         </div>
                    </WingBlank>
                )}/>
    </WingBlank>
        </div>
    }
}

export default Gyl;