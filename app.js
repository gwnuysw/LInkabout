const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
var back = require('express-back');

const index = require('./routes/index');
const user = require('./routes/user');
const auth = require('./routes/auth');
const set = require('./routes/set');
const link = require('./routes/link');
const userset = require('./routes/userset');
const userlink = require('./routes/userlink')

const passportConfig = require('./passport');

require('dotenv').config();
//몽고 데이터베이스 접속
const connect = require('./schemas');
connect();

passportConfig(passport);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false,
  saveUninstialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(back());
app.use('/', index);
app.use('/user', user);
app.use('/auth', auth);
app.use('/set', set);
app.use('/link',link);
app.use('/userset', userset);
app.use('/userlink', userlink);
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
