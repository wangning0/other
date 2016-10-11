var MyModules = (function Manage() {
  var modules = {};
  function define(name,deps,impl) {
    for(var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl,deps);
  }
  function get(name) {
    return modules[name];
  }
  return {
    define:define,
    get:get
  }
})();
console.log(MyModules);


MyModules.define("bar",[],function() {
  function hello(who) {
    return "Let me introduce:" + who;
  }
  return {
    hello:hello
  }
})

MyModules.define("foo",["bar"],function() {
  var hungery = "hippo";

  function awesome() {
    console.log(bar.hello(hungery));
  }

  return {
    awesome:awesome
  }
})
var bar = MyModules.get("bar");
var foo = MyModules.get("foo");
console.log(bar.hello("hippo"));
foo.awesome();
