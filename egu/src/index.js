import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,HashRouter} from 'react-router-dom'

import {Provider} from "react-redux";

import App from './App'
import 'antd/dist/antd.css';

// 样式
import "./stylesheet/main.scss";

import { createStore } from 'redux';


const Route = process.env.NODE_ENV==="production" ? BrowserRouter : HashRouter;
const reducer =function(state,action){
    return console.log("新数据");
}
const store = createStore(reducer)
ReactDOM.render(
    <Provider store={store}>
    <Route>
        <App />
    </Route>
    </Provider>,
    document.getElementById("app")
)