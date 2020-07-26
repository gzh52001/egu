/* ------------弹框组件--------------- */

import React, { Component } from 'react'
import { Modal, Button, Form, Input, InputNumber,notification } from 'antd';
// import {withRouter} from 'react-router-dom'
import goodsApi from "@/api/goodsapi"

class Modals extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    goodsName:this.props.details.goodsName,
    param2:this.props.details.param2,
    retailPrice:this.props.details.retailPrice,
    num:this.props.details.num,
    goodsImg:this.props.details.goodsImg,
    id:this.props.details.id
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //点击确定按钮回调
  handleOk =async e => {
    let {goodsName,param2,retailPrice,num,goodsImg,id}=this.state
    console.log(goodsName,param2,retailPrice,num,goodsImg,id);
    let res =await goodsApi.editGoods(id,{goodsName,param2,retailPrice,num,goodsImg})
    if(res.flag){
      notification.open({
        message: '修改成功',
        description:
        "数据修改成功"
      });
      this.props.getData()
    }else{
      notification.open({
        message: '修改失败',
        description:
        "数据修改失败"
      });
    }
    console.log(res);

  this.setState({
    visible: false,
  });
  };

  //点击取消按钮回调
  handleCancel = e => {
    // console.log('取消为：',e);
    this.setState({
      visible: false,
    });
  };
 
  
  render() {
    return (
      <>
            <Button type="primary"  onClick={this.showModal} style={{ background: 'orange', border: 'none' }}>
              修改
            </Button>
            <Modal
              title="修改商品"
              visible={this.state.visible}
              onOk={this.handleOk}  //确认回调
              onCancel={this.handleCancel}  //取消回调
              cancelText="取消"
              okText="确定"   
              centered='true' //弹框居中
            >
          <Form
            name="basic"
            // onFinish={this.onFinish}
            preserve={false}
          >
            <Form.Item 
            label="名 称："
             name="goodsName"
             
              style={{ marginLeft: '24px' }}>
              <Input allowClear defaultValue={this.state.goodsName} onChange={e =>{
                this.setState({goodsName:e.target.value})
              }}></Input>
            </Form.Item>
           <Form.Item 
              label="描 述："
              name="param2"
              
               style={{ marginLeft: '24px' }}>
              <Input allowClear defaultValue={this.state.param2} onChange={e =>{
                this.setState({param2:e.target.value})
              }}></Input>
            </Form.Item>

            <Form.Item 
              label="价 格："  
              name="retailPrice"  
              
              style={{ marginLeft: '24px' }}>
              <Input allowClear defaultValue={this.state.retailPrice} onChange={e =>{
                this.setState({retailPrice:e.target.value})
              }}></Input>
            </Form.Item>

            <Form.Item 
             label="数 量："  
             name="num" 
             
             style={{ marginLeft: '24px' }}>
              <Input allowClear  defaultValue={this.state.num} onChange={e =>{
                this.setState({num:e.target.value})
              }}/>
            </Form.Item>

            <Form.Item 
              label="图 片："
              name="goodsImg"  
              
              style={{ marginLeft: '24px' }}>
              <Input allowClear defaultValue={this.state.goodsImg} onChange={e =>{
                this.setState({goodsImg:e.target.value})
              }}></Input>
            </Form.Item>
            
          </Form>
        </Modal>
      </>
    )
  }
}

export default Modals;