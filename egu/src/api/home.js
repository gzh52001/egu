import require from '@/utils/require'
import {
    reqAjax,
    pending,
    myId,
    cancel
} from '../api/myaxios'
//---

// reqAjax('get',"http://api.egu365.com/news/recommend/seats/143/goods",{},'123').then(res=>{
//     console.log(res);
// if(res.status == '200'){
//     console.log('没拦截');
// }else{
//     console.log('被拦截');
// }
// })
// myId.push('123')
// cancel('get_http://api.egu365.com/news/recommend/seats/143/goods','被拦截')

//----

let baseUrl = 'http://api.egu365.com';


function getDataByIdAndImage(id) {
    // 轮播id：136，menuid：136，泰国椰青id:138
    let url = baseUrl + `/news/recommend/seats/${id}/images`;
    // return require.get(url);
    return reqAjax('get', url)
}

function getDataByIdAndGoods(id) {
    // hotGoods:140
    let url = baseUrl + `/news/recommend/seats/${id}/goods`;
    // return require.get(url);
    return reqAjax('get', url)
}

function getDataByType(type) {
    let url = baseUrl + `/news/recommend/seats?type=${type}`;
    // return require.get(url)
    return reqAjax('get', url)
}

// 猜你喜欢列表
function getRecommendData(id) {
    let url = baseUrl + `/news/recommend/seats/${id}/goods?pageSize=6`
    // return require.get(url);
    return reqAjax('get', url)
}

// 背景图
function getBackgroundById(id) {
    let url = baseUrl + `/news/recommend/seats/${id}`
    // return require.get(url);
    return reqAjax('get', url)
}

// 获取数据列表
function getDataListByIdAndPage(tid, id, pageSize = 1) {
    let url = baseUrl + `/goods/list?tid=${tid}&sorts=hits+asc&seat=${id}&pageNo=${pageSize}`;
    // return require.get(url);
    return reqAjax('get', url)
}



export default {
    getDataByType,
    getDataByIdAndImage,
    getDataByIdAndGoods,
    getRecommendData,
    getBackgroundById,
    getDataListByIdAndPage,
}