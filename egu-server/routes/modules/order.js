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

// 前台:::::::::::::::::::::::::::::::::::::::::
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

// 后台:::::::::::::::::::::::::::::::::::::::::
router.get("/search/list", async (req,res) => {
    let orderSql = "select * from orderlist";
    let goodsSql = "select * from ordergoods";

    let orderList = await query(orderSql);
    let goodsList = await query(goodsSql);

    let data =  [];
    orderList.forEach(item => {
        let arr = []
        goodsList.forEach(val => {
            if(item.id == val.orderId) {
                arr.push(val)
            }
        })
        item.goods = arr;
        data.push(item)
    });
    res.send(data);
})
// 根据orderId查询
router.get("/searchOne/:orderId", async (req, res) => {
    let { orderId } = req.params;
    let orderSql = `SELECT * FROM orderlist WHERE id = '${orderId}'`;
    let goodsSql = `SELECT * FROM ordergoods WHERE orderId = '${orderId}'`;
    try {
        // 查询订单表
        let searchOrderRes = await query(orderSql);
        if(!searchOrderRes.length > 0) {
            res.send({
                code: 0,
                msg: "查询失败"
            });
            return;
        }
        
        // 查询商品数据
        let searchGoodsRes = await query(goodsSql);
        if(searchGoodsRes.length > 0) {
            searchOrderRes[0].goods = searchGoodsRes; // goods:[]把商品数据加入到订单数据里面
            res.send({
                code: 1,
                msg: "查询成功",
                data: searchOrderRes
            })
        } else {
            res.send({
                code:0,
                msg: "查询失败"
            })
        }
    } catch(err) {

    }
})

// 分页查询 传：start pageSize
router.get("/searchPage", async (req, res) => {
    let { page, size } = req.query;
    page = page || 1,
    size = size || 10;
    let index = (page - 1) * size; // 起始下标
    let sql = `SELECT * FROM orderlist  LIMIT ${index},${size}`;
    let searchAllSql = "select * from orderlist";

    try {
        let allRes = await query(searchAllSql);
        let pageListRes = await query(sql);
        console.log(pageListRes);
        let arr=[]
        for (var i = 0; i < pageListRes.length; i++) {
            var goodsSql = `SELECT * FROM ordergoods WHERE orderId = '${pageListRes[i].id}'`; // 查询商品
            pageListRes[i].goods= await query(goodsSql);
        }
        // pageListRes.forEach(async item => {
        //     var goodsSql = `SELECT * FROM ordergoods WHERE orderId = '${item.id}'`; // 查询商品
        //      item.goods= await query(goodsSql);
        //      console.log(item)
        //      arr.push(item)
        // })
        console.log(pageListRes);
        
        if(pageListRes.length > 0) {
            res.send({
                code:1,
                msg: "查询成功",
                total: allRes.length,
                data: pageListRes
            })
        } else {
            res.send({
                code:0,
                msg: "查询失败"
            })
        }
    } catch (err) {
        console.log(err);
    }
});

// 删除订单、订单商品
router.delete("/delete/:orderId",async (req, res) => {
    let orderId = req.params.orderId;
    let orderSql = `DELETE FROM orderlist WHERE id = '${orderId}'`;
    let goodsSql = `DELETE FROM ordergoods WHERE orderId = '${orderId}'`;

    try {
         // 删除订单表数据
        let delOrderRes = await query(orderSql);
        if(!delOrderRes.affectedRows) {
            res.send({
                code: 0,
                msg: "删除失败"
            })
            return;
        }

        // 删除订单商品表数据
        let delGoodsRes = await query(goodsSql);
        if(!delGoodsRes.affectedRows) {
            res.send({
                code: 0,
                msg: "删除失败"
            })
            return;
        } else {
            res.send({
                code: 1,
                msg: "删除成功"
            })
        }

    } catch(err) {
        console.log(err);
   }
})

// 修改:发货状态
router.put("/update/:orderId", (req, res) => {
    let { orderId } = req.params;
    let updateSql = `UPDATE orderlist SET isSend=1 WHERE id = '${orderId}'`;
    query(updateSql).then(updateRes => {
        if(updateRes.affectedRows) {
            res.send({
                code:1,
                msg: "修改成功"
            })
        } else {
            res.send({
                code:0,
                msg: "修改失败"
            })
        }
    })
});


module.exports = router;