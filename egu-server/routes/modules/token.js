let jwt = require('jsonwebtoken');

let secret = 'xiaoai'; // 密钥 
function create(data) {
    // data: 加密的数据
    let token = jwt.sign({data},secret);
    return token;
  }

  function verify(token){
      let res; // 状态值
       try {
           let result = jwt.verify(token,secret)
        //    console.log('token校验',result);
           res = true; // 返回成功
       } catch (err) {
           res = false;
       }
       return res;
  }


  module.exports ={
      create,
      verify
  }