var el = require('./element');

var ul = el('ul',{id: 'list'}, [
    el('li',{class: 'item'}, ['Item 1']),
    el('li',{class: 'item'}, ['Item 2']),
    el('li',{class: 'item'}, ['Item 3'])
  ]);

var ulRoot = ul.render();
console.log(ulRoot.toString());


function diffChildren(oldrenChildren, newChildren, index) {
  oldrenChildren.forEach(function(child,i) {
    var newChild = newChildren[i];
    var leftNode = null;
    var currentIndex = index;
    currentIndex = (leftNode && leftNode.count) ?  : currentIndex + 1;
  })
}

function diff(newTree, oldTree) {
  var index = 0;
  var oldTreeChildren = oldTree.children;
}