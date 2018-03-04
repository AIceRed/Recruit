/**
 * Created by Administrator on 2018/1/21.
 */
var OptPool = require('./mysqlPool.js');

var optPool = new OptPool();
var pool = optPool.getPool();
var addSql;
var param;
function addPool(){
    this.set = function(AddSql,par){
        addSql = AddSql;
        param = par;
    }
    this.insert = function(){
        pool.getConnection(function(err,conn){
            conn.query(addSql,param,function(err,rs){
                if(err){
                    console.log('insert err:',err.message);
                    return;
                }
                conn.release(); //放回连接池
            })
        });
    }
};
module.exports = addPool;