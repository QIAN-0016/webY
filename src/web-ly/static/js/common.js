function dialogTip(txt){ //弹框提示 
    if($(".dialog_tip").length<1){
        $("body").append('<p class="dialog_tip">'+txt+'</p>')
        setTimeout(function(){
            $(".dialog_tip").animate({
                opacity:0
            },300,function(){
                $(this).hide().css('opacity',1).remove();
            });
        },600);
    }
}
$(function(){
    // navbar 隐藏|显示
    $(".navbar_close,.navbar_dialog").click(function(){
        var nbh = $(".navbar_header").height();
        $(".navbar_header").animate({
            "marginTop":-nbh
        },300,function(){
            $(".navbar_nav dl").removeClass("in");
            $(".navbar_nav dl dd").hide();
            $(".navbar_header").hide().css({"marginTop":0});
            $(".navbar_toggle").show();
        });
        $(".navbar_dialog").animate({"opacity":0},100,function(){
            $(".navbar_dialog").hide().css({"opacity":1});
        });
    });
    $(".navbar_toggle").click(function(){
        var nbh = $(".navbar_header").height();
        $(".navbar_dialog").show();
        $(".navbar_header").slideDown(300);
        $(".navbar_toggle").hide();
    });

    // navbar 下拉效果
    $(".navbar_nav dl dt").click(function(){
        var _this = $(this);
        if(!_this.parents("dl").hasClass("in")){
            $(".navbar_nav dl").removeClass("in");
            $(".navbar_nav dl dd").slideUp(300);
            _this.parents("dl").addClass("in");
            _this.parents("dl").find("dd").slideDown(300);
        }else{
            $(".navbar_nav dl").removeClass("in");
            $(".navbar_nav dl dd").slideUp(300);
        }
    });
});