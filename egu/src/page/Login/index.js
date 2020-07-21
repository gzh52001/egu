import React,{Component} from 'react'

import './style.scss'

import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

class Login extends Component{

    jumpRout(rout){
        this.props.history.push(rout);
    }
    render(){
    return (
        <div className='login'>

            {/* 头部 */}
            <header>
                <div className='navLift' onClick={this.jumpRout.bind(this,'/mine')}><LeftOutlined style={{ fontSize: '20px', margin: '8px 0 0 8px' }} /></div>
                <div className='navTitle'>用户登录</div>
                <div className='navRight'><EllipsisOutlined style={{ fontSize: '26px', margin: '8px 0 0 14px' }} /></div>
            </header>

            {/* 输入区 */}
            <div className='login_box'>
                <Form className="login-form">
                    <Form.Item >
                        <Input className='cardNumber' style={{ outline: 'medium' }} placeholder="请输入用户名/手机号/邮箱" />
                    </Form.Item>
                    <Form.Item >
                        <Input className='cardPass' type="password" placeholder="请输入6位以上的密码" />
                    </Form.Item>
                    <Form.Item className='verification'>
                        <h4 style={{ fontSize: '9px', color: 'red' }}>* 请输入用户名/手机号/邮箱</h4>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="button">
                            立即登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="logname">
                <p className="b1" onClick={this.jumpRout.bind(this,'/register')}>手机快速注册</p>
                <p className="b2">忘记密码</p>
            </div>
        </div>
    )
    }
}
export default Login;