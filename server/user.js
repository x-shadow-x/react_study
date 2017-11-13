const express = require('express');
const Router = express.Router();

Router.get('/info', function(req, res) {
	return res.json({
		code: 1,
		data: '<div>123</div>',
		aa: '中文'
	});
});

module.exports = Router