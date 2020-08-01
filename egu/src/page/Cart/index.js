import React, { Component } from 'react'
import withLogin from '@/components/Hoc';
import Gyl from "@/components/getGuessYouLike"
import Top from "@/components/Top"
import Cartbottom from "./bottom"
import {DeleteOutlined} from '@ant-design/icons';
import { connect } from "react-redux";
import actios from "@/store/action/cart";
  
import {Checkbox,WingBlank,WhiteSpace, Stepper, Toast  } from 'antd-mobile';
import cartApi from '@/api/cart'
import "./css.scss"
import { addToCart } from "@/utils/addToCart";

import Pop from './../Bubble/bubble'
class Cart extends Component{
    state={
        cartData:[],
        isAllSelect:false,
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
        // 执行修改, 修改完成获取购物车数据、重新渲染
        this.update(data);
      }
   

    // 單選
    singleChange = (id) => {
        let data = {
            goodsId: id,
            userId:this.state.userId
        }
        let { cartData } = this.state;
        for(var i = 0; i < cartData.length; i++) {
            if(id == cartData[i].goodsId) {
                cartData[i].isSelect = !cartData[i].isSelect;
                data.isSelect = cartData[i].isSelect;
                // 发起请求修改数据,请求成功后再重新请求一次购物车数据
                cartApi.updateSelect(data).then((res) => {
                    this.getCartList();
                });
                break;
            }
        }
    }

    // 全选
    allChange = async () => {
        // let preState = this.state.cartData.every(item => item.isSelect);
        // let cartdata = [...this.state.cartData];
        // cartdata.forEach(item => {
        //     item.isSelect = !preState
        // })

        // this.setState({
        //     cartData:cartdata
        // }, () => {
        //     this.setState({
        //         isAllSelect:this.state.cartData.every(item => item.isSelect)
        //     })
        // })
        let { userId, isAllSelect:isSelect} = this.state;
        let data = {
            userId,
            isSelect:!isSelect
        }
        try {
            let res = await  cartApi.updateSelect(data);
            this.getCartList();
            if(!Number(res.code)) {
                console.log(res.msg);
            }
        } catch(err) {
            console.log(err);
        }
    }

    // 是否是点击加入购物车，因为加入购物车操作是在getGuessYouLike组件中
    // handleIsAddCart = (e) => {
    //     if(e.target.tagName == "svg" || e.target.tagName == "path") {
    //         this.getCartList(); // 获取最新购物车数据渲染
    //     }
    // }   
        
    // 异步请求------------
    // 获取列表数据
    getCartList = () =>{
       cartApi.getCartList(this.state.userId).then(res => {
           let { data } = res;
           this.setState({
               cartData:res.data,
                // 是否全选  res.code ? 购物车是否为空
               isAllSelect: res.code ? data.every(item => item.isSelect) : false
            })
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
                Toast.info("删除成功",1.5);
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
                                                     {cartDataitem.goodsName}
                                                     </div>
                                                     <div  style={{color:"red", position: "absolute",right: "7px"}}>
                                                         <DeleteOutlined onClick={this.handleDel.bind(this, cartDataitem.goodsId)} />
                                                    </div>
                                                </li>
                                                <li className="cart-goods-name"></li>
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
            <div onClick={this.handleIsAddCart} className="guess-you-like">
                <img src='http://m.egu365.com/img/guess_you_like.jpg'/>
                <Gyl getCartList={this.getCartList.bind(this)}/>
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