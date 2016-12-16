/**
 * Created by 80474 on 2016/12/16.
 */
import React, {Component} from 'react';
import './swiper.css';
const Swiper = React.createClass({
    componentDidMount(){
        //接收组件传来的两个参数
        var parent=this.props.parentBox,move=this.props.moveBox;
        //写js原生代码
        //组件渲染完成执行js代码
        (function(){
            //定义一个轮播对象
            function LunBo(parentBox,moveBox){
                this.parentNode=document.getElementById(parentBox);
                this.moveNode=document.getElementById(moveBox);
                this.index=0;//轮播图索引号
                this.squareIndex=0;//方块索引号
                this.timer=null;//定时器
                this.render();//new时直接开启一个轮播图效果
            }
            LunBo.prototype.render=function(){
                //1.动态添加方块
                this.addSqure();
                //2.移入方块添加高亮效果5.并切换当前图片索引号，暂停定时器
                this.squareMoveHightlight();
                //3.图片自动轮播
                this.autoplay();
                //4.实现图片轮播的同时，方块跟着变颜色
                //this.setSquare(this.index);
                //6.大盒子的移入移出同步到定时器的开启和关闭
                this.setBox();
            }
            LunBo.prototype.addSqure=function(){
                //在轮播图中动态添加小方块
                //通过轮播图片的数量来动态添加方块数量
                //先动态创建ol标签
                var ol=document.createElement("ol");
                //把ol标签添加到类为img的标签后面
                this.moveNode.parentNode.appendChild(ol);
                var lis=this.moveNode.children;
                for(var i=0,len=lis.length;i<len;i++){
                    //向ol里依次添加方块li
                    //先创建li元素
                    var li=document.createElement("li");
                    //li标签写数字
                    li.innerHTML =i+1;
                    ol.appendChild(li);
                }
                this.ol=ol;
            };
            LunBo.prototype.squareMoveHightlight=function(){
                //添加小方块移动高亮添加样式的效果
                //获得ol下面的所有li元素
                var lis=this.ol.children;
                //刚开始默认第一个高亮
                lis[0].className="current";
                //遍历下面所有的li元素，并绑定事件移入移出事件
                for(var i=0,len=lis.length;i<len;i++)
                {
                    var that=this;
                    //采用闭包的方式，实现得到索引号的效果
                    lis[i].addEventListener("mouseenter",(function(index){
                        return function(){
                            //alert(index)闭包测试;
                            //先清除定时器
                            clearInterval(that.timer);
                            //清除所有的样式效果，只给当前索引号去添加高亮效果
                            clearClass();
                            lis[index].className="current"
                            //并调到当前索引号下的图片
                            //得到每张轮播图片的宽度
                            var width=that.moveNode.parentNode.offsetWidth;
                            animate(that.moveNode,-index*width,30);
                            that.index=index;//把移动的索引号赋值lunbo内部定义的索引号
                            that.squareIndex=index;//
                        }
                    })(i));
                    lis[i].addEventListener("mouseleave",function(){
                        clearClass();
                        clearInterval(that.timer);
                        var lis=that.moveNode.children;
                        //得到每张轮播图片的宽度
                        var width=that.moveNode.parentNode.offsetWidth;
                        //重新设置定时器
                        that.timer=setInterval(function(){
                            that.auto(lis,width);
                        },2000);
                    })
                }
                function clearClass(){
                    for(var i=0,len=lis.length;i<len;i++){
                        lis[i].className="";
                    }
                }
            };
            LunBo.prototype.autoplay=function(){
                //定义图片自动无缝轮播
                //克隆第一张图片到最后
                var lis=this.moveNode.children;
                this.moveNode.appendChild(lis[0].cloneNode(true));
                //得到每张轮播图片的宽度
                var width=this.moveNode.parentNode.offsetWidth;
                //this指向陷阱
                var that=this;
                this.timer=setInterval(function(){
                    that.auto(lis,width);
                },2000);
            };
            LunBo.prototype.auto=function(lis,width){
                this.index++;//轮播图索引号++
                this.squareIndex++;//方块索引++
                console.log(this.index);
                if(this.index>=lis.length){
                    this.moveNode.style.left=0;
                    this.index=1;
                    //上面的代码实现了无缝滚动
                }
                if(this.squareIndex>lis.length-2){
                    this.squareIndex=0;
                }
                //console.log(that.squareIndex);
                //console.log(that.moveNode);
                //that.moveNode.style.left=that.moveNode.offsetLeft-width+"px";
                animate(this.moveNode,-this.index*width,20);
                this.setSquare(this.squareIndex);

            };
            LunBo.prototype.setSquare=function(i){
                var lis=this.ol.children;
                clearClass();
                lis[i].className="current";
                function clearClass(){
                    for(var i=0,len=lis.length;i<len;i++){
                        lis[i].className="";
                    }
                }
            };
            LunBo.prototype.setBox=function(){
                var that=this;
                this.parentNode.addEventListener("mouseenter",function(){
                    //清除定时器
                    clearInterval(that.timer);
                });
                this.parentNode.addEventListener("mouseleave",function(){
                    clearInterval(that.timer);
                    //重新开启定时器
                    var lis=that.moveNode.children;
                    //得到每张轮播图片的宽度
                    var width=that.moveNode.parentNode.offsetWidth;
                    //重新设置定时器
                    that.timer=setInterval(function(){
                        that.auto(lis,width);
                    },2000);
                })
            };
            //封装一个简单的动画函数
            function animate(obj,target,speed){
                clearInterval(obj.timer)//清除定时器
                var speeds =target>obj.offsetLeft?speed:-speed;
                obj.timer=setInterval(function(){
                    var result =target-obj.offsetLeft;
                    obj.style.left =obj.offsetLeft +speeds+"px";
                    if(Math.abs(result)<=speed)
                    {
                        clearInterval(obj.timer);
                        obj.style.left =target+"px";
                    }
                },10)
            };
            //实例化一个轮播对象，并渲染轮播效果
            var swiper=new LunBo(parent,move);
        })()
    },
    render(){
        return  (
            <div className="box" id={this.props.parentBox}>
                <div className="img">
                    <ul id={this.props.moveBox}>
                        {this.props.children}
                    </ul>
                </div>
            </div>
        )
    }
});
module.exports=Swiper;