const Express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user.js');
const app = new Express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const model = require('./model');
const Chat = model.getModel('chat');


// 注意使用这两个中间件的语句要写在app.use('/user', userRouter);之前~不然在user.js文件中express不具备bodyParser的功能
app.use(cookieParser());
app.use(bodyParser.json());

// 当路由是/user的时候使用userRouter~这里userRouter相当于中间件的作用
app.use('/user', userRouter);

io.on('connection', function(socket) {
	console.log('user login');
	socket.on('sendmsg', function(data) {
		const { orignal, to, text } = data;
		const chatId = [orignal, to].sort().join('_');
		console.log(chatId);
		console.log([orignal, to].sort());
		Chat.create({orignal, to, content: text, chat_id: chatId}, function(err, doc) {
			if(err) {
				return res.json({
					code: 1,
					msg: '后端出错'
				});
			}

			io.emit('recvmsg', Object.assign({}, doc._doc));
		});
	})
});


server.listen(9093, function() {
	console.log('server is start at port 9093');
});