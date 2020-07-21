import React, { Component } from 'react'

import './style.scss'

import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import Pop from './../Bubble/bubble'

class Register extends Component {
    jumpRout(rout) {
        this.props.history.push(rout);
    }
    render() {
        return (
            <div className="register">

                {/* 头部 */}
                <header>
                    <div className='navLift' onClick={this.jumpRout.bind(this,'/login')}><LeftOutlined style={{ fontSize: '20px', margin: '8px 0 0 8px' }} /></div>
                    <div className='navTitle'>依谷注册</div>
                    <div className='navRight'>
                        <Pop />
                    </div>
                </header>

                {/* 输入区 */}
                <div className='login_box'>
                    <Form className="login-form">
                        <Form.Item >
                            <Input className='cardNumber' style={{ outline: 'medium', fontSize: '12px' }} placeholder="请输入手机号" />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" className="button">
                                下一步
                                </Button>
                        </Form.Item>
                    </Form>
                    <h4>遇到问题？请<a>联系客服</a></h4>
                </div>

            </div>
        )

    }
}
export default Register;