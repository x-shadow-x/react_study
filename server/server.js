const Express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user.js');
const app = new Express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// 注意使用这两个中间件的语句要写在app.use('/user', userRouter);之前~不然在user.js文件中express不具备bodyParser的功能
app.use(cookieParser());
app.use(bodyParser.json());

// 当路由是/user的时候使用userRouter~这里userRouter相当于中间件的作用
app.use('/user', userRouter);

io.on('connection', function(socket) {
	console.log('user login');
	socket.on('sendmsg', function(data) {
		console.log(data);
		io.emit('recvmsg', data);
	})
});


server.listen(9093, function() {
	console.log('server is start at port 9093');
});