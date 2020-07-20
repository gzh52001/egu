import React from 'react'

import "./style/InfoItem.scss";

export default function InfoItem(props) {
    let { title,content, contentStyle } = props.data;
    return (
        <div className="info-item">
            <div className="left">{title}</div>
            <div className="right">
                <div className="info" style={contentStyle}>{content}</div>
                {props.children}
            </div>
        </div>
    )
}
