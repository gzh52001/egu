const express = require("express");
const query = require("../../db/mysql"); // 导入执行sql语句模块

const router = express.Router();

//查询全部商品数据
router.get('/goodslist',async(req,res)=>{
    try {
        let sql ='SELECT * FROM goodslist';
        let data = await query(sql)
        // console.log(data);
        let info ={};
        if(data.length){
            info ={
                code:2000,
                flag:true,
                data,
                msg:'查询成功'
            }
        }else{
            info ={
                code:3000,
                flag:false,
                msg:'查询失败'
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


//需求：修改信息 UPDATE userinf SET name='许仙',psw='222222' WHERE uid=24
router.put('/editgoods/:id', async (req, res) => {
    let obj = req.body; //{name:'小青',psw:'66778'}
    let str = '';
    //拼接出sql语句想要的结构
    for (let key in obj) {
        str += key + '=' + `'${obj[key]}'` + ','
    }
    str = str.slice(0, -1);
    // console.log(str);
    let {id} = req.params;//获取uid
    try {
        let sql = `UPDATE goodslist SET ${str} WHERE id=${id}`;
        let p = await query(sql);//[{},{}]
        // console.log(p);
        let inf = {};
        if (p.affectedRows) {
            //修改成功
            inf = {
                code: 2000,
                flag: true,
                message: '修改成功'
            }
        } else {
            //修改失败
            inf = {
                code: 3000,
                flag: false,
                message: '修改失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

// 添加
router.post('/addgoods',async(req,res)=>{
    let keys = Object.keys(req.body);
    let { goodsId, goodsName, param2, retailPrice, goodsImg, num} = req.body;
    // sql语句
    try {
        let sql = `INSERT INTO goodslist (${keys.join()}) VALUES('${goodsId}','${goodsName}', '${param2}', '${retailPrice}', '${goodsImg}', '${num}')`;
        console.log(sql);
        let p = await query(sql);//[{},{}]
        console.log(p);
        let inf = {};
        if (p.affectedRows) {
            //修改成功
            inf = {
                code: 2000,
                flag: true,
                message: '添加成功'
            }
        } else {
            //修改失败
            inf = {
                code: 3000,
                flag: false,
                message: '添加失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }

})

//删除  
router.delete('/deletegoods/:id',async (req,res)=>{
    let {id} = req.params;
    let sql=`DELETE FROM goodslist WHERE id = ${id} `
    try {
        let p = await query(sql);//[{},{}]
        // console.log(p);
        let inf = {};
        if (p.affectedRows) {
            //删除成功
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功'
            }
        } else {
            //删除失败
            inf = {
                code: 3000,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(inf); 
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})

//查询
router.get("/searchgoods/:goodsId",async(req,res)=>{
    let {goodsId} = req.params;
    // console.log(goodsId);
    try {
        let sql =`SELECT * FROM goodslist where goodsId='${goodsId}'`;
        let data = await query(sql)
        // console.log(data);
        let info ={};
        if(data.length){
            info ={
                code:2000,
                flag:true,
                data,
                msg:'查询成功'
            }
        }else{
            info ={
                code:3000,
                flag:false,
                msg:'查询失败'
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
module.exports = router;