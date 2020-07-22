const express = require("express");
const query = require("../../db/mysql"); // 导入执行sql语句模块

const router = express.Router();


// let data = {
//     userId:"的发大水发多少",
//     goodId:"的发大水发多少",
//     goodName:"的发大水发多少",
//     goodDesc:"的发大水发多少",
//     price:"的发大水发多少",
//     img:"的发大水发多少",
//     num:"的发大水发多少",
//     sum:"kjkjbjkbkbm",
//     isSelect:0,
// }

// 添加
router.post("/add",( req, res) => { 
    let keys = Object.keys(req.body);
    let data = Object.values(req.body);
    let {userId, goodId, goodName, goodDesc, price, img, num, sum, isSelect} = req.body;
    // sql语句
    let sql = `INSERT INTO cart(${keys.join()}) VALUES('${userId}','${goodId}','${goodName}', '${goodDesc}', '${price}', '${img}', '${num}', '${sum}', ${isSelect})`;
    
    // 执行sql语句
    query(sql).then(result => {
        // 判断数据库操作是否成功，通过受影响行判断
        if(result.affectedRows) {
            // 返回结果给前端
            res.send({
                code:1,
                msg: "添加购物车成功",
            });
        } else {
            res.send({
                code:0,
                msg: "添加购物车失败",
            });
        }
    })
    
})

// 判断用户是否第一次加入该商品
router.get("/isFirstAdd", async (req, res) => {
    // params 动态路由参数
    // query 查询字符串
    let {userId, goodId} = req.query;
    let sql = `select * from cart where userId = '${userId}' and goodId = '${goodId}'`;
    let result = await query(sql);
        if(!result.length) {
            res.send({
                code:'1',
                msg: "用户第一次加入该商品"
            })
        } else {
            res.send({
                code:'0',
                msg: "用户不是第一次加入该商品",
                data: result
            })
        }
});

// 查询：用户购物车数据
router.get("/search/:userId", async (req, res) => {
    let { userId } = req.params;
    let sql = `select * from cart where userId = ${userId}`;
    try{
        let result = await query(sql);
        if(result.length) {
            res.send({
                code: 1,
                msg: "查询成功",
                data: result
            })
        } else {
            res.send({
                code: 0,
                msg: "购物车为空"
            });
        }

    } catch(err) {
        console.log(err);
    }


})

// 修改：购物车数量 加：type:1   减 type:0   更新：num sum
// userId goodId
router.put("/update", async (req, res) => {
    try {
        let {userId, goodId, type } = req.body;
    // res.send(req.body);
    // 查询原来信息
    let sql = `select * from cart where userId = '${userId}' and goodId = '${goodId}'`;
    // 执行查询
    let result = await query(sql);

    let { num, price } = result[0];

    // 判断加减
    if(type == 1) {
        num = Number(num) + 1;
    } else {
        if(num <= 1) {
            res.send({
                code:1,
                msg: "数量最少为1",
                data: result
            });
            return
        } 
        num = Number(num) - 1;
    }

    let sum = Number(price) * Number(num); // 新的总价

    let updateSql = `UPDATE cart SET num=${num},sum=${sum} WHERE userId = '${userId}' AND goodId = '${goodId}'`

    // 执行更新
    let updateRes = await query(updateSql);

    if(updateRes.affectedRows) {
        let sql = `select * from cart where userId = '${userId}' and goodId = '${goodId}'`;
        let result = await query(sql);
        res.send({
            code:1,
            msg: type == 1 ? "增加数量成功" : "减少数量成功",
            data: result,
            da:req.body
        });
    } else {
        res.send({
            code: 0, 
            msg: type == 1 ? "增加数量失败" : "减少数量失败"
        });
    }
    } catch(err) {
        console.log(err);
    } 
})

// 删除: userId goodId 
router.delete("/del", async (req, res) => {
    try {
        // 前端数据
        let { userId, goodId } = req.body;

        // sql语句
        let sql = `DELETE FROM cart WHERE userId = "${userId}" AND goodId = "${goodId}"`;

        // 执行sql语句
        let result = await query(sql);
        
        // 返回结果
        if(result.affectedRows) {
            let sql = `select * from cart where userId = '${userId}' and goodId = '${goodId}'`;
            let result = await query(sql);
            res.send({
                code: 1,
                msg: "删除成功",
                data: result
            });
        } else {
            res.send({
                code: 0,
                msg: "删除失败"
            });
        }

        
    } catch(err) {
        console.log(err);
    }
    

})






module.exports = router;