const express = require("express");
const query = require("../../db/mysql"); // 导入执行sql语句模块

const router = express.Router();

// 三级分类菜单：   
router.get("/:id", async ( req, res) => {   
    res.send("123");
})



module.exports = router;