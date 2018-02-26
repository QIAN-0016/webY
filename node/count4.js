var counter = function(arr){
    return "There are "+ arr.length + " elements in the array."
}

var adder = function(a, b){
    return `the sum of the 2 numbers is ${a+b}`;
}

var pi = 3.14;

module.exports.counter = counter;
module.exports.adder = adder;
module.exports.pi = pi;
