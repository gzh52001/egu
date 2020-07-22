import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,HashRouter} from 'react-router-dom'

import {Provider} from "react-redux";
import store from './store/store'

import App from './App'
import 'antd/dist/antd.css';

// 样式
import "./stylesheet/main.scss";



const Route = process.env.NODE_ENV==="production" ? BrowserRouter : HashRouter;





ReactDOM.render(
    <Provider store={store}>
    <Route>
        <App />
    </Route>
    </Provider>,
    document.getElementById("app")
)