import require from '@/utils/require';

// 获取数据列表
function getMenberData(){
    let url = '/user/alluser'
    return require.get(url);
}

// 查询信息
function getInfoById(username){
    let url =`user/searchuser?username=${username}`
    return require.get(url);
}

// 删除用户
function delUserById(id) {
    let url =`/user/del/${id}`;
    return require.delete(url);
}

// 分页
function getInfoByPageAndSize(page=1,size=5) {
    let url =`/user/userlist?page=${page}&size=${size}`;
    return require.get(url);
  }

export default {
    getMenberData,
    getInfoById,
    delUserById,
    getInfoByPageAndSize
}