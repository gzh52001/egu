import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

export default class Frame extends Component {
    render() {
        return (
        <Layout>
            <Header className="header">
                <div>
                    logo
                </div>
            </Header>
            <Content>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1">首页</Menu.Item>
                            <Menu.Item key="2">商品管理</Menu.Item>
                            <Menu.Item key="3">会员管理</Menu.Item>
                            <Menu.Item key="4">购物车管理</Menu.Item>
                        </Menu>
                    </Sider>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 500,
                        }}
                    >

                        Content
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2018 Created by EGU</Footer>
        </Layout>
        )
    }
}
