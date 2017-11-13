const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc'

mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
	console.log('mongo connect success');
});