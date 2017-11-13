const Express = require('express');
const app = new Express();
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc'

mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
	console.log('mongo connect success');
});

const User = mongoose.model('user', new mongoose.Schema({
	name: {type: String, require: true},
	age: {type: Number, require: true}
}));

// User.create({
// 	name: 'Xx2',
// 	age: 18
// }, function(err, doc) {
// 	if(!err) {
// 		console.log(doc);
// 	} else {
// 		console.log(err);
// 	}
// });

// User.remove({age: 18}, function(err, doc) {
// 	console.log(doc);
// });

User.update({name: 'Xx'}, {'$set': {age: 26}}, function(err, doc) {
	console.log(doc);
});
app.get('/', function(req, res) {
	res.send('<h1>hello world!!</h1>');
});

app.get('/data', function(req, res) {
	User.find({}, function(err, doc) {
		res.json(doc);
	});
});

app.listen(9093, function() {
	console.log('server is start at port 9093');
});