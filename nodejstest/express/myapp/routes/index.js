// 路由 index文件
const express = require('express');

const axios = require('axios');

const checkLogin = require('../middlewares/check.js').checkLogin

const router = express.Router();


const user = require('../lib/mongo.js').user;


router.get('/', checkLogin, (req, res) => {
    // 操作mongodb
    // user.setName();
    // console.log(user)
    res.send('hello,express')
})

router.get('/get', (req, res) => {
    async function getUrl() {
        let data = await axios({
            url: 'http://www.baidu.com'
        }).then((data) => {
            return data
        })
        console.log(data)
    }
})


module.exports = router;