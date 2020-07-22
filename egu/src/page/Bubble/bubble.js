/*  气泡组件  */

import React, { Component } from 'react'
import { Popover } from 'antd-mobile';
import { EllipsisOutlined } from '@ant-design/icons'
import bubbleList from './data'
import { withRouter } from 'react-router-dom'


const Item = Popover.Item;

class Pop extends Component {
  state = {
    visible: false,  //遮罩层默认不触发
    bubbleList
  }
  onSelect = (opt) => {  //选中触发方法
    this.setState({
      visible: false,  //遮罩层状态
    });
    this.props.history.push(opt.props.value);  //路由方法
  };
  render() {

    let { bubbleList } = this.state;

    return (
      <Popover
        mask //遮罩层开启
        visible={this.state.visible}  //遮罩状态
        overlay={[
          bubbleList.map(item => (<Item key={item.id} value={item.path} style={{ fontSize: '12px' }}> {item.icon} {item.title}</Item>)
          )
        ]}
        align={{   //气泡位置
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [-23, 0],
        }}
        onSelect={this.onSelect}   //选中时的函数回调
      >
        <div style={{  //气泡框位置
          height: '100%',
          padding: '0 15px',
          marginRight: '-15px',
          display: 'flex',
          alignItems: 'center',
        }}
        >
          {/* 气泡菜单按钮 */}
          <EllipsisOutlined style={{ fontSize: '26px', margin: '5px 0 0 -3px' }} />
        </div>
      </Popover>
    )
  }
}
export default withRouter(Pop);