// 路由 index文件
const express = require('express');
const router = express.Router();
const blogs = require('../lib/blog.js').blogs;

//查询博客API
router.get('/', (req, res) => {
    blogs.find().then((findData)=>{
        res.json({
            ok:true,
            data:findData
        })
    }).catch((err)=>{
        console.log(err)
        res.send({
            ok:false,
            data:''
        })
    })

})
// 创建博客
router.post('/add',(req,res)=>{
    let query = req.query;
    blogs.add(query).then(()=>{
        res.send({
            ok:true
        })
    }).catch((err)=>{
        res.send({
            ok:false
        })
    })
})

// 给某个博客点赞
router.post('/upDate/praise',(req,res)=>{
    let query = req.query;
    blogs.upDatePraise(query).then(()=>{
        res.send({
            ok:true
        })
    }).catch(()=>{
        res.send({
            ok:false
        })
    })
})



module.exports = router;