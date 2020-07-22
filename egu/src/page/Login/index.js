
import React, {Component} from 'react'
import { withRouter} from 'react-router-dom'
import {Form,Input,Button} from 'antd';
import {LeftOutlined,EllipsisOutlined} from '@ant-design/icons';
import {Toast} from 'antd-mobile';
import userApi from '@/api/user'

import Pop from './../Bubble/bubble'
import './style.scss'
import { LeftOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import Pop from '../Bubble/bubble' //引入气泡组件

class Login extends Component {

    jumpRout(rout) {
        this.props.history.push(rout);
    }

    goBack = () => {
        this.props.history.push('/mine');
    }

    onFinish = async (value) => {
        let { username, password } = value;
        let res = await userApi.Login(username, password)
        // console.log(res)
        if (res.status) {
            // 验证token
            let result = await userApi.verifyToken(res.data.token);
            if (result.status) {
                // 验证成功 存token
                localStorage.setItem('egu_token', res.data.token);
                localStorage.setItem('egu_username', username);
                localStorage.setItem('egu_userId', res.data.userId);
                Toast.info('登录成功')
                this.props.history.push('/mine');
            }else{
                Toast.info('token异常，请重试')
            }
        } else {
            Toast.info('账号或密码错误')
        }
    }
    render(){
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
    }
       
    }

export default Login;