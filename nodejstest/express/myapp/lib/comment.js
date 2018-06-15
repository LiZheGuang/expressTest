const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var blogSchema = new Schema({
    content: { type: String },//留言内容
    nickName:{type:String}, //留言者
    blogId:{type:String},//留言在哪个博客id下
    commentTime:{type:Date} //留言发布的时间
});
// /2018-05-24T10:31:05.309Z
var Blogmodel = mongoose.model('comment', blogSchema);
class blogMongo {
    add(keyData) {
        // console.log(keyData)
        /*
        需要前端参数
        nickNmae  : 留言姓名
        content : 内容
        blogId  : 博客id
        */ 
        return new Promise((resove, reject) => {
            var personEntity = new Blogmodel(
                {
                    nickName: keyData.nickName,
                    content: keyData.content,
                    blogId: keyData.blogId,
                    commentTime:new Date()
                }
            );
            console.log('数据链接成功')
            personEntity.save().then((ok) => {
                console.log('存储成功')
                resove()
            }).catch((err) => {
                console.log(err)
                console.log('数据存储失败')
                reject()
            })
        })
        // // console.log(personEntity.title)
    }
    find(){
        let finBlog = new Promise((resove,reject)=>{
            Blogmodel.find({'blogId':'5b07f19ad8f5ee27e72f2f91'},'-__v').sort({'commentTime':1}).then((res)=>{
                console.log('mnp')
                console.log(res)
                // 查询成功
                resove(res)
            }).catch((error)=>{
                // 查询失败
                reject(error)
            })
        })

        return finBlog
      
    }
}

let comment = new blogMongo()

module.exports.comment = comment
