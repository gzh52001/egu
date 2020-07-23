import React, { Component } from 'react'
import Pop from '@/page/Bubble/bubble'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './style.scss'
import { Button } from 'antd';

class User extends Component {
  state = {
    userList: [
      {
        id: 1,
        title: '用户名',
        details: '1234567'
      },
      {
        id: 2,
        title: '手机号',
        details: '13131312758'
      },
      {
        id: 3,
        title: '性 别',
        details: '保密'
      },
      {
        id: 4,
        title: '出生日期',
        details: '2020-07-07'
      },
    ]
  }

  jumpRout(rout) {
    this.props.history.push(rout);
  }

  render() {

    const { userList } = this.state;

    return (
      <div className='user'>

        {/* 头部 */}
        <header>
          <div className='navLift' onClick={this.jumpRout.bind(this, '/mine')}><LeftOutlined style={{ fontSize: '20px', margin: '8px 0 0 8px' }} /></div>
          <div className='navTitle'>个人信息</div>
          <div className='navRight'>
            <Pop />
          </div>
        </header>

        {/* 内容区 */}
        <div style={{width:'100%',height:'300px',background:'#fff'}}>
          <ul>
            <li style={{ height: '76px' }}>
              <p>
                <span style={{ lineHeight: '60px' }}>头 像</span>
                <img alt='' src='http://oss.egu365.com/upload/eb89dd61970d4521b807ce731dca8026.jpeg'></img>
              </p>
              <RightOutlined style={{ color: 'rgb(212, 211, 211)', marginTop: '20px' }} />
            </li>
            {
              userList.map(item => {
                return (
                  <li key={item.id}>
                    <p>
                      <span>{item.title}</span>
                      <span style={{ float: 'right' }}>{item.details}</span>
                    </p>
                    <RightOutlined style={{ color: 'rgb(212, 211, 211)', marginTop: '14px' }} />
                  </li>
                )
              })
            }
          </ul>
        </div>
        <Button style={{ background: 'rgb(241, 109, 20)', color: '#fff' }} className="button">
          退出登录
        </Button>
      </div>
    )
  }
}

export default User;