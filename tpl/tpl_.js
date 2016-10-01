var matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>/g
//text: 传入的模板文本字串
//data: 数据对象
var template = function(text,data){
    var index = 0;//记录当前扫描到哪里了
    var function_body = "var temp = '';";
    function_body += "temp += '";
    text.replace(matcher,function(match,interpolate,evaluate,offset){
        //找到第一个匹配后，将前面部分作为普通字符串拼接的表达式
        function_body += text.slice(index,offset);
                                                                                            
        //如果是<% ... %>直接作为代码片段，evaluate就是捕获的分组
        if(evaluate){
            function_body += "';" + evaluate + "temp += '";
        }
        //如果是<%= ... %>拼接字符串，interpolate就是捕获的分组
        if(interpolate){
            function_body += "' + " + interpolate + " + '";
        }
        //递增index，跳过evaluate或者interpolate
        index = offset + match.length;
        //这里的return没有什么意义，因为关键不是替换text，而是构建function_body
        return match;
    });
    //最后的代码应该是返回temp
    function_body += "';return temp;";
}