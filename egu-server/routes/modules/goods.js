const express = require("express");
const query = require("../../db/mysql"); // 导入执行sql语句模块

const router = express.Router();

// 分类：/goods
router.get("/", async ( req, res) => {
    try{
        let sql = "SELECT * FROM goods WHERE c3id = 23";
        let data = await query(sql);
        res.send(data);
    } catch(err) {
        res.send(111, err);
    }
     
})

module.exports = router;