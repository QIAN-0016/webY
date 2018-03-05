function waterfall(cls){
    if(!$(cls).length) return;//没有元素
    var con={
        obj:null,//图片div对象
        l:0, //总共数量
        w:276,//列宽
        s:13,//列间距
        list:0, //多少列
        h:1, //外div的高
        arr:[],//最后一排数组
        state:"loading", //状态 loading:加载图片中，ajax:正在发生ajax请求，finish:完成任务，load_resize:加裁过程中窗口变化(记录起来，加载完后处理)，resize:执行了窗口变化，reset:窗口变化排序中再次重排
        ww:640 // 当前窗口宽度大小
    };
    con.ww=$(".pro_wrap").width();
    con.obj=$(cls);//图片div对象
    con.l=con.obj.size();//统计共有多少个图片div
    con.w=$(cls).outerWidth();
    con.s=13/640*con.ww;
    con.list=Math.floor($("#pro_cnt").width()/(con.w+con.s));//统计共有多少列
    console.log(con.w);
    fall_pic(0);
    $(window).resize(function(){
        con.w=$(cls).outerWidth();
        var w=Math.floor($("#pro_cnt").width()/(con.w+con.s));//重新统计共有多少列
        if(w!=con.list){
            //窗口变化造成列数发生了变化
            if("loading|load_resize|ajax".indexOf(con.state)!=-1){
                //如果正在加载中,需要加载完后再执行重排
                con.state="load_resize";
            }else{
                //已经排完或者执行重排过程
                con.list=w;
                con.h=1;
                if("finish"==con.state){
                    con.state="resize";//执行重排
                    fall_pic(0);
                }else{
                    con.state="reset";//重排中的重排
                    //因为已经在重排过程中，不能再次调用函数。但可让编号再从0开始
                }
            }
        }
    }).scroll(function(){
                if("finish"==con.state){
                    var top=con.obj.last().offset().top;//最后一张图片的坐标
                    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop||0;//滚动条距离
                    var windowHeight=document.documentElement.clientHeight||document.body.clientHeight||0;//窗口高度
                    if(windowHeight+scrollTop-433>=top){
                        // 滚动条触底时触发加载请求
                        waterfallPost(Math.ceil(con.l/pageListNum));
                    }
                }
            });
    function fall_pic(n){
        if("reset"==con.state){
            n=0;//处理重排中窗口再次变化
            con.state="resize";
        }
        //以下con.state可能存在的值为 loading,ajax,load_resize,resize
        if(n<con.l){
            var obj=con.obj.eq(n);//获取对象
            var x= 36/640*con.ww,y=0;//对象坐标值
            if(n<con.list){
                x=x+n*(con.w+con.s);//如果是第一排，y=0,x=宽度+列间距
                con.arr[n]=obj;//把最后一排对象组成数组供后面用
            }else{
                var _i=0;//查一下最后一排哪张图片的底部离顶部最高，然后在其后面插入新图片
                for(var i= 0;i<con.list;i++){
                    var _top=con.arr[i].position().top+con.arr[i].outerHeight(true)+con.s;
                    if(0==y)y = _top;
                    if(y>_top){
                        _i=i;
                        y=_top;
                        x=x+i*(con.w+con.s);
                    }
                }
                con.arr[_i]=obj;//替换数组
            }
            if("resize"==con.state){
                //如果是窗口变化，属于重排，不需要预加载图片
                if(y==obj.position().top&&x==obj.position().left){                        
                    n++;//原位不变的跳过排序动画
                    fall_pic(n);
                }else{
                    //$("body,html").scrollTop(y);//设置滚动条，与动画同步
                    var _h=y+obj.outerHeight(true);
                    if(_h>con.h){
                        con.h=_h;
                        $("#pro_cnt").stop().animate({height:_h},"fast");//设置外框高
                    }
                    obj.animate({top:y,left:x},"fast",function(){
                        n++;
                        fall_pic(n);
                    });
                }
            }else{
                var img=new Image();
                img.onload=function(){
                    //$("body,html").scrollTop(y);//设置滚动条，与动画同步
                    var _h=y+obj.outerHeight(true);
                    if(_h>con.h){
                        con.h=_h;
                        $("#pro_cnt").stop().animate({height:_h},"fast");//设置外框高
                    }
                    obj.css({top:y,left:x}).fadeIn("slow",function(){
                        n++;
                        fall_pic(n);
                    });
                };
                img.onerror=function(){
                    //加载失败就替换图片，并省去设置外围div的高
                    obj.css({top:y,left:x}).fadeIn("slow",function(){
                        n++;
                        fall_pic(n);
                    }).find("img").attr("src","../static/img/ft_logo.png");
                };
                img.src=obj.find("img").attr("src");
            }
        }else{
            setTimeout(function(){
                if("load_resize"==con.state&&con.list!=Math.floor($("#pro_cnt").width()/(con.w+con.s))){
                    con.state="finish";//如果是在预加载图片时改变了窗口大小需要重排的情况
                    $(window).resize();
                }else{
                    con.state="finish";//延时一下，以防自动不断触发scroll
                    var top=con.obj.last().offset().top;//最后一张图片的坐标
                    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop||0;//滚动条距离
                    var windowHeight=document.documentElement.clientHeight||document.body.clientHeight||0;//窗口高度
                    if(windowHeight+scrollTop-433>=top){
                        // 滚动条触底时触发加载请求
                        waterfallPost(Math.ceil(con.l/pageListNum));
                    }
                }
            },200)
        }
    }
    this.waterList =  function(data){  // data 懒加载数据数组
        con.state="ajax";//当滚动条拉到看到最后一张图片时
        var html='';
        var len = data.length;
        for(var i=0;i<len;i++){
            html+='<div class="cell">'+
                    '<a class="cell_img"><img src="'+data[i].imgUrl+'"></a>'+
                    '<p>2018 高复组作品</p>'+
                    '<div class="meta_item">'+
                        '<div class="fl like_group">'+
                            '<a class="fl like_btn" onclick="like('+data[i].id+')">喜欢</a>'+
                            '<em class="fl like_num like_num_'+data[i].id+'">'+data[i].likeNum+'</em>'+
                        '</div>'+
                        '<div class="fr comment">'+
                            '<a href="'+data[i].commentUrl+'">评论('+data[i].commentNum+')</a>'+
                        '</div>'+
                    '</div>'+
                '</div>';
        }
        $("#pro_cnt").append(html);
        con.obj=$(cls);//更新对象
        var _i=con.l;//记录加载前的最后一个编号
        con.l=con.obj.size();//统计现在共有多少张图片
        fall_pic(_i);//接着加载前最一张图片排序;
        wflag=false;
    }
}