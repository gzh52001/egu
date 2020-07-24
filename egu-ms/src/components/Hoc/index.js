import React from 'react'
import Login from '@/pages/Login';


// 反向继承 拦截
function withLogin(InnerCompoent) {
    class OuterComponent extends InnerCompoent{
        constructor(){
            super();
            if(!this.state) this.state ={};
            this.state.login = false;  // 未登录
        }

        componentDidMount(){
            let token = localStorage.getItem('ms_token');
            let username = localStorage.getItem('ms_username');
            // console.log(token,username)
            if(token && username){
                this.setState({login:true})
            }else{
                this.setState({login:false})
            }

            // 继承父组件
            // super.componentDidMount();
        }

        render() {
            const {login} = this.state;
           if(login){
               return super.render();
           }else{
               return <Login />
           }
        }
    }
    return OuterComponent;
  }

  export default withLogin;