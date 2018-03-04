/**
 * Created by Administrator on 2018/1/20.
 */
var express = require('express');
var router = express.Router();
var add = require("../db/add");
var add = new add();
var OptPool = require('../db/mysqlPool');
var optPool = new OptPool();
var pool = optPool.getPool();
//统一返回格式
var responseData;

router.use( function(req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
} );
/**
 * 登录
 */
router.get('/', function(req, res, next) {
    res.render('candidate/register', {
        userInfo:req.userInfo
    });
});
/**
 * 公司介绍表单录入
 */
router.get('/profile', function(req, res, next) {
    res.render('interviewer/profile', {
    });
});
/**
 * 招聘信息录入
 */
router.get('/recruit', function(req, res, next) {
    res.render('interviewer/recruit', {
    });
});
/**
 * 简历录入
 */
router.get('/resumes', function(req, res, next) {
    res.render('candidate/resumes', {
    });
});
/**
 * 简历修改
 */
router.post('/resumess', function(req, res, next) {
    var selectSql = 'SELECT * FROM resumes where id='+req.body.id;
    pool.getConnection(function(err,conn){
        conn.query(selectSql,function(err,rs){
            conn.release(); //放回连接池
            res.render('candidate/resumes', {
                rs:rs,
                type:1
            });
        });
    });
});
/**
 * 公司介绍修改
 */
router.get('/profiles', function(req, res, next) {
    var selectSql = 'SELECT * FROM profile where account='+req.userInfo.username;
    pool.getConnection(function(err,conn){
        conn.query(selectSql,function(err,rs){
            conn.release(); //放回连接池
            res.render('interviewer/profile', {
                rs:rs,
                type:1
            });
        });
    });
});
/*
 * 应聘者注册
 * */
router.post('/user/register', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var isCandidate = req.body.isCandidate;
    if(username == "admin"){
        responseData.message = '该账号已存在';
        responseData.code = 2;
        res.json(responseData);
        return;
    }

    if(isCandidate == "1"){
        var selectSql = 'SELECT * FROM candidate WHERE account = ?'
        var Spar = [username];
    }
    else{
        var selectSql = 'SELECT * FROM interviewer WHERE account = ?'
        var Spar = [username];
    }
    pool.getConnection(function(err,conn){
        conn.query(selectSql,Spar,function(err,rs){
            conn.release(); //放回连接池
            if(rs.length){
                responseData.message = '该账号已存在';
                responseData.code = 2;
                res.json(responseData);
                return;
            }else{
                responseData.message = '注册成功';
                responseData.code = 1;
                res.json(responseData);
                insertCandidate();
            }
        })
    });
    function insertCandidate(){
        if(isCandidate == "1"){
            var addSql =  'INSERT INTO candidate(id,account,password) VALUES(?,?,?)';
            var par = [1,username,password];
        }
        else{
            var addSql =  'INSERT INTO interviewer(id,account,password) VALUES(?,?,?)';
            var par = [2,username,password];
        }
        add.set(addSql,par);
        add.insert();
    }
    return;
});
/*
 * 应聘者登录
 * */
router.post('/user/login', function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    var isCandidate = req.body.isCandidate;
    if(isCandidate == "1")
        var selectSql = 'SELECT * FROM candidate WHERE account = ?'
    else if(username == "admin")
        var selectSql = 'SELECT * FROM administrator WHERE account = ?'
    else
        var selectSql = 'SELECT * FROM interviewer WHERE account = ?'
    var Spar = [username];
    pool.getConnection(function(err,conn){
        conn.query(selectSql,Spar,function(err,rs){
            conn.release(); //放回连接池
            if(!rs.length){
                responseData.message = '该账号不存在';
                res.json(responseData);
                return;
            }else if(rs[0].password != password){
                responseData.message = '账号或密码不正确';
                res.json(responseData);
                return;
            }else{
                responseData.message = '登录成功';
                req.cookies.set('userInfo', JSON.stringify({
                    username:username,
                    id:rs[0].id
                }));
                res.json(responseData);
            }
        })
    });
});

/*
 * 公司信息入库
 * */
router.post('/profile/addprofile', function(req, res, next) {
    var account = req.userInfo.username;
    var addSql =  'INSERT INTO profile(account,name,address,introduce,type,num,post,tel) VALUES(?,?,?,?,?,?,?,?)';
    var par = [account,req.body.name,req.body.address,req.body.introduce,req.body.type,req.body.num,req.body.email,req.body.tel];
    add.set(addSql,par);
    add.insert();
    res.render('candidate/test', {
        userInfo: req.userInfo,
        url: '/job'
    });
});
/*
 * 公司信息修改
 * */
router.post('/profile/resprofile', function(req, res, next) {
    var account = req.userInfo.username;
    var updataSql =  'UPDATE profile SET account=?,name=?, address=?, introduce=?, type=?, num=?, post=?, tel=? WHERE account ='+account;
    var par = [account,req.body.name,req.body.address,req.body.introduce,req.body.type,req.body.num,req.body.email,req.body.tel];
    pool.getConnection(function(err,conn){
        conn.query(updataSql,par,function (err, result){
            conn.release(); //放回连接池
            if(err){
                console.log('[UPDATE ERROR] - ',err.message);
                return;
            }else{
                res.render('candidate/test', {
                    userInfo: req.userInfo,
                    url: '/job'
                });
            }
        })
    });
});
/*
 * 公司信息出库
 * */
