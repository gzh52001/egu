/* ------------弹框组件--------------- */

import React, { Component } from 'react'
import { Modal, Button, Form, Input, InputNumber } from 'antd';
// import {withRouter} from 'react-router-dom'

class Modals extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //点击确定按钮回调
  handleOk = e => {
    this.setState({
      visible: false,
    });
    
  };
  inputChange(e){
    alert(e.target.value)
    
  }

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
        <Button type="primary" onClick={this.showModal} style={{ background: 'orange', border: 'none' }}>
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
          <Form>
            {/* 
              defaultValue：  input框默认值
              this.props: 获取父组件传过来的参数
            */}
            <Form.Item label="商品名称：" >
              <Input allowClear defaultValue={this.props.details.name} onChange={(e)=>this.inputChange(e)}></Input>
            </Form.Item>
            <Form.Item label="数 量：">
              <InputNumber  defaultValue={this.props.details.age}  min={1} style={{ marginLeft: '24px' }}/>
            </Form.Item>
            <Form.Item label="商 家：" >
              <Input allowClear defaultValue={this.props.details.business}style={{ marginLeft: '24px' }}></Input>
            </Form.Item>
            <Form.Item label="产 地：" >
              <Input allowClear defaultValue={this.props.details.address} style={{ marginLeft: '24px' }}></Input>
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }
}

export default Modals;