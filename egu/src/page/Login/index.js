
import React, {Component} from 'react'
import { withRouter} from 'react-router-dom'
import {Form,Input,Button} from 'antd';
import {LeftOutlined,EllipsisOutlined} from '@ant-design/icons';
import {Toast} from 'antd-mobile';
import userApi from '@/api/user'
import {connect} from 'react-redux'
import Pop from './../Bubble/bubble'
import './style.scss'

class Login extends Component {

    goReg = () => {
        this.props.history.push('/register');

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
                Toast.info('登录成功',1)
                this.props.history.push('/mine');
            }else{
                Toast.info('token异常，请重试',1)
            }
        } else {
            Toast.info('账号或密码错误',1)
        }
    }


    render(){
        return (
            <div className='login'>

                {/* 头部 */}
                <header>
                    <div className='navLift' onClick={this.goBack}><LeftOutlined style={{ fontSize: '20px', margin: '8px 0 0 8px' }} /></div>
                    <div className='navTitle'>用户登录</div>
                    <div className='navRight'>
                        {/* <EllipsisOutlined style={{ fontSize: '26px', margin: '8px 0 0 14px' }} /> */}
                        <Pop />
                    </div>

                </header>

                {/* 输入区 */}
                <div className='login_box'>
                    <Form className="login-form" onFinish = {this.onFinish}>
                        <Form.Item
                         name="username"
                         rules={[{ required: true, message: '用户名不能为空' }]}
                         style = {{height:44}}
                        >
                            <Input 
                            className='cardNumber' 
                            style={{ outline: 'medium' }} 
                            placeholder="请输入用户名"  
                            />
                        </Form.Item>
                        <Form.Item
                         name="password"
                         rules={[
                            { required: true, message: '密码不能为空' },
                            {max:10,min:6,message:'密码长度在6-15之间'}]}
                         style = {{height:44}}
                        >
                            <Input.Password className='cardPass'  placeholder="请输入6位以上的密码" />
                        </Form.Item>
                        <div className="logname">
                            <span className="b1" onClick={this.goReg}>点击注册</span>
                        </div>
                        <Form.Item style={{marginTop:9}}>
                            <Button type="primary" className="button" htmlType="submit">
                                立即登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);

// export default connect((state=>{
//     console.log(state)
//     return{}
// }),(dispatch)=>{
//     return {
//         async onFinish(value){
//             let { username, password } = value;
//             console.log(username,password)
//             let res = await userApi.Login(username, password)
//             // console.log(res)
//             if (res.status) {
//                 // 验证token
//                 let result = await userApi.verifyToken(res.data.token);
//                 if (result.status) {
//                     // 验证成功 存token
//                     // localStorage.setItem('egu_token', res.data.token);
//                     // localStorage.setItem('egu_username', username);
//                     // localStorage.setItem('egu_userId', res.data.userId);
//                     dispatch('login',{
//                         egu_token:res.data.token,
//                         egu_username:username,
//                         egu_userId:res.data.userId
//                     })
//                     Toast.info('登录成功')
//                     this.props.history.push('/mine');
//                 }else{
//                     Toast.info('token异常，请重试')
//                 }
//             } else {
//                 Toast.info('账号或密码错误')
//             }
//         }
//     }
// })(withRouter(Login));