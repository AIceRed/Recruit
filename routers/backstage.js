/**
 * Created by Administrator on 2018/1/20.
 */
var express = require('express');
var router = express.Router();
/**
 * 首页
 */
router.get('/', function(req, res, next) {
    res.render('administrator/index', {
    });
});

module.exports = router;