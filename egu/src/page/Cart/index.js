import React, { Component } from 'react'
import withLogin from '@/components/Hoc';
import Gyl from "@/components/getGuessYouLike"
import Top from "@/components/Top"
import Cartbottom from "./bottom"
import {DeleteOutlined} from '@ant-design/icons';
import { connect } from "react-redux";
import actios from "@/store/action/cart";
  
import {Checkbox,WingBlank,WhiteSpace, Stepper  } from 'antd-mobile';
import cartApi from '@/api/cart'
import "./css.scss"

import Pop from './../Bubble/bubble'
class Cart extends Component{
    state={
        cartData:[],
        isAllSelect:true,
        userId: localStorage.getItem("egu_userId"),
        totalPrice:0
     }
    goback=()=>{
        const {history}= this.props;
        history.push("/category")
    }

    // 事件------------
    // 删除
    handleDel = (goodsId) => {
        this.del(goodsId);
    }

    // 加减数量
    onChange = (goodsId,newValue) => {
        // console.log("val:", value, "this.state.val:", );
        // 判断加还是减
        let { cartData,userId } = this.state;
        let preValue = null;
        cartData.forEach(item => {
            if(item.goodsId == goodsId) {
                preValue = item.num
            }
        })
        // 判断是增是减
        let type =  newValue > preValue ? 1 : 0;
        let data = {
            type,
            goodsId,
            userId
        }
        // 执行修改
        this.update(data);
      }
   

    // 單選
    singleChange = (id) => {
        let cartData = [...this.state.cartData];
        cartData.forEach(item => {
            if(item.goodsId == id) {
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

    // 异步请求------------
    // 获取列表数据
    getCartList = () =>{
       cartApi.getCartList(this.state.userId).then(res => {
           this.setState({cartData:res.data})
       }).catch((err) => {
        console.log(err);
       }) 
    }

    // 删除
    del = async (goodsId) => {
        try{
            let data = {userId:this.state.userId, goodsId};
            let res = await cartApi.del(data);
            if(Number(res.code)) {
                this.getCartList();
            } else {
                window.alert("删除失败");
            }
        } catch(err) {
            console.log(err);
        }
        
    }

    // 加减数量
    update = async (data) => {
        try{
            let res = await cartApi.update(data);
            if(Number(res.code)) {
                this.getCartList();
            }
        } catch(err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.getCartList();
    }

    render() {
        const {cartData} =this.state;
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
                this.state.cartData == undefined ? <div className="not-exist">
                    <img src="http://m.egu365.com/img/cart.svg"  width="25%"/>
                    <br/>
                    <button>去逛逛</button></div>
                 : 
                        <>
                        {
                            cartData.map(cartDataitem=> {
                                return (
                                    <WingBlank size="sm"  key={cartDataitem.goodsId}>
                                    <div className="item" key={cartDataitem.goodsId} style={{display:"inline-flex",background:"#fff"}}>
                                        <div className="item-left">
                                            <Checkbox.CheckboxItem style={{height:"100%",width:"40px",paddingLeft:'9px'}}
                                             onChange={(e)=>{
                                                 this.singleChange(cartDataitem.goodsId)
                                                }} checked={cartDataitem.isSelect}/>
                                        </div>
                                        
                                        <div className="item-right"style={{display:"inline-flex"}}>
                                                 <img src={cartDataitem.goodsImg} style={{width:"32.8%", height:"29vw",padding:"4px 0"}} />
                                                 <ul style={{display:"Flex",flexDirection: 'column',justifyContent: 'space-between',padding:"3vw 3px 3px 3px"}}>
                                                 <li style={{display:"Flex",justifyContent: 'space-between'}}>
                                                     <div style={{overflow:"hidden" ,width:"54vw",height:"6.6vw",  textOverflow: "ellipsis",whiteSpace:"nowrap"}}>{cartDataitem.goodName}
                                                     
                                                     </div>
                                                     <div  style={{color:"red", position: "absolute",right: "7px"}}>
                                                         <DeleteOutlined onClick={this.handleDel.bind(this, cartDataitem.goodsId)} />
                                                    </div>
                                                </li>
                                                <li className="cart-goods-name">{cartDataitem.goodsName}</li>
                                                <li  style={{display:"flex",marginRight:"-16px",color:"red"}}>
                                                    <div style={{flexGrow:"3"}}>{"￥"}{cartDataitem.mallPrice}</div>
                                                    <div style={{flexGrow:"2"}}> 
                                                        <Stepper  style={{ width: '100%', minWidth: '100px' }}
                                                            showNumber
                                                            max={10}
                                                            min={1}
                                                            value={cartDataitem.num}
                                                            onChange={this.onChange.bind(this,cartDataitem.goodsId)}
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
           <Cartbottom 
                isAllSelect={this.state.isAllSelect} 
                allChange={this.allChange} 
                data={this.state} 
                isSelectClick={this.isSelectClick}
                cartList={this.state.cartData}
            />
            </div>)
    }
}
let mapStateToProps = state => {
    return state.cart
}

let mapDispatchTopProps = actios;

Cart = withLogin(Cart)
Cart = connect(mapStateToProps,mapDispatchTopProps)(Cart);
export default Cart;