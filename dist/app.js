'use strict';

require('C:\\node_file\\final\\node_modules\\babel-polyfill');

var _express = require('C:\\node_file\\final\\node_modules\\express');

var _express2 = _interopRequireDefault(_express);

var _require = require('C:\\node_file\\final\\node_modules\\require.all');

var _require2 = _interopRequireDefault(_require);

var _composeMiddleware = require('C:\\node_file\\final\\node_modules\\compose-middleware');

var _underscore = require('C:\\node_file\\final\\node_modules\\underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _expressValidator = require('C:\\node_file\\final\\node_modules\\express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _cookieParser = require('C:\\node_file\\final\\node_modules\\cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('C:\\node_file\\final\\node_modules\\body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('C:\\node_file\\final\\node_modules\\path');

var _path2 = _interopRequireDefault(_path);

var _expressFlash = require('C:\\node_file\\final\\node_modules\\express-flash');

var _expressFlash2 = _interopRequireDefault(_expressFlash);

var _expressSession = require('C:\\node_file\\final\\node_modules\\express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _ejs = require('C:\\node_file\\final\\node_modules\\ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _routes = require('./application/config/routes');

var _routes2 = _interopRequireDefault(_routes);

var _policies = require('./application/config/policies');

var _policies2 = _interopRequireDefault(_policies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//constant variables


//files
var app = (0, _express2.default)(),
    http = require('http').createServer(app),
    io = require('socket.io').listen(http),
    static_dir = __dirname + '/node_modules/',
    node_plugins = static_dir.replace('dist/', ''),
    template = __dirname + '/template/',
    views = template.replace('dist/', '');
//modules  


global.io = io;

//set or user function
app.set('views', _path2.default.join(views));
app.set('view engine', 'ejs');
app.use('/assets', _express2.default.static(node_plugins));
app.use((0, _expressValidator2.default)());
app.use((0, _expressFlash2.default)());
app.use((0, _cookieParser2.default)());
app.set('trust proxy', 1); // trust first proxy
app.use((0, _expressSession2.default)({
	key: 'password!@#$',
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false, maxAge: 20000000
	}
}));
//body parser
app.use(_bodyParser2.default.urlencoded({ extended: true, limit: '50mb' }));
app.use(_bodyParser2.default.json({ limit: '50mb' }));

var controllers = (0, _require2.default)({
	dir: './application/controller', //only files that end with 'controller.js' 
	match: /Controller\.js$/i,
	recursive: false,
	map: function map(name, path, isFile) {
		return _require2.default.map(name, path, isFile).replace(/Controller$/i, '');
	}
}),
    policies = (0, _require2.default)({
	dir: './application/policies',
	match: /Policy\.js$/i //only files that end with 'controller.js' 
});

_underscore2.default.each(_routes2.default, function (value, index) {
	var getApi = index.split(" "),
	    path = value.split("."),
	    middleware = [];

	_underscore2.default.each(_policies2.default["policies"], function (val, ind) {
		if (path[0] == ind && path[1] in val) {
			middleware = val[path[1]];
			return false;
		}
	});

	_underscore2.default.each(middleware, function (val, ind) {
		if (val.indexOf("Policy") > -1) {
			middleware[ind] = policies[val];
		}
	});
	var change = getApi[0];
	middleware.push(controllers[path[0]][path[1]]);
	app[change.toLowerCase()](getApi[1], (0, _composeMiddleware.compose)(middleware));
});

http.listen(4200, "0.0.0.0", function () {
	console.log('running port 4200');
});