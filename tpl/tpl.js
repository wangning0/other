var tplEngine = function(tpl) {
    var reg = /<%([^%>]+)?%>/g;
    var code = 'var r = [];\n';
    var cursor = 0;
    var regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
    var add = function(line, js) {
        js? (code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }

    while(match = reg.exec(tpl)) {
        add(tpl.slice(cursor,match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }

    add(tpl.substr(cursor,tpl.length - cursor));

    code += 'return r.join(" ")';
    return new Function('posts',code);
}

var tpl = '<% for(var i = 0; i < posts.length; i++) {' +　
        'var post = posts[i]; %>' +
        '<% if(!post.expert){ %>' +
            '<span>post is null</span>' +
        '<% } else { %>' +
            '<a href="#"><% post.expert %> at <% post.time %></a>' +
        '<% } %>' +
    '<% } %>';
var data = [{expert:'1'},{expert:'2'},{expert:'3'}];
console.log(tplEngine(tpl)([1,2,{expert:'saa',time:'12-21-2'}]));