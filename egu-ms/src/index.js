import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// 导入路由配置数据
import {mainRoute} from "./routes";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/admin" component={App}></Route>
      {
        mainRoute.map(item => {
          return <Route key={item.pathname} path={item.pathname} component={item.component} />
        })
      }
      <Redirect from="/" to="/admin" exact/>
      <Redirect to="/404"/>
    </Switch>
  </Router>,
  document.getElementById('root')
);
