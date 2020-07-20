import React from 'react'

import "./style/InfoList.scss";

export default function InfoList(props) {
    return (
        <div className="info-list">
            {props.children}
        </div>
    )
}
