const express = require("express");
const query = require("../../db/mysql"); // 导入执行sql语句模块

const router = express.Router();

/**
 * 数组转字符串：'1','2','3'
 * arr:传入的数组
*/
function formatArrToString(arr) {
    let str = "";
    arr.forEach(item => {
        str += "'" + item + "',";
    })
    return str.slice(0, -1); // 去掉最后一个逗号
}

// 增加
router.post("/add", async (req, res) => {

    // 插入order表---------
    let orderKeys = Object.keys(req.body);
    let orderKeysStr = orderKeys.slice(0,-1).join();
     // 插入的数据带逗号格式字符串
     let orderValues = Object.values(req.body);
     orderValues = orderValues.slice(0, -1)
     let orderValStr = formatArrToString(orderValues);
    //  console.log(orderValStr);
    let orderSql = `INSERT INTO orderList(${orderKeysStr}) VALUES(${orderValStr})`;
    // 执行sql语句
    let orderInsertRes = await query(orderSql);

    if(!orderInsertRes.affectedRows) {
        res.send({
            code:0,
            msg: "下单失败"
        });
        return;
    }

    // 插入orderGoods表------------
    /*
        {
            id:null,
            orderId,
            goodsId
            goodsName
            params2
            mallPrice
            goodsImg
            num
            sum

            no: id isSelect userId
        }
    */ 
    // 订单商品
    let goodsArr =  [...req.body.goods];
    
    goodsArr.forEach((item, index) => {
        // 删除不需要的数据
        delete item.id;
        delete item.isSelect;
        delete item.userId;
    })

    let goodsKeysAndVals = []
    goodsArr.forEach((item,index) => {
        // console.log(Object.keys(item));
        // 处理键
        item.orderId = req.body.id;
        let orderKeys = Object.keys(item);
        let orderKeysStr = orderKeys.slice(0,-1).join();
        orderKeysStr = "orderId," + orderKeysStr
        // 处理值
        let orderValues = Object.values(item);
        orderValues = orderValues.slice(0, -1)
        let orderValStr = formatArrToString(orderValues);
        orderValStr = `'${req.body.id}',` + orderValStr;

        let obj = {
            keys:orderKeysStr,
            values:orderValStr
        }
        goodsKeysAndVals.push(obj)
    })

    // 循环写入orderGoods数据
    for(var i = 0; i < goodsKeysAndVals.length; i++) {
        var goodsSql = `INSERT INTO orderGoods(${goodsKeysAndVals[i].keys}) VALUES(${goodsKeysAndVals[i].values})`;
        let goodsInsertRes = await query(goodsSql);
        if(!goodsInsertRes.affectedRows) {
            res.send({
                code: 0,
                msg: "下单失败"
            })
        } else if(i == goodsKeysAndVals.length - 1) {
            res.send({
                code: 1,
                msg: "下单成功"
            })
        }
    }
    
}); 


module.exports = router;