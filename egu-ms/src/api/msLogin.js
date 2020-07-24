import require from './http'


//登录
function Login(username, password) {
    let url = '/admin/login'
    return require.post(url, {
        username,
        password
    })
}

// 验证token
function verifyToken(token) {
    let url = '/admin/verify'
    return require.post(url, {
        token
    })
}


export default {
    Login,
    verifyToken,
   
}