router.get('/profile/checkprofile', function(req, res, next) {
    var selectSql = 'SELECT * FROM profile'
    pool.getConnection(function(err,conn){
        conn.query(selectSql,function(err,rs){
            conn.release(); //放回连接池
            if(!rs.length){
                console.log("还没有公司信息");
            }else{
                console.log(rs);
                console.log(rs[0].account);
            }
        })
    });
});
/*
 * 招聘信息入库
 * */
router.post('/recruit/addrecruit', function(req, res, next) {

    var account = req.userInfo.username;
    var data = new Date();
    var Month = data.getMonth()+1;
    var Day = data.getDate();
    var now = Month+"月"+Day+"日";
    var addSql =  'INSERT INTO recruit(account,name,position,experiencetime,salary,data,welfare,positionmessage,tel,postbox) VALUES(?,?,?,?,?,?,?,?,?,?)';
    var par = [account,req.body.name,req.body.position,req.body.experiencetime,req.body.salary,now,req.body.welfare,req.body.positionmessage,req.body.tel,req.body.post];
    add.set(addSql,par);
    add.insert();
    res.render('candidate/test', {
        userInfo: req.userInfo,
        url: '/job'
    });
});
/*
 * 招聘信息出库
 * */
router.get('/recruit/checkrecruit', function(req, res, next) {
    var selectSql = 'SELECT * FROM recruit'
    pool.getConnection(function(err,conn){
        conn.query(selectSql,function(err,rs){
            conn.release(); //放回连接池
            if(!rs.length){
                console.log("还没有公司信息");
            }else{
                console.log(rs);
                console.log(rs[0].account);
            }
        })
    });
});
/*
 * 招聘信息删除
 * */
router.post('/user/remove', function(req, res, next) {
    var delSql = 'DELETE FROM recruit where id='+req.body.id;
    pool.getConnection(function(err,conn){
        conn.query(delSql,function(err,rs){
            conn.release();
            responseData.message = 'ok';
            res.json(responseData);
            return;
        })
    });
});
/*
 * 简历入库
 * */
router.post('/resumes/addresumes', function(req, res, next) {
    var account = req.userInfo.username;
    var type = "A";
    var addSql =  'INSERT INTO resumes(account,name,sex,level,birthday,postbox,salary,position,time,experiencetime,data1,data2,school,major,record,experience,skill,diploma) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var par = [account,req.body.name,req.body.sex,type,req.body.birthday,req.body.postbox,req.body.salary,req.body.position,req.body.time,req.body.experiencetime,req.body.data1,req.body.data2,req.body.school,req.body.major,req.body.record,req.body.experience,req.body.skill,req.body.diploma];
    add.set(addSql,par);
    add.insert();
    res.render('candidate/test', {
        userInfo: req.userInfo,
        url: '/practice'
    });
});
/*
 * 简历修改
 * */
router.post('/resumes/add', function(req, res, next) {
    var account = req.userInfo.username;
    var type = "A";
   // var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
    //var modSqlParams = ['1', '123',6];
    //connection.query(modSql,modSqlParams,function (err, result)
    var updataSql =  'UPDATE resumes SET account=?,name=?,sex=?,level=?,birthday=?,postbox=?,salary=?,position=?,time=?,experiencetime=?,data1=?,data2=?,school=?,major=?,record=?,experience=?,skill=?,diploma=?  WHERE id ='+req.body.id;
    var par = [account,req.body.name,req.body.sex,type,req.body.birthday,req.body.postbox,req.body.salary,req.body.position,req.body.time,req.body.experiencetime,req.body.data1,req.body.data2,req.body.school,req.body.major,req.body.record,req.body.experience,req.body.skill,req.body.diploma];
    pool.getConnection(function(err,conn){
        conn.query(updataSql,par,function (err, result){
            conn.release(); //放回连接池
            if(err){
                console.log('[UPDATE ERROR] - ',err.message);
                return;
            }else{
                res.render('candidate/test', {
                    userInfo: req.userInfo,
                    url: '/practice'
                });
            }
        })
    });
});
//修改类别
router.post('/resumes/levl', function(req, res, next) {
    var updataSql =  'UPDATE resumes SET level=? WHERE id ='+req.body.id;
    var par = ["B"];
    pool.getConnection(function(err,conn){
        conn.query(updataSql,par,function (err, result){
            conn.release(); //放回连接池
            responseData.message = 'ok';
            res.json(responseData);
            return;
        })
    });
});
router.post('/resumes/levld', function(req, res, next) {
    var updataSql =  'UPDATE resumes SET level=? WHERE id ='+req.body.id;
    var par = ["A"];
    pool.getConnection(function(err,conn){
        conn.query(updataSql,par,function (err, result){
            conn.release(); //放回连接池
            responseData.message = 'ok';
            res.json(responseData);
            return;
        })
    });

});
/*
 * 简历出库
 * */
router.get('/resumes/checkresumes', function(req, res, next) {
    var selectSql = 'SELECT * FROM resumes'
    pool.getConnection(function(err,conn){
        conn.query(selectSql,function(err,rs){
            conn.release(); //放回连接池
            if(!rs.length){
                console.log("还没有公司信息");
            }else{
                console.log(rs);
                console.log(rs[0].account);
            }
        })
    });
});
module.exports = router;
