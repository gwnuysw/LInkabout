"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _server = _interopRequireWildcard(require("react-dom/server"));

var _root = _interopRequireDefault(require("../components/root"));

var _jss = require("jss");

var _JssProvider = _interopRequireDefault(require("react-jss/lib/JssProvider"));

var _styles = require("@material-ui/core/styles");

var _Template = _interopRequireDefault(require("../Template"));

var _green = _interopRequireDefault(require("@material-ui/core/colors/green"));

var _red = _interopRequireDefault(require("@material-ui/core/colors/red"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

module.exports = function render(inform) {
  // Model the initial state
  // Create a sheetsRegistry instance.
  var sheetsRegistry = new _jss.SheetsRegistry(); // Create a sheetsManager instance.

  var sheetsManager = new Map(); // Create a theme instance.

  var theme = (0, _styles.createMuiTheme)({
    palette: {
      primary: _green.default,
      accent: _red.default,
      type: 'light'
    },
    typography: {
      useNextVariants: true
    }
  });

  var Main =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main() {
      _classCallCheck(this, Main);

      return _possibleConstructorReturn(this, _getPrototypeOf(Main).apply(this, arguments));
    }

    _createClass(Main, [{
      key: "componentDidMount",
      // Remove the server-side injected CSS.
      value: function componentDidMount() {
        var jssStyles = document.getElementById('jss-server-side');

        if (jssStyles && jssStyles.parentNode) {
          jssStyles.parentNode.removeChild(jssStyles);
        }
      }
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement(_reactRouterDom.StaticRouter, {
          location: "/set/:categoryid",
          context: context
        }, _react.default.createElement(_root.default, null));
      }
    }]);

    return Main;
  }(_react.default.Component); // Create a new class name generator.


  var generateClassName = (0, _styles.createGenerateClassName)(); // Render the component to a string.

  var context = {};

  var html = _server.default.renderToString(_react.default.createElement(_JssProvider.default, {
    registry: sheetsRegistry,
    generateClassName: generateClassName
  }, _react.default.createElement(_styles.MuiThemeProvider, {
    theme: theme,
    sheetsManager: sheetsManager
  }, _react.default.createElement(Main, null)))); // Grab the CSS from our sheetsRegistry.


  var css = sheetsRegistry.toString();
  var page = (0, _Template.default)(html, css);
  return page;
};