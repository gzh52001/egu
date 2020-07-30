import React, { Component } from 'react'
import { Layout, Menu ,Button } from 'antd';
import { withRouter } from "react-router-dom";

import { adminRoute } from "../../routes";

let menu = adminRoute.filter(item => item.isNav); // 返回是菜单项的路由配置
const { Header, Content, Sider, Footer } = Layout;

 class Frame extends Component {
    //  切换菜单
    handleMenuChange = (x) => {
        this.props.history.push(x.key); // MenuItem 的key属性绑定的是路由路径，而且根据key判断高亮
    }
    clearlocal=()=>{
        window.localStorage.removeItem('ms_username')
        window.localStorage.removeItem("ms_userId")
        window.localStorage.removeItem("ms_token")
        this.props.history.push('/login');
    }
    componentDidMount(){
    }
    render() {
        return (
            <>
        <Layout style={{height:'100vh',overflow:'hidden'}}>
            <Header className="header" style={{  display:"flex",  flexDirection: "row" ,justifyContent:"space-between" }}>
                <div> 
                    <h1 style={{color:"#fff"}}>
                   依谷后台管理系统
                    </h1>
                </div>
                <div style={{color:"#fff"}}>
                        {"欢迎   " }
                    <span  style={{color:"#1890ff"}}>{localStorage.ms_username} 
                    </span>
                    {"  管理员"}
                    <span>
                        <Button type="text" danger onClick={this.clearlocal}>
                            退出登录
                        </Button>
                    </span>
                </div>
                
            </Header>
            <Content>
                <Layout>
                    <Sider width={200} className="site-layout-background" height='100vh'>
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
                            height:'100vh',
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2020 Created by EGU</Footer>
        </Layout>
        </>
        )
    }
}

export default withRouter(Frame)