const express = require('express');
const user = require('../lib/mongo.js').user;
const router = express.Router();

router.get('/', (req, res) => {
    // 绑定模板ejs
    res.render('users', {
        name: req.params.name
    })
})

router.get('/signup', (req, res) => {
    res.render('signup', {
        name: '123'
    })
})

router.post('/setsignup', (req, res) => {
    console.log('嘻嘻嘻喜爱 post')
    console.log(req)
    let fields = req.fields;
    let account = fields.account;  //账号
    let nickName = fields.nickName; //昵称
    let password = fields.password; //密码
    let twoPassword = fields.twoPassword; //确认密码
    user.setUser({
        account: account,
        nickName: nickName,
        password: password,
    }).then(() => {
        res.send('mnp')
    }).catch(() => {
        res.send('ERROR ZHANG HAO !')
    })
    console.log(fields)

    // res.redirect('/users/signup')
})

router.get('/loginUser',(req,res)=>{
    res.send('登录成功')
})

router.post('/login', (req, res) => {
    user.getName().then((sql) => {
        let obj = {}
        if (!sql) {
            obj = {
                ok: false,
                data: ''
            }
        } else {
            obj = {
                ok: true,
                data: sql
            }
            req.session.user = sql
        }
        res.json(obj)

    })
})

module.exports = router;