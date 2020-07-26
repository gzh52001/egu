/* ------------弹框组件--------------- */

import React, { Component } from 'react'
import { Modal, Button, Form, Input, InputNumber,notification } from 'antd';
// import {withRouter} from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons';
import goodsApi from "@/api/goodsapi"
class Modals extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    goodsId:"",
    goodsName:"",
    param2:"",
    retailPrice:"",
    num:"",
    goodsImg:"",
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  
  //点击确定按钮回调
  handleOk =async e => {
    let {goodsName,param2,retailPrice,num,goodsImg,goodsId}=this.state
    console.log(goodsName,param2,retailPrice,num,goodsImg,goodsId);
    let res =await goodsApi.addGoods({goodsId,goodsName,param2,retailPrice,goodsImg,num})
    if(res.flag){
      notification.open({
        message: '添加成功',
        description:
        "数据添加成功"
      });
      this.props.getData()
    }else{
      notification.open({
        message: '添加失败',
        description:
        "数据添加失败"
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
            <Button type="primary" style={{marginLeft:10}} icon={<SearchOutlined /> } onClick={()=>{this.setState({visible:true})}}>
                添加
            </Button>
            <Modal
              title="添加商品"
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
            label="商品id："
             name="goodsId"
             
              style={{ marginLeft: '24px' }}>
              <Input allowClear defaultValue={this.state.goodsId} onChange={e =>{
                this.setState({goodsId:e.target.value})
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