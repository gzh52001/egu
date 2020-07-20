const express = require('express');
const allRouter = require('./routes/index.js');

const app = express();

app.use(allRouter); // 使用路由
app.get("/home", (req, res) => {
    res.send("789");
});


app.listen(8000, () => {
    console.log("开启服务成功，端口：8000");
})