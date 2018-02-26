// nodejs 基础5
// util  nodejs 工具库

var events = require("events");
var util = require("util");

// 定义类，继承类事件属性
var Person = function(name){
    this.name = name;
};

util.inherits(Person, events.EventEmitter);

var xiaoming = new Person('xiaoming');
var lili = new Person('lili');
var lucy = new Person('lucy');

var person = [xiaoming,lili,lucy];

person.forEach(function(person){
    // 绑定事件
    person.on('speak',function(message){
        console.log(person.name + " said: "+ message);
    });
});

// 触发事件
xiaoming.emit("speak", 'hi');
lucy.emit("speak", "I want a curry");


// var myEmitter = new events.EventEmitter();

// myEmitter.on('someEvent', function(message){
//     console.log(message);
// });

// myEmitter.emit("someEvent", "the event was emitted");
