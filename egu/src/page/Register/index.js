import React, {
    Component,
    useState
} from 'react'
import {
    Form,
    Input,
    Button,
    message
} from 'antd';
import { LeftOutlined,EllipsisOutlined} from '@ant-design/icons';
import {Toast} from 'antd-mobile';
import Pop from './../Bubble/bubble'
import userApi from '@/api/user';
import './style.scss'


function Register(props) {
    const [flag, changeFlage] = useState(true)
    const [form] = Form.useForm();
    const jumpRout = () => {
        props.history.push('/login');
    }
    const onFinish = async (values) => {
        let {
            username,
            password
        } = values
        if (username && password) {
            // 注册
            let res = await userApi.Register(username, password);
            if (res.status) {
                Toast.info(res.msg);
                form.resetFields(); // 清空输入框内容
                props.history.push('/login');
            }
        }
    }

    const CheckName = async (e) => {
        let res = await userApi.CheckNameIsExist(e.currentTarget.value);
        if (res.status) {
            changeFlage(true)
        } else {
            changeFlage(false)
        }
        //检验
        form.validateFields(['username']);
    }

    return (
        <div className="register">
            {/* 头部 */}
            <header>
                <div className='navLift' onClick={jumpRout}><LeftOutlined style={{ fontSize: '20px', margin: '8px 0 0 8px' }} /></div>
                <div className='navTitle'>依谷注册</div>
                <div className='navRight'>
                    {/* <EllipsisOutlined style={{ fontSize: '26px', margin: '8px 0 0 14px' }} /> */}
                    <Pop />
                </div>
            </header>

            {/* 输入区 */}
            <div className='login_box'>
            <Form className="login-form" form={form} onFinish = {onFinish}>
            <Form.Item
            name="username"
            rules={[
                { required: true, message: '用户名不能为空' },
                {validator: (rule,value)=>{
                    if(flag){
                        return Promise.resolve();
                    }
                    return Promise.reject('用户名已存在');
                }}
            ]}
            style = {{height:44}}
            >
                <Input className='cardNumber' placeholder="请输入账号" onBlur = {CheckName} />
            </Form.Item>

            <Form.Item
            name="password"
            rules={[
                { required: true, message: '密码不能为空' },
                { max:10, min:6, message:'密码长度在6-15之间'}
                ]}
            style = {{height:44}}
            >
                <Input.Password className='cardNumber' placeholder="请输入密码" />
            </Form.Item>
            <br />
            <Form.Item >
                <Button type="primary" className="button"  htmlType="submit"> 
                    注册
                </Button>
            </Form.Item>
            </Form>
            </div>
        </div>
    )

}

export default Register;
