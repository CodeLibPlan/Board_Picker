//반드시 프로젝트 내부 bin디렉터리까지 들어간 다음 nodejs ./www.js 명령으로 실행할 것.
//module dependence?
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
//route conf
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notiRouter = require('./routes/notification');
//web-push configuration
var webPush = require('web-push');

//web-push key read or set
var publicKey = undefined;
var privateKey = undefined;
const GENERATE_NEW_KEY = false;
if(GENERATE_NEW_KEY){
    const vapidKeys = webPush.generateVAPIDKeys();
    publicKey = vapidKeys.publicKey;
    var stream_public = fs.createWriteStream('./key/publicKey');
    stream_public.once('open', function(fd){
        stream_public.write(vapidKeys.publicKey);
        stream_public.end();
    });
    var stream_private = fs.createWriteStream('./key/privateKey');
    privateKey = vapidKeys.privateKey;
    stream_private.once('open', function(fd){
        stream_private.write(vapidKeys.privateKey);
        stream_private.end();
    });
}
else{
    publicKey = fs.readFileSync('./key/publicKey');
    privateKey = fs.readFileSync('./key/privateKey');
}
//waiting for key read
while(publicKey === undefined || privateKey === undefined){
    console.log("waiting");
}
console.log("publicKey : ", publicKey.toString());
console.log("privateKey: ", privateKey.toString());
//web-push key setup
webPush.setVapidDetails('mailto:clplanet26@gmail.com',publicKey.toString(),privateKey.toString());

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

//왜 추가해둔건지? var requestTime =

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
