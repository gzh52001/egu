import React, { Component } from 'react'

import './style.scss';

import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import Pop from './../Bubble/bubble'


class Card extends Component {
    state = {
        list: [
            {
                id: 1,
                details: '卡券不能兑换现金，激活后将自动绑定持卡人依谷账户，请在有效期内使用；'
            }, {
                id: 2,
                details: '卡券密码及兑换二维码均为兑换有效凭证，且仅可使用一次，不挂失，请妥善保管；'
            }, {
                id: 3,
                details: '多选一礼品卡兑换后即生成配送订单，无法更换兑换内容，请谨慎选择；'
            }
        ]
    }
    jumpRout(rout) {
        this.props.history.push(rout);
    }
    render() {
        const { list } = this.state;
        return (
            <div className='card'>

                {/* 头部 */}
                <header>
                    <div className='navLift' onClick={this.jumpRout.bind(this, '/mine')}><LeftOutlined style={{ fontSize: '20px', margin: '8px 0 0 8px' }} /></div>
                    <div className='navTitle'>卡券兑换</div>
                    <div className='navRight'>
                        <Pop />
                    </div>
                </header>

                {/* 内容区 */}
                <content>
                    {/* 输入区 */}
                    <div className='login_box'>
                        <Form className="login-form">
                            <Form.Item >
                                <Input className='cardNumber' style={{ outline: 'medium' }} placeholder="请输入卡号" />
                            </Form.Item>
                            <Form.Item >
                                <Input className='cardPass' type="password" placeholder="请输入卡密码" />
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" className="button">
                                    去兑换
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    {/* 提示区 */}
                    <div className='tips'>
                        <ul>
                            <p style={{ display: 'block', color: 'red', fontSize: '13px', marginBottom: '6px' }}>温馨提示：</p>
                            {
                                list.map(item => {
                                    return (
                                        <li key={item.id}>
                                            <span>{item.id}.</span>
                                            <p>{item.details}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                </content>
            </div>
        )
    }
}

export default Card;