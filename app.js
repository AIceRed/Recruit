/**
 * Created by Administrator on 2018/1/20.
 */
//加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载cookies模块
var Cookies = require('cookies');
//创建app应用 => NodeJS Http.createServer();
var app = express();

//设置静态文件托管
//当用户访问的url以/common开始，那么直接返回对应__dirname + '/common'下的文件
app.use( '/common', express.static( __dirname + '/common') );

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});
//bodyparser设置
app.use( bodyParser.urlencoded({extended: true}) );
//设置cookie
app.use( function(req, res, next) {
    req.cookies = new Cookies(req, res);
    //解析登录用户的cookie信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
        }catch(e){}
    }
    next();
} );
/*
 * 根据不同的功能划分模块
 * */
app.use('/backstage', require('./routers/backstage'));
app.use('/resume', require('./routers/resume'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/front'));
app.listen(3000);