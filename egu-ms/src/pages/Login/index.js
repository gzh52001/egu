import React, { Component } from 'react'
import { Input, Space,Button  } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined } from '@ant-design/icons';

import "./css.scss"
export default class Login extends Component {
    loginToHome=()=>{

    }
    render() {
        return (
            <div className="login">
                <h1>依谷会员登录</h1>
                <Space direction="vertical">
                    <Input placeholder="username" prefix={<UserOutlined />} />
                    <Input.Password
                    placeholder="password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <Button type="primary" style={{width:80,height:40}} onClick={this.loginToHome}>登录</Button>
                 </Space>
            </div>
        )
    }
}
