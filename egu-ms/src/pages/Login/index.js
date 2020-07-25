import React, { Component } from 'react'
import { Form, Input, Button, notification} from 'antd';
import {withRouter} from 'react-router-dom'
import msuserApi from '../../api/msLogin'

import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined } from '@ant-design/icons';

import "./css.scss" 
class Login extends Component {

  
    onFinish = async (value) => {
        let { username, password } = value;
        let res = await msuserApi.Login(username, password)
        // console.log(res)    
        if (res.status) {
            // 验证token
            let result = await msuserApi.verifyToken(res.data.token);
            if (result.status) {
                // 验证成功 存token
                localStorage.setItem('ms_token', res.data.token);
                localStorage.setItem('ms_username', username);
                localStorage.setItem('ms_userId', res.data.userId);
                // console.log(this.props);
                this.props.history.push('/admin/home')
               window.location.reload();

                notification.open({
                    message: '登录成功',
                    description:
                    "欢迎进入依谷管理系统"
                  });

            }else{
                notification.open({
                    message: '登录失败',
                    description:
                    "token异常，请重试"
            
                  });
            }
        } else {
            notification.open({
                message: '登录失败',
                description:
                "账号或密码错误"
              });
        }
        this.forceUpdate()
    }


    render() {
        console.log(this.props);
        return (
            <div className="login">
                <h1>依谷会员登录</h1>
                <Form name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空' }]}
                    >
                        <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                    { required: true, message: '密码不能为空' },{max:10,min:6,message:'密码长度在6-15之间'}
                        ]}
                    >
                    <Input.Password 
                    placeholder="请输入6位以上的密码"
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit"style={{width:80,height:40}}>
                        登录
                        </Button>
                    </Form.Item>
                    </Form>
               
            </div>
        )
    }
}

export default withRouter(Login);   
// export default Login;