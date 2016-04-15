title: Gulp 与 Webpack 之旅
speaker: 王宁
url: https://github.com/ksky521/nodePPT
transition: cards
files: /js/demo.js,/css/demo.css
theme:moon
[slide data-transition="pulse"] 

# 前端自动化工具
## 分享者:王宁

[slide  data-transition="zoomout"]
# 基于流的自动化构建工具
## <p id="gulp">Gulp</p>
<style>
#gulp{
    color: red;
    font-size:40px;
    font-weight:bold;
}
</style>
[slide data-transition="zoomin"]
# 什么是Gulp
Gulp是一个自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见任务。Gulp是基于 Node.js 构建的，利用 Node 流的威力，你可以快速构建项目并减少频繁的 IO 操作。Gulp 和你用来定义任务的 Gulp 文件都是通过JavaScript来实现的。

[slide]
#什么是Stream(流)
Stream 是 nodejs 各种对象实现的抽象接口。比如一个 http server 的请求是一个 stream，stdout 也是一个。Streams 可读、可写，或者兼有的。所有的 stream 对象都是 EventEmitter 的实例。
[slide data-transition="vertical3d"]
#什么是流式
上一个的输出，是下一个的输入

上一个的输出，是下一个的输入

上一个的输出，是下一个的输入
[slide data-transition="slide"]
#linux pipe
流式和 linux pipe 是一样的（也可能是最早的起源）

```ps aux | grep node```
[slide data-transition="slide2"]
# NodeJs 中的 Stream
如果用一个形象的比喻来形容将一个文件的内容读取出来并写入另一个文件中，可以将它想象成文件内容像是水流，从一个文件“流”入另一个文件。
[slide data-transition="slide3"]
<pre id="pre">
<Code>
    'use strict';
     let fs = require('fs');
     fs.createReadStream('./in.txt')
       .pipe(fs.createWriteStream('./out.txt'));
       
       
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="horizontal3d"]
<pre id="pre">
<Code>
    "use strict";

let fs = require('fs');
let through = require('through2');

fs.createReadStream('./in.txt')
  .pipe(through.obj(function(contents,enc,done){
  		if (en === 'buffer') {
  			contents = contents.toString('utf-8');
  			enc = 'utf-8';
  		}
  		done(null,contents,enc);
  }))
  .pipe(through.obj(function(contents,enc,done) {
  	done(null,contents.toUpperCase(),enc);
  }))
  .pipe(fs.createWriteStream('./out.txt'));
       
       
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="horizontal"]
# 安装Gulp
`npm install —global gulp`

**建议做为项目的开发依赖进行安装**

`npm install —save-dev gulp`
[slide data-transition="vertical3d"]
#开始Gulp之旅
[slide]
<pre id="pre">
<Code>
var gulp = require('gulp');

gulp.task("sync1", function() {
	console.log('我是一个同步任务');
})

gulp.task('async', function() {
	setTimeout(function() {
		console.log('我是一个异步任务');
	}, 2000);
})
       
       
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="pulse"]
<pre id="pre">
<Code>
var gulp = require('gulp');

gulp.task("sync1", function() {
	console.log('我是一个同步任务');
})

gulp.task('async', function() {
	setTimeout(function() {
		console.log('我是一个异步任务');
	}, 2000);
})

gulp.task('default', ['sync1', 'async'], function() {
	console.log('这是默认的任务')
});
       
       
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="stick"]
<pre id="pre">
<Code>
var gulp = require('gulp');
gulp.task("sync1", function() {
	console.log('我是一个同步任务');
}
gulp.task("sync2", function() {
	console.log('我是另一个同步任务');
})
gulp.task("sync3", function() {
	console.log('我是又一个同步任务');
})
gulp.task('async', function() {
	console.log('老大喊我去搬砖');
	setTimeout(function() {
		console.log('我是一个异步任务');
	}, 2000);
})
gulp.task('default', ['sync1', 'sync2', 'sync3', 'async'], function() {
	console.log('这是默认的任务')
});   
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="glue"]
# 异步任务支持
让异步异步执行的三种方法
[slide]
# 接受一个 callback
<pre id="pre">
<Code>
var gulp = require('gulp');

gulp.task("sync1", function() {
	console.log('我是一个同步任务');
})

gulp.task('async', function(cb) {
	setTimeout(function() {
		console.log('我是一个异步任务');
		cb();
	}, 2000);
})

gulp.task('default', ['sync1', 'async'], function() {
	console.log('这是默认的任务')
});
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="earthquake"]
# 返回一个 stream
<pre id="pre">
<Code>
gulp.task('somename', function() {
  var stream = gulp.src('client/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('build'));
  return stream;
});
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="circle"]
# 返回一个 promise
<pre id="pre">
<Code>
var gulp = require('gulp');
var Q = require('q');

