const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var blogSchema = new Schema({
    account:{type:String,unique:true },
    author: {type:String,default:'http://www.baidu.com'},
    nickName: String,
    password: String
});
var Blog = mongoose.model('User', blogSchema);
class User {
    setUser(keyBody) {
        return new Promise((resove,reject)=>{
            var personEntity = new Blog(
                { 
                    account:keyBody.account,
                    password:keyBody.password,
                    nickName:keyBody.nickName,
                    author:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epn4wrgs1TOnO6MMWUXCladW544nYsVNaYSKS9K1QYxjsYibs2faFQd7Zsm7AgrL6Tj7REtJxHjRrg/132'
                }
            );
            console.log('数据链接成功')            
            personEntity.save().then((ok)=>{
                console.log('存储成功')
                 resove()
            }).catch((err)=>{
                console.log(err)
                console.log('数据存储失败')
                reject()
            })
        })
        // console.log(personEntity.title)
    }
     getName(){
         return new Promise((resove,reject)=>{
            Blog.findOne({'account':'alizheguang456'},' -_id  -__v ',(err,docs)=>{
                if (err) reject(docs)
                resove(docs)
            })
         })
    }
}

let user = new User()

module.exports.user = user
