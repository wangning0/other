"use strict";

Function.prototype.myBind = function(targetThis) {
    var _this = targetThis;
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var F = function() {};
    var bound = function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return self.apply((this instanceof F ? this : targetThis), finalArgs);
    };
    F.prototype = self.prototype;
    bound.prototype = new F();
    return bound;
}

var x = 1;
var obj = {
    x: 2
}

var b = function() {
    console.log(this.x);
}

b.myBind(obj)();
