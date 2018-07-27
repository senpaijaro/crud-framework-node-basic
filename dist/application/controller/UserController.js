'use strict';

var _regenerator = require('C:\\node_file\\final\\node_modules\\babel-runtime\\regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('C:\\node_file\\final\\node_modules\\babel-runtime\\helpers\\asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('C:\\node_file\\final\\node_modules\\babel-runtime\\core-js\\object\\get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('C:\\node_file\\final\\node_modules\\babel-runtime\\helpers\\classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('C:\\node_file\\final\\node_modules\\babel-runtime\\helpers\\createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('C:\\node_file\\final\\node_modules\\babel-runtime\\helpers\\possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('C:\\node_file\\final\\node_modules\\babel-runtime\\helpers\\inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Controller2 = require('C:\\node_file\\final\\dist\\system\\Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

var _UserModel = require('C:\\node_file\\final\\dist\\application\\model\\UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserController = function (_Controller) {
	(0, _inherits3.default)(UserController, _Controller);

	function UserController() {
		(0, _classCallCheck3.default)(this, UserController);
		return (0, _possibleConstructorReturn3.default)(this, (UserController.__proto__ || (0, _getPrototypeOf2.default)(UserController)).call(this));
	}

	(0, _createClass3.default)(UserController, [{
		key: 'index',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
				var data;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								data = {
									title: 'Basic babel framework',
									content_header: 'Hello Template'
								};

								io.on('connection', function (socket) {
									socket.on('chat message', function (msg) {
										io.emit('chat messages', msg);
									});
								});
								_context.next = 4;
								return this.view(res, 'index', data);

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function index(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return index;
		}()
	}, {
		key: 'addUser',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
				var getError;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								req.assert('txtfname', 'Firstname is required').notEmpty();
								req.assert('txtmname', 'Middlename is required').notEmpty();
								req.assert('txtlname', 'Lastname is required').notEmpty();

								_context2.next = 5;
								return this.getError(req);

							case 5:
								getError = _context2.sent;

								if (getError === true) {
									res.redirect('/basic_framework');
								} else {
									res.end(getError);
								}

							case 7:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function addUser(_x3, _x4) {
				return _ref2.apply(this, arguments);
			}

			return addUser;
		}()
	}]);
	return UserController;
}(_Controller3.default);
// export default new UserController


module.exports = new UserController();