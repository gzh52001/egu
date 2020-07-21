import React, { Component } from 'react'
import './style.scss'
import { LeftOutlined, EllipsisOutlined, HomeOutlined, AppstoreOutlined, UserOutlined, ShoppingCartOutlined, ShopOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';


import { Popover } from 'antd-mobile';
const Item = Popover.Item;
class Login extends Component {
    state = {
        visible: false,
        selected: '',
        bubbleList: [{
            id: 1,
            title: '首页',
            path: '/home',
            icon: <HomeOutlined style={{ fontSize: '13px', marginRight: '6px' }} />
        },
        {
            id: 1,
            title: '分类',
            path: '/category',
            icon: <AppstoreOutlined style={{ fontSize: '13px', marginRight: '6px' }} />
        },
        {
            id: 1,
            title: '宅配',
            path: '/mine',
            icon: <ShopOutlined style={{ fontSize: '13px', marginRight: '6px' }} />
        },
        {
            id: 1,
            title: '购物车',
            path: '/cart',
            icon: <ShoppingCartOutlined style={{ fontSize: '13px', marginRight: '6px' }} />
        },
        {
            id: 1,
            title: '我的',
            path: '/mine',
            icon: <UserOutlined style={{ fontSize: '13px', marginRight: '6px' }} />
        }
        ]
    };


    jumpRout(rout) {
        this.props.history.push(rout);
    }


    onSelect = (opt) => {  //选中触发方法
        this.setState({
            visible: false,
            /*  selected: opt.props.value, */
        });
        // this.props.history.push(opt.props.value);
       this.jumpRout(opt.props.value)
    };





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
                        <Popover mask //遮罩层开启
                            visible={this.state.visible}  //遮罩状态
                            overlay={[
                            bubbleList.map(item =>(<Item key={item.id} value={item.path} style={{ fontSize: '12px' }}> {item.icon} {item.title}</Item>),
                                )
                            ]}
                            align={{   //气泡位置
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [-23, 0],
                            }}
                            onSelect={this.onSelect}   //选中函数回调
                        >
                            <div style={{  //气泡框位置
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                <EllipsisOutlined style={{ fontSize: '26px', margin: '5px 0 0 -3px' }} />
                            </div>
                        </Popover>



















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