import React from 'react'
import { Input  } from 'antd';

function Search(){
    return (
        <div style={{height:40,display:'flex',justifyContent:'center',alignItems:'center',position: "sticky",top:0,zIndex:888,width:'100%',background:'#fff'}}>
            <Input  placeholder="依谷扶贫"/>
        </div>
    )
}
export default Search;