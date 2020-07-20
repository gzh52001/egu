import React,{useState,useEffect,useCallback} from 'react'
import {ToTopOutlined} from '@ant-design/icons';
import './style.scss'

function GoTop(){

    let [isShow,changeState] = useState(false)
    
    useEffect(()=>{
            window.onscroll =()=>{
                // console.log('goTop',window.scrollY)
            if(window.scrollY >= 400){
                changeState(true)
            }else{
                changeState(false)
            }
          }
    },[]) // componentDidMount

    // 回到顶部
    const goToTop=useCallback(()=>{
        window.scrollTo(0,0)
    },[])

    return (
        isShow ?<div className="go-top" onClick={goToTop}>
            <ToTopOutlined style={{fontSize:20,color:"#aaa"}} />
        </div>:''
    )
}

export default GoTop;