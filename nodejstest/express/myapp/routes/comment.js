// 路由 index文件
const express = require('express');
const router = express.Router();
const comment = require('../lib/comment.js').comment;
//在某个博客下发布新的留言
router.post('/add', (req, res) => {
    comment.add(req.query).then((findData) => {
        res.json({
            ok: true,
            data: findData
        })
    }).catch((err) => {
        console.log(err)
        res.send({
            ok: false,
            data: ''
        })
    })
})
// 查询某个博客下的所有留言

router.get('/find',(req,res)=>{
    comment.find().then((findData)=>{
        res.send({ok:true,data:findData})
    }).catch(err=>{
        res.send({ok:false,message:'查询失败'})
    })
})



module.exports = router;