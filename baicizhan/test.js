//数组的随机排序函数
/*function randomsort(a, b) {
	return Math.random() > .5 ? -1 : 1;
	//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}
var arr = ['common', 'results', 'consequently', 'basis', 'detection', 'monitor', 'symbols', 'average', 'dramatically', 'symptoms', 'reason', 'distributed', 'including', 'developing', 'shared']

arr = arr.sort(randomsort);

console.log(arr); * /


var a = [1, 2, 3, 4, 5];
var wrong = [1, 3];
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
		str += '<td class="' + className + '">' + (index + 1 + i * 5) + '</td>';
	})
	str += '</tr>';
}


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
console.log(test(wrong, a));*/

var str = 'It \'s the first question parents ask when their child is diagnosed with autism (<strong>自闭症</strong>). Will his future brothers or sisters have a higher risk of 1 <a href="#" name="1" id="1" class="right"></a>it, too?  <br>& nbsp; & nbsp; & nbsp; According to the largest study of siblings(<strong>兄弟姐妹</strong>) in families with autism, the answer is yes.Among 664 children who had at least one older sibling with the developmental disorder, the 2 < a href = "#" name = "2" id = "2" class = "error" > < /a> risk of autism was nearly 19%, 3 <a href="#" name="3" id="3"></a > higher than previous sibling - recurrence estimates that were anywhere from 3 % to 10 % .Kids with more than one older autistic sibling had an even higher risk of the disorder: 32 % . < br >& nbsp; & nbsp; & nbsp;The 4 < a href = "#" name = "4" id = "4" > < /a> suggest that genes play a key role in autism risk. But they also hint that other environmental factors 5 <a href="#" name="5" id="5"></a > by siblings, like influences in the womb(<strong>子宫</strong>), may be important as well. < br > & nbsp; & nbsp; & nbsp; On the 6 < a href = "#" name = "6" id = "6" > < /a> of the findings, the researchers recommend that doctors closely 7 <a href="#" name="7" id="7"></a > younger siblings of autistic children to pick up any early signs of the disorder, 8 < a href = "#" name = "8" id = "8" > < /a> an unusually large head or delayed language development and communication skills. Evidence suggests that early 9<a href="#" name="9" id="9"></a > and diagnosis of autism can help children take advantage of therapies that can treat some of its 10 < a href = "#" name = "10" id = "10" > </a>'