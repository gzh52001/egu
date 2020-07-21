let jwt = require('jsonwebtoken');

let secret = 'xiaoai';
function create(data) {
    // data: 加密的数据
    let token = jwt.sign({data},secret);
    return token;
  }


  module.exports ={
      create
  }