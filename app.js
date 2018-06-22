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

var parser = require('./bin/threads/board-parser');

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
app.use('/register_worker', notiRouter);
/*app.all('/notification',(req,res)=>{
    res.send("asdf");
});*/

parser = new parser();
console.log(parser.__proto__);
app.use('/notification', parser.notifier.router);
parser.run();

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
module.exports = app;
