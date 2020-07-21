const express = require("express");
const query = require("../../db/mysql"); // 导入执行sql语句模块

const router = express.Router();


let data = {
    userId:100,
    goodId:123,
    goodName:123,
    goodDesc:123,
    price:123,
    img:123,
    num:123,
    sum:123,
    isSelect:0,
}
// 添加
router.post("/add", ( req, res) => { 
    console.log(req.body);
    res.sendStatus(111111111);
    // // 前端传递来的数据
    // let keys = Object.keys(req.body);
    // let values = Object.values(req.body);
    // // sql语句
    // let sql = `INSERT INTO cart(${keys.join()}) VALUES(${values.join()})`
    // let result = await query(sql);
    // // 判断数据库操作是否成功，通过受影响行判断
    // if(result.affectedRows) {
    //     // 返回结果给前端
    //     res.send({
    //         code:1,
    //         msg: "添加购物车成功",
    //     });
    // } else {
    //     res.send({
    //         code:0,
    //         msg: "添加购物车失败",
    //     });
    // }
})


// router.get("/search/:userId", (req, res) => {
//     let sql = "select * from cart";
//     query(sql).then(res => console.log(res))
//     res.send("789");
// })

module.exports = router;