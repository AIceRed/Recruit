/**
 * Created by Administrator on 2018/3/6.
 */
var can = document.getElementById("canvas");
//设置画布的绘图环境
var cxt = can.getContext("2d");
//设置画布的宽高
var w = can.width = window.innerWidth;
var h = can.height = window.innerHeight;
window.onresize = function(){
    w = can.width = window.innerWidth;
    h = can.height = window.innerHeight;
}
//创建一个雨滴对象（女娲造人）
function Drop(){}//代表人类(概念)
//添加原型(给人添加属性)
Drop.prototype = {
    //初始化功能
    init : function(){
        //初始化x y 坐标
        this.x = random(0,w);
        this.y = 0;
        this.vy = random(4,5);//y坐标改变的速度
        //console.log(this)谁用指代谁
        this.l = random(0.8*h,0.9*h);//下落的高度
        this.r = 1;//初始半径
        this.vr = 1;//半径增大的速度
        this.a = 1;//初始透明度
        this.va = 0.96;//透明度改衰减系数
    },
    draw : function(){
        if (this.y > this.l)
        {
            //绘制圆形
            cxt.beginPath();//开始路径
            cxt.strokeStyle = "rgba(0,255,255,"+this.a+")";
            cxt.arc(this.x,this.y,this.r,0,Math.PI*2,false);
            cxt.stroke();
        }else{
            cxt.fillStyle = "#0ff";
            cxt.fillRect(this.x,this.y,2,10);
        }
        //更新坐标
        this.update();
    },
    //y坐标更新的过程
    update : function(){
        //雨滴下落
        if (this.y < this.l)
        {
            this.y += this.vy;
        }else{//半径增大
            if (this.a > 0.03)
            {
                this.r += this.vr;
                if (this.r > 50)
                {
                    //让透明度减小了
                    this.a *= this.va;
                }
            }else{
                //重新初始化雨滴
                this.init();
            }
        }
    }
}
//实例化雨滴对象
var drops = [];
for (var i=0;i<30 ;i++ )
{
    setTimeout(function(){
        var drop = new Drop();
        drop.init();
        drops.push(drop)
    },i*200)

}
function move(){
    cxt.fillStyle = "rgba(251,251,240,0.1)";
    cxt.fillRect(0,0,w,h);
    for (var i=0;i<drops.length ;i++ )
    {
        drops[i].draw()
    }
    requestAnimationFrame(move);
}
move();
//生成随机数
function random(min,max){
    return Math.random()*(max - min) + min;
}