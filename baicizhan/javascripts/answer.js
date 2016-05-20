var content_body = document.querySelector('.content_body');
var words_blank = content_body.getElementsByTagName('a');
var q_number = document.querySelector('.q_number');
var touch_btn = document.querySelector('.touch_opacity');
var header = document.querySelector('.header');
var content = document.querySelector('.content');
var submit = document.querySelector('.submit');
var container = document.querySelector('.container');
var showResult = document.querySelector('.showResult');
var checkout_analysise = document.querySelector('.checkout_analysise');
var percent = document.querySelector('.percent');
var showResult_body_table = document.querySelector('.showResult_body_table').getElementsByTagName('table')[0];
var q_chooses_table = document.querySelector('.q_chooses').getElementsByTagName('table')[0];
var showAnswerTab = document.querySelector('.showAnswerTab');
var q_number_ul = q_number.getElementsByTagName('ul')[0];

var active_choose_onoff = false;
var scroll_onoff = false;
var active_choose_num;
var lastInnerHTML;
var active_choose = null;
var answer_choose = [];
var answer_onoff = true;
words_blank = Array.prototype.slice.call(words_blank, 0);

//后台传取的数据
var givenChooses = ['common', 'results', 'consequently', 'basis', 'detection', 'monitor', 'symbols', 'average', 'dramatically', 'symptoms', 'reason', 'distributed', 'including', 'developing', 'shared'];
var right_answer = ['developing', 'average', 'dramatically', 'results', 'shared', 'basis', 'monitor', 'including', 'detection', 'symptoms']
var answer_analysis = ['第1题的文字解析', '第2题的文字解析', '第3题的文字解析', '第4题的文字解析', '第5题的文字解析', '第6题的文字解析', '第7题的文字解析', '第8题的文字解析', '第9题的文字解析', '第10题的文字解析'];
givenChooses = givenChooses.sort(randomsort);
/*
	选择部分
*/
init(q_chooses_table, q_number_ul, givenChooses, right_answer);

var number_btn = q_number.getElementsByTagName('a');
var number_li = q_number.getElementsByTagName('li');
var words = document.getElementsByTagName('td');
words = Array.prototype.slice.call(words, 0);
number_btn = Array.prototype.slice.call(number_btn, 0);

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
		if (!answer_onoff) {
			showAnalysiseTab(showAnswerTab, index, answer_analysis);
		}
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

touch_btn.addEventListener('mousedown', function() {
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

submit.addEventListener('click', function() {
	if (answer_onoff) {
		answer_onoff = false;
		var wrongInfoObj = checkAnswer(answer_choose, right_answer);
		q_number.querySelector('.choosed') ? q_number.querySelector('.choosed').removeAttribute('class') : '';
		container.style.background = 'rgb(128,128,128)';
		showResult.style.display = 'block';
		q_number.style.opacity = '0';
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
		var span = document.createElement('span');
		var chooseLastLi = document.querySelector('.active_choose_li');
		//console.log(chooseLastLi);
		chooseLastLi ? chooseLastLi.removeChild(chooseLastLi.childNodes[1]) : '';
		chooseLastLi ? chooseLastLi.removeAttribute('class') : '';
		number_li[0].setAttribute('class', 'active_choose_li');
		number_li[0].appendChild(span);
		q_chooses_table.style.display = 'none';
		showAnalysiseTab(showAnswerTab, 0, answer_analysis);
		location.hash = "#0";

	}
})

checkout_analysise.addEventListener('click', function() {
	container.style.background = '#fff';
	showResult.style.display = 'none';
	q_number.style.opacity = '1';
})

function init(dom1, dom2, givenChooses, right_answer) {
	var _givenChooses = givenChooses;
	var _number_str = '';
	var _str = '';
	var modal = (_givenChooses.length % 3);
	if (modal) {
		var arr = new Array(3 - modal);
		_givenChooses = _givenChooses.concat(arr);
	}
	_str = '<tr>';
	for (var i = 0; i < _givenChooses.length; i++) {
		if (i % 3 == 0 && i != 0) {
			_str += '</tr><tr>';
		}
		_givenChooses[i] = _givenChooses[i] ? _givenChooses[i] : '';
		_str += '<td>' + _givenChooses[i] + '</td>';
	}
	_str += '</tr>';
	dom1.innerHTML = _str;
	right_answer.forEach(function(item, index) {
		_number_str += '<li><a href="#' + (index + 1) + '"> ' + (index + 1) + ' </a></li> ';
	})
	dom2.innerHTML = _number_str;
	location.hash = '#0';
}

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

				number_btn[item - 1].setAttribute('class', 'wrong');
				var analy_right_answer = document.createElement('a');
				analy_right_answer.setAttribute('class', 'answer');
				analy_right_answer.innerHTML = rightAll[item - 1];
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

function showAnalysiseTab(dom, index, answer_analysis) {
	var _str = '<p class="important">答案</p>';
	_str += '<p>' + answer_analysis[index] + '</p>';
	dom.innerHTML = _str;
}

function randomsort(a, b) {
	return Math.random() > .5 ? -1 : 1;
}