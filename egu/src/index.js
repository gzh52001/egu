import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,HashRouter} from 'react-router-dom'
import App from './App'
import 'antd/dist/antd.css';

// 样式
import "./stylesheet/main.scss";


const Route = process.env.NODE_ENV==="production" ? BrowserRouter : HashRouter;

ReactDOM.render(
    <Route>
        <App />
    </Route>,
    document.getElementById("app")
)