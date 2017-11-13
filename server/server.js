const Express = require('express');
const userRouter = require('./user.js');

const app = new Express();
app.use('/user', userRouter);

app.listen(9093, function() {
	console.log('server is start at port 9093');
});