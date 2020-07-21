import React  from 'react'
import {  Checkbox, Flex } from 'antd-mobile';
import { Button } from 'antd';

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
let pitch=false ;
class Cartbottom extends React.Component{
    constructor() {
        super();
        this.state = {
            isSelect: false
        }
    }
    // console.log(props);
   state={
                yon:true,
            }
            // let pitch= props.data.cartData.every(item=>item.isSelect)
    
    allSelect = () => {
        this.props.allChange()
    }
           
    render(){
        let {yon,click} = this.state
        // 控制全選
        let { isAllSelect } = this.props;
        return(
            <div className="bottom" style={{ width:"100%",height:"11.3vw",zIndex:"99",position: "fixed",bottom:"0",backgroundColor:'#fff'}}>
            <Flex justify="between"> 
                   
                    <AgreeItem inline style={{color:'red'}} checked={isAllSelect}
                        onClick={this.allSelect}
                        >
                        全选
                    </AgreeItem>    
    
                    
                    <div className="van-submit-bar__text" style={{fontSize:"13.1px"}}><span>合计：</span><span className="van-submit-bar__price" style={{fontSize:"16.87px",color:"red"}}>¥ 0.00</span></div>
                   
                    <Button type="primary" style={{width:"24.5vw",height:"11.3vw"}} danger>
                         去结算
                    </Button>   
                    
                </Flex>
            </div>
        )
    }
}
export default Cartbottom;