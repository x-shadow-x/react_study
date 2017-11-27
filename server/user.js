const express = require('express');
const utility = require('utility');
const Router = express.Router();
const model = require('./model.js');
const User = model.getModel('user'); // 获取user模型
const Chat = model.getModel('chat');

const _filter = {pwd: 0, __v: 0}; // 返回数据给前端的时候有些字段不希望显示~统一定义一个变量过滤

function handleErr(res, msg) {
	
}

Router.get('/list', function(req, res) {
	// User.remove({}, function(err, doc) {});
	const { type } = req.query;
	User.find({ type }, function(err, doc) {
		return res.json({
			code: 0,
			data: doc
		});
	})
});

Router.get('/info', function(req, res) {
	const { userid } = req.cookies;
	if(!userid) {
		return res.json({
			code: 1
		});
	}

	User.findOne({_id: userid}, _filter, function(err, doc) {
		if(err) {
			return res.json({
				code: 1,
				msg: '后端出错'
			});
		}
		if(doc) {
			return res.json({
				code: 0,
				data: doc
			});
		}
	});
	
});

Router.get('/getMsgList', function(req, res) {
	const user = req.cookies.user;
	Chat.find({'$or':[{
		from: user,
		to: user
	}]}, function(err, doc) {
		if(err) {
			return res.json({
				code: 1,
				msg: '后端出错'
			});
		}
		return res.json({
			code: 0,
			msgs: doc
		});
	});
});

Router.post('/register', function(req, res) {
	const { user, pwd, type } = req.body;
	User.findOne({user}, function(err, doc) {
		if(doc) {
			return res.json({
				code: 1,
				msg: '用户名重复'
			});
		}

		// 将注册信息写入数据库~这里不直接使用User.create方法写数据库是因为需要在存储成功后的回调中将用户信息和生成的_id返回给前端
		// 如果使用create~在回调函数中拿不到id
		// const  userModel = new User({ user, type, pwd: utility.md5(pwd) });
		// userModel.save(function(err, doc) {
		// 	if(err) {
		// 		return res.json({
		// 			code: 1,
		// 			msg: '后端出错'
		// 		});
		// 	}
		// 	const { user, type, _id } = doc;

		// 	// 用户注册成功后返回数据之前将mongodb生成的id设置到头部cookie中~一并返回给前端
		// 	res.cookie('userid', _id);
		// 	return res.json({
		// 		code: 0,
		// 		data: { user, type, _id }
		// 	});
		// });
		User.create({ user, type, pwd: utility.md5(pwd) }, function(err, doc) {
			if(err) {
				return res.json({
					code: 1,
					msg: '后端出错'
				});
			}
			const { user, type, _id } = doc;
			res.cookie('userid', _id);
			return res.json({
				code: 0,
				data: { user, type, _id }
			});
		})
	});
});

Router.post('/login', function(req, res) {
	const { user, pwd } = req.body;
	// 第二个参数控制显示~此处设置成pwd字段不显示
	User.findOne({user, pwd: utility.md5(pwd)}, _filter, function(err, doc) {
		if(!doc) {
			return res.json({
				code: 1,
				msg: '用户名或密码错误'
			});
		}
		// 因为在server.js中express使用了cookieparser中间件~此处可以使用cookie()函数设置返回信息中头部的cookie信息
		res.cookie('userid', doc._id);
		return res.json({
			code: 0,
			data: doc
		});
	});
});

Router.post('/update', function(req, res) {
	const userid = req.cookies.userid;
	if(!userid) {
		return res.json({
			code: 1
		});
	}

	const body = req.body;
	User.findByIdAndUpdate(userid, body, function(err, doc) {
		if(err) {
			return res.json({
				code: 1,
				msg: '后端错误'
			});
		}
		const data = Object.assign({}, {
			user: doc.user,
			type: doc.type
		}, body);

		return res.json({
			code: 0,
			data: data
		});
	});
});

module.exports = Router