const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var blogSchema = new Schema({
    title: { type: String, }, //博客标题
    content: { type: String },//博客内容
    picker: { type: Array, default: [] }, //博客图片
    nickName: { type: String ,default:"姜子牙"}, //发布作者
    releaseTime:{type:Date,default: new Date()}, //发布时间
    praise:{ type:Number,default:0 }, //赞的数量
    type:{type:Boolean,default:true}  //true为正常显示 false为隐藏（删除）
});
// /2018-05-24T10:31:05.309Z
var Blogmodel = mongoose.model('blog', blogSchema);
class blogMongo {
    add(keyData) {
        console.log(keyData)
        return new Promise((resove, reject) => {
            var personEntity = new Blogmodel(
                {
                    title: keyData.title,
                    content: keyData.content,
                    nickName: keyData.nickname,
                    releaseTime:new Date()
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
        // console.log(personEntity.title)
    }
    find(findData){
        return new Promise((resove,reject)=>{
            
            Blogmodel.find(findData,'-__v ').then((res)=>{
                resove(res)
            }).catch((err)=>{
                console.log('报错')
                reject(err)
            })
        })
    }
  findOne(keyData){
           

        return new Promise((resove,reject)=>{
            console.log(keyData)
            Blogmodel.findOne({'_id':keyData},'-__v').then((res)=>{
                console.log('mnp')
                console.log(res)
                // 查询成功
                resove(res)
            }).catch((error)=>{
                // 查询失败
                reject(error)
            })
        })
    }
    upDatePraise(keyData){
        return new Promise((resove,reject)=>{
            Blogmodel.update({'_id':keyData._id},{$inc:{'praise':1}}).then((res)=>{
                console.log(res)
                resove()
            }).catch(function(err)
            {
                reject()
                console.log(err)
            })
        })
    }
    // 删除某个博客文章
    delete(keyData){

        return new Promise((resove,reject)=>{
            Blogmodel.update({'_id':keyData._id},{'type':false}).then((res)=>{
                    resove(res)
                    console.log('成功')
            }).catch((err)=>{
                console.log(err)
                console.log('失败') 
                    reject(err)
            })
        })
        
    }
    
}

let blogs = new blogMongo()

module.exports.blogs = blogs
