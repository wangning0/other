/*//数组的随机排序函数
function randomsort(a, b) {
	return Math.random() > .5 ? -1 : 1;
	//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}
var arr = ['common', 'results', 'consequently', 'basis', 'detection', 'monitor', 'symbols', 'average', 'dramatically', 'symptoms', 'reason', 'distributed', 'including', 'developing', 'shared']

arr = arr.sort(randomsort);

console.log(arr);
*/


var a = [1, 2, 3, 4, 5];
var wrong = [1, 3];
var number = a.length / 5;
var str = '';
/*
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
		str += '<td class="' + className + '">' + (index + 1 + i * 5) + '</td>';
	})
	str += '</tr>';
}*/


function test(wrong, right) {
	var _number = right.length / 5;
	var _str = '';
	str += '<tr>'
	for (var j = 0; j < right.length; j++) {
		if (j % 5 == 0 && j != 0) {
			str += '</tr><tr>'
		}
		var className = 'show_right';
		var _item = j + 1;
		for (var k = 0; k < wrong.length; k++) {
			if (_item == wrong[k]) {
				className = 'show_error';
			}
		}
		str += '<td class="' + className + '">' + _item + '</td>';
	}
	str += '</tr>';
	return str;
}
console.log(test(wrong, a));