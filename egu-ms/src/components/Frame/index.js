import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { withRouter } from "react-router-dom";

import { adminRoute } from "../../routes";

let menu = adminRoute.filter(item => item.isNav); // 返回是菜单项的路由配置
console.log(menu);
const { Header, Content, Sider, Footer } = Layout;

 class Frame extends Component {
    //  切换菜单
    handleMenuChange = (x) => {
        this.props.history.push(x.key); // MenuItem 的key属性绑定的是路由路径，而且根据key判断高亮
    }
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
                            defaultSelectedKeys={menu[0].pathname}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={this.handleMenuChange}
                        >
                            {
                                menu.map(item => {
                                return <Menu.Item key={item.pathname}>{item.title}</Menu.Item>
                                })
                            }
                            
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

                        {this.props.children}
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2018 Created by EGU</Footer>
        </Layout>
        )
    }
}

export default withRouter(Frame)