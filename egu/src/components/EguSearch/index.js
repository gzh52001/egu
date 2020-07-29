import React from 'react'

import "./index.scss";
export default function EguSearch(props) {
    let { placeholder } = props;
    return (
        <div className="egu-search-wraper">
            <input className="egu-input" placeholder={placeholder} />
            <i className="icon-search iconfont search-icon"></i>
        </div>
    )
}
