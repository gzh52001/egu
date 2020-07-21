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
router.post("/add", async ( req, res) => { 
    let keys = Object.keys(data);
    let values = Object.values(data);
    let sql = `INSERT INTO cart(${keys.join()}) VALUES(${values.join()})`
    let result = await query(sql);
    if(result.affectedRows) {
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


// router.get("/search/:userId", (req, res) => {
//     let sql = "select * from cart";
//     query(sql).then(res => console.log(res))
//     res.send("789");
// })

module.exports = router;