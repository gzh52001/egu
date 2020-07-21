import axios, {CancelToken} from 'axios';
let pending = {}
// 对axios进行二次封装
const require = axios.create({
    // 根据不同环境设置 baseURL, 最终发送请求时的URL为: baseURL + 发送请求时写URL ,
    baseURL: 'http://api.egu365.com',
    //   timeout: 5000, // 请求超时
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    withCredentials: true,
});
let myId = []
const reqAjax = async function (method, url, data = {}, uid = '', config = {}) {
    if (method === 'get' || method === 'delete') {
        config.params = data
        data = null;
    }
    config.myId = uid
    return await require({
        method,
        url,
        data: {
            ...data
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        ...config,
        cancelToken: new CancelToken(c => {
            pending[`${method}_${url}`] = c;
        })

    })
}

function cancel(key, msg = 'Cancel request by user!') {
    if (typeof pending[key] === 'function') {
        pending[key](msg);
        delete pending[key];
    }
}

// 响应拦截
require.interceptors.response.use(response => {
    // if(myId.some(data=>response.config.myId == data)){
    //     if(response.config.myId == '123'){
    //         console.log(response);
    //         response.status = '300'
    //          return response
    //     } 
    // }
    return response.data;
}, error => {
    return Promise.reject(error);
})
export {
    reqAjax,
    pending,
    myId,
    cancel
}