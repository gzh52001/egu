const express = require("express");
const router = express.Router();

const categoryRouter = require('./modules/category');
const goodsRouter = require('./modules/goods');

// use无论是什么类型的请求都可以进入
router.use('/category', categoryRouter); // 开启category子路由
router.use('/goods', goodsRouter); // 开启category子路由

module.exports = router; // 导出