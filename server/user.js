const express = require('express');
const utility = require('utility');
const Router = express.Router();
const model = require('./model.js');
const User = model.getModel('user'); // 获取user模型


function handleErr(res, msg) {
	
}

Router.get('/list', function(req, res) {
	User.find({}, function(err, doc) {
		return res.json(doc);
	})
});

Router.get('/info', function(req, res) {
	return res.json({
		code: 0,
		data: '<div>123</div>',
		aa: '中文'
	});
});

Router.post('/register', function(req, res) {
	const { user, pwd, type } = req.body;
	User.findOne({user}, function(err, doc) {
		if(doc) {
			console.log(123);
			return res.json({
				code: 1,
				msg: '用户名重复'
			});
		}
		User.create({ user, type, pwd: utility.md5(pwd) }, function(err, doc) {
			if(err) {
				return res.json({
					code: 1,
					msg: '后端出错'
				});
			}
			return res.json({
				code: 0
			});
		})
	});
});

module.exports = Router