import React, { Component } from 'react'
import  getGYL from "@/api/mine";
import { WingBlank,WhiteSpace,Grid } from 'antd-mobile';
import {ShoppingCartOutlined,ToTopOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'

class Gyl extends Component{
    state={
        list:[],
        isBottom:false,//不需要发数据
        pageNo:2,
        isShowTop:false,
        msg:""
    }
    goToTop=()=>{
        window.scrollTo(0,0);
    }
    toParent = () => {
        this.props.parent.getChildrenMsg(this,this.state.msg)
     
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

       window.onscroll= async ()=>{
           // 滚动条滚动时scrollTop 距顶部的距离
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          // clientHeight 可视区域的高度
          let clientHeight=document.documentElement.clientHeight || document.body.clientHeight;
          // scrollHeight 滚动条的总高度
          let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //   console.log('距顶部',scrollTop,'可视',clientHeight,'总高度',scrollHeight)

   
        if (window.scrollY > 600 ) {
            this.setState({
                isShowTop:true
            })
        }else{
            this.setState({
                isShowTop:false
            })
        }
        this.setState({
            msg:window.scrollY
        })
        this.toParent();
        // console.log("g",this.state.msg);
        if(scrollTop + clientHeight >=scrollHeight - 60 && !this.state.isBottom){
            this.setState({
                isBottom:true,//到达底部需要发送数据
                pageNo:this.state.pageNo+1
            })
           let res2 = await getGYL.getGuessYouLike(this.state.pageNo);
           if(res2.state === 200){
                this.setState({
                    isBottom:false,
                    list:[...this.state.list, ...res2.list]
                })
           }
        }

       }

    }

    componentWillUnmount(){
        window.onscroll = null;
    }
    goToDetail=(id)=>{
        this.props.history.push(`/detail/${id}`)
    }
    buyNew=()=>{
        this.props.history.push("/cart")
    }
    render() {
        const datalist = this.state.list
        let {isShowTop} = this.state
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
                            <img src={dataItem.icoImg} style={{ display:" inline-block"}} alt="" onClick={this.goToDetail.bind(this,dataItem.id)}/>
                            <div style={{height:"27px",margin:"0 5px",textOverflow: 'ellipsis',whiteSpace:'nowrap',overflow:'hidden',fontSize:"13.5px",textAlign: 'left'}}>{dataItem.goodsName}</div>
                            <div className="clearfix" style={{padding:'0 0 0 5.7px'}}>
                                <i style={{display:'inline-block',float: 'left',fontStyle:'normal',fontSize:"18.6px",color: '#f80'}}>{"￥"}{dataItem.salePrice}</i>
                                <i style={{display:'inline-block',float: 'right',margin:"0 8.15px 0 0",color: '#fff',borderRadius: '50%',backgroundColor:"#f80",width:"22.5px",height:"22.5px"} } onClick={this.buyNew}><ShoppingCartOutlined style={{fontSize:'18px'}} /></i>
                            </div>
                         </div>
                    </WingBlank>
                )}/>
    </WingBlank>
                    {
                    isShowTop?<div className="go-top" onClick={this.goToTop}>
                        <ToTopOutlined style={{fontSize:20,color:"#aaa"}} />
                    </div>:''
                }
        </div>
    }
}

export default withRouter(Gyl);