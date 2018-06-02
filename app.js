//module dependence?
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//route conf
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notiRouter = require('./routes/notification');
//web-push configuration
var webPush = requier('web-push');
const publicKey = process.env.PUBLIC_VAPID_KEY;
const privateKey = process.env.PRIVATE_VAPID_KEY;
webPush.setVapidDetails('wook',publicKey,privateKey);

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var requestTime = 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//web push를 app.js에 임시 구현 후 모듈화 할 예정
app.post('/notification', (req, res) => {
	var sub = req.body;
	var testString = 'TEST';

	webPush.sendNotification(sub, testString).catch(error => {
		console.error(error.stack);
	});
});
module.exports = app;
