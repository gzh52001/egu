const express = require('express')
const query = require('../../db/mysql');
const {create,verify} =  require('./token')

const router = express.Router();

// 登录
router.post('/login',async (req,res) =>{
    // let {username,password} = req.body;
    console.log(username,password);
    try {
        let sql =`SELECT * FROM msuserinfo WHERE username = '${username}' AND password ='${password}'`;
        let p = await query(sql);
        // console.log(p[0].id)
        let info ={};
        let token=''
        if(p.length){
            token = create(password);
            info ={
                code:2000,
                status:true,
                data:{
                    token,
                    userId:p[0].id
                },
                msg:'登录成功'
            }
        }else{
            info ={
                code:3000,
                status:false,
                msg:'登录失败'
            }
        }
        // console.log('user',token)
        res.send(info)
    } catch (err) {
        let info = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(info);
    }
})

// 验证token
router.post('/verify',(req,res)=>{
    let {token} = req.body;
    let result = verify(token);
    // console.log(result)
    let info = {};
        if(result){
            info = {
                code:2000,
                status:true,
                msg:'验证成功'
            }
        }else{
            info = {
                code:3000,
                status:false,
                msg:'验证失败'
            }
        }
        res.send(info);
})

module.exports = router;