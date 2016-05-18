< !DOCTYPE html >
	<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>jquery拖拽改变div大小效果 - 建站特效http://51xuediannao.com</title>
<meta name="keywords" content="jquery拖拽,改变大小" />
<meta name="description" content="jquery拖拽改变div大小效果" />

<style>
*{margin:0;padding:0;}
ul,ol,li{list-style: none;}
#wrap{width:660px;height: 150px;margin:10px auto;position: relative;clear:both;background: #0cc;}
#wrap li{width: 220px;float: left;height: 150px;background: #ccc;overflow: hidden;
		text-align: center;line-height: 50px;}
#wrap li.li1{background: #777;}
#wrap li.li2{background: #ccc;}
#wrap li.li3{background: #999;}
#wrap label{float: left;width: 10px;height: 150px;
			position: absolute;cursor: e-resize;}
#wrap label.lab1{left: 210px;background: #f00;}
#wrap label.lab2{left: 434px;background:#ff0;}
</style>
</head>
<body>
    <div id='wrap'>
	<ul>
		<li class="li1"></li>
		<label class="lab1" id='lab1'>1</label>
		<li class="li2"><a href="http://www.51xuediannao.com">懒人建站</a> http://www.51xuediannao.com 整理</li>
		<label class="lab2">2</label>
		<li class="li3"></li>
	</ul>
</div>

<div id='test' style="clear:both;"></div>

<script type="text/javascript" src="http://lib.sinaapp.com/js/jquery/1.9.0/jquery.min.js"></script>
<script>
$(function(){
	var clickX, leftOffset, inx, nextW2, nextW;
	var dragging  = false;
	var doc 	  = document;
	var labBtn 	  = $("#wrap").find('label');
	var wrapWidth = $("#wrap").width();

	labBtn.bind('mousedown',function(){
			dragging   = true;
			leftOffset = $("#wrap").offset().left;
			inx 	   = $(this).index('label');
		}
	);

	doc.onmousemove = function(e){
		if (dragging) {
			labBtn.eq(inx).prev().text( labBtn.eq(inx).prev().width() );
			labBtn.eq(inx).next().text( labBtn.eq(inx).next().width() );
			//--------------------------------------------
			clickX = e.pageX;
			$("#test").text( '鼠标位置：' + clickX );
			
			//判断第几个拖动按钮
			if( inx == 0 ){

				//第一个拖动按钮左边不出界
				if(clickX > leftOffset) {
					labBtn.eq(inx).css('left', clickX - 7 - leftOffset + 'px');//按钮移动

					labBtn.eq(inx).prev().width( clickX-leftOffset + 'px');
					nextW2 = clickX-leftOffset;
					labBtn.eq(inx).next().width( wrapWidth - nextW2 - labBtn.eq(inx+1).next().width() + 'px');
				} else {
					labBtn.eq(inx).css('left', '0px');
				}


				if(clickX > (labBtn.eq(inx+1).offset().left-5)) {
					//第一个按钮右边不出界
					labBtn.eq(inx).css('left', parseFloat(labBtn.eq(inx+1).css('left')) -11 + 'px');
					//第一个按钮，左右容器不出界
					labBtn.eq(inx).prev().width( labBtn.eq(inx).offset().left + 6 - leftOffset + 11 + 'px' );
					labBtn.eq(inx).next().width( '0px' );
				} 

			} else {

				//第二个拖动按钮左边不出界
				if( (clickX) > labBtn.eq(inx-1).offset().left + 10 ) {
					labBtn.eq(inx).css('left', clickX - 7 - leftOffset + 'px'); //按钮移动

					labBtn.eq(inx).prev().width( (clickX-leftOffset-labBtn.eq(inx-1).prev().width()) + 'px');
					nextW = clickX - leftOffset;
					labBtn.eq(inx).next().width( wrapWidth - nextW  + 'px');
				} else {
					//第二个按钮向左移动不出界
					labBtn.eq(inx).css('left', parseFloat(labBtn.eq(inx-1).css('left')) +10 + 'px');

					//第二个按钮左右容器，不出界
					labBtn.eq(inx).prev().width('0px')
					labBtn.eq(inx).next().width( wrapWidth - labBtn.eq(inx-1).prev().width() );
				}

				if( clickX >= (leftOffset + wrapWidth) ) {
					//第二个按钮右边不出界
					labBtn.eq(inx).css('left', wrapWidth -10 + 'px'); //减去按钮的宽度
					//第二个按钮左右容器，右边不出界
					labBtn.eq(inx).prev().width( wrapWidth - labBtn.eq(inx-1).prev().width());
					labBtn.eq(inx).next().width( '0px' );
				}

			}
		}
	};

	$(doc).mouseup(function(e) {
	    dragging = false;
	    e.cancelBubble = true;
	})
})
</script>



<!--下面只是说明与程序代码无关-->
<div style="height:auto; display:block; margin:0 auto; margin-top:30px; font-size:10pt; line-height:150%;">
<span>本代码由<a href="http://www.51xuediannao.com" style="color:#F00;">懒人建站</a> 收集整理 我要学电脑.COM →www.51xuediannao.com </span><br>
<a href="http://www.51xuediannao.com">懒人建站</a> http://www.51xuediannao.com<br/>
<span>我们为您提供-
<a href="http://www.51xuediannao.com">jquery特效</a>，
<a href="http://www.51xuediannao.com/JS">JS代码</a>，
<a href="http://www.51xuediannao.com/JS/texiao">网页特效</a>，
<a href="http://www.51xuediannao.com/jiqiao/css/">CSS技巧</a>；</span>
<span>懒人建站只收录实用和能提高用户体验的代码</span>
<span>我们只想解放出你的部分写代码时间来思考更高层次的设计，而不是要你懒惰、拼凑。</span>
<p><a href="http://www.lrjz100.com">经典语录</a></p>
</div>
</body>
</html>