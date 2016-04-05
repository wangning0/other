module.exports = {
	product: {
		'2': {
			name: []
		},
		'3': {
			name: []
		},
		'4': {
			name: []
		},
		'5': {
			name: []
		},
		'6': {
			name: []
		},
		'7': {
			name: []
		},
		'8': {
			name: []
		},
		'9': {
			name: []
		},
		'10': {
			name: []
		},
		'11': {
			name: []
		},
		'12': {
			name: []
		},
		'13': {
			name: []
		},
		'14': {
			name: []
		},
		'15': {
			name: []
		},
		'16': {
			name: []
		},
		'17': {
			name: []
		},
		'18': {
			name: []
		},
		'19': {
			name: []
		},
		'20': {
			name: []
		},
		'21': {
			name: []
		},
		'22': {
			name: []
		},
		'23': {
			name: []
		},
		'24': {
			name: []
		},
		'25': {
			name: []
		},
		'26': {
			name: []
		},
		'27': {
			name: []
		},
		'28': {
			name: []
		},
		'29': {
			name: []
		},
		'30': {
			name: []
		},
		'31': {
			name: []
		},
		'32': {
			name: []
		},
		'33': {
			name: []
		},
		'34': {
			name: []
		},
		'35': {
			name: []
		},
		'36': {
			name: []
		},
		'37': {
			name: []
		},
		'38': {
			name: []
		},
		'39': {
			name: []
		},
		'40': {
			name: []
		},
		'41': {
			name: []
		},
		'42': {
			name: []
		},
		'43': {
			name: []
		},
		'44': {
			name: []
		},
		'45': {
			name: []
		},
		'46': {
			name: []
		},
		'47': {
			name: []
		},
		'48': {
			name: []
		},
		'49': {
			name: []
		}
	},
	name: ['蔡庆', '蔡泽坤', '陈安然', '陈道鹏', '黎俊虹', '李怿', '蓝天翔', '姜峰', '王宁', '韦承伯', '唐雨操', '王贺', '熊鑫', '张翔宇', '徐博伟', '张旭', '古县扬', '郭晓冬', '侯贤昊', '黄俊钦', '李文靖', '刘庚', '刘浩', '柳伊岚', '韦世威', '王炜', '吴秋雨', '吴嘉杰', '高向孚', '陈文卓', '王东', '黄一钊', '樊兆君', '何璐琪', '高慧茹', '何知蔓', '赵鑫玮', '廖敬仪'],
	postName: [],
	checkName: function(name) {
		var t = 0;
		for (var i = 0; i < this.name.length; i++) {
			if (name != this.name[i]) {
				t++;
			}
		}
		if (t == 38) {
			return Boolean(false);
		} else {
			return Boolean(true);
		}
	},
	checkRepeat: function(name) {
		var p = 0;
		for (var q = 0; q < this.postName.length; q++) {
			if (name != this.postName[q]) {
				p++;
			}
		}
		if (p == this.postName.length) {
			return Boolean(true);
		} else {
			return Boolean(false);
		}
	},
	saveDB: function(name, product_id, cb) {
		if (this.checkName(name) && this.checkRepeat(name)) {
			this.product[product_id].name.push(name);
			//console.log(this.product[product_id]);
			this.postName.push(name);
			cb(null, this.product);
		} else {
			cb('存取失败');
		}
	},
	get: function(cb) {
		return this.product;
	}
}