const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Article = require('../models/article')

//设置跨域访问
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//登录
router.post('/login', (req, res) => {
    console.log('我执行了')
    if (req.session.sign){
        return res.json({flag:1,msg:'已经登录过了'})
    }
    let name = req.body.name
    let pass = req.body.pass
    User.find({'name': name}, (err, user) => {
        if(err){
            return res.json({flag:4,msg:'请求错误'})
        }else{
            if(user.length !== 0){
                //这里代表数据库里有相同的用户名
                if(pass == user[0].pass){
                    //这里代表密码相同登录成功
                    req.session.sign = true
                    console.log(req.session.sign)
                    return res.json({flag:0,msg:'登录成功',user:user})
                }else{
                    return res.json({flag:2,msg:'登录失败'})
                }
            }else{
                //这里代表数据库里没有相同的用户名
                return res.json({flag:3,msg:'此用户名没有注册'})
            }
        }
    })
})

//检测是否登录
router.post('/islogin', (req, res) => {
    if (req.session.sign){
        return res.json({flag:0,msg:'已经登录过了'})
    }else{
        return res.json({flag:1,msg:'没有登录'})
    } 
})

//提交新文章
router.post('/postWrite', (req, res) => {
    //console.log(req.body)
    //console.log(title+','+doc+','+type+','+category)
    Article.create(req.body, (err, article) => {
        if(err){//服务器有错误
            return res.json({flag: 1,msg:'接口错误'})
        }else{
            return res.json({flag: 0,msg: article})
        }
    })
})

//请求关于我
router.post('/aboutMe', (req, res) => {
    //console.log(req.body)
    Article.find(req.body, (err, about) => {
        if(err){
            return res.json({flag:4,msg:'请求错误'})
        }else{
            //console.log(about)
            return res.json({flag: 0,msg: about})
        }
    })
})

//请求文章列表
router.post('/list', (req, res) => {
    //console.log(req.body)
    Article.find(req.body, (err, list) => {
        if(err){
            return res.json({flag:4,msg:'请求错误'})
        }else{
            //console.log(list)
            return res.json({flag: 0,msg: list})
        }
    })
})

//请求具体文章
router.post('/note', (req, res) => {
    console.log(req.body)
    Article.find(req.body, (err, note) => {
        if(err){
            return res.json({flag:4,msg:'请求错误'})
        }else{
            console.log(note)
            return res.json({flag: 0,msg: note})
        }
    })
})

//更新文章内容
router.post('/updateDoc', (req, res) => {
    //console.log(req.body)
    let {_id, doc, date} = req.body
    Article.update({_id},{doc,date}, function(err, note){
        if(err){
            return res.json({flag:4,msg:'请求错误'})
        }else{
            //console.log(note)
            return res.json({flag: 0,msg: note})
        }
    })
})

module.exports = router