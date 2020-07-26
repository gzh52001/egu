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

// 获取用户
function singerUserInfo(username){
    let url = '/user/searchuser/?username=' + username;
    return require.get(url);
}

// 修改性别
function editSex(id,sex){
    let url =`/user/editsex/${id}`
    return require.post(url,{sex});
}

// 修改生日
function editBirthday(id,birthday){
    let url =`/user/editbirthday/${id}`
    return require.post(url,{birthday});
}

// 修改用户名
function editUsername(id,username) {
    let url =`/user/editusername/${id}`
    return require.post(url,{username});
}

// 修改电话
function editTel(id,tel) {
    let url =`/user/edittel/${id}`
    return require.post(url,{tel});
}

export default {
    CheckNameIsExist,
    Register,
    Login,
    verifyToken,
    editSex,
    getAvatarById,
    editBirthday,
    singerUserInfo,
    editUsername,
    editTel
}