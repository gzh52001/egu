const express = require("express");
const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // 转json数据
router.use(bodyParser.urlencoded({
    extended: false
})); // 转键值对数据 key=value&key=value


const cartRouter = require('./modules/cart');
const userRouter = require('./modules/user');
const uploadRouter = require('./modules/upload');
const orderRouter = require('./modules/order'); // 订单
const LoginRouter = require('./modules/msLogin');
const msgoodsRouter = require('./modules/msgoodslist');

// use无论是什么类型的请求都可以进入
router.use('/cart', cartRouter); // 开启category子路由
router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/order', orderRouter);
router.use('/admin', LoginRouter);
router.use('/goods', msgoodsRouter);

module.exports = router; // 导出