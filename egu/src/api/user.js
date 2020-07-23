import require from '@/utils/http'

//验证用户名是否存在
function CheckNameIsExist(username) {
    let url = '/user/checkname?username=' + username;
    return require.get(url)
}


// 注册
function Register(username, password) {
    let url = '/user/register';
    return require.post(url, {
        username,
        password
    })
}

//登录
function Login(username, password) {
    let url = '/user/login'
    return require.post(url, {
        username,
        password
    })
}

// 验证token
function verifyToken(token) {
    let url = '/user/verify'
    return require.post(url, {
        token
    })
}

// 获取头像
function getAvatarById(id) {
    let url = '/user/avatar/' + id;
    return require.get(url);
}


export default {
    CheckNameIsExist,
    Register,
    Login,
    verifyToken,
    getAvatarById
}