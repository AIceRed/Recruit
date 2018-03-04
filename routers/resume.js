/**
 * Created by Administrator on 2018/1/31.
 */
var express = require('express');
var router = express.Router();
var add = require("../db/add");
var add = new add();
var OptPool = require('../db/mysqlPool');
var optPool = new OptPool();
var pool = optPool.getPool();
var fs = require("fs");
//统一返回格式
var responseData;

router.use( function(req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
} );
router.post('/a', function(req, res, next) {
    var account = "123";
    var addSql =  'INSERT INTO profile(account,name,address,introduce,type,num,post,tel) VALUES(?,?,?,?,?,?,?,?)';
    var par = [account,req.body.name,req.body.address,req.body.introduce,req.body.type,req.body.num,req.body.email,req.body.tel];
    add.set(addSql,par);
    add.insert();
    res.render('front/resume', {
    });
});
module.exports = router;
//router.post('/profile/addprofile', function(req, res, next) {
//
//    //var account = "123";
//    //var addSql =  'INSERT INTO profile(account,name,address,introduce,type,num,post,tel) VALUES(?,?,?,?,?,?,?,?)';
//    //var par = [account,req.body.name,req.body.address,req.body.introduce,req.body.type,req.body.num,req.body.email,req.body.tel];
//    //add.set(addSql,par);
//    //add.insert();
//    res.render('front/job', {
//    });
//});