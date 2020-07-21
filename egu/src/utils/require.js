import axios from 'axios';

// 对axios进行二次封装
const require = axios.create({
  // 根据不同环境设置 baseURL, 最终发送请求时的URL为: baseURL + 发送请求时写URL ,
  baseURL: 'http://api.egu365.com',
  timeout: 5000, // 请求超时
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});


// 请求拦截器 
require.interceptors.request.use(config => {
  return config;
}, error => {
  // 出现异常
  return Promise.reject(error);
})
// 响应拦截器
require.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.reject(error);
})


// 导出对象
export default require;