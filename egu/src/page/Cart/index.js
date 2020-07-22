import React, { Component } from 'react'
import Gyl from "@/components/getGuessYouLike"
import Top from "@/components/Top"
import Cartbottom from "./bottom"
import withLogin from '@/components/Hoc';
import "./css.scss"

class Cart extends Component{
    goback=()=>{
        const {history}= this.props;
        console.log(history);
        history.push("/category")
    }
    componentDidMount(){}
    
    render() {
        console.log(this.state)
        return (<div className="cart">
             {/* top */}
             <Top 
                    left = {<i className="iconfont icon-zuojiantou" onClick={this.goback}></i>}
                    right = {<i className="iconfont icon-gengduo"></i>}
                    center = {{
                        contentStyle:{fontWeight:600,}
                    }}
                >
                   <span style={{fontSize:"17.25px"}}>购物车</span>
                </Top>
                <div className="content " >
                     <div className="van-list">
                {/* 判断渲染 */}
                <div className="not-exist">
                    <img src="http://m.egu365.com/img/cart.svg"  width="25%"/>
                    <br/>
                    <button>去逛逛</button>
                </div>
            </div>
            {/* 猜你喜欢 */}
            <div className="guess-you-like">
                <img src='http://m.egu365.com/img/guess_you_like.jpg'/>
                 <Gyl/>
                 </div>
              </div>
           <Cartbottom/>
                </div>)
    }
}
Cart = withLogin(Cart)
export default Cart;