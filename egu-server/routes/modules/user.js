const express = require('express')
const query = require('../../db/mysql');
const {create,verify} =  require('./token')

const router = express.Router();

// 验证用户是否存在
router.get('/checkname',async (req,res)=>{
    let {username} = req.query;
    try {
        let sql = `SELECT * FROM userInfo WHERE username='${username}'`
        let p = await query(sql);
        let info = {}
        if(p.length){
            // 用户名已存在 不能注册
            info = {
                code:3000,
                status:false,
                msg:'用户名已存在，不能注册'
            }
        }else{
            // 可以注册
            info = {
                code:2000,
                status:true,
                msg:'可以注册'
            }
        }
        res.send(info);
    } catch (err) {
        let info ={
            code:err.errno,
            status:false,
            msg:'查询失败'
        }
        res.send(info);
    }
})

// 注册
router.post('/register',async (req,res)=>{
    let {username,password} = req.body;
    try {
        let sql = `INSERT into userinfo(username,password) VALUES('${username}','${password}')`
        let p = await query(sql)
        let info ={}
        if(p.affectedRows){
            // 插入成功
            info = {
                code:2000,
                status:true,
                msg:'注册成功'
            }
        }else{
            info = {
                code:3000,
                status:false,
                msg:'注册失败，请重试'
            }
        }
        res.send(info);
    } catch (err) {
        let info = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(info);
    }
})

// 登录
router.post('/login',async (req,res) =>{
    let {username,password} = req.body;
    try {
        let sql =`SELECT * FROM userinfo WHERE username = '${username}' AND password ='${password}'`;
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

// 获取所有用户
router.get('/alluser',async (req,res)=>{
    try {
        let sql = 'SELECT * FROM userinfo ';
        let data =await query(sql);
        let info = {};
        if(data.length){
            info ={
                code:2000,
                status:true,
                data,
                msg:'查询成功'
            }
        }else{
            info ={
                code:3000,
                status:false,
                msg:'查询失败'
            }  
        }
        res.send(info);
    } catch (err) {
        let info = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(info);
    }
})

// 删除用户
router.delete('/del/:id', async (req,res)=>{
    let {id} = req.params;
    let sql = `DELETE FROM userinfo WHERE id=${id}`;
    try {
        let p = await query(sql);
        let info ={}
        if(p.affectedRows){
            // 删除成功
             info={
                code:2000,
                    status:true,
                    msg:'删除成功' 
             }
        }else{
            info={
                code:3000,
                status:false,
                msg:'删除失败'
            }
        }
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

// 查询用户
router.get('/searchuser/:id',async (req,res)=>{
    let {id} = req.params;
    let {username} = req.query;
    let sql = `SELECT * FROM userinfo WHERE id='${id}' OR username='${username}'`
    try {
        let data = await query(sql);
        let info={};
        if(data.length){
            info={
                code:2000,
                status:true,
                data,
                msg:'查询成功' 
             }
        }else{
            info={
                code:3000,
                status:false,
                msg:'查询失败' 
             }
        }
        res.send(info);
    } catch (err) {
        let info = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(info);
    }
})


// 分页查询 查询用户列表
router.get('/userlist',async (req,res)=>{
    let {page,size} = req.query;
    page = page || 1;
    size = size || 5;
    let index = (page - 1) * size; // 当前第几页
    let sql = `SELECT * FROM userinfo LIMIT ${index}, ${size} `;
    let sql1 = `SELECT * FROM userinfo`; // 总数据列表
    try {
        let data = await query(sql);
        let total = await query(sql1);
        let info={};
        if(data.length){
            info={
                code:2000,
                status:true,
                data,
                total:total.length,
                page,
                size,
                msg:'查询成功' 
             }
        }else{
            info={
                code:3000,
                status:false,
                msg:'暂无数据' 
             }
        }
        res.send(info);
    } catch (err) {
        let info = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(info);
    }
})


module.exports = router;