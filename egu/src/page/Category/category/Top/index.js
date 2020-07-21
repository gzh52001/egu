import React, { Component } from 'react'

import { SearchBar, Icon } from 'antd-mobile';
import "./index.scss";
import Pop from './../../../Bubble/bubble'

export default class Top extends Component {
    constructor(){
        super();
        this.state = {
            value: ""
        }
    }
    render() {
        return (
            <div className="top-search">
                <div className="left">
                 <Icon type="left" />
                </div>
                <div className="center">
                    <SearchBar
                        value={this.state.value}
                        placeholder="Search"
                        showCancelButton
                        cancelText=" "
                    />
                </div>
                <div className="right">
                   {/*  <Icon type="ellipsis" /> */}
                   <Pop />
                </div>
            </div>
        )
    }
}
