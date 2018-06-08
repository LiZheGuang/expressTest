
const express = require('express')  //引入express 框架
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const app = express()
const serverInit = require('./lib/serverInit') //链接sql
const indexRouter = require('./routes/index') //路由
const userRouter = require('./routes/users') //路由
const blog = require('./routes/blog') //路由
app.set('views', path.join(__dirname, 'views'))// 设置存放模板文件的目录
app.set('view engine', 'ejs')// 设置模板引擎为 ejs

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
    keepExtensions: true// 保留后缀
  }))


  app.use(express.static(path.join(__dirname, 'public')))
  // session 中间件
  app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
      maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
      url: config.mongodb// mongodb 地址
    })
  }))
  // flash 中间件，用来显示通知
  app.use(flash())

//中间件
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/blog', blog)

serverInit();
// 错误处理
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!Error Node.js')
})



app.listen(3000)



console.log('嘻嘻嘻')