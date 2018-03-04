/**
 * Created by Administrator on 2018/1/20.
 */
var express = require('express');
var router = express.Router();
var OptPool = require('../db/mysqlPool');
var optPool = new OptPool();
var pool = optPool.getPool();
/**
 * 首页
 */

var responseData = {}

router.get('/', function(req, res, next) {
    res.render('front/index', {
        userInfo:req.userInfo
    });
});
router.get('/practice', function(req, res, next) {
    var selectSql = 'SELECT * FROM resumes'
    pool.getConnection(function(err,conn){
        conn.query(selectSql,function(err,rs){
            conn.release(); //放回连接池
            if(!rs.length){
                res.render('front/resume', {
                    userInfo:req.userInfo
                });
            }else{
                res.render('front/resume', {
                    userInfo:req.userInfo,
                    rs:rs
                });
            }
        })
    });
});
router.get('/job', function(req, res, next) {
    var selectSql = 'SELECT * FROM recruit'
    pool.getConnection(function(err,conn){
        conn.query(selectSql,function(err,rs){
            conn.release(); //放回连接池
            if(!rs.length){
                res.render('front/job', {
                    userInfo:req.userInfo
                });
            }else{
                res.render('front/job', {
                    userInfo:req.userInfo,
                    rs:rs
                });
            }
        })
    });
});
router.get('/guide', function(req, res, next) {
    res.render('front/guide', {
        userInfo:req.userInfo
    });
});
router.get('/about', function(req, res, next) {
    res.render('front/about', {
        userInfo:req.userInfo
    });
});
//详细简历信息
router.post('/resumepage', function(req, res, next) {
    var selectSql = 'SELECT * FROM resumes where id='+req.body.id;
    pool.getConnection(function(err,conn){
        conn.query(selectSql,function(err,rs){
            conn.release(); //放回连接池
            res.render('front/resumepage', {
                rs:rs,
                userInfo:req.userInfo
            });
        });
    });
});
//详细招聘信息
router.post('/jobpage', function(req, res, next) {
    var selectSql = 'SELECT * FROM recruit where id='+req.body.id;
    pool.getConnection(function(err,conn){
        conn.query(selectSql,function(err,rs){
            conn.release(); //放回连接池
            responseData.reciuit=rs[0];
        });
    });
    var selectSql1 = 'SELECT * FROM profile where account='+req.body.company;
    pool.getConnection(function(err,conn){
        conn.query(selectSql1,function(err,rs){
            conn.release(); //放回连接池
            responseData.profile=rs[0];
            res.render('front/jobpage', {
                recruit:responseData.reciuit,
                profile:responseData.profile,
                userInfo:req.userInfo
            });
        });
    });
});
//详细招聘信息
router.get('/company', function(req, res, next) {
    var selectSql1 = 'SELECT * FROM profile where account='+req.userInfo.username;
    pool.getConnection(function(err,conn){
        conn.query(selectSql1,function(err,rs){
            conn.release(); //放回连接池
            responseData.profile=rs[0];
            res.render('front/job', {
                profile:responseData.profile,
                userInfo:req.userInfo,
                msg:1
            });
        });
    });
});
//添加招聘信息
router.get('/addrecruit', function(req, res, next) {
    res.render('interviewer/recruit', {
        userInfo:req.userInfo,
    });
});
//简历修改路由
router.get('/alter', function(req, res, next) {
    var selectSql = 'SELECT * FROM resumes'
    pool.getConnection(function(err,conn){
        conn.query(selectSql,function(err,rs){
            conn.release(); //放回连接池
            if(!rs.length){
                console.log("还没有公司信息");
            }else{
                res.render('front/resume', {
                    userInfo:req.userInfo,
                    rs:rs,
                    type:1
                });
            }
        })
    });
});
module.exports = router;