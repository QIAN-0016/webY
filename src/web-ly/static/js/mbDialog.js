var addEvent = function(obj, sEv, fn){
	if(document.addEventListener){
		obj.addEventListener(sEv, fn, false);
	}else{
		obj.attachEvent('on'+sEv, fn);
	}
}
//自定义弹出层
var dialog = function(params){
	var title = params.title || "", //dialog标题
		desc = params.desc, //dialog内容
		eventType = params.eventType || "click", //绑定动作
		ok = params.ok || true, //是否显示确定按钮
		cancel = params.cancel || false, //是否显示取消按钮
		okVal = params.okVal || "确定",  //确定按钮显示文字
		okFun = params.okFun || function(){}, //确定回调函数
		cancelVal = params.cancelVal || "取消", //取消按钮显示文字
		cancelFun = params.cancelFun || function(){}, //取消回调函数
		closeFun = params.closeFun || function(){}; //关闭回调函数
		
	var okBtn = ok ? '<a class="okBtn" href="javascript:void(0);">' + okVal + '</a>' : '',
		cancelBtn = cancel ? '<a class="cancelBtn" href="javascript:void(0);">' + cancelVal + '</a>' : '';

	var innerTag = '<div class="dialog_popup">'+
		'<div class="mask"></div>'+
		'<div class="box">'+
		'<span>&times;</span>'+
		'<h1 class="title">' + title + '</h1>'+
		'<p class="cont">'+ desc + '</p>'+
		'<div class="btnBox">'+ okBtn + cancelBtn +'</div>'+
		'</div>'+
		'</div>';

	var parentNode = document.getElementsByTagName("body")[0];
	var wrapEle = null;

	wrapEle = document.createElement("div");
	wrapEle.style.display="block";
	wrapEle.innerHTML = innerTag;

	var curObj = parentNode.appendChild(wrapEle);
	
	addEvent(curObj.getElementsByTagName("span")[0],eventType,function(){
		if(curObj){
			curObj.parentNode.removeChild(curObj);
		};
		closeFun();
	},false);
	if(ok){
		addEvent(curObj.getElementsByTagName("a")[0],eventType,function(){
			if(curObj){
				curObj.parentNode.removeChild(curObj);
			};
			okFun();
		},false);
	}
	if(cancel){
		addEvent(curObj.getElementsByTagName("a")[1],eventType,function(){
			if(curObj){
				curObj.parentNode.removeChild(curObj);
			};
			cancelFun();
		},false);
	}
};