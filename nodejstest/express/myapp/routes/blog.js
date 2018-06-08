// 路由 index文件
const express = require('express');
const router = express.Router();
const blogs = require('../lib/blog.js').blogs;

//查询博客API列表
router.get('/', (req, res) => {
    blogs.find(req.query).then((findData) => {
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
// 产选博客详情 
router.get('/findOne', (req, res) => {
    blogs.findOne(req.query._id).then((findData)=>{
        console.log(findData)
            res.send({
                ok:true,
                data:findData
            })
    }).catch((err)=>{
        res.send({
            ok:false,
            data:''
        })
    })
})
// 创建博客
router.post('/add', (req, res) => {
    let query = req.query;
    blogs.add(query).then(() => {
        res.send({
            ok: true
        })
    }).catch((err) => {
        res.send({
            ok: false
        })
    })
})

// 给某个博客点赞
router.post('/upDate/praise', (req, res) => {
    let query = req.query;
    blogs.upDatePraise(query).then(() => {
        res.send({
            ok: true
        })
    }).catch(() => {
        res.send({
            ok: false
        })
    })
})

// 删除谋篇文章
router.post('/delete',(req,res)=>{
    let query = req.query
    blogs.delete(query).then((resData)=>{
        console.log(resData)
        res.send({
            ok:true
        })
    }).catch((err)=>{
        console.log(err)
        
        res.send({
            ok:false
        })
    })
})



module.exports = router;