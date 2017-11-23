const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc'

mongoose.connect(DB_URL);

const models = {
	user: {
		'user': {type: String, require: true},
		'pwd': {type: String, require: true},
		'type': {type: String, require: true},
		'avatar': {type: String},
		'desc': {type: String},
		'title': {type: String},
		'company': {type: String},
		'money': {type: String}
	},
	chat: {}
}

// 相当于关系型数据库中创建表
for(let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]));
}


module.exports = {
	getModel: function(name) {
		return mongoose.model(name);
	}
}


mongoose.connection.on('connected', function() {
	console.log('mongo connect success');
});