/*
	还没有实现锚点连接跳转
*/
var words = document.getElementsByTagName('td');
var content_body = document.querySelector('.content_body');
var words_blank = content_body.getElementsByTagName('a');
var q_number = document.querySelector('.q_number');
var touch_btn = document.querySelector('.touch_btn');
var header = document.querySelector('.header');
var content = document.querySelector('.content');
var number_btn = q_number.getElementsByTagName('a');
var number_li = q_number.getElementsByTagName('li');
var submit = document.querySelector('.submit');
var container = document.querySelector('.container');
var showResult = document.querySelector('.showResult');
var checkout_analysise = document.querySelector('.checkout_analysise');
var percent = document.querySelector('.percent');
var showResult_body_table = document.querySelector('.showResult_body_table').getElementsByTagName('table')[0];

var active_choose_onoff = false;
var scroll_onoff = false;
var active_choose_num;
var lastInnerHTML;
var active_choose = null;
var answer_choose = [];
var answer_onoff = true;
//后台传取的数据
var right_answer = ['developing', 'average', 'dramatically', 'results', 'shared', 'basis', 'monitor', 'including', 'detection', 'symptoms']
var answer_analysis = ['第1题的文字解析', '第2题的文字解析', '第3题的文字解析', '第4题的文字解析', '第5题的文字解析', '第6题的文字解析', '第7题的文字解析', '第8题的文字解析', '第9题的文字解析', '第10题的文字解析'];
words_blank = Array.prototype.slice.call(words_blank, 0);
words = Array.prototype.slice.call(words, 0);
number_btn = Array.prototype.slice.call(number_btn, 0);

/*
	选择部分
*/
words_blank.forEach(function(item, index) {
	item.addEventListener('click', function() {
		if (answer_onoff) {
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
		}
	})
})
number_btn.forEach(function(item, index) {
	item.addEventListener('click', function() {
		if (answer_onoff) {
			words_blank[index].setAttribute('class', 'active_choose');
			active_choose ? active_choose.removeAttribute('class') : '';
			active_choose_onoff = true;
			active_choose_num = index;
		}
		var number_li_active_choose;
		active_choose = content_body.querySelector('.active_choose');
		number_li_active_choose = q_number.querySelector('.active_choose_li');
		number_li_active_choose ? number_li_active_choose.removeChild(number_li_active_choose.childNodes[1]) : '';
		number_li[index].setAttribute('class', 'active_choose_li');
		number_li_active_choose ? number_li_active_choose.removeAttribute('class') : '';
		var span = document.createElement('span');
		number_li[index].appendChild(span);
	})
})
words.forEach(function(item, index) {
	item.addEventListener('mouseover', function() {
		if (answer_onoff) {
			active_choose = content_body.querySelector('.active_choose');
			active_choose ? active_choose.innerText = item.innerText : '';
		}
	})
	item.addEventListener('mouseout', function() {
		if (answer_onoff) {
			active_choose = content_body.querySelector('.active_choose');
			active_choose ? active_choose.innerText = '' : '';
		}
	})
	item.addEventListener('click', function() {
		if (active_choose_onoff && answer_onoff) {
			active_choose = content_body.querySelector('.active_choose');
			active_choose ? active_choose.innerText = item.innerText : '';
			active_choose ? active_choose.removeAttribute('class') : '';
			answer_choose[active_choose_num] = item.innerText;
			item.setAttribute('class', 'choosed');
			number_btn[active_choose_num].setAttribute('class', 'choosed');
			active_choose_onoff = false;
		}
	})
})

touch_btn.addEventListener('mousedown', function(e) {
	scroll_onoff = true;
})
touch_btn.addEventListener('mouseup', function() {
	scroll_onoff = false;
})
touch_btn.addEventListener('mousemove', function(e) {
	if (scroll_onoff) {
		var headerHeight = header.offsetHeight;
		var scrollHeight = e.clientY - headerHeight - 40;
		content.style.height = scrollHeight + 'px';
	}
})

/*
	交卷部分
*/

