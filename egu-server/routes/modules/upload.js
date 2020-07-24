const express = require('express');
const router = express.Router(); //router == app
const query = require('../../db/mysql');
// const { host } = require('../../config.json');
const multer = require('multer');

// 上传单个图片
var storage = multer.diskStorage({
    //目录：无则创建
    destination: 'uploads/',
    filename: function (req, file, cb) {
        // console.log('格式',file);
        // let arr = file.originalname.split('.');
        let arr = file.mimetype.split('/');
        // console.log(arr)
        // cb(null, file.fieldname + '-' + Date.now()) //avatar-42432476
        cb(null, arr[0] + '-' + Date.now() + '.' + arr[1]) //avatar-42432476
    }
})

var upload = multer({ storage })

//上传单个文件：上传头像  /upload/touxiang
router.post('/touxiang', upload.single('avatar'), async (req, res) => {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    // console.log(req.file);
    let { id } = req.body;//获取formdata传过来的uid
    //http://localhost:8000/uploads/timg-1593655420158.jpg 得到这段路径，存入数据库即可
    // let url = host + 'uploads/' + req.file.filename;
    let url = 'uploads/' + req.file.filename;
    //UPDATE userinf SET adr='888' WHERE uid=31
    let p = await query(`UPDATE userinfo SET avatarurl='${url}' WHERE id=${id}`);
    let inf = {};
    if (p.affectedRows) {
        //上传成功
        inf = {
            code: 2000,
            flag: true,
            message: '上传成功',
            data: {
                imgurl: url
            }
        };
    } else {
        inf = {
            code: 3000,
            flag: false,
            message: '上传失败'
        };
    }
    res.send(inf);

})


module.exports = router;