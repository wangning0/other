var words = document.getElementsByTagName('td');
var content_body = document.querySelector('.content_body');
var words_blank = content_body.getElementsByTagName('button');
var q_number = document.querySelector('.q_number');
var touch_btn = document.querySelector('.touch_btn');
var header = document.querySelector('.header');
var content = document.querySelector('.content');
var number_btn = q_number.getElementsByTagName('button');
var number_li = q_number.getElementsByTagName('li');
var active_choose_onoff = false;
var scroll_onoff = false;
var active_choose_num;
var lastInnerHTML;

words_blank = Array.prototype.slice.call(words_blank, 0);
words = Array.prototype.slice.call(words, 0);
number_btn = Array.prototype.slice.call(number_btn, 0);

words_blank.forEach(function(item, index) {
	item.addEventListener('click', function() {
		var number_li_active_choose;
		active_choose = content_body.querySelector('.active_choose');
		number_li_active_choose = q_number.querySelector('.active_choose_li');
		number_li_active_choose ? number_li_active_choose.removeChild(number_li_active_choose.childNodes[1]) : '';
		number_li[index].setAttribute('class', 'active_choose_li');
		number_li_active_choose ? number_li_active_choose.removeAttribute('class') : '';
		item.setAttribute('class', 'active_choose');
		active_choose ? active_choose.removeAttribute('class') : '';
		active_choose_onoff = true;
		active_choose_num = index;
		var span = document.createElement('span');
		number_li[index].appendChild(span);
	})
})

words.forEach(function(item, index) {
	item.addEventListener('mouseover', function() {
		active_choose = content_body.querySelector('.active_choose');
		active_choose ? active_choose.innerText = item.innerText : '';
	})
	item.addEventListener('mouseout', function() {
		active_choose = content_body.querySelector('.active_choose');
		active_choose ? active_choose.innerText = '' : '';
	})
	item.addEventListener('click', function() {
		if (active_choose_onoff) {
			active_choose = content_body.querySelector('.active_choose');
			active_choose ? active_choose.innerText = item.innerText : '';
			active_choose ? active_choose.removeAttribute('class') : '';
			item.setAttribute('class', 'choosed');
			number_btn[active_choose_num].setAttribute('class', 'choosed');
			active_choose_onoff = false;
		}
	})
})

touch_btn.addEventListener('mousedown', function(e) {
	scroll_onoff = true;
	console.log(e.clientY - header.offsetHeight);
})
touch_btn.addEventListener('mouseup', function() {
	scroll_onoff = false;
})
touch_btn.addEventListener('mousemove', function(e) {
	console.log(scroll_onoff);
	if (scroll_onoff) {
		var headerHeight = header.offsetHeight;
		//console.log(e.clientY);
		var scrollHeight = e.clientY - headerHeight - 40;
		console.log(scrollHeight);
		content.style.height = scrollHeight + 'px';
	}
})