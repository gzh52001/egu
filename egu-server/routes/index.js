const express = require("express");
const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // 转json数据
router.use(bodyParser.urlencoded({extended:false})); // 转键值对数据 key=value&key=value

const categoryRouter = require('./modules/category');
const goodsRouter = require('./modules/goods');
const cartRouter = require('./modules/cart');
const userRouter =  require('./modules/user');
<<<<<<< HEAD
const uploadRouter = require('./modules/upload');
<<<<<<< HEAD
=======
const orderRouter =  require('./modules/order'); // 订单
>>>>>>> yuanyefeng
=======
const LoginRouter = require('./modules/msLogin');
>>>>>>> wuyule

// use无论是什么类型的请求都可以进入
router.use('/category', categoryRouter); // 开启category子路由
router.use('/goods', goodsRouter); 
router.use('/cart', cartRouter); 
router.use('/user',userRouter);
<<<<<<< HEAD
router.use('/upload',uploadRouter);
<<<<<<< HEAD
=======
router.use('/order',orderRouter);
>>>>>>> yuanyefeng
=======
router.use('/admin',LoginRouter);
>>>>>>> wuyule

module.exports = router; // 导出