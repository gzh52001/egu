import React, { Component } from 'react'
import Gyl from "@/components/getGuessYouLike"
import Top from "@/components/Top"
import Cartbottom from "./bottom"
import {DeleteOutlined} from '@ant-design/icons';
  
import {Checkbox,WingBlank,WhiteSpace, Stepper  } from 'antd-mobile';
import "./css.scss"

import Pop from './../Bubble/bubble'
class Cart extends Component{
    state={
        cartData:[{
                goodId: "bf2382e8cb9d470f98df",
                img: "http://oss.egu365.com/upload/6bfa6cd35aaf44588698c96c21b8f23d.jpg",
                goodName: "【预售】正宗湖南炎陵黄桃2.5kg",
                price: 88,
                isSelect:true,
                num:1
            },{
                goodId: "iS06O76j17BwE0Qv233B",
                img: "http://oss.egu365.com/upload/e386ca5a2c4942a8bfe6ed58f04d8762.jpg",
                goodName: "新西兰乐琪苹果350g/桶",
                price: 59.8,
                isSelect:false,
                num:1
            }],
            val:1,
            isAllSelect:true
     }
    goback=()=>{
        const {history}= this.props;
        history.push("/category")
    }
    onChange = (goodId,val) => {
       this.state.cartData.forEach(item =>{
           if (item.goodId == goodId) {
               this.setState({ val });
               item.num=val
            }
       })
      }
    // isSelectClick=()=>{
        
    //  return this.state.cartData.every(ite =>ite.isSelect)
    // }

    // 單選
    singleChange = (id) => {
        let cartData = [...this.state.cartData];
        cartData.forEach(item => {
            if(item.goodId == id) {
                item.isSelect = !item.isSelect
            }
        })

        this.setState({
            cartData
        }, () => {
            this.setState({
                isAllSelect:this.state.cartData.every(item => item.isSelect)
            })
        })
    }

    // 全选
    allChange = () => {
        let preState = this.state.cartData.every(item => item.isSelect);
        let cartdata = [...this.state.cartData];
        cartdata.forEach(item => {
            item.isSelect = !preState
        })

        this.setState({
            cartData:cartdata
        }, () => {
            this.setState({
                isAllSelect:this.state.cartData.every(item => item.isSelect)
            })
        })
        
    }
    componentDidMount() {
        // this.setState({
        //     isAllSelect:this.state.cartData.every(item => item.isSelect)
        // })
    }

    render() {
       
        const {cartData} =this.state
        return (<div className="cart">
             {/* top */}
             <Top 
                    left = {<i className="iconfont icon-zuojiantou" onClick={this.goback}></i>}
                    right = {<Pop />}
                    center = {{
                        contentStyle:{fontWeight:600,}
                    }}
                >
                   <span style={{fontSize:"17.25px"}}>购物车</span>
                </Top>
                <div className="content " >
                     <div className="van-list">
                {/* 判断渲染 */}
                
                {
                this.state.cartData == "" ? <div className="not-exist">
                    <img src="http://m.egu365.com/img/cart.svg"  width="25%"/>
                    <br/>
                    <button>去逛逛</button></div>
                 : 
                        <>
                        {
                            cartData.map(cartDataitem=> {
                                return (
                                    <WingBlank size="sm"  key={cartDataitem.goodId}>
                                    <div className="item" key={cartDataitem.goodId} style={{display:"inline-flex",background:"#fff"}}>
                                        <div className="item-left" >
                                            <Checkbox.CheckboxItem style={{minHeight:"29.5vw",width:"10vw",paddingLeft:' 9px'}}
                                             onChange={(e)=>{
                                                //  cartDataitem.isSelect=!cartDataitem.isSelect;console.log(cartDataitem.isSelect)
                                                 this.singleChange(cartDataitem.goodId)
                                                 
                                                }} checked={cartDataitem.isSelect}/>
                                        </div>
                                        
                                        <div className="item-right"style={{display:"inline-flex"}}>
                                                 <img src={cartDataitem.img} style={{width:"32.8%"}} />
                                                 <ul style={{display:"Flex",flexDirection: 'column',justifyContent: 'space-between',padding:"3vw 3px 3px 3px"}}>
                                                 <li style={{display:"Flex",justifyContent: 'space-between'}}>
                                                     <div style={{overflow:"hidden" ,width:"54vw",height:"6.6vw",  textOverflow: "ellipsis",whiteSpace:"nowrap"}}>{cartDataitem.goodName}
                                                     </div>
                                                     <div style={{color:"red", position: "absolute",right: "7px"}}><DeleteOutlined /></div>
                                        
                                                </li>
                                                <li>2</li>
                                                <li  style={{display:"flex",marginRight:"-16px",color:"red"}}>
                                                       <div style={{flexGrow:"3"}}>{"￥"}{cartDataitem.price}</div>
                                                        <div style={{flexGrow:"2"}}> 
                                                            <Stepper  style={{ width: '100%', minWidth: '100px' }}
                                                            showNumber
                                                            max={10}
                                                            min={1}
                                                            value={cartDataitem. num}
                                                            onChange={this.onChange.bind(this,cartDataitem.goodId)}
                                                            />
                                                        </div>
                                                </li>
                                                </ul>
                                        </div>
                                        </div>
                                    <WhiteSpace />
                                </WingBlank>)
                            })
                        }

                        </>
                   }
            </div>
            {/* 猜你喜欢 */}
            <div className="guess-you-like">
                <img src='http://m.egu365.com/img/guess_you_like.jpg'/>
                 <Gyl/>
                 </div>
              </div>
           <Cartbottom isAllSelect={this.state.isAllSelect} allChange={this.allChange} data={this.state} isSelectClick={this.isSelectClick}/>
                </div>)
    }
}
Cart = withLogin(Cart)
export default Cart;