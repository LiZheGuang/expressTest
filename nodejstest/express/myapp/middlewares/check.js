module.exports = {
    // 未登录逻辑
    checkLogin(req,res,next){
        if(!req.session.user){
            req.flash('error','未登录')
            return res.redirect('/users')
        }
        next();
    },
    // 登录逻辑
    checkNotLogin(req,res,next){
        if(req.session.user){
            req.flash('error','已登录')
            return res.redirect('back')
        }
        next();
    }
}