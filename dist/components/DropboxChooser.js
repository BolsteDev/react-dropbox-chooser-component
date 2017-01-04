'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /* global Dropbox:0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrayOf = _react.PropTypes.arrayOf,
    bool = _react.PropTypes.bool,
    func = _react.PropTypes.func,
    oneOf = _react.PropTypes.oneOf,
    string = _react.PropTypes.string;


var WARNING = 'Cannot change the app key once the Dropbox script has been loaded';
var noop = function noop() {};

/**
 * Dropbox Chooser
 *
 * Add the script for Dropbox and add a Dropbox file picker
 *
 * @param {String} appKey - The Dropbox App key. Optional when mounting
 * @param {String} className - Optional. Additional classes
 * @param {Array<String>} extensions - Optional. Extensions to filter user's choices
 * @param {String} linkType - Optional. One of 'preview' or 'direct'
 * @param {boolean} multiselect - Optional. Allow users to pick multiple files
 * @param {func} onCancel - Optional. Called when the user cancels a selection
 * @param {func} onSuccess - Optional. Called when the user selects files
 */
var DropboxChooser = (_temp = _class = function (_Component) {
  _inherits(DropboxChooser, _Component);

  function DropboxChooser(props) {
    _classCallCheck(this, DropboxChooser);

    // We need to spy on the prototype
    var _this = _possibleConstructorReturn(this, (DropboxChooser.__proto__ || Object.getPrototypeOf(DropboxChooser)).call(this, props));

    _this.state = {
      isScriptLoaded: false
    };

    _this.attach = function () {
      var _this$props = _this.props,
          extensions = _this$props.extensions,
          linkType = _this$props.linkType,
          multiselect = _this$props.multiselect,
          onCancel = _this$props.onCancel,
          onSuccess = _this$props.onSuccess;


      var options = {
        success: onSuccess,
        cancel: onCancel,
        linkType: linkType,
        multiselect: multiselect
      };

      // Completely optional with no default provided
      if (extensions) {
        options.extensions = extensions;
      }

      var button = Dropbox.createChooseButton(options);
      _this.chooser.appendChild(button);
    };

    _this._createScript = _this.createScript.bind(_this);
    return _this;
  }

  _createClass(DropboxChooser, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var appKey = this.props.appKey;


      if (appKey) {
        this._createScript(appKey);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var appKey = newProps.appKey;
      var isScriptLoaded = this.state.isScriptLoaded;


      if (!isScriptLoaded && appKey && !this.props.appKey) {
        this._createScript(appKey);
      }

      if (isScriptLoaded && appKey && !this.props.appKey) {
        console.warn ? console.warn(WARNING) : console.log(WARNING); // eslint-disable-line no-console
      }
    }
  }, {
    key: 'createScript',
    value: function createScript(appKey) {
      var _this2 = this;

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
      script.id = 'dropboxjs';
      script.setAttribute('data-app-key', appKey);
      script.onload = function () {
        _this2.setState({
          isScriptLoaded: true
        }, function () {
          _this2.attach();
        });
      };

      document.body.appendChild(script);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var className = this.props.className;


      return _react2.default.createElement('div', {
        className: 'dropbox-chooser ' + className,
        ref: function ref(_ref) {
          _this3.chooser = _ref;
        }
      });
    }
  }]);

  return DropboxChooser;
}(_react.Component), _class.propTypes = {
  appKey: string,
  className: string,
  extensions: arrayOf(string),
  linkType: oneOf(['preview', 'direct']),
  multiselect: bool,
  onCancel: func,
  onSuccess: func
}, _class.defaultProps = {
  appKey: null,
  className: '',
  extensions: null,
  linkType: 'preview',
  multiselect: false,
  onSuccess: noop,
  onCancel: noop
}, _temp);
exports.default = DropboxChooser;