gulp.task("sync1", function() {
	console.log('我是一个同步任务');
})

gulp.task('async', function() {
	var deferred = Q.defer();

	setTimeout(function() {
		console.log('我是一个异步任务');
		deferred.resolve();
	}, 2000);

	return deferred.promise;
})

gulp.task('default', ['sync1', 'async'], function() {
	console.log('这是默认的任务')
});
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="zoomin"]
#Gulp最常用的API
[slide data-transition="zoomin"]
#gulp.src(globs[, options])

globs

类似于正则，但是不是正则！
[slide data-transition="zoomin"]
#gulp.dest(path[, options])
[slide]
#gulp.task(name[, deps], fn)
<pre id="pre">
<Code>
gulp.task('somename', function() {
  // 做一些事
});
gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {
  // 做一些事
});
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="horizontal3d"]
#举个栗子🌰
[slide]
 #Webpack
[slide]
#开始之前
[slide data-transition="glue"]
#webpack有多种加载器**Loader**,可以处理各种需要被处理的静态文件 
[slide data-transition="glue"]
# webpack支持**CommonJs** **AMD** **CMD**规范
[slide data-transition="glue"]
# 默认配置文件为webpack.config.js

* plugins插件项
* entry入口文件配置项
* output对应输出项配置
* module.loaders 最关键的配置，告知webpack不同的文件需要什么加载器进行处理
[slide data-transition="circle"]
#  模块系统的几种类型
[slide data-transition="circle"]
 #`<script>`标签类型

全局作用域下造成变量的冲突

模块与模块之间的依赖要解决 

在大型项目中难以维护和管理

文件加载顺序很重要
[slide data-transition="circle"]
#`CommonJs`
服务端模块能够重复利用

有优秀的包管理工具npm

不适合浏览器端的使用

不能做到并行加载模块
 [slide data-transition="circle"]
#`AMD`
并行加载模块

适合浏览器的异步加载机制


  [slide data-transition="circle"]
#`ES6` 
未来的ES规范

能够依赖的现有的模块少

浏览器对ES6的完全支持还需要一段时间

[slide data-transition="slide2"]
#Webpack带来的方便
可以让浏览器端使用CommonJs规范

把有依赖关系的各种文件打包成一系列的静态资源
[slide data-transition="slide2"]
#开启Webpack学习之旅
[slide data-transition="slide2"]
#安装webpack
`npm install webpack -g`


`npm install webpack --save-dev`
[slide data-transition="newspaper"]
#webpak命令行常见使用
`webpack`

`webpack --config customconfig.js`
[slide data-transition="horizontal3d"]
#举个例子
<pre id="pre">
<Code>
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: ['./src/index'],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "[name].js"
	},
	module: {
		loaders: [{
			test: /\.css/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'your app title',
			template: './app/index.html',
		})
	]
}
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="horizontal3d"]
#Webpack神器之HMR
[slide data-transition="horizontal3d"]
#webpack-dev-server
自动新建开发服务器
[slide data-transition="glue"]
#安装
`npm install webpack-dev-server --save-dev`
[slide data-transition="circle"]
# 举个栗子
<pre id="pre">
<Code>
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		'./src/index'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js"
	},
	module: {
		loaders: [{
			test: /\.css/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'your app title',
			template: './app/index.html',
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:8080'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="cards"]
#package.json
<pre id="pre">
<Code>
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --devtool eval --progress --colors --inline --hot "
  }
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="vertical3d"]
#举个栗子
<pre id="pre">
<Code>
var path = require('path');
var webpack = require('webpack');
// 编译后自动打开浏览器
// 产出html模板
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 单独样式文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].[hash:8].js",
    publicPath: '/'
  },
  resolve: {
    extension: ['', '.jsx', '.js', '.json'],
    alias: {}
  },
  'display-error-details': true,
  module: {
    noParse: [],
    loaders: [{
      test: /\.js[x]?$/,
      loaders: ['react-hot', 'babel'],
      exclude: path.resolve(__dirname, 'node_modules')
    }, {
      test: /\.css/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.less/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }]
  },
  plugins: [
    new ExtractTextPlugin("main.[hash:8].css", {
      allChunks: true,
      disable: false
    }),
    new HtmlWebpackPlugin({
      title: 'your app title',
      template: './app/index.html',
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ]
};
</Code>        
</pre>
<style>
#pre{
    font-size:20px;
}
</style>
[slide data-transition="slide"]
#Gulp和Webpack合在一起是什么样的体验呢？
[slide data-transition="slide"]
# 让我们举个综合的好吃的好用的大栗子
[slide data-transition="earthquake"]
# 谢谢大家！