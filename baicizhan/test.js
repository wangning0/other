//数组的随机排序函数
function randomsort(a, b) {
	return Math.random() > .5 ? -1 : 1;
	//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}
var arr = ['common', 'results', 'consequently', 'basis', 'detection', 'monitor', 'symbols', 'average', 'dramatically', 'symptoms', 'reason', 'distributed', 'including', 'developing', 'shared']

arr = arr.sort(randomsort);

console.log(arr);