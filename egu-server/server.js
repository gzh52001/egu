const express = require('express');
const allRouter = require('./routes/index.js');

const app = express();

app.use(allRouter); // 使用路由
app.get("/ee", (req, res) => {
    res.send("787878");
});
app.post("/aa", (req, res) => {
    console.log(req.body)
    res.send("787878");
});

app.listen(8000, () => {
    console.log("开启服务成功，端口：8000");
})