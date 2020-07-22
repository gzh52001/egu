import React, { Component } from 'react'
import './style.scss'
import { LeftOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import Pop from '../Bubble/bubble' //引入气泡组件

class Login extends Component {

    jumpRout(rout) {
        this.props.history.push(rout);
    }

    render() {
        const verification = {  //输入框验证
            required: '你还没有输入任何内容!',
        };

        let { bubbleList } = this.state;
        return (
            <div className='login'>
                {/* 头部 */}
                <header>
                    <div className='navLift' onClick={this.jumpRout.bind(this, '/mine')}><LeftOutlined style={{ fontSize: '20px', margin: '8px 0 0 8px' }} /></div>
                    <div className='navTitle'>用户登录</div>
                    <div className='navRight'>
                        {/* 使用气泡组件 */}
                        <Pop />
                    </div>
                </header>

                {/* 输入区 */}
                <div className='login_box'>
                    <Form className="login-form" validateMessages={verification}>
                        <Form.Item name={['']} rules={[{ required: true }]}>
                            <Input className='cardNumber' style={{ outline: 'medium' }} placeholder="请输入用户名/手机号/邮箱" />
                        </Form.Item>
                        <Form.Item name={['mima']} rules={[{ types: 'mima' }]}>
                            <Input className='cardPass' type="password" placeholder="请输入6位以上的密码" />
                        </Form.Item>
                        {/*  <Form.Item className='verification'>
                        <h4 style={{ fontSize: '9px', color: 'red' }}>* 请输入用户名/手机号/邮箱</h4>
                    </Form.Item> */}
                        <Form.Item>
                            <Button type="primary" className="button" htmlType="submit">
                                立即登录
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="logname">
                    <p className="b1" onClick={this.jumpRout.bind(this, '/register')}>手机快速注册</p>
                    <p className="b2">忘记密码</p>
                </div>
            </div>
        )
    }
}
export default Login;