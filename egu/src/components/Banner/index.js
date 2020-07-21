import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import homeApi from '@/api/home.js'
class Banner extends Component{
    state={
        banner:[],
        imgHeight:176
    }

     // 获取轮播 id：135
    async getBanners(){
        let res = await homeApi.getDataByIdAndImage(135);
        let arr = [];
        res.data.forEach(item => {
            let {id,img,link} = item;
            let obj={};
            obj.id=id;
            obj.img=img;
            obj.link=link;
            arr.push(obj);
        });
        this.setState({banner:arr});
    }
    componentDidMount(){
        this.getBanners();
    }
    render(){
        let {banner} = this.state;
        return (
            <div>
                <Carousel
                    autoplay={true}
                    infinite
                    >
                    {banner.map(item => (
                        <a
                        key={item.id}
                        // href={item.link}
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        // onClick={()=>{return false;}}
                        >
                        <img
                            src={item.img}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                    </Carousel>
            </div>
        )

    }
}

export default Banner;