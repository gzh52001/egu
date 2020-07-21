import React, {Component} from 'react'
import Search from '@/components/Search';
import {ShoppingCartOutlined,ToTopOutlined} from '@ant-design/icons';
import homeApi from '@/api/home';
import './style.scss';

class NavListData extends Component {
    state = {
        bgImg: [],
        goodsListData: [],
        page:1,
        isBottom:false,
        isShowTop:false
    }

    // 回到顶部
     goToTop=()=>{
        window.scrollTo(0,0)
     }

    checkScroll= (tid,id)=>{
        window.onscroll=async ()=>{
          // 滚动条滚动时scrollTop 距顶部的距离
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          // clientHeight 可视区域的高度
          let clientHeight=document.documentElement.clientHeight || document.body.clientHeight;
          // scrollHeight 滚动条的总高度
          let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //   console.log('距顶部',scrollTop,'可视',clientHeight,'总高度',scrollHeight)

        if(window.scrollY >= 400){
            this.setState({isShowTop:true})
        }else{
            this.setState({isShowTop:false})
        }

          if(scrollTop + clientHeight >= scrollHeight-50 && !this.state.isBottom){
            //   console.log("bottom");
              // 发送请求
              this.setState({page:this.state.page+1,isBottom:true})
                // console.log(this.state.page,this.state.isBottom)
              let res = await homeApi.getDataListByIdAndPage(tid,id,this.state.page)
              if(res.state === 200){
                  this.setState({isBottom:false,goodsListData:[...this.state.goodsListData,...res.list]})
              }else{
                  console.log("没数据了")
              }
          }
      }
     
  }

    async componentDidMount() {

        let {id} = this.props;
        let res = [];
        let bgImg = [];
        if (id === 144) {
            bgImg = await homeApi.getBackgroundById(id)
            res = await homeApi.getDataListByIdAndPage('0200000000', id);
            this.checkScroll('0200000000', id)
        } else if (id === 145) {
            bgImg = await homeApi.getBackgroundById(id)
            res = await homeApi.getDataListByIdAndPage('0700000000', id);
            this.checkScroll('0700000000', id)
        } else if (id === 146) {
            bgImg = await homeApi.getBackgroundById(id)
            res = await homeApi.getDataListByIdAndPage('0100000000', id);
            this.checkScroll('0100000000', id)
        } else if (id === 147) {
            bgImg = await homeApi.getBackgroundById(id)
            res = await homeApi.getDataListByIdAndPage('0300000000', id);
            this.checkScroll('0300000000', id)
        } else if (id === 148) {
            bgImg = await homeApi.getBackgroundById(id)
            res = await homeApi.getDataListByIdAndPage('0400000000', id);
            this.checkScroll('0400000000', id)
        } else if (id === 149) {
            bgImg = await homeApi.getBackgroundById(id)
            res = await homeApi.getDataListByIdAndPage('0500000000', id);
            this.checkScroll('0500000000', id)
        } else if (id === 150) {
            bgImg = await homeApi.getBackgroundById(id)
            res = await homeApi.getDataListByIdAndPage('0600000000', id);
            this.checkScroll('0600000000', id)
        } else if (id === 151) {
            bgImg = await homeApi.getBackgroundById(id)
            res = await homeApi.getDataListByIdAndPage('0800000000', id);
            this.checkScroll('0800000000', id)
        } else if (id === 152) {
            bgImg = await homeApi.getBackgroundById(id)
            res = await homeApi.getDataListByIdAndPage('0900000000', id);
            this.checkScroll('0900000000', id)
        }

        this.setState({
            bgImg: bgImg.data,
            goodsListData: res.list,
        })
       
      
    }


    render() {
        let { goodsListData, bgImg,isShowTop } = this.state
        return (
            <div className="container">
                {/* <Search /> */}
                <div className="list" style={{backgroundImage:`url(${bgImg.bgImg2})`}}>
                    <div className="list-content">
                        {
                            goodsListData.map(item=>(
                                <div className="list-item" key={item.id}>
                                        <img src={item.icoImg} alt={item.goodsName} />
                                        <p className="item-goods-name">{item.goodsName}</p>
                                        <p className="item-goods-desc">{item.slogan?item.slogan:''}</p>
                                        {
                                            bgImg.id===151 || bgImg.id===152 ?
                                            <p className='consignment'>1-3天发货
                                            <i className="express">全国物流速递</i>
                                            </p>:
                                             <p className='self-support'>自营
                                             <i className="morrow">次日达</i>
                                             <i className="express">深圳平湖仓</i>
                                         </p>
                                        }
                                         
                                        <span className="item-goods-price">￥ {item.mallPrice}</span>
                                        <span className="item-goods-icon"><ShoppingCartOutlined style={{fontSize:24}} /></span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {
                    isShowTop?<div className="go-top" onClick={this.goToTop}>
                        <ToTopOutlined style={{fontSize:20,color:"#aaa"}} />
                    </div>:''
                }
            </div>
        )
    }
}
export default NavListData;