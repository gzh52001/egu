const express = require('express');
const allRouter = require('./routes/index.js');
const fs = require("fs");
const app = express();

app.use(express.static('./'));//静态资源服务器
app.use(allRouter); // 使用路由

// 防止刷新找不到资源
app.use((req, res) => {
    const content = fs.readFileSync("./index.html");
    res.set('Content-type','text/html;chartset=utf-8');
    res.send(content.toString());
})

app.listen(8000, () => {
    console.log("开启服务成功，端口：8000");
})