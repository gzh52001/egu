import React  from 'react'
import {  Checkbox, Flex } from 'antd-mobile';
import { Button } from 'antd';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
function Cartbottom() {
    
    return(
        <div className="bottom" style={{ width:"100%",height:"11.3vw",zIndex:"99",position: "fixed",bottom:"0",backgroundColor:'#fff'}}>
        <Flex justify="between"> 
               
                <AgreeItem inline style={{color:'red'}} onChange={() => console.log('1')}>
                    全选
                </AgreeItem>
                <div></div>
                <div></div>
                
                <div className="van-submit-bar__text" style={{fontSize:"13.1px"}}><span>合计：</span><span className="van-submit-bar__price" style={{fontSize:"16.87px",color:"red"}}>¥ 0.00</span></div>
               
                <Button type="primary" style={{width:"24.5vw",height:"11.3vw"}} danger>
                     去结算
                </Button>   
                
            </Flex>
        </div>
    )
}
export default Cartbottom;