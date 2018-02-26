// nodejs 基础3
// 函数 函数表达式 回调函数

function calFun(fun,name){
    fun(name);
}

var sayBye = function(name){
    console.log(name+" Bye!");
}
calFun(sayBye, "hhh");