/*


var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var wrong = [1, 3, 5];
var number = a.length / 5;
var str = '';

for (var i = 0; i < number; i++) {
	var temp;
	temp = a.slice(0 + 5 * i, 5 * (i + 1));
	str += '<tr>'
	temp.forEach(function(item, index) {
		var className = 'show_right';
		for (var j = 0; j < wrong.length; j++) {
			if (item == wrong[j]) {
				className = 'show_error';
			}
		}
		str += '<td class="' + className + '">' + item + '</td>';
	})
	str += '</tr>';
}

*/

submit.addEventListener('click', function() {
	answer_onoff = false;
	var wrongInfoObj = checkAnswer(answer_choose, right_answer);
	q_number.querySelector('.choosed') ? q_number.querySelector('.choosed').removeAttribute('class') : '';
	//container.style[z - index] = 1;
	container.style.background = 'rgb(128,128,128)';
	showResult.style.display = 'block';
	q_number.style.opacity = '0';
	//wrongInfoObj
	percent.innerText = wrongInfoObj.rightPercent + '%';
	var str = showAnswerNumber(wrongInfoObj.wrongIndex, right_answer);
	words_blank.forEach(function(item) {
		item.setAttribute('class', 'right');
	})
	number_btn.forEach(function(item) {
		item.setAttribute('class', 'right');
	})
	showResult_body_table.innerHTML = str;
	addAnswer(wrongInfoObj.wrongIndex, right_answer);

})
checkout_analysise.addEventListener('click', function() {
	container.style.background = '#fff';
	showResult.style.display = 'none';
	q_number.style.opacity = '1';
})

function checkAnswer(chooseAnswer, rightAnswer) {
	var _obj = {};
	var _wrongIndex = [];
	for (var i = 0; i < rightAnswer.length; i++) {
		if (rightAnswer[i] != chooseAnswer[i]) {
			_wrongIndex.push(i + 1);
		}
	}
	_obj.wrongIndex = _wrongIndex;
	_obj.rightCount = rightAnswer.length - _wrongIndex.length;
	_obj.rightPercent = (_obj.rightCount / rightAnswer.length) * 100;
	return _obj;
}

function showAnswerNumber(wrong, right) {
	var _number = right.length / 5;
	var _str = '';
	_str += '<tr>'
	for (var j = 0; j < right.length; j++) {
		if (j % 5 == 0 && j != 0) {
			_str += '</tr><tr>'
		}
		var className = 'show_right';
		var _item = j + 1;
		for (var k = 0; k < wrong.length; k++) {
			if (_item == wrong[k]) {
				className = 'show_error';
			}
		}
		_str += '<td class="' + className + '">' + _item + '</td>';
	}
	_str += '</tr>';
	return _str;
}
console.log(document.createElement('a'))

function addAnswer(wrong, rightAll) {
	if (wrong.length) {
		wrong.forEach(function(item, index) {
			(function(item) {
				if (words_blank[item - 1].innerText === '') {
					words_blank[item - 1].innerText = '-';
					words_blank[item - 1].style.color = 'red';
				} else {
					words_blank[item - 1].setAttribute('class', 'error');
				}
				//console.log('1', words_blank[item - 1].innerText === '');
				console.log(item);
				number_btn[item - 1].setAttribute('class', 'wrong');
				var analy_right_answer = document.createElement('a');
				analy_right_answer.setAttribute('class', 'answer');
				analy_right_answer.innerHTML = rightAll[item - 1];
				console.log(analy_right_answer);
				var target = words_blank[item - 1];
				insertAfter(analy_right_answer, target);
			})(item)
		})
	} else {
		words_blank.forEach(function(item, index) {
			item.setAttribute('class', 'right');
		})
	}
}

function insertAfter(newEl, targetEl) {
	var parentEl = targetEl.parentNode;
	if (parentEl.lastChild == targetEl) {
		parentEl.appendChild(newEl);
	} else {
		parentEl.insertBefore(newEl, targetEl.nextSibling);
	}
}