import React, { Component } from 'react'

import "./index.scss";
export default class index extends Component {
    render() {
        let { left, right, center, containerStyle } = this.props; 
        return (
            <div className="app-top" style={containerStyle}>
                <div className="top-left">
                     { left } {/* 具名插槽 */}
                </div>
                <div className="top-center" style={center ? center.contentStyle : {}}>
                     {this.props.children} {/* 匿名插槽 */}
                </div>
                <div className="top-right">
                     {right}
                </div>
            </div>
        )
    }
}
