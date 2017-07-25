var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var cons = require('consolidate');
// view engine setup
app.set('./views', path.join(__dirname, 'views'));
app.engine('html', cons.swig);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/bower_components', express.static(__dirname + 'bower_components'));
// routes handling
var BookRoute = require('./routes/BookRouteConfiguration.js');
new BookRoute(app);

module.exports = app;