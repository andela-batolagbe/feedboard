(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flux = require('../flux');

var _flux2 = _interopRequireDefault(_flux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var searchLocationSpots = (function () {
  function searchLocationSpots() {
    _classCallCheck(this, searchLocationSpots);

    this.generateActions('updateLocation');
  }

  _createClass(searchLocationSpots, [{
    key: 'searchSuccess',
    value: function searchSuccess(response) {
      return response;
    }
  }, {
    key: 'searchError',
    value: function searchError(err) {
      return err;
    }
  }, {
    key: 'searchSpots',
    value: function searchSpots(place) {

      var self = this;

      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
        'address': place,
        componentRestrictions: {
          country: 'NG'
        }
      }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

          var locationLatLng = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          self.searchSuccess({ ok: true, place: place, placeCord: locationLatLng });
        } else {
          self.searchError({ ok: false, status: status });
        }
      });
    }
  }]);

  return searchLocationSpots;
})();

exports.default = _flux2.default.createActions(searchLocationSpots);

},{"../flux":11}],2:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _navbar = require('./components/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter2.default,
  { history: history },
  _routes2.default
), document.getElementById('app'));

},{"./components/navbar":8,"./routes":12,"history/lib/createBrowserHistory":33,"react":"react","react-dom":"react-dom","react-router":"react-router"}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = (function (_React$Component) {
  _inherits(About, _React$Component);

  function About(props) {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(About).call(this, props));
  }

  _createClass(About, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initialize();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var mapCanvas = document.getElementById('map-canvas');

      var mapOptions = {
        center: new google.maps.LatLng(this.props.mapLat, this.props.mapLong),
        zoom: this.props.initialZoom
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);

      var infowindow = new google.maps.InfoWindow();

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: {
          lat: 6.4311,
          lng: 3.4158
        },
        radius: 500,
        types: ['restaurant', 'cafe', 'movie_theater', 'night_club']
      }, callback);

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'section',
        { id: 'about', className: 'about-bg' },
        _react2.default.createElement(
          'div',
          { className: 'detail center' },
          _react2.default.createElement('div', { id: 'map-canvas' }),
          _react2.default.createElement(
            'div',
            { className: 'abt-box col s6 z-depth-2' },
            _react2.default.createElement(
              'h5',
              { className: 'yellow-text text-darken-4' },
              this.props.catchQuestns,
              ' '
            ),
            _react2.default.createElement(
              'h5',
              { className: 'info blue-text text-lighten-2' },
              this.props.aboutMessage,
              ' '
            )
          )
        )
      );
    }
  }]);

  return About;
})(_react2.default.Component);

;

About.defaultProps = {
  catchQuestns: "We know you love to have fun, but do you know all the fun places around \n you? " + "Are you aware of the exciting events happening this weekend in your hood? Are you just visiting Lagos?",
  aboutMessage: "gidiHots let you know where its happening, we tell you where to go, and show you all the fun spot around you. " + "No matter your area of interest, clubs, parties, concerts, cinema and movie premieres, sport events, and any other interesting activity " + "we get you informed, its simple, just provide your location or a city in Lagos you're considering visiting and " + "you get all the hotspots and events apears on a map as shown with directions to the places, its absolutely free!",
  initialZoom: 16,
  mapLat: 6.4311,
  mapLong: 3.4158
};

exports.default = About;

},{"react":"react"}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Contact = (function (_React$Component) {
  _inherits(Contact, _React$Component);

  function Contact(props) {
    _classCallCheck(this, Contact);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Contact).call(this, props));
  }

  _createClass(Contact, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "section",
        { id: "contact", className: "contact-bg" },
        _react2.default.createElement(
          "div",
          { className: "m1 center heading" },
          _react2.default.createElement(
            "h5",
            { className: "yellow-text text-darken-4" },
            this.props.contactMessage
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "row contact-form center" },
          _react2.default.createElement(
            "form",
            { className: "sub-form col s12" },
            _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement(
                "div",
                { className: "input-field col s12" },
                _react2.default.createElement(
                  "i",
                  { className: "material-icons prefix yellow-text text-darken-4" },
                  "perm_identity"
                ),
                _react2.default.createElement("input", { id: "name", type: "text", className: "validate" }),
                _react2.default.createElement(
                  "label",
                  { className: "yellow-text text-darken-4", htmlFor: "name" },
                  "Name"
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement(
                "div",
                { className: "input-field col s12" },
                _react2.default.createElement(
                  "i",
                  { className: "material-icons prefix yellow-text text-darken-4" },
                  "message"
                ),
                _react2.default.createElement("textarea", { rows: "4", cols: "2", id: "message", type: "email", className: "materialize-textarea" }),
                _react2.default.createElement(
                  "label",
                  { className: "yellow-text text-darken-4", htmlFor: "message" },
                  "Message"
                )
              )
            )
          ),
          _react2.default.createElement(
            "button",
            { className: " center btn z-dept-2 btn-flat yellow darken-4 black-text" },
            "Send"
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "center" },
          _react2.default.createElement(
            "h5",
            { className: "block info blue-text text-lighten-2" },
            "You can also reach us through our mail,"
          ),
          _react2.default.createElement(
            "h5",
            { className: "email info blue-text text-lighten-2" },
            " contact@gidihots.com"
          )
        )
      );
    }
  }]);

  return Contact;
})(_react2.default.Component);

;

Contact.defaultProps = {
  contactMessage: "Add your business and events to our list, get in touch with us."
};

exports.default = Contact;

},{"react":"react"}],5:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = (function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $(document).ready(function () {
        $(".button-collapse").sideNav();
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "section",
        null,
        _react2.default.createElement(
          "footer",
          { className: "page-footer yellow darken-4" },
          _react2.default.createElement(
            "div",
            { className: "footer-copyright yellow darken-4" },
            _react2.default.createElement(
              "div",
              { className: "footer" },
              "© 2015 gidiHots",
              _react2.default.createElement(
                "div",
                { className: "right no-margin" },
                "Design with   ",
                _react2.default.createElement(
                  "i",
                  { className: "material-icons prefix red-text text-dark-2" },
                  "favorite"
                ),
                "  by  ",
                _react2.default.createElement(
                  "a",
                  { className: "black-text", target: "_blank", href: "https://github.com/andela-batolagbe" },
                  "Bisoye  "
                ),
                "from  ",
                _react2.default.createElement(
                  "a",
                  { href: "http://andela.com", target: "_blank" },
                  _react2.default.createElement("img", { className: "andela-footer", src: "../../assets/images/andela2.jpeg" })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Footer;
})(_react2.default.Component);

exports.default = Footer;

},{"react":"react"}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _searchSpot = require('../actions/searchSpot');

var _searchSpot2 = _interopRequireDefault(_searchSpot);

var _spotStores = require('../stores/spotStores');

var _spotStores2 = _interopRequireDefault(_spotStores);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = (function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Home).call(this, props));

    _this.state = _spotStores2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _spotStores2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _spotStores2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();

      var location = this.state.location.trim();
      if (!location) {
        return 1;
      }
      this.props.history.pushState('searches');
      _searchSpot2.default.searchSpots(location);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { className: 'landing-bg' },
        _react2.default.createElement(
          'div',
          { className: 'center heading' },
          _react2.default.createElement(
            'h1',
            { className: 'yellow-text text-darken-4' },
            'Find the Fun, Then Go Have It!'
          ),
          _react2.default.createElement(
            'h4',
            { className: 'blue-text text-lighten-2' },
            'gidiHots tells you what and where it is happening near you, ',
            _react2.default.createElement('br', null),
            'then you can decide to join the excitement'
          )
        ),
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleClick.bind(this) },
          _react2.default.createElement(
            'div',
            { className: 'row centered' },
            _react2.default.createElement(
              'div',
              { className: 'input-field col s6 z-depth-4' },
              _react2.default.createElement(
                'i',
                { className: 'material-icons prefix blue-text text-lighten-2' },
                'search'
              ),
              _react2.default.createElement('input', { onChange: _searchSpot2.default.updateLocation, type: 'text', className: 'blue-text text-lighten-2', id: 'loc-search' }),
              _react2.default.createElement(
                'label',
                { className: 'blue-text text-lighten-2', htmlFor: 'loc-search' },
                'Enter your location'
              )
            ),
            _react2.default.createElement(
              'button',
              { type: 'submit', className: ' btn btn-large right yellow darken-4 blue-text text-darken-4' },
              'Find'
            )
          )
        )
      );
    }
  }]);

  return Home;
})(_react2.default.Component);

;

exports.default = Home;

},{"../actions/searchSpot":1,"../stores/spotStores":13,"react":"react","react-router":"react-router"}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _navbar = require('./navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _about = require('./about');

var _about2 = _interopRequireDefault(_about);

var _subscribe = require('./subscribe');

var _subscribe2 = _interopRequireDefault(_subscribe);

var _contact = require('./contact');

var _contact2 = _interopRequireDefault(_contact);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(_navbar2.default, { history: this.props.history }),
        this.props.children,
        _react2.default.createElement(_footer2.default, null)
      );
    }
  }]);

  return App;
})(_react2.default.Component);

;

exports.default = App;

},{"./about":3,"./contact":4,"./footer":5,"./home":6,"./navbar":8,"./subscribe":10,"react":"react"}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = (function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar() {
    _classCallCheck(this, NavBar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NavBar).apply(this, arguments));
  }

  _createClass(NavBar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'nav',
        { className: 'main-nav navbar-fixed z-depth-2 grey darken-4' },
        _react2.default.createElement(
          'div',
          { className: 'nav-wrapper' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/' },
            _react2.default.createElement('image', { src: '../../assets/images/gidi-logo.jpg',
              className: 'brand-logo left text-darken-3' })
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/', 'data-activates': 'mobile', className: ' right button-collapse' },
            _react2.default.createElement(
              'i',
              { className: 'material-icons yellow-text text-darken-4' },
              'menu'
            )
          ),
          _react2.default.createElement(
            'ul',
            { className: 'right hide-on-med-and-down' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: 'btn-flat yellow-text text-darken-4', to: 'about' },
                ' About GidiHots'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: 'btn-flat yellow-text text-darken-4', to: 'subscribe' },
                ' Get Informed'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: 'btn-flat yellow-text text-darken-4', to: 'contact' },
                ' Talk To Us '
              )
            )
          ),
          _react2.default.createElement(
            'ul',
            { className: 'right black side-nav', id: 'mobile' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: 'btn-flat yellow-text text-darken-4', to: 'about' },
                ' About GidiHots'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: 'btn-flat yellow-text text-darken-4', to: 'subscribe' },
                ' Get Informed'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { className: 'btn-flat yellow-text text-darken-4', to: 'contact' },
                ' Talk To Us '
              )
            )
          )
        )
      );
    }
  }]);

  return NavBar;
})(_react2.default.Component);

;

exports.default = NavBar;

},{"react":"react","react-router":"react-router"}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _spotStores = require('../stores/spotStores');

var _spotStores2 = _interopRequireDefault(_spotStores);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisplayResult = (function (_React$Component) {
  _inherits(DisplayResult, _React$Component);

  function DisplayResult(props) {
    _classCallCheck(this, DisplayResult);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DisplayResult).call(this, props));

    _this.state = _spotStores2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(DisplayResult, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log(this.props.lat);
      this.initialize();
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var mapCanvas = document.getElementById('result-map');

      var mapOptions = {
        center: new google.maps.LatLng(this.props.mapLat, this.props.mapLong),
        zoom: this.props.initialZoom
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);

      var infowindow = new google.maps.InfoWindow();

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: {
          lat: this.props.lat,
          lng: this.props.lng
        },
        radius: 500,
        types: ['restaurant']
      }, callback);

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            { className: 'yellow-text text-darken-4 center info detail' },
            'Hot Spots Around You.'
          )
        ),
        _react2.default.createElement('div', { id: 'result-map', className: 'row col s12' }),
        _react2.default.createElement(
          'div',
          { className: 'center' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/' },
            _react2.default.createElement(
              'button',
              { className: ' btn z-dept-2 btn-flat yellow darken-4 black-text' },
              'Take Me Back'
            )
          )
        )
      );
    }
  }]);

  return DisplayResult;
})(_react2.default.Component);

DisplayResult.defaultProps = {
  initialZoom: 16,
  mapLat: 6.45311,
  mapLong: 3.3958
};

exports.default = DisplayResult;

},{"../stores/spotStores":13,"react":"react","react-router":"react-router"}],10:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Subscribe = (function (_React$Component) {
  _inherits(Subscribe, _React$Component);

  function Subscribe(props) {
    _classCallCheck(this, Subscribe);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Subscribe).call(this, props));
  }

  _createClass(Subscribe, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "section",
        { id: "subscribe", className: "sub" },
        _react2.default.createElement(
          "div",
          { className: "m1 center heading" },
          _react2.default.createElement(
            "h4",
            { className: "yellow-text text-darken-4" },
            this.props.subscribeMessage
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "row center sub-wrapper abt-box z-dept-1-half" },
          _react2.default.createElement(
            "form",
            { className: "sub-form col s12" },
            _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement(
                "div",
                { className: "input-field col s12" },
                _react2.default.createElement(
                  "i",
                  { className: "material-icons prefix yellow-text text-darken-4" },
                  "perm_identity"
                ),
                _react2.default.createElement("input", { id: "name", type: "text", className: "validate" }),
                _react2.default.createElement(
                  "label",
                  { className: "yellow-text text-darken-4", htmlFor: "name" },
                  "Name"
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement(
                "div",
                { className: "input-field col s12" },
                _react2.default.createElement(
                  "i",
                  { className: "material-icons prefix yellow-text text-darken-4" },
                  "my_location"
                ),
                _react2.default.createElement("input", { id: "location", type: "email", className: "validate" }),
                _react2.default.createElement(
                  "label",
                  { className: "yellow-text text-darken-4", htmlFor: "location" },
                  "Location"
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement(
                "div",
                { className: "input-field col s12" },
                _react2.default.createElement(
                  "i",
                  { className: "material-icons prefix yellow-text text-darken-4" },
                  "email"
                ),
                _react2.default.createElement("input", { id: "email", type: "text", className: "validate" }),
                _react2.default.createElement(
                  "label",
                  { className: "yellow-text text-darken-4", htmlFor: "email" },
                  "Email"
                )
              )
            )
          ),
          _react2.default.createElement(
            "button",
            { className: " center btn btn-large yellow darken-4 black-text" },
            "Subscribe"
          )
        )
      );
    }
  }]);

  return Subscribe;
})(_react2.default.Component);

;

Subscribe.defaultProps = {
  subscribeMessage: "Get updates about happenings near you, subscribe for our weekly event updates."
};

exports.default = Subscribe;

},{"react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Flux = new _alt2.default();

exports.default = Flux;

},{"alt":16}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _mainApp = require('./components/mainApp');

var _mainApp2 = _interopRequireDefault(_mainApp);

var _home = require('./components/home');

var _home2 = _interopRequireDefault(_home);

var _about = require('./components/about');

var _about2 = _interopRequireDefault(_about);

var _subscribe = require('./components/subscribe');

var _subscribe2 = _interopRequireDefault(_subscribe);

var _contact = require('./components/contact');

var _contact2 = _interopRequireDefault(_contact);

var _searchResult = require('./components/searchResult');

var _searchResult2 = _interopRequireDefault(_searchResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _mainApp2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _about2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'subscribe', component: _subscribe2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'contact', component: _contact2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'searches', component: _searchResult2.default })
);

},{"./components/about":3,"./components/contact":4,"./components/home":6,"./components/mainApp":7,"./components/searchResult":9,"./components/subscribe":10,"react":"react","react-router":"react-router"}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flux = require('../flux');

var _flux2 = _interopRequireDefault(_flux);

var _searchSpot = require('../actions/searchSpot');

var _searchSpot2 = _interopRequireDefault(_searchSpot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var spotsStore = (function () {
  function spotsStore() {
    _classCallCheck(this, spotsStore);

    this.bindActions(_searchSpot2.default);
    this.place = 'a';
    this.lat = 'a';
    this.lng = 'a';
    this.err = null;
  }

  _createClass(spotsStore, [{
    key: 'onSearchSuccess',
    value: function onSearchSuccess(data) {
      this.place = data.place;
      this.lat = data.placeCord.lat;
      this.lng = data.placeCord.lng;
    }
  }, {
    key: 'onSearchError',
    value: function onSearchError(err) {
      this.err = err.status + ' error fetching hotspots in your location, try again';
    }
  }, {
    key: 'onUpdateLocation',
    value: function onUpdateLocation(event) {
      this.location = event.target.value;
    }
  }]);

  return spotsStore;
})();

exports.default = _flux2.default.createStore(spotsStore);

},{"../actions/searchSpot":1,"../flux":11}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = makeAction;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _functions = require('../functions');

var fn = _interopRequireWildcard(_functions);

var _utilsAltUtils = require('../utils/AltUtils');

var utils = _interopRequireWildcard(_utilsAltUtils);

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

function makeAction(alt, namespace, name, implementation, obj) {
  var id = utils.uid(alt._actionsRegistry, namespace + '.' + name);
  alt._actionsRegistry[id] = 1;

  var data = { id: id, namespace: namespace, name: name };

  var dispatch = function dispatch(payload) {
    return alt.dispatch(id, payload, data);
  };

  // the action itself
  var action = function action() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var result = implementation.apply(obj, args);

    // async functions that return promises should not be dispatched
    if (result !== undefined && !(0, _isPromise2['default'])(result)) {
      if (fn.isFunction(result)) {
        result(dispatch, alt);
      } else {
        dispatch(result);
      }
    }

    if (result === undefined) {
      utils.warn('An action was called but nothing was dispatched');
    }

    return result;
  };
  action.defer = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return setTimeout(function () {
      return action.apply(null, args);
    });
  };
  action.id = id;
  action.data = data;

  // ensure each reference is unique in the namespace
  var container = alt.actions[namespace];
  var namespaceId = utils.uid(container, name);
  container[namespaceId] = action;

  // generate a constant
  var constant = utils.formatAsConstant(namespaceId);
  container[constant] = id;

  return action;
}

module.exports = exports['default'];
},{"../functions":15,"../utils/AltUtils":20,"is-promise":25}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isMutableObject = isMutableObject;
exports.eachObject = eachObject;
exports.assign = assign;
var isFunction = function isFunction(x) {
  return typeof x === 'function';
};

exports.isFunction = isFunction;

function isMutableObject(target) {
  var Ctor = target.constructor;

  return !!target && typeof target === 'object' && !Object.isFrozen(target) && Object.prototype.toString.call(target) === '[object Object]' && isFunction(Ctor) && (Ctor instanceof Ctor || target.type === 'AltStore');
}

function eachObject(f, o) {
  o.forEach(function (from) {
    Object.keys(Object(from)).forEach(function (key) {
      f(key, from[key]);
    });
  });
}

function assign(target) {
  for (var _len = arguments.length, source = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    source[_key - 1] = arguments[_key];
  }

  eachObject(function (key, value) {
    return target[key] = value;
  }, source);
  return target;
}
},{}],16:[function(require,module,exports){
/* global window */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _bind = Function.prototype.bind;

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _flux = require('flux');

var _utilsStateFunctions = require('./utils/StateFunctions');

var StateFunctions = _interopRequireWildcard(_utilsStateFunctions);

var _functions = require('./functions');

var fn = _interopRequireWildcard(_functions);

var _store = require('./store');

var store = _interopRequireWildcard(_store);

var _utilsAltUtils = require('./utils/AltUtils');

var utils = _interopRequireWildcard(_utilsAltUtils);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var Alt = (function () {
  function Alt() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Alt);

    this.config = config;
    this.serialize = config.serialize || JSON.stringify;
    this.deserialize = config.deserialize || JSON.parse;
    this.dispatcher = config.dispatcher || new _flux.Dispatcher();
    this.batchingFunction = config.batchingFunction || function (callback) {
      return callback();
    };
    this.actions = { global: {} };
    this.stores = {};
    this.storeTransforms = config.storeTransforms || [];
    this.trapAsync = false;
    this._actionsRegistry = {};
    this._initSnapshot = {};
    this._lastSnapshot = {};
  }

  _createClass(Alt, [{
    key: 'dispatch',
    value: function dispatch(action, data, details) {
      var _this = this;

      this.batchingFunction(function () {
        var id = Math.random().toString(18).substr(2, 16);

        // support straight dispatching of FSA-style actions
        if (action.hasOwnProperty('type') && action.hasOwnProperty('payload')) {
          var fsaDetails = {
            id: action.type,
            namespace: action.type,
            name: action.type
          };
          return _this.dispatcher.dispatch(utils.fsa(id, action.type, action.payload, fsaDetails));
        }

        if (action.id && action.dispatch) {
          return utils.dispatch(id, action, data, _this);
        }

        return _this.dispatcher.dispatch(utils.fsa(id, action, data, details));
      });
    }
  }, {
    key: 'createUnsavedStore',
    value: function createUnsavedStore(StoreModel) {
      var key = StoreModel.displayName || '';
      store.createStoreConfig(this.config, StoreModel);
      var Store = store.transformStore(this.storeTransforms, StoreModel);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return fn.isFunction(Store) ? store.createStoreFromClass.apply(store, [this, Store, key].concat(args)) : store.createStoreFromObject(this, Store, key);
    }
  }, {
    key: 'createStore',
    value: function createStore(StoreModel, iden) {
      var key = iden || StoreModel.displayName || StoreModel.name || '';
      store.createStoreConfig(this.config, StoreModel);
      var Store = store.transformStore(this.storeTransforms, StoreModel);

      /* istanbul ignore next */
      if (module.hot) delete this.stores[key];

      if (this.stores[key] || !key) {
        if (this.stores[key]) {
          utils.warn('A store named ' + key + ' already exists, double check your store ' + 'names or pass in your own custom identifier for each store');
        } else {
          utils.warn('Store name was not specified');
        }

        key = utils.uid(this.stores, key);
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      var storeInstance = fn.isFunction(Store) ? store.createStoreFromClass.apply(store, [this, Store, key].concat(args)) : store.createStoreFromObject(this, Store, key);

      this.stores[key] = storeInstance;
      StateFunctions.saveInitialSnapshot(this, key);

      return storeInstance;
    }
  }, {
    key: 'generateActions',
    value: function generateActions() {
      var actions = { name: 'global' };

      for (var _len3 = arguments.length, actionNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        actionNames[_key3] = arguments[_key3];
      }

      return this.createActions(actionNames.reduce(function (obj, action) {
        obj[action] = utils.dispatchIdentity;
        return obj;
      }, actions));
    }
  }, {
    key: 'createAction',
    value: function createAction(name, implementation, obj) {
      return (0, _actions2['default'])(this, 'global', name, implementation, obj);
    }
  }, {
    key: 'createActions',
    value: function createActions(ActionsClass) {
      var _arguments2 = arguments,
          _this2 = this;

      var exportObj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var actions = {};
      var key = utils.uid(this._actionsRegistry, ActionsClass.displayName || ActionsClass.name || 'Unknown');

      if (fn.isFunction(ActionsClass)) {
        var _len4, argsForConstructor, _key4;

        (function () {
          fn.assign(actions, utils.getPrototypeChain(ActionsClass));

          var ActionsGenerator = (function (_ActionsClass) {
            _inherits(ActionsGenerator, _ActionsClass);

            function ActionsGenerator() {
              _classCallCheck(this, ActionsGenerator);

              for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
              }

              _get(Object.getPrototypeOf(ActionsGenerator.prototype), 'constructor', this).apply(this, args);
            }

            _createClass(ActionsGenerator, [{
              key: 'generateActions',
              value: function generateActions() {
                for (var _len6 = arguments.length, actionNames = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                  actionNames[_key6] = arguments[_key6];
                }

                actionNames.forEach(function (actionName) {
                  actions[actionName] = utils.dispatchIdentity;
                });
              }
            }]);

            return ActionsGenerator;
          })(ActionsClass);

          for (_len4 = _arguments2.length, argsForConstructor = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
            argsForConstructor[_key4 - 2] = _arguments2[_key4];
          }

          fn.assign(actions, new (_bind.apply(ActionsGenerator, [null].concat(_toConsumableArray(argsForConstructor))))());
        })();
      } else {
        fn.assign(actions, ActionsClass);
      }

      this.actions[key] = this.actions[key] || {};

      fn.eachObject(function (actionName, action) {
        if (!fn.isFunction(action)) {
          exportObj[actionName] = action;
          return;
        }

        // create the action
        exportObj[actionName] = (0, _actions2['default'])(_this2, key, actionName, action, exportObj);

        // generate a constant
        var constant = utils.formatAsConstant(actionName);
        exportObj[constant] = exportObj[actionName].id;
      }, [actions]);

      return exportObj;
    }
  }, {
    key: 'takeSnapshot',
    value: function takeSnapshot() {
      for (var _len7 = arguments.length, storeNames = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        storeNames[_key7] = arguments[_key7];
      }

      var state = StateFunctions.snapshot(this, storeNames);
      fn.assign(this._lastSnapshot, state);
      return this.serialize(state);
    }
  }, {
    key: 'rollback',
    value: function rollback() {
      StateFunctions.setAppState(this, this.serialize(this._lastSnapshot), function (storeInst) {
        storeInst.lifecycle('rollback');
        storeInst.emitChange();
      });
    }
  }, {
    key: 'recycle',
    value: function recycle() {
      for (var _len8 = arguments.length, storeNames = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        storeNames[_key8] = arguments[_key8];
      }

      var initialSnapshot = storeNames.length ? StateFunctions.filterSnapshots(this, this._initSnapshot, storeNames) : this._initSnapshot;

      StateFunctions.setAppState(this, this.serialize(initialSnapshot), function (storeInst) {
        storeInst.lifecycle('init');
        storeInst.emitChange();
      });
    }
  }, {
    key: 'flush',
    value: function flush() {
      var state = this.serialize(StateFunctions.snapshot(this));
      this.recycle();
      return state;
    }
  }, {
    key: 'bootstrap',
    value: function bootstrap(data) {
      StateFunctions.setAppState(this, data, function (storeInst, state) {
        storeInst.lifecycle('bootstrap', state);
        storeInst.emitChange();
      });
    }
  }, {
    key: 'prepare',
    value: function prepare(storeInst, payload) {
      var data = {};
      if (!storeInst.displayName) {
        throw new ReferenceError('Store provided does not have a name');
      }
      data[storeInst.displayName] = payload;
      return this.serialize(data);
    }

    // Instance type methods for injecting alt into your application as context

  }, {
    key: 'addActions',
    value: function addActions(name, ActionsClass) {
      for (var _len9 = arguments.length, args = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
        args[_key9 - 2] = arguments[_key9];
      }

      this.actions[name] = Array.isArray(ActionsClass) ? this.generateActions.apply(this, ActionsClass) : this.createActions.apply(this, [ActionsClass].concat(args));
    }
  }, {
    key: 'addStore',
    value: function addStore(name, StoreModel) {
      for (var _len10 = arguments.length, args = Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
        args[_key10 - 2] = arguments[_key10];
      }

      this.createStore.apply(this, [StoreModel, name].concat(args));
    }
  }, {
    key: 'getActions',
    value: function getActions(name) {
      return this.actions[name];
    }
  }, {
    key: 'getStore',
    value: function getStore(name) {
      return this.stores[name];
    }
  }], [{
    key: 'debug',
    value: function debug(name, alt) {
      var key = 'alt.js.org';
      if (typeof window !== 'undefined') {
        window[key] = window[key] || [];
        window[key].push({ name: name, alt: alt });
      }
      return alt;
    }
  }]);

  return Alt;
})();

exports['default'] = Alt;
module.exports = exports['default'];
},{"./actions":14,"./functions":15,"./store":19,"./utils/AltUtils":20,"./utils/StateFunctions":21,"flux":22}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _functions = require('../functions');

var fn = _interopRequireWildcard(_functions);

var _transmitter = require('transmitter');

var _transmitter2 = _interopRequireDefault(_transmitter);

var AltStore = (function () {
  function AltStore(alt, model, state, StoreModel) {
    var _this = this;

    _classCallCheck(this, AltStore);

    var lifecycleEvents = model.lifecycleEvents;
    this.transmitter = (0, _transmitter2['default'])();
    this.lifecycle = function (event, x) {
      if (lifecycleEvents[event]) lifecycleEvents[event].push(x);
    };
    this.state = state;

    this.alt = alt;
    this.preventDefault = false;
    this.displayName = model.displayName;
    this.boundListeners = model.boundListeners;
    this.StoreModel = StoreModel;
    this.reduce = model.reduce || function (x) {
      return x;
    };

    var output = model.output || function (x) {
      return x;
    };

    this.emitChange = function () {
      return _this.transmitter.push(output(_this.state));
    };

    var handleDispatch = function handleDispatch(f, payload) {
      try {
        return f();
      } catch (e) {
        if (model.handlesOwnErrors) {
          _this.lifecycle('error', {
            error: e,
            payload: payload,
            state: _this.state
          });
          return false;
        }

        throw e;
      }
    };

    fn.assign(this, model.publicMethods);

    // Register dispatcher
    this.dispatchToken = alt.dispatcher.register(function (payload) {
      _this.preventDefault = false;

      _this.lifecycle('beforeEach', {
        payload: payload,
        state: _this.state
      });

      var actionHandlers = model.actionListeners[payload.action];

      if (actionHandlers || model.otherwise) {
        var result = undefined;

        if (actionHandlers) {
          result = handleDispatch(function () {
            return actionHandlers.filter(Boolean).every(function (handler) {
              return handler.call(model, payload.data, payload.action) !== false;
            });
          }, payload);
        } else {
          result = handleDispatch(function () {
            return model.otherwise(payload.data, payload.action);
          }, payload);
        }

        if (result !== false && !_this.preventDefault) _this.emitChange();
      }

      if (model.reduce) {
        handleDispatch(function () {
          var value = model.reduce(_this.state, payload);
          if (value !== undefined) _this.state = value;
        }, payload);
        if (!_this.preventDefault) _this.emitChange();
      }

      _this.lifecycle('afterEach', {
        payload: payload,
        state: _this.state
      });
    });

    this.lifecycle('init');
  }

  _createClass(AltStore, [{
    key: 'listen',
    value: function listen(cb) {
      var _this2 = this;

      if (!fn.isFunction(cb)) throw new TypeError('listen expects a function');
      this.transmitter.subscribe(cb);
      return function () {
        return _this2.unlisten(cb);
      };
    }
  }, {
    key: 'unlisten',
    value: function unlisten(cb) {
      this.lifecycle('unlisten');
      this.transmitter.unsubscribe(cb);
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.StoreModel.config.getState.call(this, this.state);
    }
  }]);

  return AltStore;
})();

exports['default'] = AltStore;
module.exports = exports['default'];
},{"../functions":15,"transmitter":26}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _transmitter = require('transmitter');

var _transmitter2 = _interopRequireDefault(_transmitter);

var _functions = require('../functions');

var fn = _interopRequireWildcard(_functions);

var StoreMixin = {
  waitFor: function waitFor() {
    for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
      sources[_key] = arguments[_key];
    }

    if (!sources.length) {
      throw new ReferenceError('Dispatch tokens not provided');
    }

    var sourcesArray = sources;
    if (sources.length === 1) {
      sourcesArray = Array.isArray(sources[0]) ? sources[0] : sources;
    }

    var tokens = sourcesArray.map(function (source) {
      return source.dispatchToken || source;
    });

    this.dispatcher.waitFor(tokens);
  },

  exportAsync: function exportAsync(asyncMethods) {
    this.registerAsync(asyncMethods);
  },

  registerAsync: function registerAsync(asyncDef) {
    var _this = this;

    var loadCounter = 0;

    var asyncMethods = fn.isFunction(asyncDef) ? asyncDef(this.alt) : asyncDef;

    var toExport = Object.keys(asyncMethods).reduce(function (publicMethods, methodName) {
      var desc = asyncMethods[methodName];
      var spec = fn.isFunction(desc) ? desc(_this) : desc;

      var validHandlers = ['success', 'error', 'loading'];
      validHandlers.forEach(function (handler) {
        if (spec[handler] && !spec[handler].id) {
          throw new Error(handler + ' handler must be an action function');
        }
      });

      publicMethods[methodName] = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var state = _this.getInstance().getState();
        var value = spec.local && spec.local.apply(spec, [state].concat(args));
        var shouldFetch = spec.shouldFetch ? spec.shouldFetch.apply(spec, [state].concat(args))
        /*eslint-disable*/
        : value == null;
        /*eslint-enable*/
        var intercept = spec.interceptResponse || function (x) {
          return x;
        };

        var makeActionHandler = function makeActionHandler(action, isError) {
          return function (x) {
            var fire = function fire() {
              loadCounter -= 1;
              action(intercept(x, action, args));
              if (isError) throw x;
            };
            return _this.alt.trapAsync ? function () {
              return fire();
            } : fire();
          };
        };

        // if we don't have it in cache then fetch it
        if (shouldFetch) {
          loadCounter += 1;
          /* istanbul ignore else */
          if (spec.loading) spec.loading(intercept(null, spec.loading, args));
          return spec.remote.apply(spec, [state].concat(args)).then(makeActionHandler(spec.success), makeActionHandler(spec.error, 1));
        }

        // otherwise emit the change now
        _this.emitChange();
        return value;
      };

      return publicMethods;
    }, {});

    this.exportPublicMethods(toExport);
    this.exportPublicMethods({
      isLoading: function isLoading() {
        return loadCounter > 0;
      }
    });
  },

  exportPublicMethods: function exportPublicMethods(methods) {
    var _this2 = this;

    fn.eachObject(function (methodName, value) {
      if (!fn.isFunction(value)) {
        throw new TypeError('exportPublicMethods expects a function');
      }

      _this2.publicMethods[methodName] = value;
    }, [methods]);
  },

  emitChange: function emitChange() {
    this.getInstance().emitChange();
  },

  on: function on(lifecycleEvent, handler) {
    if (lifecycleEvent === 'error') this.handlesOwnErrors = true;
    var bus = this.lifecycleEvents[lifecycleEvent] || (0, _transmitter2['default'])();
    this.lifecycleEvents[lifecycleEvent] = bus;
    return bus.subscribe(handler.bind(this));
  },

  bindAction: function bindAction(symbol, handler) {
    if (!symbol) {
      throw new ReferenceError('Invalid action reference passed in');
    }
    if (!fn.isFunction(handler)) {
      throw new TypeError('bindAction expects a function');
    }

    // You can pass in the constant or the function itself
    var key = symbol.id ? symbol.id : symbol;
    this.actionListeners[key] = this.actionListeners[key] || [];
    this.actionListeners[key].push(handler.bind(this));
    this.boundListeners.push(key);
  },

  bindActions: function bindActions(actions) {
    var _this3 = this;

    fn.eachObject(function (action, symbol) {
      var matchFirstCharacter = /./;
      var assumedEventHandler = action.replace(matchFirstCharacter, function (x) {
        return 'on' + x[0].toUpperCase();
      });

      if (_this3[action] && _this3[assumedEventHandler]) {
        // If you have both action and onAction
        throw new ReferenceError('You have multiple action handlers bound to an action: ' + (action + ' and ' + assumedEventHandler));
      }

      var handler = _this3[action] || _this3[assumedEventHandler];
      if (handler) {
        _this3.bindAction(symbol, handler);
      }
    }, [actions]);
  },

  bindListeners: function bindListeners(obj) {
    var _this4 = this;

    fn.eachObject(function (methodName, symbol) {
      var listener = _this4[methodName];

      if (!listener) {
        throw new ReferenceError(methodName + ' defined but does not exist in ' + _this4.displayName);
      }

      if (Array.isArray(symbol)) {
        symbol.forEach(function (action) {
          _this4.bindAction(action, listener);
        });
      } else {
        _this4.bindAction(symbol, listener);
      }
    }, [obj]);
  }
};

exports['default'] = StoreMixin;
module.exports = exports['default'];
},{"../functions":15,"transmitter":26}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _bind = Function.prototype.bind;

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.createStoreConfig = createStoreConfig;
exports.transformStore = transformStore;
exports.createStoreFromObject = createStoreFromObject;
exports.createStoreFromClass = createStoreFromClass;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilsAltUtils = require('../utils/AltUtils');

var utils = _interopRequireWildcard(_utilsAltUtils);

var _functions = require('../functions');

var fn = _interopRequireWildcard(_functions);

var _AltStore = require('./AltStore');

var _AltStore2 = _interopRequireDefault(_AltStore);

var _StoreMixin = require('./StoreMixin');

var _StoreMixin2 = _interopRequireDefault(_StoreMixin);

function doSetState(store, storeInstance, state) {
  if (!state) {
    return;
  }

  var config = storeInstance.StoreModel.config;

  var nextState = fn.isFunction(state) ? state(storeInstance.state) : state;

  storeInstance.state = config.setState.call(store, storeInstance.state, nextState);

  if (!store.alt.dispatcher.isDispatching()) {
    store.emitChange();
  }
}

function createPrototype(proto, alt, key, extras) {
  return fn.assign(proto, _StoreMixin2['default'], {
    displayName: key,
    alt: alt,
    dispatcher: alt.dispatcher,
    preventDefault: function preventDefault() {
      this.getInstance().preventDefault = true;
    },
    boundListeners: [],
    lifecycleEvents: {},
    actionListeners: {},
    publicMethods: {},
    handlesOwnErrors: false
  }, extras);
}

function createStoreConfig(globalConfig, StoreModel) {
  StoreModel.config = fn.assign({
    getState: function getState(state) {
      if (Array.isArray(state)) {
        return state.slice();
      } else if (fn.isMutableObject(state)) {
        return fn.assign({}, state);
      }

      return state;
    },
    setState: function setState(currentState, nextState) {
      if (fn.isMutableObject(nextState)) {
        return fn.assign(currentState, nextState);
      }
      return nextState;
    }
  }, globalConfig, StoreModel.config);
}

function transformStore(transforms, StoreModel) {
  return transforms.reduce(function (Store, transform) {
    return transform(Store);
  }, StoreModel);
}

function createStoreFromObject(alt, StoreModel, key) {
  var storeInstance = undefined;

  var StoreProto = createPrototype({}, alt, key, fn.assign({
    getInstance: function getInstance() {
      return storeInstance;
    },
    setState: function setState(nextState) {
      doSetState(this, storeInstance, nextState);
    }
  }, StoreModel));

  // bind the store listeners
  /* istanbul ignore else */
  if (StoreProto.bindListeners) {
    _StoreMixin2['default'].bindListeners.call(StoreProto, StoreProto.bindListeners);
  }
  /* istanbul ignore else */
  if (StoreProto.observe) {
    _StoreMixin2['default'].bindListeners.call(StoreProto, StoreProto.observe(alt));
  }

  // bind the lifecycle events
  /* istanbul ignore else */
  if (StoreProto.lifecycle) {
    fn.eachObject(function (eventName, event) {
      _StoreMixin2['default'].on.call(StoreProto, eventName, event);
    }, [StoreProto.lifecycle]);
  }

  // create the instance and fn.assign the public methods to the instance
  storeInstance = fn.assign(new _AltStore2['default'](alt, StoreProto, StoreProto.state !== undefined ? StoreProto.state : {}, StoreModel), StoreProto.publicMethods, {
    displayName: key,
    config: StoreModel.config
  });

  return storeInstance;
}

function createStoreFromClass(alt, StoreModel, key) {
  var storeInstance = undefined;
  var config = StoreModel.config;

  // Creating a class here so we don't overload the provided store's
  // prototype with the mixin behaviour and I'm extending from StoreModel
  // so we can inherit any extensions from the provided store.

  var Store = (function (_StoreModel) {
    _inherits(Store, _StoreModel);

    function Store() {
      _classCallCheck(this, Store);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _get(Object.getPrototypeOf(Store.prototype), 'constructor', this).apply(this, args);
    }

    return Store;
  })(StoreModel);

  createPrototype(Store.prototype, alt, key, {
    type: 'AltStore',
    getInstance: function getInstance() {
      return storeInstance;
    },
    setState: function setState(nextState) {
      doSetState(this, storeInstance, nextState);
    }
  });

  for (var _len = arguments.length, argsForClass = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    argsForClass[_key - 3] = arguments[_key];
  }

  var store = new (_bind.apply(Store, [null].concat(argsForClass)))();

  /* istanbul ignore next */
  if (config.bindListeners) store.bindListeners(config.bindListeners);
  /* istanbul ignore next */
  if (config.datasource) store.registerAsync(config.datasource);

  storeInstance = fn.assign(new _AltStore2['default'](alt, store, store.state !== undefined ? store.state : store, StoreModel), utils.getInternalMethods(StoreModel), config.publicMethods, { displayName: key });

  return storeInstance;
}
},{"../functions":15,"../utils/AltUtils":20,"./AltStore":17,"./StoreMixin":18}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getInternalMethods = getInternalMethods;
exports.getPrototypeChain = getPrototypeChain;
exports.warn = warn;
exports.uid = uid;
exports.formatAsConstant = formatAsConstant;
exports.dispatchIdentity = dispatchIdentity;
exports.fsa = fsa;
exports.dispatch = dispatch;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _functions = require('../functions');

var fn = _interopRequireWildcard(_functions);

/*eslint-disable*/
var builtIns = Object.getOwnPropertyNames(NoopClass);
var builtInProto = Object.getOwnPropertyNames(NoopClass.prototype);
/*eslint-enable*/

function getInternalMethods(Obj, isProto) {
  var excluded = isProto ? builtInProto : builtIns;
  var obj = isProto ? Obj.prototype : Obj;
  return Object.getOwnPropertyNames(obj).reduce(function (value, m) {
    if (excluded.indexOf(m) !== -1) {
      return value;
    }

    value[m] = obj[m];
    return value;
  }, {});
}

function getPrototypeChain(_x2) {
  var _arguments = arguments;
  var _again = true;

  _function: while (_again) {
    var Obj = _x2;
    methods = undefined;
    _again = false;
    var methods = _arguments.length <= 1 || _arguments[1] === undefined ? {} : _arguments[1];
    if (Obj === Function.prototype) {
      return methods;
    } else {
      _arguments = [_x2 = Object.getPrototypeOf(Obj), fn.assign(methods, getInternalMethods(Obj, true))];
      _again = true;
      continue _function;
    }
  }
}

function warn(msg) {
  /* istanbul ignore else */
  /*eslint-disable*/
  if (typeof console !== 'undefined') {
    console.warn(new ReferenceError(msg));
  }
  /*eslint-enable*/
}

function uid(container, name) {
  var count = 0;
  var key = name;
  while (Object.hasOwnProperty.call(container, key)) {
    key = name + String(++count);
  }
  return key;
}

function formatAsConstant(name) {
  return name.replace(/[a-z]([A-Z])/g, function (i) {
    return i[0] + '_' + i[1].toLowerCase();
  }).toUpperCase();
}

function dispatchIdentity(x) {
  if (x === undefined) return null;

  for (var _len = arguments.length, a = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    a[_key - 1] = arguments[_key];
  }

  return a.length ? [x].concat(a) : x;
}

function fsa(id, type, payload, details) {
  return {
    type: type,
    payload: payload,
    meta: _extends({
      dispatchId: id
    }, details),

    id: id,
    action: type,
    data: payload,
    details: details
  };
}

function dispatch(id, actionObj, payload, alt) {
  var data = actionObj.dispatch(payload);
  if (data === undefined) return null;

  var type = actionObj.id;
  var namespace = type;
  var name = type;
  var details = { id: type, namespace: namespace, name: name };

  var dispatchLater = function dispatchLater(x) {
    return alt.dispatch(type, x, details);
  };

  if (fn.isFunction(data)) return data(dispatchLater, alt);

  // XXX standardize this
  return alt.dispatcher.dispatch(fsa(id, type, data, details));
}

/* istanbul ignore next */
function NoopClass() {}
},{"../functions":15}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setAppState = setAppState;
exports.snapshot = snapshot;
exports.saveInitialSnapshot = saveInitialSnapshot;
exports.filterSnapshots = filterSnapshots;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _functions = require('../functions');

var fn = _interopRequireWildcard(_functions);

function setAppState(instance, data, onStore) {
  var obj = instance.deserialize(data);
  fn.eachObject(function (key, value) {
    var store = instance.stores[key];
    if (store) {
      (function () {
        var config = store.StoreModel.config;

        var state = store.state;
        if (config.onDeserialize) obj[key] = config.onDeserialize(value) || value;
        if (fn.isMutableObject(state)) {
          fn.eachObject(function (k) {
            return delete state[k];
          }, [state]);
          fn.assign(state, obj[key]);
        } else {
          store.state = obj[key];
        }
        onStore(store, store.state);
      })();
    }
  }, [obj]);
}

function snapshot(instance) {
  var storeNames = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var stores = storeNames.length ? storeNames : Object.keys(instance.stores);
  return stores.reduce(function (obj, storeHandle) {
    var storeName = storeHandle.displayName || storeHandle;
    var store = instance.stores[storeName];
    var config = store.StoreModel.config;

    store.lifecycle('snapshot');
    var customSnapshot = config.onSerialize && config.onSerialize(store.state);
    obj[storeName] = customSnapshot ? customSnapshot : store.getState();
    return obj;
  }, {});
}

function saveInitialSnapshot(instance, key) {
  var state = instance.deserialize(instance.serialize(instance.stores[key].state));
  instance._initSnapshot[key] = state;
  instance._lastSnapshot[key] = state;
}

function filterSnapshots(instance, state, stores) {
  return stores.reduce(function (obj, store) {
    var storeName = store.displayName || store;
    if (!state[storeName]) {
      throw new ReferenceError(storeName + ' is not a valid store');
    }
    obj[storeName] = state[storeName];
    return obj;
  }, {});
}
},{"../functions":15}],22:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher')

},{"./lib/Dispatcher":23}],23:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */

"use strict";

var invariant = require('./invariant');

var _lastID = 1;
var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *
 *         case 'city-update':
 *           FlightPriceStore.price =
 *             FlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

  function Dispatcher() {
    this.$Dispatcher_callbacks = {};
    this.$Dispatcher_isPending = {};
    this.$Dispatcher_isHandled = {};
    this.$Dispatcher_isDispatching = false;
    this.$Dispatcher_pendingPayload = null;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   *
   * @param {function} callback
   * @return {string}
   */
  Dispatcher.prototype.register=function(callback) {
    var id = _prefix + _lastID++;
    this.$Dispatcher_callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   *
   * @param {string} id
   */
  Dispatcher.prototype.unregister=function(id) {
    invariant(
      this.$Dispatcher_callbacks[id],
      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
      id
    );
    delete this.$Dispatcher_callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   *
   * @param {array<string>} ids
   */
  Dispatcher.prototype.waitFor=function(ids) {
    invariant(
      this.$Dispatcher_isDispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
    );
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this.$Dispatcher_isPending[id]) {
        invariant(
          this.$Dispatcher_isHandled[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
        );
        continue;
      }
      invariant(
        this.$Dispatcher_callbacks[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
      );
      this.$Dispatcher_invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param {object} payload
   */
  Dispatcher.prototype.dispatch=function(payload) {
    invariant(
      !this.$Dispatcher_isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );
    this.$Dispatcher_startDispatching(payload);
    try {
      for (var id in this.$Dispatcher_callbacks) {
        if (this.$Dispatcher_isPending[id]) {
          continue;
        }
        this.$Dispatcher_invokeCallback(id);
      }
    } finally {
      this.$Dispatcher_stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   *
   * @return {boolean}
   */
  Dispatcher.prototype.isDispatching=function() {
    return this.$Dispatcher_isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @param {string} id
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
    this.$Dispatcher_isPending[id] = true;
    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
    this.$Dispatcher_isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @param {object} payload
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
    for (var id in this.$Dispatcher_callbacks) {
      this.$Dispatcher_isPending[id] = false;
      this.$Dispatcher_isHandled[id] = false;
    }
    this.$Dispatcher_pendingPayload = payload;
    this.$Dispatcher_isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
    this.$Dispatcher_pendingPayload = null;
    this.$Dispatcher_isDispatching = false;
  };


module.exports = Dispatcher;

},{"./invariant":24}],24:[function(require,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}],25:[function(require,module,exports){
module.exports = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

},{}],26:[function(require,module,exports){
'use strict';

function transmitter() {
  var subscriptions = [];
  var pushing = false;
  var toUnsubscribe = [];

  var unsubscribe = function unsubscribe(onChange) {
    if (pushing) {
      toUnsubscribe.push(onChange);
      return;
    }
    var id = subscriptions.indexOf(onChange);
    if (id >= 0) subscriptions.splice(id, 1);
  };

  var subscribe = function subscribe(onChange) {
    subscriptions.push(onChange);
    var dispose = function dispose() {
      return unsubscribe(onChange);
    };
    return { dispose: dispose };
  };

  var push = function push(value) {
    if (pushing) throw new Error('Cannot push while pushing');
    pushing = true;
    try {
      subscriptions.forEach(function (subscription) {
        return subscription(value);
      });
    } finally {
      pushing = false;
      toUnsubscribe = toUnsubscribe.filter(unsubscribe);
    }
  };

  return { subscribe: subscribe, push: push, unsubscribe: unsubscribe, subscriptions: subscriptions };
}

module.exports = transmitter;


},{}],27:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],28:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],29:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0;
  var isDone = false;

  function done() {
    isDone = true;
    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) return;

    if (currentTurn < turns) {
      work.call(this, currentTurn++, next, done);
    } else {
      done.apply(this, arguments);
    }
  }

  next();
}
},{}],30:[function(require,module,exports){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededError = 'QuotaExceededError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === QuotaExceededError || window.sessionStorage.length === 0) {
      // Probably in Safari "private mode" where sessionStorage quota is 0. #42
      _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode');

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = window.sessionStorage.getItem(createKey(key));

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
},{"warning":44}],31:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _invariant2['default'](_ExecutionEnvironment.canUseDOM, 'Browser history needs a DOM');

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    historyState = historyState || window.history.state || {};

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
    }

    return history.createLocation(path, state, undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];
},{"./Actions":28,"./DOMStateStorage":30,"./DOMUtils":31,"./ExecutionEnvironment":32,"./createDOMHistory":34,"invariant":43}],34:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    _invariant2['default'](_ExecutionEnvironment.canUseDOM, 'DOM history needs a DOM');

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
},{"./DOMUtils":31,"./ExecutionEnvironment":32,"./createHistory":35,"invariant":43}],35:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var keyLength = options.keyLength;
  var getUserConfirmation = options.getUserConfirmation;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function pushState(state, path) {
    transitionTo(createLocation(path, state, _Actions.PUSH, createKey()));
  }

  function replaceState(state, path) {
    transitionTo(createLocation(path, state, _Actions.REPLACE, createKey()));
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(path) {
    if (path == null || typeof path === 'string') return path;

    var pathname = path.pathname;
    var search = path.search;
    var hash = path.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(path) {
    return createPath(path);
  }

  function createLocation(path, state, action) {
    var key = arguments.length <= 3 || arguments[3] === undefined ? createKey() : arguments[3];

    return _createLocation3['default'](path, state, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    pushState: pushState,
    replaceState: replaceState,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":28,"./AsyncUtils":29,"./createLocation":36,"./deprecate":37,"./runTransitionHook":39,"deep-equal":40}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var path = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var action = arguments.length <= 2 || arguments[2] === undefined ? _Actions.POP : arguments[2];
  var key = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof path === 'string') path = _parsePath2['default'](path);

  var pathname = path.pathname || '/';
  var search = path.search || '';
  var hash = path.hash || '';

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
},{"./Actions":28,"./parsePath":38}],37:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function deprecate(fn, message) {
  return function () {
    _warning2['default'](false, '[history] ' + message);
    return fn.apply(this, arguments);
  };
}

exports['default'] = deprecate;
module.exports = exports['default'];
},{"warning":44}],38:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  _warning2['default'](false, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', string);

  return string.substring(match[0].length);
}

function parsePath(path) {
  var pathname = extractPath(path);
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

exports['default'] = parsePath;
module.exports = exports['default'];
},{"warning":44}],39:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead');
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
},{"warning":44}],40:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":41,"./lib/keys.js":42}],41:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],42:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],43:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":27}],44:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))
},{"_process":27}]},{},[2]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2ZsdXggPSByZXF1aXJlKCcuLi9mbHV4Jyk7XG5cbnZhciBfZmx1eDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mbHV4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHNlYXJjaExvY2F0aW9uU3BvdHMgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzZWFyY2hMb2NhdGlvblNwb3RzKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBzZWFyY2hMb2NhdGlvblNwb3RzKTtcblxuICAgIHRoaXMuZ2VuZXJhdGVBY3Rpb25zKCd1cGRhdGVMb2NhdGlvbicpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKHNlYXJjaExvY2F0aW9uU3BvdHMsIFt7XG4gICAga2V5OiAnc2VhcmNoU3VjY2VzcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlYXJjaFN1Y2Nlc3MocmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZWFyY2hFcnJvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlYXJjaEVycm9yKGVycikge1xuICAgICAgcmV0dXJuIGVycjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZWFyY2hTcG90cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlYXJjaFNwb3RzKHBsYWNlKSB7XG5cbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdmFyIGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG5cbiAgICAgIGdlb2NvZGVyLmdlb2NvZGUoe1xuICAgICAgICAnYWRkcmVzcyc6IHBsYWNlLFxuICAgICAgICBjb21wb25lbnRSZXN0cmljdGlvbnM6IHtcbiAgICAgICAgICBjb3VudHJ5OiAnTkcnXG4gICAgICAgIH1cbiAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuXG4gICAgICAgICAgdmFyIGxvY2F0aW9uTGF0TG5nID0ge1xuICAgICAgICAgICAgbGF0OiByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpLFxuICAgICAgICAgICAgbG5nOiByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpXG4gICAgICAgICAgfTtcbiAgICAgICAgICBzZWxmLnNlYXJjaFN1Y2Nlc3MoeyBvazogdHJ1ZSwgcGxhY2U6IHBsYWNlLCBwbGFjZUNvcmQ6IGxvY2F0aW9uTGF0TG5nIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuc2VhcmNoRXJyb3IoeyBvazogZmFsc2UsIHN0YXR1czogc3RhdHVzIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gc2VhcmNoTG9jYXRpb25TcG90cztcbn0pKCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9mbHV4Mi5kZWZhdWx0LmNyZWF0ZUFjdGlvbnMoc2VhcmNoTG9jYXRpb25TcG90cyk7XG5cbn0se1wiLi4vZmx1eFwiOjExfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdERvbSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxudmFyIF9yZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG52YXIgX3JlYWN0Um91dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0Um91dGVyKTtcblxudmFyIF9jcmVhdGVCcm93c2VySGlzdG9yeSA9IHJlcXVpcmUoJ2hpc3RvcnkvbGliL2NyZWF0ZUJyb3dzZXJIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlQnJvd3Nlckhpc3RvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQnJvd3Nlckhpc3RvcnkpO1xuXG52YXIgX3JvdXRlcyA9IHJlcXVpcmUoJy4vcm91dGVzJyk7XG5cbnZhciBfcm91dGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvdXRlcyk7XG5cbnZhciBfbmF2YmFyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL25hdmJhcicpO1xuXG52YXIgX25hdmJhcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9uYXZiYXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgaGlzdG9yeSA9ICgwLCBfY3JlYXRlQnJvd3Nlckhpc3RvcnkyLmRlZmF1bHQpKCk7XG5cbl9yZWFjdERvbTIuZGVmYXVsdC5yZW5kZXIoX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gIF9yZWFjdFJvdXRlcjIuZGVmYXVsdCxcbiAgeyBoaXN0b3J5OiBoaXN0b3J5IH0sXG4gIF9yb3V0ZXMyLmRlZmF1bHRcbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG5cbn0se1wiLi9jb21wb25lbnRzL25hdmJhclwiOjgsXCIuL3JvdXRlc1wiOjEyLFwiaGlzdG9yeS9saWIvY3JlYXRlQnJvd3Nlckhpc3RvcnlcIjozMyxcInJlYWN0XCI6XCJyZWFjdFwiLFwicmVhY3QtZG9tXCI6XCJyZWFjdC1kb21cIixcInJlYWN0LXJvdXRlclwiOlwicmVhY3Qtcm91dGVyXCJ9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIEFib3V0ID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhBYm91dCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQWJvdXQocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQWJvdXQpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihBYm91dCkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFib3V0LCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpbml0aWFsaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAgIHZhciBtYXBDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWNhbnZhcycpO1xuXG4gICAgICB2YXIgbWFwT3B0aW9ucyA9IHtcbiAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMucHJvcHMubWFwTGF0LCB0aGlzLnByb3BzLm1hcExvbmcpLFxuICAgICAgICB6b29tOiB0aGlzLnByb3BzLmluaXRpYWxab29tXG4gICAgICB9O1xuICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwQ2FudmFzLCBtYXBPcHRpb25zKTtcblxuICAgICAgdmFyIGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXG4gICAgICB2YXIgc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZShtYXApO1xuICAgICAgc2VydmljZS5uZWFyYnlTZWFyY2goe1xuICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgIGxhdDogNi40MzExLFxuICAgICAgICAgIGxuZzogMy40MTU4XG4gICAgICAgIH0sXG4gICAgICAgIHJhZGl1czogNTAwLFxuICAgICAgICB0eXBlczogWydyZXN0YXVyYW50JywgJ2NhZmUnLCAnbW92aWVfdGhlYXRlcicsICduaWdodF9jbHViJ11cbiAgICAgIH0sIGNhbGxiYWNrKTtcblxuICAgICAgZnVuY3Rpb24gY2FsbGJhY2socmVzdWx0cywgc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjcmVhdGVNYXJrZXIocmVzdWx0c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNyZWF0ZU1hcmtlcihwbGFjZSkge1xuICAgICAgICB2YXIgcGxhY2VMb2MgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbjtcbiAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgIHBvc2l0aW9uOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvblxuICAgICAgICB9KTtcblxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpbmZvd2luZG93LnNldENvbnRlbnQocGxhY2UubmFtZSk7XG4gICAgICAgICAgaW5mb3dpbmRvdy5vcGVuKG1hcCwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnc2VjdGlvbicsXG4gICAgICAgIHsgaWQ6ICdhYm91dCcsIGNsYXNzTmFtZTogJ2Fib3V0LWJnJyB9LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICB7IGNsYXNzTmFtZTogJ2RldGFpbCBjZW50ZXInIH0sXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgaWQ6ICdtYXAtY2FudmFzJyB9KSxcbiAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdhYnQtYm94IGNvbCBzNiB6LWRlcHRoLTInIH0sXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgJ2g1JyxcbiAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICd5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00JyB9LFxuICAgICAgICAgICAgICB0aGlzLnByb3BzLmNhdGNoUXVlc3RucyxcbiAgICAgICAgICAgICAgJyAnXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICdoNScsXG4gICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnaW5mbyBibHVlLXRleHQgdGV4dC1saWdodGVuLTInIH0sXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuYWJvdXRNZXNzYWdlLFxuICAgICAgICAgICAgICAnICdcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEFib3V0O1xufSkoX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbjtcblxuQWJvdXQuZGVmYXVsdFByb3BzID0ge1xuICBjYXRjaFF1ZXN0bnM6IFwiV2Uga25vdyB5b3UgbG92ZSB0byBoYXZlIGZ1biwgYnV0IGRvIHlvdSBrbm93IGFsbCB0aGUgZnVuIHBsYWNlcyBhcm91bmQgXFxuIHlvdT8gXCIgKyBcIkFyZSB5b3UgYXdhcmUgb2YgdGhlIGV4Y2l0aW5nIGV2ZW50cyBoYXBwZW5pbmcgdGhpcyB3ZWVrZW5kIGluIHlvdXIgaG9vZD8gQXJlIHlvdSBqdXN0IHZpc2l0aW5nIExhZ29zP1wiLFxuICBhYm91dE1lc3NhZ2U6IFwiZ2lkaUhvdHMgbGV0IHlvdSBrbm93IHdoZXJlIGl0cyBoYXBwZW5pbmcsIHdlIHRlbGwgeW91IHdoZXJlIHRvIGdvLCBhbmQgc2hvdyB5b3UgYWxsIHRoZSBmdW4gc3BvdCBhcm91bmQgeW91LiBcIiArIFwiTm8gbWF0dGVyIHlvdXIgYXJlYSBvZiBpbnRlcmVzdCwgY2x1YnMsIHBhcnRpZXMsIGNvbmNlcnRzLCBjaW5lbWEgYW5kIG1vdmllIHByZW1pZXJlcywgc3BvcnQgZXZlbnRzLCBhbmQgYW55IG90aGVyIGludGVyZXN0aW5nIGFjdGl2aXR5IFwiICsgXCJ3ZSBnZXQgeW91IGluZm9ybWVkLCBpdHMgc2ltcGxlLCBqdXN0IHByb3ZpZGUgeW91ciBsb2NhdGlvbiBvciBhIGNpdHkgaW4gTGFnb3MgeW91J3JlIGNvbnNpZGVyaW5nIHZpc2l0aW5nIGFuZCBcIiArIFwieW91IGdldCBhbGwgdGhlIGhvdHNwb3RzIGFuZCBldmVudHMgYXBlYXJzIG9uIGEgbWFwIGFzIHNob3duIHdpdGggZGlyZWN0aW9ucyB0byB0aGUgcGxhY2VzLCBpdHMgYWJzb2x1dGVseSBmcmVlIVwiLFxuICBpbml0aWFsWm9vbTogMTYsXG4gIG1hcExhdDogNi40MzExLFxuICBtYXBMb25nOiAzLjQxNThcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFib3V0O1xuXG59LHtcInJlYWN0XCI6XCJyZWFjdFwifV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgQ29udGFjdCA9IChmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQ29udGFjdCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ29udGFjdChwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb250YWN0KTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29udGFjdCkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKENvbnRhY3QsIFt7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwic2VjdGlvblwiLFxuICAgICAgICB7IGlkOiBcImNvbnRhY3RcIiwgY2xhc3NOYW1lOiBcImNvbnRhY3QtYmdcIiB9LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgY2xhc3NOYW1lOiBcIm0xIGNlbnRlciBoZWFkaW5nXCIgfSxcbiAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiaDVcIixcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcInllbGxvdy10ZXh0IHRleHQtZGFya2VuLTRcIiB9LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jb250YWN0TWVzc2FnZVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IGNsYXNzTmFtZTogXCJyb3cgY29udGFjdC1mb3JtIGNlbnRlclwiIH0sXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImZvcm1cIixcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcInN1Yi1mb3JtIGNvbCBzMTJcIiB9LFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcInJvd1wiIH0sXG4gICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwiaW5wdXQtZmllbGQgY29sIHMxMlwiIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImlcIixcbiAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcIm1hdGVyaWFsLWljb25zIHByZWZpeCB5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00XCIgfSxcbiAgICAgICAgICAgICAgICAgIFwicGVybV9pZGVudGl0eVwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgaWQ6IFwibmFtZVwiLCB0eXBlOiBcInRleHRcIiwgY2xhc3NOYW1lOiBcInZhbGlkYXRlXCIgfSksXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJ5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00XCIsIGh0bWxGb3I6IFwibmFtZVwiIH0sXG4gICAgICAgICAgICAgICAgICBcIk5hbWVcIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJyb3dcIiB9LFxuICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcImlucHV0LWZpZWxkIGNvbCBzMTJcIiB9LFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgXCJpXCIsXG4gICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJtYXRlcmlhbC1pY29ucyBwcmVmaXggeWVsbG93LXRleHQgdGV4dC1kYXJrZW4tNFwiIH0sXG4gICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7IHJvd3M6IFwiNFwiLCBjb2xzOiBcIjJcIiwgaWQ6IFwibWVzc2FnZVwiLCB0eXBlOiBcImVtYWlsXCIsIGNsYXNzTmFtZTogXCJtYXRlcmlhbGl6ZS10ZXh0YXJlYVwiIH0pLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwieWVsbG93LXRleHQgdGV4dC1kYXJrZW4tNFwiLCBodG1sRm9yOiBcIm1lc3NhZ2VcIiB9LFxuICAgICAgICAgICAgICAgICAgXCJNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcIiBjZW50ZXIgYnRuIHotZGVwdC0yIGJ0bi1mbGF0IHllbGxvdyBkYXJrZW4tNCBibGFjay10ZXh0XCIgfSxcbiAgICAgICAgICAgIFwiU2VuZFwiXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgY2xhc3NOYW1lOiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImg1XCIsXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJibG9jayBpbmZvIGJsdWUtdGV4dCB0ZXh0LWxpZ2h0ZW4tMlwiIH0sXG4gICAgICAgICAgICBcIllvdSBjYW4gYWxzbyByZWFjaCB1cyB0aHJvdWdoIG91ciBtYWlsLFwiXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiaDVcIixcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcImVtYWlsIGluZm8gYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi0yXCIgfSxcbiAgICAgICAgICAgIFwiIGNvbnRhY3RAZ2lkaWhvdHMuY29tXCJcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENvbnRhY3Q7XG59KShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuO1xuXG5Db250YWN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgY29udGFjdE1lc3NhZ2U6IFwiQWRkIHlvdXIgYnVzaW5lc3MgYW5kIGV2ZW50cyB0byBvdXIgbGlzdCwgZ2V0IGluIHRvdWNoIHdpdGggdXMuXCJcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvbnRhY3Q7XG5cbn0se1wicmVhY3RcIjpcInJlYWN0XCJ9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBGb290ZXIgPSAoZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEZvb3RlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gRm9vdGVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGb290ZXIpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihGb290ZXIpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEZvb3RlciwgW3tcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkTW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCIuYnV0dG9uLWNvbGxhcHNlXCIpLnNpZGVOYXYoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBcInNlY3Rpb25cIixcbiAgICAgICAgbnVsbCxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJmb290ZXJcIixcbiAgICAgICAgICB7IGNsYXNzTmFtZTogXCJwYWdlLWZvb3RlciB5ZWxsb3cgZGFya2VuLTRcIiB9LFxuICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcImZvb3Rlci1jb3B5cmlnaHQgeWVsbG93IGRhcmtlbi00XCIgfSxcbiAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJmb290ZXJcIiB9LFxuICAgICAgICAgICAgICBcIsKpIDIwMTUgZ2lkaUhvdHNcIixcbiAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJyaWdodCBuby1tYXJnaW5cIiB9LFxuICAgICAgICAgICAgICAgIFwiRGVzaWduIHdpdGggIMKgXCIsXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImlcIixcbiAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcIm1hdGVyaWFsLWljb25zIHByZWZpeCByZWQtdGV4dCB0ZXh0LWRhcmstMlwiIH0sXG4gICAgICAgICAgICAgICAgICBcImZhdm9yaXRlXCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFwiwqAgYnkgwqBcIixcbiAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwiYmxhY2stdGV4dFwiLCB0YXJnZXQ6IFwiX2JsYW5rXCIsIGhyZWY6IFwiaHR0cHM6Ly9naXRodWIuY29tL2FuZGVsYS1iYXRvbGFnYmVcIiB9LFxuICAgICAgICAgICAgICAgICAgXCJCaXNveWUgwqBcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgXCJmcm9tIMKgXCIsXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgIHsgaHJlZjogXCJodHRwOi8vYW5kZWxhLmNvbVwiLCB0YXJnZXQ6IFwiX2JsYW5rXCIgfSxcbiAgICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgY2xhc3NOYW1lOiBcImFuZGVsYS1mb290ZXJcIiwgc3JjOiBcIi4uLy4uL2Fzc2V0cy9pbWFnZXMvYW5kZWxhMi5qcGVnXCIgfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEZvb3Rlcjtcbn0pKF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBGb290ZXI7XG5cbn0se1wicmVhY3RcIjpcInJlYWN0XCJ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfc2VhcmNoU3BvdCA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvc2VhcmNoU3BvdCcpO1xuXG52YXIgX3NlYXJjaFNwb3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2VhcmNoU3BvdCk7XG5cbnZhciBfc3BvdFN0b3JlcyA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9zcG90U3RvcmVzJyk7XG5cbnZhciBfc3BvdFN0b3JlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zcG90U3RvcmVzKTtcblxudmFyIF9yZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG52YXIgX3JlYWN0Um91dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0Um91dGVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgSG9tZSA9IChmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoSG9tZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSG9tZShwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBIb21lKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihIb21lKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IF9zcG90U3RvcmVzMi5kZWZhdWx0LmdldFN0YXRlKCk7XG4gICAgX3RoaXMub25DaGFuZ2UgPSBfdGhpcy5vbkNoYW5nZS5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoSG9tZSwgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgX3Nwb3RTdG9yZXMyLmRlZmF1bHQubGlzdGVuKHRoaXMub25DaGFuZ2UpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBfc3BvdFN0b3JlczIuZGVmYXVsdC51bmxpc3Rlbih0aGlzLm9uQ2hhbmdlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkNoYW5nZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2hhbmdlKHN0YXRlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYW5kbGVDbGljaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLnN0YXRlLmxvY2F0aW9uLnRyaW0oKTtcbiAgICAgIGlmICghbG9jYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaFN0YXRlKCdzZWFyY2hlcycpO1xuICAgICAgX3NlYXJjaFNwb3QyLmRlZmF1bHQuc2VhcmNoU3BvdHMobG9jYXRpb24pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ3NlY3Rpb24nLFxuICAgICAgICB7IGNsYXNzTmFtZTogJ2xhbmRpbmctYmcnIH0sXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY2VudGVyIGhlYWRpbmcnIH0sXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnaDEnLFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6ICd5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00JyB9LFxuICAgICAgICAgICAgJ0ZpbmQgdGhlIEZ1biwgVGhlbiBHbyBIYXZlIEl0ISdcbiAgICAgICAgICApLFxuICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2g0JyxcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi0yJyB9LFxuICAgICAgICAgICAgJ2dpZGlIb3RzIHRlbGxzIHlvdSB3aGF0IGFuZCB3aGVyZSBpdCBpcyBoYXBwZW5pbmcgbmVhciB5b3UsICcsXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnYnInLCBudWxsKSxcbiAgICAgICAgICAgICd0aGVuIHlvdSBjYW4gZGVjaWRlIHRvIGpvaW4gdGhlIGV4Y2l0ZW1lbnQnXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnZm9ybScsXG4gICAgICAgICAgeyBvblN1Ym1pdDogdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpIH0sXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncm93IGNlbnRlcmVkJyB9LFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2lucHV0LWZpZWxkIGNvbCBzNiB6LWRlcHRoLTQnIH0sXG4gICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdpJyxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ21hdGVyaWFsLWljb25zIHByZWZpeCBibHVlLXRleHQgdGV4dC1saWdodGVuLTInIH0sXG4gICAgICAgICAgICAgICAgJ3NlYXJjaCdcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyBvbkNoYW5nZTogX3NlYXJjaFNwb3QyLmRlZmF1bHQudXBkYXRlTG9jYXRpb24sIHR5cGU6ICd0ZXh0JywgY2xhc3NOYW1lOiAnYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi0yJywgaWQ6ICdsb2Mtc2VhcmNoJyB9KSxcbiAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2JsdWUtdGV4dCB0ZXh0LWxpZ2h0ZW4tMicsIGh0bWxGb3I6ICdsb2Mtc2VhcmNoJyB9LFxuICAgICAgICAgICAgICAgICdFbnRlciB5b3VyIGxvY2F0aW9uJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICdidXR0b24nLFxuICAgICAgICAgICAgICB7IHR5cGU6ICdzdWJtaXQnLCBjbGFzc05hbWU6ICcgYnRuIGJ0bi1sYXJnZSByaWdodCB5ZWxsb3cgZGFya2VuLTQgYmx1ZS10ZXh0IHRleHQtZGFya2VuLTQnIH0sXG4gICAgICAgICAgICAgICdGaW5kJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSG9tZTtcbn0pKF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG47XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEhvbWU7XG5cbn0se1wiLi4vYWN0aW9ucy9zZWFyY2hTcG90XCI6MSxcIi4uL3N0b3Jlcy9zcG90U3RvcmVzXCI6MTMsXCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LXJvdXRlclwiOlwicmVhY3Qtcm91dGVyXCJ9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfbmF2YmFyID0gcmVxdWlyZSgnLi9uYXZiYXInKTtcblxudmFyIF9uYXZiYXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbmF2YmFyKTtcblxudmFyIF9ob21lID0gcmVxdWlyZSgnLi9ob21lJyk7XG5cbnZhciBfaG9tZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ob21lKTtcblxudmFyIF9hYm91dCA9IHJlcXVpcmUoJy4vYWJvdXQnKTtcblxudmFyIF9hYm91dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYm91dCk7XG5cbnZhciBfc3Vic2NyaWJlID0gcmVxdWlyZSgnLi9zdWJzY3JpYmUnKTtcblxudmFyIF9zdWJzY3JpYmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3Vic2NyaWJlKTtcblxudmFyIF9jb250YWN0ID0gcmVxdWlyZSgnLi9jb250YWN0Jyk7XG5cbnZhciBfY29udGFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb250YWN0KTtcblxudmFyIF9mb290ZXIgPSByZXF1aXJlKCcuL2Zvb3RlcicpO1xuXG52YXIgX2Zvb3RlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mb290ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBBcHAgPSAoZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEFwcCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQXBwKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBcHApO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihBcHApLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFwcCwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdzZWN0aW9uJyxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX25hdmJhcjIuZGVmYXVsdCwgeyBoaXN0b3J5OiB0aGlzLnByb3BzLmhpc3RvcnkgfSksXG4gICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW4sXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9mb290ZXIyLmRlZmF1bHQsIG51bGwpXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBcHA7XG59KShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBcHA7XG5cbn0se1wiLi9hYm91dFwiOjMsXCIuL2NvbnRhY3RcIjo0LFwiLi9mb290ZXJcIjo1LFwiLi9ob21lXCI6NixcIi4vbmF2YmFyXCI6OCxcIi4vc3Vic2NyaWJlXCI6MTAsXCJyZWFjdFwiOlwicmVhY3RcIn1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBOYXZCYXIgPSAoZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKE5hdkJhciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTmF2QmFyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXZCYXIpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihOYXZCYXIpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE5hdkJhciwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICduYXYnLFxuICAgICAgICB7IGNsYXNzTmFtZTogJ21haW4tbmF2IG5hdmJhci1maXhlZCB6LWRlcHRoLTIgZ3JleSBkYXJrZW4tNCcgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgeyBjbGFzc05hbWU6ICduYXYtd3JhcHBlcicgfSxcbiAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIF9yZWFjdFJvdXRlci5MaW5rLFxuICAgICAgICAgICAgeyB0bzogJy8nIH0sXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW1hZ2UnLCB7IHNyYzogJy4uLy4uL2Fzc2V0cy9pbWFnZXMvZ2lkaS1sb2dvLmpwZycsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2JyYW5kLWxvZ28gbGVmdCB0ZXh0LWRhcmtlbi0zJyB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBfcmVhY3RSb3V0ZXIuTGluayxcbiAgICAgICAgICAgIHsgdG86ICcvJywgJ2RhdGEtYWN0aXZhdGVzJzogJ21vYmlsZScsIGNsYXNzTmFtZTogJyByaWdodCBidXR0b24tY29sbGFwc2UnIH0sXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgJ2knLFxuICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ21hdGVyaWFsLWljb25zIHllbGxvdy10ZXh0IHRleHQtZGFya2VuLTQnIH0sXG4gICAgICAgICAgICAgICdtZW51J1xuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAndWwnLFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93bicgfSxcbiAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAnbGknLFxuICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBfcmVhY3RSb3V0ZXIuTGluayxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2J0bi1mbGF0IHllbGxvdy10ZXh0IHRleHQtZGFya2VuLTQnLCB0bzogJ2Fib3V0JyB9LFxuICAgICAgICAgICAgICAgICcgQWJvdXQgR2lkaUhvdHMnXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgJ2xpJyxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgX3JlYWN0Um91dGVyLkxpbmssXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdidG4tZmxhdCB5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00JywgdG86ICdzdWJzY3JpYmUnIH0sXG4gICAgICAgICAgICAgICAgJyBHZXQgSW5mb3JtZWQnXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgJ2xpJyxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgX3JlYWN0Um91dGVyLkxpbmssXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdidG4tZmxhdCB5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00JywgdG86ICdjb250YWN0JyB9LFxuICAgICAgICAgICAgICAgICcgVGFsayBUbyBVcyAnXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ3VsJyxcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAncmlnaHQgYmxhY2sgc2lkZS1uYXYnLCBpZDogJ21vYmlsZScgfSxcbiAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAnbGknLFxuICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBfcmVhY3RSb3V0ZXIuTGluayxcbiAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2J0bi1mbGF0IHllbGxvdy10ZXh0IHRleHQtZGFya2VuLTQnLCB0bzogJ2Fib3V0JyB9LFxuICAgICAgICAgICAgICAgICcgQWJvdXQgR2lkaUhvdHMnXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgJ2xpJyxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgX3JlYWN0Um91dGVyLkxpbmssXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdidG4tZmxhdCB5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00JywgdG86ICdzdWJzY3JpYmUnIH0sXG4gICAgICAgICAgICAgICAgJyBHZXQgSW5mb3JtZWQnXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgJ2xpJyxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgX3JlYWN0Um91dGVyLkxpbmssXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdidG4tZmxhdCB5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00JywgdG86ICdjb250YWN0JyB9LFxuICAgICAgICAgICAgICAgICcgVGFsayBUbyBVcyAnXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE5hdkJhcjtcbn0pKF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG47XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE5hdkJhcjtcblxufSx7XCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LXJvdXRlclwiOlwicmVhY3Qtcm91dGVyXCJ9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcblxudmFyIF9zcG90U3RvcmVzID0gcmVxdWlyZSgnLi4vc3RvcmVzL3Nwb3RTdG9yZXMnKTtcblxudmFyIF9zcG90U3RvcmVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Nwb3RTdG9yZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBEaXNwbGF5UmVzdWx0ID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhEaXNwbGF5UmVzdWx0LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBEaXNwbGF5UmVzdWx0KHByb3BzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERpc3BsYXlSZXN1bHQpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKERpc3BsYXlSZXN1bHQpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnN0YXRlID0gX3Nwb3RTdG9yZXMyLmRlZmF1bHQuZ2V0U3RhdGUoKTtcbiAgICBfdGhpcy5vbkNoYW5nZSA9IF90aGlzLm9uQ2hhbmdlLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhEaXNwbGF5UmVzdWx0LCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLmxhdCk7XG4gICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkNoYW5nZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2hhbmdlKHN0YXRlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpbml0aWFsaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAgIHZhciBtYXBDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0LW1hcCcpO1xuXG4gICAgICB2YXIgbWFwT3B0aW9ucyA9IHtcbiAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHRoaXMucHJvcHMubWFwTGF0LCB0aGlzLnByb3BzLm1hcExvbmcpLFxuICAgICAgICB6b29tOiB0aGlzLnByb3BzLmluaXRpYWxab29tXG4gICAgICB9O1xuICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwQ2FudmFzLCBtYXBPcHRpb25zKTtcblxuICAgICAgdmFyIGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuXG4gICAgICB2YXIgc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZShtYXApO1xuICAgICAgc2VydmljZS5uZWFyYnlTZWFyY2goe1xuICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgIGxhdDogdGhpcy5wcm9wcy5sYXQsXG4gICAgICAgICAgbG5nOiB0aGlzLnByb3BzLmxuZ1xuICAgICAgICB9LFxuICAgICAgICByYWRpdXM6IDUwMCxcbiAgICAgICAgdHlwZXM6IFsncmVzdGF1cmFudCddXG4gICAgICB9LCBjYWxsYmFjayk7XG5cbiAgICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlc3VsdHMsIHN0YXR1cykge1xuICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY3JlYXRlTWFya2VyKHJlc3VsdHNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjcmVhdGVNYXJrZXIocGxhY2UpIHtcbiAgICAgICAgdmFyIHBsYWNlTG9jID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb247XG4gICAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICBwb3NpdGlvbjogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb25cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaW5mb3dpbmRvdy5zZXRDb250ZW50KHBsYWNlLm5hbWUpO1xuICAgICAgICAgIGluZm93aW5kb3cub3BlbihtYXAsIHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdzZWN0aW9uJyxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdoNCcsXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogJ3llbGxvdy10ZXh0IHRleHQtZGFya2VuLTQgY2VudGVyIGluZm8gZGV0YWlsJyB9LFxuICAgICAgICAgICAgJ0hvdCBTcG90cyBBcm91bmQgWW91LidcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGlkOiAncmVzdWx0LW1hcCcsIGNsYXNzTmFtZTogJ3JvdyBjb2wgczEyJyB9KSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgeyBjbGFzc05hbWU6ICdjZW50ZXInIH0sXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBfcmVhY3RSb3V0ZXIuTGluayxcbiAgICAgICAgICAgIHsgdG86ICcvJyB9LFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICdidXR0b24nLFxuICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJyBidG4gei1kZXB0LTIgYnRuLWZsYXQgeWVsbG93IGRhcmtlbi00IGJsYWNrLXRleHQnIH0sXG4gICAgICAgICAgICAgICdUYWtlIE1lIEJhY2snXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEaXNwbGF5UmVzdWx0O1xufSkoX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbkRpc3BsYXlSZXN1bHQuZGVmYXVsdFByb3BzID0ge1xuICBpbml0aWFsWm9vbTogMTYsXG4gIG1hcExhdDogNi40NTMxMSxcbiAgbWFwTG9uZzogMy4zOTU4XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEaXNwbGF5UmVzdWx0O1xuXG59LHtcIi4uL3N0b3Jlcy9zcG90U3RvcmVzXCI6MTMsXCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LXJvdXRlclwiOlwicmVhY3Qtcm91dGVyXCJ9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgU3Vic2NyaWJlID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhTdWJzY3JpYmUsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFN1YnNjcmliZShwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdWJzY3JpYmUpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihTdWJzY3JpYmUpLmNhbGwodGhpcywgcHJvcHMpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTdWJzY3JpYmUsIFt7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwic2VjdGlvblwiLFxuICAgICAgICB7IGlkOiBcInN1YnNjcmliZVwiLCBjbGFzc05hbWU6IFwic3ViXCIgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IGNsYXNzTmFtZTogXCJtMSBjZW50ZXIgaGVhZGluZ1wiIH0sXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImg0XCIsXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJ5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00XCIgfSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc3Vic2NyaWJlTWVzc2FnZVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IGNsYXNzTmFtZTogXCJyb3cgY2VudGVyIHN1Yi13cmFwcGVyIGFidC1ib3ggei1kZXB0LTEtaGFsZlwiIH0sXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBcImZvcm1cIixcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcInN1Yi1mb3JtIGNvbCBzMTJcIiB9LFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcInJvd1wiIH0sXG4gICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwiaW5wdXQtZmllbGQgY29sIHMxMlwiIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImlcIixcbiAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcIm1hdGVyaWFsLWljb25zIHByZWZpeCB5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00XCIgfSxcbiAgICAgICAgICAgICAgICAgIFwicGVybV9pZGVudGl0eVwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgaWQ6IFwibmFtZVwiLCB0eXBlOiBcInRleHRcIiwgY2xhc3NOYW1lOiBcInZhbGlkYXRlXCIgfSksXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJ5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00XCIsIGh0bWxGb3I6IFwibmFtZVwiIH0sXG4gICAgICAgICAgICAgICAgICBcIk5hbWVcIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJyb3dcIiB9LFxuICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcImlucHV0LWZpZWxkIGNvbCBzMTJcIiB9LFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgXCJpXCIsXG4gICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJtYXRlcmlhbC1pY29ucyBwcmVmaXggeWVsbG93LXRleHQgdGV4dC1kYXJrZW4tNFwiIH0sXG4gICAgICAgICAgICAgICAgICBcIm15X2xvY2F0aW9uXCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBpZDogXCJsb2NhdGlvblwiLCB0eXBlOiBcImVtYWlsXCIsIGNsYXNzTmFtZTogXCJ2YWxpZGF0ZVwiIH0pLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6IFwieWVsbG93LXRleHQgdGV4dC1kYXJrZW4tNFwiLCBodG1sRm9yOiBcImxvY2F0aW9uXCIgfSxcbiAgICAgICAgICAgICAgICAgIFwiTG9jYXRpb25cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJyb3dcIiB9LFxuICAgICAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBcImlucHV0LWZpZWxkIGNvbCBzMTJcIiB9LFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgXCJpXCIsXG4gICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJtYXRlcmlhbC1pY29ucyBwcmVmaXggeWVsbG93LXRleHQgdGV4dC1kYXJrZW4tNFwiIH0sXG4gICAgICAgICAgICAgICAgICBcImVtYWlsXCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBpZDogXCJlbWFpbFwiLCB0eXBlOiBcInRleHRcIiwgY2xhc3NOYW1lOiBcInZhbGlkYXRlXCIgfSksXG4gICAgICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogXCJ5ZWxsb3ctdGV4dCB0ZXh0LWRhcmtlbi00XCIsIGh0bWxGb3I6IFwiZW1haWxcIiB9LFxuICAgICAgICAgICAgICAgICAgXCJFbWFpbFwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogXCIgY2VudGVyIGJ0biBidG4tbGFyZ2UgeWVsbG93IGRhcmtlbi00IGJsYWNrLXRleHRcIiB9LFxuICAgICAgICAgICAgXCJTdWJzY3JpYmVcIlxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3Vic2NyaWJlO1xufSkoX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbjtcblxuU3Vic2NyaWJlLmRlZmF1bHRQcm9wcyA9IHtcbiAgc3Vic2NyaWJlTWVzc2FnZTogXCJHZXQgdXBkYXRlcyBhYm91dCBoYXBwZW5pbmdzIG5lYXIgeW91LCBzdWJzY3JpYmUgZm9yIG91ciB3ZWVrbHkgZXZlbnQgdXBkYXRlcy5cIlxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3Vic2NyaWJlO1xuXG59LHtcInJlYWN0XCI6XCJyZWFjdFwifV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2FsdCA9IHJlcXVpcmUoJ2FsdCcpO1xuXG52YXIgX2FsdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hbHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRmx1eCA9IG5ldyBfYWx0Mi5kZWZhdWx0KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZsdXg7XG5cbn0se1wiYWx0XCI6MTZ9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG52YXIgX21haW5BcHAgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWFpbkFwcCcpO1xuXG52YXIgX21haW5BcHAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWFpbkFwcCk7XG5cbnZhciBfaG9tZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9ob21lJyk7XG5cbnZhciBfaG9tZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ob21lKTtcblxudmFyIF9hYm91dCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9hYm91dCcpO1xuXG52YXIgX2Fib3V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fib3V0KTtcblxudmFyIF9zdWJzY3JpYmUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvc3Vic2NyaWJlJyk7XG5cbnZhciBfc3Vic2NyaWJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N1YnNjcmliZSk7XG5cbnZhciBfY29udGFjdCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9jb250YWN0Jyk7XG5cbnZhciBfY29udGFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb250YWN0KTtcblxudmFyIF9zZWFyY2hSZXN1bHQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2VhcmNoUmVzdWx0Jyk7XG5cbnZhciBfc2VhcmNoUmVzdWx0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NlYXJjaFJlc3VsdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICBfcmVhY3RSb3V0ZXIuUm91dGUsXG4gIHsgcGF0aDogJy8nLCBjb21wb25lbnQ6IF9tYWluQXBwMi5kZWZhdWx0IH0sXG4gIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFJvdXRlci5JbmRleFJvdXRlLCB7IGNvbXBvbmVudDogX2hvbWUyLmRlZmF1bHQgfSksXG4gIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFJvdXRlci5Sb3V0ZSwgeyBwYXRoOiAnLycsIGNvbXBvbmVudDogX2hvbWUyLmRlZmF1bHQgfSksXG4gIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFJvdXRlci5Sb3V0ZSwgeyBwYXRoOiAnYWJvdXQnLCBjb21wb25lbnQ6IF9hYm91dDIuZGVmYXVsdCB9KSxcbiAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0Um91dGVyLlJvdXRlLCB7IHBhdGg6ICdzdWJzY3JpYmUnLCBjb21wb25lbnQ6IF9zdWJzY3JpYmUyLmRlZmF1bHQgfSksXG4gIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFJvdXRlci5Sb3V0ZSwgeyBwYXRoOiAnY29udGFjdCcsIGNvbXBvbmVudDogX2NvbnRhY3QyLmRlZmF1bHQgfSksXG4gIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFJvdXRlci5Sb3V0ZSwgeyBwYXRoOiAnc2VhcmNoZXMnLCBjb21wb25lbnQ6IF9zZWFyY2hSZXN1bHQyLmRlZmF1bHQgfSlcbik7XG5cbn0se1wiLi9jb21wb25lbnRzL2Fib3V0XCI6MyxcIi4vY29tcG9uZW50cy9jb250YWN0XCI6NCxcIi4vY29tcG9uZW50cy9ob21lXCI6NixcIi4vY29tcG9uZW50cy9tYWluQXBwXCI6NyxcIi4vY29tcG9uZW50cy9zZWFyY2hSZXN1bHRcIjo5LFwiLi9jb21wb25lbnRzL3N1YnNjcmliZVwiOjEwLFwicmVhY3RcIjpcInJlYWN0XCIsXCJyZWFjdC1yb3V0ZXJcIjpcInJlYWN0LXJvdXRlclwifV0sMTM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZmx1eCA9IHJlcXVpcmUoJy4uL2ZsdXgnKTtcblxudmFyIF9mbHV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsdXgpO1xuXG52YXIgX3NlYXJjaFNwb3QgPSByZXF1aXJlKCcuLi9hY3Rpb25zL3NlYXJjaFNwb3QnKTtcblxudmFyIF9zZWFyY2hTcG90MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NlYXJjaFNwb3QpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgc3BvdHNTdG9yZSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNwb3RzU3RvcmUoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIHNwb3RzU3RvcmUpO1xuXG4gICAgdGhpcy5iaW5kQWN0aW9ucyhfc2VhcmNoU3BvdDIuZGVmYXVsdCk7XG4gICAgdGhpcy5wbGFjZSA9ICdhJztcbiAgICB0aGlzLmxhdCA9ICdhJztcbiAgICB0aGlzLmxuZyA9ICdhJztcbiAgICB0aGlzLmVyciA9IG51bGw7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3Moc3BvdHNTdG9yZSwgW3tcbiAgICBrZXk6ICdvblNlYXJjaFN1Y2Nlc3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblNlYXJjaFN1Y2Nlc3MoZGF0YSkge1xuICAgICAgdGhpcy5wbGFjZSA9IGRhdGEucGxhY2U7XG4gICAgICB0aGlzLmxhdCA9IGRhdGEucGxhY2VDb3JkLmxhdDtcbiAgICAgIHRoaXMubG5nID0gZGF0YS5wbGFjZUNvcmQubG5nO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uU2VhcmNoRXJyb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblNlYXJjaEVycm9yKGVycikge1xuICAgICAgdGhpcy5lcnIgPSBlcnIuc3RhdHVzICsgJyBlcnJvciBmZXRjaGluZyBob3RzcG90cyBpbiB5b3VyIGxvY2F0aW9uLCB0cnkgYWdhaW4nO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uVXBkYXRlTG9jYXRpb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblVwZGF0ZUxvY2F0aW9uKGV2ZW50KSB7XG4gICAgICB0aGlzLmxvY2F0aW9uID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBzcG90c1N0b3JlO1xufSkoKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2ZsdXgyLmRlZmF1bHQuY3JlYXRlU3RvcmUoc3BvdHNTdG9yZSk7XG5cbn0se1wiLi4vYWN0aW9ucy9zZWFyY2hTcG90XCI6MSxcIi4uL2ZsdXhcIjoxMX1dLDE0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBtYWtlQWN0aW9uO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmpbJ2RlZmF1bHQnXSA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbnZhciBfZnVuY3Rpb25zID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zJyk7XG5cbnZhciBmbiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9mdW5jdGlvbnMpO1xuXG52YXIgX3V0aWxzQWx0VXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9BbHRVdGlscycpO1xuXG52YXIgdXRpbHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNBbHRVdGlscyk7XG5cbnZhciBfaXNQcm9taXNlID0gcmVxdWlyZSgnaXMtcHJvbWlzZScpO1xuXG52YXIgX2lzUHJvbWlzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1Byb21pc2UpO1xuXG5mdW5jdGlvbiBtYWtlQWN0aW9uKGFsdCwgbmFtZXNwYWNlLCBuYW1lLCBpbXBsZW1lbnRhdGlvbiwgb2JqKSB7XG4gIHZhciBpZCA9IHV0aWxzLnVpZChhbHQuX2FjdGlvbnNSZWdpc3RyeSwgbmFtZXNwYWNlICsgJy4nICsgbmFtZSk7XG4gIGFsdC5fYWN0aW9uc1JlZ2lzdHJ5W2lkXSA9IDE7XG5cbiAgdmFyIGRhdGEgPSB7IGlkOiBpZCwgbmFtZXNwYWNlOiBuYW1lc3BhY2UsIG5hbWU6IG5hbWUgfTtcblxuICB2YXIgZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChwYXlsb2FkKSB7XG4gICAgcmV0dXJuIGFsdC5kaXNwYXRjaChpZCwgcGF5bG9hZCwgZGF0YSk7XG4gIH07XG5cbiAgLy8gdGhlIGFjdGlvbiBpdHNlbGZcbiAgdmFyIGFjdGlvbiA9IGZ1bmN0aW9uIGFjdGlvbigpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gaW1wbGVtZW50YXRpb24uYXBwbHkob2JqLCBhcmdzKTtcblxuICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBwcm9taXNlcyBzaG91bGQgbm90IGJlIGRpc3BhdGNoZWRcbiAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgISgwLCBfaXNQcm9taXNlMlsnZGVmYXVsdCddKShyZXN1bHQpKSB7XG4gICAgICBpZiAoZm4uaXNGdW5jdGlvbihyZXN1bHQpKSB7XG4gICAgICAgIHJlc3VsdChkaXNwYXRjaCwgYWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB1dGlscy53YXJuKCdBbiBhY3Rpb24gd2FzIGNhbGxlZCBidXQgbm90aGluZyB3YXMgZGlzcGF0Y2hlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIGFjdGlvbi5kZWZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhY3Rpb24uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSk7XG4gIH07XG4gIGFjdGlvbi5pZCA9IGlkO1xuICBhY3Rpb24uZGF0YSA9IGRhdGE7XG5cbiAgLy8gZW5zdXJlIGVhY2ggcmVmZXJlbmNlIGlzIHVuaXF1ZSBpbiB0aGUgbmFtZXNwYWNlXG4gIHZhciBjb250YWluZXIgPSBhbHQuYWN0aW9uc1tuYW1lc3BhY2VdO1xuICB2YXIgbmFtZXNwYWNlSWQgPSB1dGlscy51aWQoY29udGFpbmVyLCBuYW1lKTtcbiAgY29udGFpbmVyW25hbWVzcGFjZUlkXSA9IGFjdGlvbjtcblxuICAvLyBnZW5lcmF0ZSBhIGNvbnN0YW50XG4gIHZhciBjb25zdGFudCA9IHV0aWxzLmZvcm1hdEFzQ29uc3RhbnQobmFtZXNwYWNlSWQpO1xuICBjb250YWluZXJbY29uc3RhbnRdID0gaWQ7XG5cbiAgcmV0dXJuIGFjdGlvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG59LHtcIi4uL2Z1bmN0aW9uc1wiOjE1LFwiLi4vdXRpbHMvQWx0VXRpbHNcIjoyMCxcImlzLXByb21pc2VcIjoyNX1dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmlzTXV0YWJsZU9iamVjdCA9IGlzTXV0YWJsZU9iamVjdDtcbmV4cG9ydHMuZWFjaE9iamVjdCA9IGVhY2hPYmplY3Q7XG5leHBvcnRzLmFzc2lnbiA9IGFzc2lnbjtcbnZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzTXV0YWJsZU9iamVjdCh0YXJnZXQpIHtcbiAgdmFyIEN0b3IgPSB0YXJnZXQuY29uc3RydWN0b3I7XG5cbiAgcmV0dXJuICEhdGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnICYmICFPYmplY3QuaXNGcm96ZW4odGFyZ2V0KSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGFyZ2V0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgaXNGdW5jdGlvbihDdG9yKSAmJiAoQ3RvciBpbnN0YW5jZW9mIEN0b3IgfHwgdGFyZ2V0LnR5cGUgPT09ICdBbHRTdG9yZScpO1xufVxuXG5mdW5jdGlvbiBlYWNoT2JqZWN0KGYsIG8pIHtcbiAgby5mb3JFYWNoKGZ1bmN0aW9uIChmcm9tKSB7XG4gICAgT2JqZWN0LmtleXMoT2JqZWN0KGZyb20pKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGYoa2V5LCBmcm9tW2tleV0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgc291cmNlID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHNvdXJjZVtfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBlYWNoT2JqZWN0KGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRhcmdldFtrZXldID0gdmFsdWU7XG4gIH0sIHNvdXJjZSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG59LHt9XSwxNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKiBnbG9iYWwgd2luZG93ICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIF9iaW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94MywgX3g0LCBfeDUpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gzLCBwcm9wZXJ0eSA9IF94NCwgcmVjZWl2ZXIgPSBfeDU7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3gzID0gcGFyZW50OyBfeDQgPSBwcm9wZXJ0eTsgX3g1ID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqWydkZWZhdWx0J10gPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTsgcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9mbHV4ID0gcmVxdWlyZSgnZmx1eCcpO1xuXG52YXIgX3V0aWxzU3RhdGVGdW5jdGlvbnMgPSByZXF1aXJlKCcuL3V0aWxzL1N0YXRlRnVuY3Rpb25zJyk7XG5cbnZhciBTdGF0ZUZ1bmN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc1N0YXRlRnVuY3Rpb25zKTtcblxudmFyIF9mdW5jdGlvbnMgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucycpO1xuXG52YXIgZm4gPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZnVuY3Rpb25zKTtcblxudmFyIF9zdG9yZSA9IHJlcXVpcmUoJy4vc3RvcmUnKTtcblxudmFyIHN0b3JlID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3N0b3JlKTtcblxudmFyIF91dGlsc0FsdFV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9BbHRVdGlscycpO1xuXG52YXIgdXRpbHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNBbHRVdGlscyk7XG5cbnZhciBfYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucycpO1xuXG52YXIgX2FjdGlvbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWN0aW9ucyk7XG5cbnZhciBBbHQgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBbHQoKSB7XG4gICAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFsdCk7XG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLnNlcmlhbGl6ZSA9IGNvbmZpZy5zZXJpYWxpemUgfHwgSlNPTi5zdHJpbmdpZnk7XG4gICAgdGhpcy5kZXNlcmlhbGl6ZSA9IGNvbmZpZy5kZXNlcmlhbGl6ZSB8fCBKU09OLnBhcnNlO1xuICAgIHRoaXMuZGlzcGF0Y2hlciA9IGNvbmZpZy5kaXNwYXRjaGVyIHx8IG5ldyBfZmx1eC5EaXNwYXRjaGVyKCk7XG4gICAgdGhpcy5iYXRjaGluZ0Z1bmN0aW9uID0gY29uZmlnLmJhdGNoaW5nRnVuY3Rpb24gfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICB9O1xuICAgIHRoaXMuYWN0aW9ucyA9IHsgZ2xvYmFsOiB7fSB9O1xuICAgIHRoaXMuc3RvcmVzID0ge307XG4gICAgdGhpcy5zdG9yZVRyYW5zZm9ybXMgPSBjb25maWcuc3RvcmVUcmFuc2Zvcm1zIHx8IFtdO1xuICAgIHRoaXMudHJhcEFzeW5jID0gZmFsc2U7XG4gICAgdGhpcy5fYWN0aW9uc1JlZ2lzdHJ5ID0ge307XG4gICAgdGhpcy5faW5pdFNuYXBzaG90ID0ge307XG4gICAgdGhpcy5fbGFzdFNuYXBzaG90ID0ge307XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQWx0LCBbe1xuICAgIGtleTogJ2Rpc3BhdGNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uLCBkYXRhLCBkZXRhaWxzKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB0aGlzLmJhdGNoaW5nRnVuY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE4KS5zdWJzdHIoMiwgMTYpO1xuXG4gICAgICAgIC8vIHN1cHBvcnQgc3RyYWlnaHQgZGlzcGF0Y2hpbmcgb2YgRlNBLXN0eWxlIGFjdGlvbnNcbiAgICAgICAgaWYgKGFjdGlvbi5oYXNPd25Qcm9wZXJ0eSgndHlwZScpICYmIGFjdGlvbi5oYXNPd25Qcm9wZXJ0eSgncGF5bG9hZCcpKSB7XG4gICAgICAgICAgdmFyIGZzYURldGFpbHMgPSB7XG4gICAgICAgICAgICBpZDogYWN0aW9uLnR5cGUsXG4gICAgICAgICAgICBuYW1lc3BhY2U6IGFjdGlvbi50eXBlLFxuICAgICAgICAgICAgbmFtZTogYWN0aW9uLnR5cGVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBfdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKHV0aWxzLmZzYShpZCwgYWN0aW9uLnR5cGUsIGFjdGlvbi5wYXlsb2FkLCBmc2FEZXRhaWxzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWN0aW9uLmlkICYmIGFjdGlvbi5kaXNwYXRjaCkge1xuICAgICAgICAgIHJldHVybiB1dGlscy5kaXNwYXRjaChpZCwgYWN0aW9uLCBkYXRhLCBfdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX3RoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaCh1dGlscy5mc2EoaWQsIGFjdGlvbiwgZGF0YSwgZGV0YWlscykpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlVW5zYXZlZFN0b3JlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlVW5zYXZlZFN0b3JlKFN0b3JlTW9kZWwpIHtcbiAgICAgIHZhciBrZXkgPSBTdG9yZU1vZGVsLmRpc3BsYXlOYW1lIHx8ICcnO1xuICAgICAgc3RvcmUuY3JlYXRlU3RvcmVDb25maWcodGhpcy5jb25maWcsIFN0b3JlTW9kZWwpO1xuICAgICAgdmFyIFN0b3JlID0gc3RvcmUudHJhbnNmb3JtU3RvcmUodGhpcy5zdG9yZVRyYW5zZm9ybXMsIFN0b3JlTW9kZWwpO1xuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbi5pc0Z1bmN0aW9uKFN0b3JlKSA/IHN0b3JlLmNyZWF0ZVN0b3JlRnJvbUNsYXNzLmFwcGx5KHN0b3JlLCBbdGhpcywgU3RvcmUsIGtleV0uY29uY2F0KGFyZ3MpKSA6IHN0b3JlLmNyZWF0ZVN0b3JlRnJvbU9iamVjdCh0aGlzLCBTdG9yZSwga2V5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVTdG9yZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKFN0b3JlTW9kZWwsIGlkZW4pIHtcbiAgICAgIHZhciBrZXkgPSBpZGVuIHx8IFN0b3JlTW9kZWwuZGlzcGxheU5hbWUgfHwgU3RvcmVNb2RlbC5uYW1lIHx8ICcnO1xuICAgICAgc3RvcmUuY3JlYXRlU3RvcmVDb25maWcodGhpcy5jb25maWcsIFN0b3JlTW9kZWwpO1xuICAgICAgdmFyIFN0b3JlID0gc3RvcmUudHJhbnNmb3JtU3RvcmUodGhpcy5zdG9yZVRyYW5zZm9ybXMsIFN0b3JlTW9kZWwpO1xuXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKG1vZHVsZS5ob3QpIGRlbGV0ZSB0aGlzLnN0b3Jlc1trZXldO1xuXG4gICAgICBpZiAodGhpcy5zdG9yZXNba2V5XSB8fCAha2V5KSB7XG4gICAgICAgIGlmICh0aGlzLnN0b3Jlc1trZXldKSB7XG4gICAgICAgICAgdXRpbHMud2FybignQSBzdG9yZSBuYW1lZCAnICsga2V5ICsgJyBhbHJlYWR5IGV4aXN0cywgZG91YmxlIGNoZWNrIHlvdXIgc3RvcmUgJyArICduYW1lcyBvciBwYXNzIGluIHlvdXIgb3duIGN1c3RvbSBpZGVudGlmaWVyIGZvciBlYWNoIHN0b3JlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXRpbHMud2FybignU3RvcmUgbmFtZSB3YXMgbm90IHNwZWNpZmllZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAga2V5ID0gdXRpbHMudWlkKHRoaXMuc3RvcmVzLCBrZXkpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHZhciBzdG9yZUluc3RhbmNlID0gZm4uaXNGdW5jdGlvbihTdG9yZSkgPyBzdG9yZS5jcmVhdGVTdG9yZUZyb21DbGFzcy5hcHBseShzdG9yZSwgW3RoaXMsIFN0b3JlLCBrZXldLmNvbmNhdChhcmdzKSkgOiBzdG9yZS5jcmVhdGVTdG9yZUZyb21PYmplY3QodGhpcywgU3RvcmUsIGtleSk7XG5cbiAgICAgIHRoaXMuc3RvcmVzW2tleV0gPSBzdG9yZUluc3RhbmNlO1xuICAgICAgU3RhdGVGdW5jdGlvbnMuc2F2ZUluaXRpYWxTbmFwc2hvdCh0aGlzLCBrZXkpO1xuXG4gICAgICByZXR1cm4gc3RvcmVJbnN0YW5jZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZW5lcmF0ZUFjdGlvbnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZW5lcmF0ZUFjdGlvbnMoKSB7XG4gICAgICB2YXIgYWN0aW9ucyA9IHsgbmFtZTogJ2dsb2JhbCcgfTtcblxuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhY3Rpb25OYW1lcyA9IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGFjdGlvbk5hbWVzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFjdGlvbnMoYWN0aW9uTmFtZXMucmVkdWNlKGZ1bmN0aW9uIChvYmosIGFjdGlvbikge1xuICAgICAgICBvYmpbYWN0aW9uXSA9IHV0aWxzLmRpc3BhdGNoSWRlbnRpdHk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9LCBhY3Rpb25zKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlQWN0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlQWN0aW9uKG5hbWUsIGltcGxlbWVudGF0aW9uLCBvYmopIHtcbiAgICAgIHJldHVybiAoMCwgX2FjdGlvbnMyWydkZWZhdWx0J10pKHRoaXMsICdnbG9iYWwnLCBuYW1lLCBpbXBsZW1lbnRhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVBY3Rpb25zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlQWN0aW9ucyhBY3Rpb25zQ2xhc3MpIHtcbiAgICAgIHZhciBfYXJndW1lbnRzMiA9IGFyZ3VtZW50cyxcbiAgICAgICAgICBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgZXhwb3J0T2JqID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIHZhciBhY3Rpb25zID0ge307XG4gICAgICB2YXIga2V5ID0gdXRpbHMudWlkKHRoaXMuX2FjdGlvbnNSZWdpc3RyeSwgQWN0aW9uc0NsYXNzLmRpc3BsYXlOYW1lIHx8IEFjdGlvbnNDbGFzcy5uYW1lIHx8ICdVbmtub3duJyk7XG5cbiAgICAgIGlmIChmbi5pc0Z1bmN0aW9uKEFjdGlvbnNDbGFzcykpIHtcbiAgICAgICAgdmFyIF9sZW40LCBhcmdzRm9yQ29uc3RydWN0b3IsIF9rZXk0O1xuXG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZm4uYXNzaWduKGFjdGlvbnMsIHV0aWxzLmdldFByb3RvdHlwZUNoYWluKEFjdGlvbnNDbGFzcykpO1xuXG4gICAgICAgICAgdmFyIEFjdGlvbnNHZW5lcmF0b3IgPSAoZnVuY3Rpb24gKF9BY3Rpb25zQ2xhc3MpIHtcbiAgICAgICAgICAgIF9pbmhlcml0cyhBY3Rpb25zR2VuZXJhdG9yLCBfQWN0aW9uc0NsYXNzKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gQWN0aW9uc0dlbmVyYXRvcigpIHtcbiAgICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFjdGlvbnNHZW5lcmF0b3IpO1xuXG4gICAgICAgICAgICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQWN0aW9uc0dlbmVyYXRvci5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2NyZWF0ZUNsYXNzKEFjdGlvbnNHZW5lcmF0b3IsIFt7XG4gICAgICAgICAgICAgIGtleTogJ2dlbmVyYXRlQWN0aW9ucycsXG4gICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZW5lcmF0ZUFjdGlvbnMoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2xlbjYgPSBhcmd1bWVudHMubGVuZ3RoLCBhY3Rpb25OYW1lcyA9IEFycmF5KF9sZW42KSwgX2tleTYgPSAwOyBfa2V5NiA8IF9sZW42OyBfa2V5NisrKSB7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lc1tfa2V5Nl0gPSBhcmd1bWVudHNbX2tleTZdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFjdGlvbk5hbWVzLmZvckVhY2goZnVuY3Rpb24gKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbnNbYWN0aW9uTmFtZV0gPSB1dGlscy5kaXNwYXRjaElkZW50aXR5O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XSk7XG5cbiAgICAgICAgICAgIHJldHVybiBBY3Rpb25zR2VuZXJhdG9yO1xuICAgICAgICAgIH0pKEFjdGlvbnNDbGFzcyk7XG5cbiAgICAgICAgICBmb3IgKF9sZW40ID0gX2FyZ3VtZW50czIubGVuZ3RoLCBhcmdzRm9yQ29uc3RydWN0b3IgPSBBcnJheShfbGVuNCA+IDIgPyBfbGVuNCAtIDIgOiAwKSwgX2tleTQgPSAyOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgICAgICBhcmdzRm9yQ29uc3RydWN0b3JbX2tleTQgLSAyXSA9IF9hcmd1bWVudHMyW19rZXk0XTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmbi5hc3NpZ24oYWN0aW9ucywgbmV3IChfYmluZC5hcHBseShBY3Rpb25zR2VuZXJhdG9yLCBbbnVsbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzRm9yQ29uc3RydWN0b3IpKSkpKCkpO1xuICAgICAgICB9KSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm4uYXNzaWduKGFjdGlvbnMsIEFjdGlvbnNDbGFzcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aW9uc1trZXldID0gdGhpcy5hY3Rpb25zW2tleV0gfHwge307XG5cbiAgICAgIGZuLmVhY2hPYmplY3QoZnVuY3Rpb24gKGFjdGlvbk5hbWUsIGFjdGlvbikge1xuICAgICAgICBpZiAoIWZuLmlzRnVuY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICAgIGV4cG9ydE9ialthY3Rpb25OYW1lXSA9IGFjdGlvbjtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGFjdGlvblxuICAgICAgICBleHBvcnRPYmpbYWN0aW9uTmFtZV0gPSAoMCwgX2FjdGlvbnMyWydkZWZhdWx0J10pKF90aGlzMiwga2V5LCBhY3Rpb25OYW1lLCBhY3Rpb24sIGV4cG9ydE9iaik7XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgYSBjb25zdGFudFxuICAgICAgICB2YXIgY29uc3RhbnQgPSB1dGlscy5mb3JtYXRBc0NvbnN0YW50KGFjdGlvbk5hbWUpO1xuICAgICAgICBleHBvcnRPYmpbY29uc3RhbnRdID0gZXhwb3J0T2JqW2FjdGlvbk5hbWVdLmlkO1xuICAgICAgfSwgW2FjdGlvbnNdKTtcblxuICAgICAgcmV0dXJuIGV4cG9ydE9iajtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0YWtlU25hcHNob3QnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0YWtlU25hcHNob3QoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNyA9IGFyZ3VtZW50cy5sZW5ndGgsIHN0b3JlTmFtZXMgPSBBcnJheShfbGVuNyksIF9rZXk3ID0gMDsgX2tleTcgPCBfbGVuNzsgX2tleTcrKykge1xuICAgICAgICBzdG9yZU5hbWVzW19rZXk3XSA9IGFyZ3VtZW50c1tfa2V5N107XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9IFN0YXRlRnVuY3Rpb25zLnNuYXBzaG90KHRoaXMsIHN0b3JlTmFtZXMpO1xuICAgICAgZm4uYXNzaWduKHRoaXMuX2xhc3RTbmFwc2hvdCwgc3RhdGUpO1xuICAgICAgcmV0dXJuIHRoaXMuc2VyaWFsaXplKHN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyb2xsYmFjaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJvbGxiYWNrKCkge1xuICAgICAgU3RhdGVGdW5jdGlvbnMuc2V0QXBwU3RhdGUodGhpcywgdGhpcy5zZXJpYWxpemUodGhpcy5fbGFzdFNuYXBzaG90KSwgZnVuY3Rpb24gKHN0b3JlSW5zdCkge1xuICAgICAgICBzdG9yZUluc3QubGlmZWN5Y2xlKCdyb2xsYmFjaycpO1xuICAgICAgICBzdG9yZUluc3QuZW1pdENoYW5nZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVjeWNsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlY3ljbGUoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOCA9IGFyZ3VtZW50cy5sZW5ndGgsIHN0b3JlTmFtZXMgPSBBcnJheShfbGVuOCksIF9rZXk4ID0gMDsgX2tleTggPCBfbGVuODsgX2tleTgrKykge1xuICAgICAgICBzdG9yZU5hbWVzW19rZXk4XSA9IGFyZ3VtZW50c1tfa2V5OF07XG4gICAgICB9XG5cbiAgICAgIHZhciBpbml0aWFsU25hcHNob3QgPSBzdG9yZU5hbWVzLmxlbmd0aCA/IFN0YXRlRnVuY3Rpb25zLmZpbHRlclNuYXBzaG90cyh0aGlzLCB0aGlzLl9pbml0U25hcHNob3QsIHN0b3JlTmFtZXMpIDogdGhpcy5faW5pdFNuYXBzaG90O1xuXG4gICAgICBTdGF0ZUZ1bmN0aW9ucy5zZXRBcHBTdGF0ZSh0aGlzLCB0aGlzLnNlcmlhbGl6ZShpbml0aWFsU25hcHNob3QpLCBmdW5jdGlvbiAoc3RvcmVJbnN0KSB7XG4gICAgICAgIHN0b3JlSW5zdC5saWZlY3ljbGUoJ2luaXQnKTtcbiAgICAgICAgc3RvcmVJbnN0LmVtaXRDaGFuZ2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZsdXNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgICB2YXIgc3RhdGUgPSB0aGlzLnNlcmlhbGl6ZShTdGF0ZUZ1bmN0aW9ucy5zbmFwc2hvdCh0aGlzKSk7XG4gICAgICB0aGlzLnJlY3ljbGUoKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdib290c3RyYXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib290c3RyYXAoZGF0YSkge1xuICAgICAgU3RhdGVGdW5jdGlvbnMuc2V0QXBwU3RhdGUodGhpcywgZGF0YSwgZnVuY3Rpb24gKHN0b3JlSW5zdCwgc3RhdGUpIHtcbiAgICAgICAgc3RvcmVJbnN0LmxpZmVjeWNsZSgnYm9vdHN0cmFwJywgc3RhdGUpO1xuICAgICAgICBzdG9yZUluc3QuZW1pdENoYW5nZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncHJlcGFyZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZXBhcmUoc3RvcmVJbnN0LCBwYXlsb2FkKSB7XG4gICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgaWYgKCFzdG9yZUluc3QuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdTdG9yZSBwcm92aWRlZCBkb2VzIG5vdCBoYXZlIGEgbmFtZScpO1xuICAgICAgfVxuICAgICAgZGF0YVtzdG9yZUluc3QuZGlzcGxheU5hbWVdID0gcGF5bG9hZDtcbiAgICAgIHJldHVybiB0aGlzLnNlcmlhbGl6ZShkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBJbnN0YW5jZSB0eXBlIG1ldGhvZHMgZm9yIGluamVjdGluZyBhbHQgaW50byB5b3VyIGFwcGxpY2F0aW9uIGFzIGNvbnRleHRcblxuICB9LCB7XG4gICAga2V5OiAnYWRkQWN0aW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEFjdGlvbnMobmFtZSwgQWN0aW9uc0NsYXNzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuOSA+IDIgPyBfbGVuOSAtIDIgOiAwKSwgX2tleTkgPSAyOyBfa2V5OSA8IF9sZW45OyBfa2V5OSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5OV07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aW9uc1tuYW1lXSA9IEFycmF5LmlzQXJyYXkoQWN0aW9uc0NsYXNzKSA/IHRoaXMuZ2VuZXJhdGVBY3Rpb25zLmFwcGx5KHRoaXMsIEFjdGlvbnNDbGFzcykgOiB0aGlzLmNyZWF0ZUFjdGlvbnMuYXBwbHkodGhpcywgW0FjdGlvbnNDbGFzc10uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhZGRTdG9yZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFN0b3JlKG5hbWUsIFN0b3JlTW9kZWwpIHtcbiAgICAgIGZvciAodmFyIF9sZW4xMCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMTAgPiAyID8gX2xlbjEwIC0gMiA6IDApLCBfa2V5MTAgPSAyOyBfa2V5MTAgPCBfbGVuMTA7IF9rZXkxMCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTEwIC0gMl0gPSBhcmd1bWVudHNbX2tleTEwXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jcmVhdGVTdG9yZS5hcHBseSh0aGlzLCBbU3RvcmVNb2RlbCwgbmFtZV0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRBY3Rpb25zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QWN0aW9ucyhuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5hY3Rpb25zW25hbWVdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFN0b3JlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U3RvcmUobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcmVzW25hbWVdO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiAnZGVidWcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWJ1ZyhuYW1lLCBhbHQpIHtcbiAgICAgIHZhciBrZXkgPSAnYWx0LmpzLm9yZyc7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93W2tleV0gPSB3aW5kb3dba2V5XSB8fCBbXTtcbiAgICAgICAgd2luZG93W2tleV0ucHVzaCh7IG5hbWU6IG5hbWUsIGFsdDogYWx0IH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFsdDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQWx0O1xufSkoKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gQWx0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG59LHtcIi4vYWN0aW9uc1wiOjE0LFwiLi9mdW5jdGlvbnNcIjoxNSxcIi4vc3RvcmVcIjoxOSxcIi4vdXRpbHMvQWx0VXRpbHNcIjoyMCxcIi4vdXRpbHMvU3RhdGVGdW5jdGlvbnNcIjoyMSxcImZsdXhcIjoyMn1dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09ialsnZGVmYXVsdCddID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBfZnVuY3Rpb25zID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zJyk7XG5cbnZhciBmbiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9mdW5jdGlvbnMpO1xuXG52YXIgX3RyYW5zbWl0dGVyID0gcmVxdWlyZSgndHJhbnNtaXR0ZXInKTtcblxudmFyIF90cmFuc21pdHRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90cmFuc21pdHRlcik7XG5cbnZhciBBbHRTdG9yZSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFsdFN0b3JlKGFsdCwgbW9kZWwsIHN0YXRlLCBTdG9yZU1vZGVsKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBbHRTdG9yZSk7XG5cbiAgICB2YXIgbGlmZWN5Y2xlRXZlbnRzID0gbW9kZWwubGlmZWN5Y2xlRXZlbnRzO1xuICAgIHRoaXMudHJhbnNtaXR0ZXIgPSAoMCwgX3RyYW5zbWl0dGVyMlsnZGVmYXVsdCddKSgpO1xuICAgIHRoaXMubGlmZWN5Y2xlID0gZnVuY3Rpb24gKGV2ZW50LCB4KSB7XG4gICAgICBpZiAobGlmZWN5Y2xlRXZlbnRzW2V2ZW50XSkgbGlmZWN5Y2xlRXZlbnRzW2V2ZW50XS5wdXNoKHgpO1xuICAgIH07XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgdGhpcy5hbHQgPSBhbHQ7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuICAgIHRoaXMuZGlzcGxheU5hbWUgPSBtb2RlbC5kaXNwbGF5TmFtZTtcbiAgICB0aGlzLmJvdW5kTGlzdGVuZXJzID0gbW9kZWwuYm91bmRMaXN0ZW5lcnM7XG4gICAgdGhpcy5TdG9yZU1vZGVsID0gU3RvcmVNb2RlbDtcbiAgICB0aGlzLnJlZHVjZSA9IG1vZGVsLnJlZHVjZSB8fCBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcblxuICAgIHZhciBvdXRwdXQgPSBtb2RlbC5vdXRwdXQgfHwgZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG5cbiAgICB0aGlzLmVtaXRDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMudHJhbnNtaXR0ZXIucHVzaChvdXRwdXQoX3RoaXMuc3RhdGUpKTtcbiAgICB9O1xuXG4gICAgdmFyIGhhbmRsZURpc3BhdGNoID0gZnVuY3Rpb24gaGFuZGxlRGlzcGF0Y2goZiwgcGF5bG9hZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKG1vZGVsLmhhbmRsZXNPd25FcnJvcnMpIHtcbiAgICAgICAgICBfdGhpcy5saWZlY3ljbGUoJ2Vycm9yJywge1xuICAgICAgICAgICAgZXJyb3I6IGUsXG4gICAgICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICAgICAgc3RhdGU6IF90aGlzLnN0YXRlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm4uYXNzaWduKHRoaXMsIG1vZGVsLnB1YmxpY01ldGhvZHMpO1xuXG4gICAgLy8gUmVnaXN0ZXIgZGlzcGF0Y2hlclxuICAgIHRoaXMuZGlzcGF0Y2hUb2tlbiA9IGFsdC5kaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uIChwYXlsb2FkKSB7XG4gICAgICBfdGhpcy5wcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuXG4gICAgICBfdGhpcy5saWZlY3ljbGUoJ2JlZm9yZUVhY2gnLCB7XG4gICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgIHN0YXRlOiBfdGhpcy5zdGF0ZVxuICAgICAgfSk7XG5cbiAgICAgIHZhciBhY3Rpb25IYW5kbGVycyA9IG1vZGVsLmFjdGlvbkxpc3RlbmVyc1twYXlsb2FkLmFjdGlvbl07XG5cbiAgICAgIGlmIChhY3Rpb25IYW5kbGVycyB8fCBtb2RlbC5vdGhlcndpc2UpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoYWN0aW9uSGFuZGxlcnMpIHtcbiAgICAgICAgICByZXN1bHQgPSBoYW5kbGVEaXNwYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uSGFuZGxlcnMuZmlsdGVyKEJvb2xlYW4pLmV2ZXJ5KGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwobW9kZWwsIHBheWxvYWQuZGF0YSwgcGF5bG9hZC5hY3Rpb24pICE9PSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIHBheWxvYWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZURpc3BhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5vdGhlcndpc2UocGF5bG9hZC5kYXRhLCBwYXlsb2FkLmFjdGlvbik7XG4gICAgICAgICAgfSwgcGF5bG9hZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSAmJiAhX3RoaXMucHJldmVudERlZmF1bHQpIF90aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGVsLnJlZHVjZSkge1xuICAgICAgICBoYW5kbGVEaXNwYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gbW9kZWwucmVkdWNlKF90aGlzLnN0YXRlLCBwYXlsb2FkKTtcbiAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkgX3RoaXMuc3RhdGUgPSB2YWx1ZTtcbiAgICAgICAgfSwgcGF5bG9hZCk7XG4gICAgICAgIGlmICghX3RoaXMucHJldmVudERlZmF1bHQpIF90aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMubGlmZWN5Y2xlKCdhZnRlckVhY2gnLCB7XG4gICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgIHN0YXRlOiBfdGhpcy5zdGF0ZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxpZmVjeWNsZSgnaW5pdCcpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFsdFN0b3JlLCBbe1xuICAgIGtleTogJ2xpc3RlbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxpc3RlbihjYikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmICghZm4uaXNGdW5jdGlvbihjYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xpc3RlbiBleHBlY3RzIGEgZnVuY3Rpb24nKTtcbiAgICAgIHRoaXMudHJhbnNtaXR0ZXIuc3Vic2NyaWJlKGNiKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIudW5saXN0ZW4oY2IpO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1bmxpc3RlbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVubGlzdGVuKGNiKSB7XG4gICAgICB0aGlzLmxpZmVjeWNsZSgndW5saXN0ZW4nKTtcbiAgICAgIHRoaXMudHJhbnNtaXR0ZXIudW5zdWJzY3JpYmUoY2IpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFN0YXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5TdG9yZU1vZGVsLmNvbmZpZy5nZXRTdGF0ZS5jYWxsKHRoaXMsIHRoaXMuc3RhdGUpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBbHRTdG9yZTtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFsdFN0b3JlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG59LHtcIi4uL2Z1bmN0aW9uc1wiOjE1LFwidHJhbnNtaXR0ZXJcIjoyNn1dLDE4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmpbJ2RlZmF1bHQnXSA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF90cmFuc21pdHRlciA9IHJlcXVpcmUoJ3RyYW5zbWl0dGVyJyk7XG5cbnZhciBfdHJhbnNtaXR0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHJhbnNtaXR0ZXIpO1xuXG52YXIgX2Z1bmN0aW9ucyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucycpO1xuXG52YXIgZm4gPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZnVuY3Rpb25zKTtcblxudmFyIFN0b3JlTWl4aW4gPSB7XG4gIHdhaXRGb3I6IGZ1bmN0aW9uIHdhaXRGb3IoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHNvdXJjZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIHNvdXJjZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaWYgKCFzb3VyY2VzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdEaXNwYXRjaCB0b2tlbnMgbm90IHByb3ZpZGVkJyk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZXNBcnJheSA9IHNvdXJjZXM7XG4gICAgaWYgKHNvdXJjZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBzb3VyY2VzQXJyYXkgPSBBcnJheS5pc0FycmF5KHNvdXJjZXNbMF0pID8gc291cmNlc1swXSA6IHNvdXJjZXM7XG4gICAgfVxuXG4gICAgdmFyIHRva2VucyA9IHNvdXJjZXNBcnJheS5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5kaXNwYXRjaFRva2VuIHx8IHNvdXJjZTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlzcGF0Y2hlci53YWl0Rm9yKHRva2Vucyk7XG4gIH0sXG5cbiAgZXhwb3J0QXN5bmM6IGZ1bmN0aW9uIGV4cG9ydEFzeW5jKGFzeW5jTWV0aG9kcykge1xuICAgIHRoaXMucmVnaXN0ZXJBc3luYyhhc3luY01ldGhvZHMpO1xuICB9LFxuXG4gIHJlZ2lzdGVyQXN5bmM6IGZ1bmN0aW9uIHJlZ2lzdGVyQXN5bmMoYXN5bmNEZWYpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIGxvYWRDb3VudGVyID0gMDtcblxuICAgIHZhciBhc3luY01ldGhvZHMgPSBmbi5pc0Z1bmN0aW9uKGFzeW5jRGVmKSA/IGFzeW5jRGVmKHRoaXMuYWx0KSA6IGFzeW5jRGVmO1xuXG4gICAgdmFyIHRvRXhwb3J0ID0gT2JqZWN0LmtleXMoYXN5bmNNZXRob2RzKS5yZWR1Y2UoZnVuY3Rpb24gKHB1YmxpY01ldGhvZHMsIG1ldGhvZE5hbWUpIHtcbiAgICAgIHZhciBkZXNjID0gYXN5bmNNZXRob2RzW21ldGhvZE5hbWVdO1xuICAgICAgdmFyIHNwZWMgPSBmbi5pc0Z1bmN0aW9uKGRlc2MpID8gZGVzYyhfdGhpcykgOiBkZXNjO1xuXG4gICAgICB2YXIgdmFsaWRIYW5kbGVycyA9IFsnc3VjY2VzcycsICdlcnJvcicsICdsb2FkaW5nJ107XG4gICAgICB2YWxpZEhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKHNwZWNbaGFuZGxlcl0gJiYgIXNwZWNbaGFuZGxlcl0uaWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoaGFuZGxlciArICcgaGFuZGxlciBtdXN0IGJlIGFuIGFjdGlvbiBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcHVibGljTWV0aG9kc1ttZXRob2ROYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhdGUgPSBfdGhpcy5nZXRJbnN0YW5jZSgpLmdldFN0YXRlKCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNwZWMubG9jYWwgJiYgc3BlYy5sb2NhbC5hcHBseShzcGVjLCBbc3RhdGVdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgIHZhciBzaG91bGRGZXRjaCA9IHNwZWMuc2hvdWxkRmV0Y2ggPyBzcGVjLnNob3VsZEZldGNoLmFwcGx5KHNwZWMsIFtzdGF0ZV0uY29uY2F0KGFyZ3MpKVxuICAgICAgICAvKmVzbGludC1kaXNhYmxlKi9cbiAgICAgICAgOiB2YWx1ZSA9PSBudWxsO1xuICAgICAgICAvKmVzbGludC1lbmFibGUqL1xuICAgICAgICB2YXIgaW50ZXJjZXB0ID0gc3BlYy5pbnRlcmNlcHRSZXNwb25zZSB8fCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtYWtlQWN0aW9uSGFuZGxlciA9IGZ1bmN0aW9uIG1ha2VBY3Rpb25IYW5kbGVyKGFjdGlvbiwgaXNFcnJvcikge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgdmFyIGZpcmUgPSBmdW5jdGlvbiBmaXJlKCkge1xuICAgICAgICAgICAgICBsb2FkQ291bnRlciAtPSAxO1xuICAgICAgICAgICAgICBhY3Rpb24oaW50ZXJjZXB0KHgsIGFjdGlvbiwgYXJncykpO1xuICAgICAgICAgICAgICBpZiAoaXNFcnJvcikgdGhyb3cgeDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuYWx0LnRyYXBBc3luYyA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZpcmUoKTtcbiAgICAgICAgICAgIH0gOiBmaXJlKCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIGl0IGluIGNhY2hlIHRoZW4gZmV0Y2ggaXRcbiAgICAgICAgaWYgKHNob3VsZEZldGNoKSB7XG4gICAgICAgICAgbG9hZENvdW50ZXIgKz0gMTtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICAgIGlmIChzcGVjLmxvYWRpbmcpIHNwZWMubG9hZGluZyhpbnRlcmNlcHQobnVsbCwgc3BlYy5sb2FkaW5nLCBhcmdzKSk7XG4gICAgICAgICAgcmV0dXJuIHNwZWMucmVtb3RlLmFwcGx5KHNwZWMsIFtzdGF0ZV0uY29uY2F0KGFyZ3MpKS50aGVuKG1ha2VBY3Rpb25IYW5kbGVyKHNwZWMuc3VjY2VzcyksIG1ha2VBY3Rpb25IYW5kbGVyKHNwZWMuZXJyb3IsIDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSBlbWl0IHRoZSBjaGFuZ2Ugbm93XG4gICAgICAgIF90aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHB1YmxpY01ldGhvZHM7XG4gICAgfSwge30pO1xuXG4gICAgdGhpcy5leHBvcnRQdWJsaWNNZXRob2RzKHRvRXhwb3J0KTtcbiAgICB0aGlzLmV4cG9ydFB1YmxpY01ldGhvZHMoe1xuICAgICAgaXNMb2FkaW5nOiBmdW5jdGlvbiBpc0xvYWRpbmcoKSB7XG4gICAgICAgIHJldHVybiBsb2FkQ291bnRlciA+IDA7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZXhwb3J0UHVibGljTWV0aG9kczogZnVuY3Rpb24gZXhwb3J0UHVibGljTWV0aG9kcyhtZXRob2RzKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBmbi5lYWNoT2JqZWN0KGZ1bmN0aW9uIChtZXRob2ROYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKCFmbi5pc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBvcnRQdWJsaWNNZXRob2RzIGV4cGVjdHMgYSBmdW5jdGlvbicpO1xuICAgICAgfVxuXG4gICAgICBfdGhpczIucHVibGljTWV0aG9kc1ttZXRob2ROYW1lXSA9IHZhbHVlO1xuICAgIH0sIFttZXRob2RzXSk7XG4gIH0sXG5cbiAgZW1pdENoYW5nZTogZnVuY3Rpb24gZW1pdENoYW5nZSgpIHtcbiAgICB0aGlzLmdldEluc3RhbmNlKCkuZW1pdENoYW5nZSgpO1xuICB9LFxuXG4gIG9uOiBmdW5jdGlvbiBvbihsaWZlY3ljbGVFdmVudCwgaGFuZGxlcikge1xuICAgIGlmIChsaWZlY3ljbGVFdmVudCA9PT0gJ2Vycm9yJykgdGhpcy5oYW5kbGVzT3duRXJyb3JzID0gdHJ1ZTtcbiAgICB2YXIgYnVzID0gdGhpcy5saWZlY3ljbGVFdmVudHNbbGlmZWN5Y2xlRXZlbnRdIHx8ICgwLCBfdHJhbnNtaXR0ZXIyWydkZWZhdWx0J10pKCk7XG4gICAgdGhpcy5saWZlY3ljbGVFdmVudHNbbGlmZWN5Y2xlRXZlbnRdID0gYnVzO1xuICAgIHJldHVybiBidXMuc3Vic2NyaWJlKGhhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgYmluZEFjdGlvbjogZnVuY3Rpb24gYmluZEFjdGlvbihzeW1ib2wsIGhhbmRsZXIpIHtcbiAgICBpZiAoIXN5bWJvbCkge1xuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdJbnZhbGlkIGFjdGlvbiByZWZlcmVuY2UgcGFzc2VkIGluJyk7XG4gICAgfVxuICAgIGlmICghZm4uaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYmluZEFjdGlvbiBleHBlY3RzIGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICAvLyBZb3UgY2FuIHBhc3MgaW4gdGhlIGNvbnN0YW50IG9yIHRoZSBmdW5jdGlvbiBpdHNlbGZcbiAgICB2YXIga2V5ID0gc3ltYm9sLmlkID8gc3ltYm9sLmlkIDogc3ltYm9sO1xuICAgIHRoaXMuYWN0aW9uTGlzdGVuZXJzW2tleV0gPSB0aGlzLmFjdGlvbkxpc3RlbmVyc1trZXldIHx8IFtdO1xuICAgIHRoaXMuYWN0aW9uTGlzdGVuZXJzW2tleV0ucHVzaChoYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYm91bmRMaXN0ZW5lcnMucHVzaChrZXkpO1xuICB9LFxuXG4gIGJpbmRBY3Rpb25zOiBmdW5jdGlvbiBiaW5kQWN0aW9ucyhhY3Rpb25zKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICBmbi5lYWNoT2JqZWN0KGZ1bmN0aW9uIChhY3Rpb24sIHN5bWJvbCkge1xuICAgICAgdmFyIG1hdGNoRmlyc3RDaGFyYWN0ZXIgPSAvLi87XG4gICAgICB2YXIgYXNzdW1lZEV2ZW50SGFuZGxlciA9IGFjdGlvbi5yZXBsYWNlKG1hdGNoRmlyc3RDaGFyYWN0ZXIsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiAnb24nICsgeFswXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChfdGhpczNbYWN0aW9uXSAmJiBfdGhpczNbYXNzdW1lZEV2ZW50SGFuZGxlcl0pIHtcbiAgICAgICAgLy8gSWYgeW91IGhhdmUgYm90aCBhY3Rpb24gYW5kIG9uQWN0aW9uXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignWW91IGhhdmUgbXVsdGlwbGUgYWN0aW9uIGhhbmRsZXJzIGJvdW5kIHRvIGFuIGFjdGlvbjogJyArIChhY3Rpb24gKyAnIGFuZCAnICsgYXNzdW1lZEV2ZW50SGFuZGxlcikpO1xuICAgICAgfVxuXG4gICAgICB2YXIgaGFuZGxlciA9IF90aGlzM1thY3Rpb25dIHx8IF90aGlzM1thc3N1bWVkRXZlbnRIYW5kbGVyXTtcbiAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgIF90aGlzMy5iaW5kQWN0aW9uKHN5bWJvbCwgaGFuZGxlcik7XG4gICAgICB9XG4gICAgfSwgW2FjdGlvbnNdKTtcbiAgfSxcblxuICBiaW5kTGlzdGVuZXJzOiBmdW5jdGlvbiBiaW5kTGlzdGVuZXJzKG9iaikge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgZm4uZWFjaE9iamVjdChmdW5jdGlvbiAobWV0aG9kTmFtZSwgc3ltYm9sKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBfdGhpczRbbWV0aG9kTmFtZV07XG5cbiAgICAgIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKG1ldGhvZE5hbWUgKyAnIGRlZmluZWQgYnV0IGRvZXMgbm90IGV4aXN0IGluICcgKyBfdGhpczQuZGlzcGxheU5hbWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzeW1ib2wpKSB7XG4gICAgICAgIHN5bWJvbC5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICBfdGhpczQuYmluZEFjdGlvbihhY3Rpb24sIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpczQuYmluZEFjdGlvbihzeW1ib2wsIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9LCBbb2JqXSk7XG4gIH1cbn07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFN0b3JlTWl4aW47XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbn0se1wiLi4vZnVuY3Rpb25zXCI6MTUsXCJ0cmFuc21pdHRlclwiOjI2fV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBfYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmV4cG9ydHMuY3JlYXRlU3RvcmVDb25maWcgPSBjcmVhdGVTdG9yZUNvbmZpZztcbmV4cG9ydHMudHJhbnNmb3JtU3RvcmUgPSB0cmFuc2Zvcm1TdG9yZTtcbmV4cG9ydHMuY3JlYXRlU3RvcmVGcm9tT2JqZWN0ID0gY3JlYXRlU3RvcmVGcm9tT2JqZWN0O1xuZXhwb3J0cy5jcmVhdGVTdG9yZUZyb21DbGFzcyA9IGNyZWF0ZVN0b3JlRnJvbUNsYXNzO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmpbJ2RlZmF1bHQnXSA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3V0aWxzQWx0VXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9BbHRVdGlscycpO1xuXG52YXIgdXRpbHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfdXRpbHNBbHRVdGlscyk7XG5cbnZhciBfZnVuY3Rpb25zID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zJyk7XG5cbnZhciBmbiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9mdW5jdGlvbnMpO1xuXG52YXIgX0FsdFN0b3JlID0gcmVxdWlyZSgnLi9BbHRTdG9yZScpO1xuXG52YXIgX0FsdFN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FsdFN0b3JlKTtcblxudmFyIF9TdG9yZU1peGluID0gcmVxdWlyZSgnLi9TdG9yZU1peGluJyk7XG5cbnZhciBfU3RvcmVNaXhpbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdG9yZU1peGluKTtcblxuZnVuY3Rpb24gZG9TZXRTdGF0ZShzdG9yZSwgc3RvcmVJbnN0YW5jZSwgc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjb25maWcgPSBzdG9yZUluc3RhbmNlLlN0b3JlTW9kZWwuY29uZmlnO1xuXG4gIHZhciBuZXh0U3RhdGUgPSBmbi5pc0Z1bmN0aW9uKHN0YXRlKSA/IHN0YXRlKHN0b3JlSW5zdGFuY2Uuc3RhdGUpIDogc3RhdGU7XG5cbiAgc3RvcmVJbnN0YW5jZS5zdGF0ZSA9IGNvbmZpZy5zZXRTdGF0ZS5jYWxsKHN0b3JlLCBzdG9yZUluc3RhbmNlLnN0YXRlLCBuZXh0U3RhdGUpO1xuXG4gIGlmICghc3RvcmUuYWx0LmRpc3BhdGNoZXIuaXNEaXNwYXRjaGluZygpKSB7XG4gICAgc3RvcmUuZW1pdENoYW5nZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3RvdHlwZShwcm90bywgYWx0LCBrZXksIGV4dHJhcykge1xuICByZXR1cm4gZm4uYXNzaWduKHByb3RvLCBfU3RvcmVNaXhpbjJbJ2RlZmF1bHQnXSwge1xuICAgIGRpc3BsYXlOYW1lOiBrZXksXG4gICAgYWx0OiBhbHQsXG4gICAgZGlzcGF0Y2hlcjogYWx0LmRpc3BhdGNoZXIsXG4gICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KCkge1xuICAgICAgdGhpcy5nZXRJbnN0YW5jZSgpLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICB9LFxuICAgIGJvdW5kTGlzdGVuZXJzOiBbXSxcbiAgICBsaWZlY3ljbGVFdmVudHM6IHt9LFxuICAgIGFjdGlvbkxpc3RlbmVyczoge30sXG4gICAgcHVibGljTWV0aG9kczoge30sXG4gICAgaGFuZGxlc093bkVycm9yczogZmFsc2VcbiAgfSwgZXh0cmFzKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU3RvcmVDb25maWcoZ2xvYmFsQ29uZmlnLCBTdG9yZU1vZGVsKSB7XG4gIFN0b3JlTW9kZWwuY29uZmlnID0gZm4uYXNzaWduKHtcbiAgICBnZXRTdGF0ZTogZnVuY3Rpb24gZ2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHN0YXRlKSkge1xuICAgICAgICByZXR1cm4gc3RhdGUuc2xpY2UoKTtcbiAgICAgIH0gZWxzZSBpZiAoZm4uaXNNdXRhYmxlT2JqZWN0KHN0YXRlKSkge1xuICAgICAgICByZXR1cm4gZm4uYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9LFxuICAgIHNldFN0YXRlOiBmdW5jdGlvbiBzZXRTdGF0ZShjdXJyZW50U3RhdGUsIG5leHRTdGF0ZSkge1xuICAgICAgaWYgKGZuLmlzTXV0YWJsZU9iamVjdChuZXh0U3RhdGUpKSB7XG4gICAgICAgIHJldHVybiBmbi5hc3NpZ24oY3VycmVudFN0YXRlLCBuZXh0U3RhdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgICB9XG4gIH0sIGdsb2JhbENvbmZpZywgU3RvcmVNb2RlbC5jb25maWcpO1xufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1TdG9yZSh0cmFuc2Zvcm1zLCBTdG9yZU1vZGVsKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1zLnJlZHVjZShmdW5jdGlvbiAoU3RvcmUsIHRyYW5zZm9ybSkge1xuICAgIHJldHVybiB0cmFuc2Zvcm0oU3RvcmUpO1xuICB9LCBTdG9yZU1vZGVsKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU3RvcmVGcm9tT2JqZWN0KGFsdCwgU3RvcmVNb2RlbCwga2V5KSB7XG4gIHZhciBzdG9yZUluc3RhbmNlID0gdW5kZWZpbmVkO1xuXG4gIHZhciBTdG9yZVByb3RvID0gY3JlYXRlUHJvdG90eXBlKHt9LCBhbHQsIGtleSwgZm4uYXNzaWduKHtcbiAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24gZ2V0SW5zdGFuY2UoKSB7XG4gICAgICByZXR1cm4gc3RvcmVJbnN0YW5jZTtcbiAgICB9LFxuICAgIHNldFN0YXRlOiBmdW5jdGlvbiBzZXRTdGF0ZShuZXh0U3RhdGUpIHtcbiAgICAgIGRvU2V0U3RhdGUodGhpcywgc3RvcmVJbnN0YW5jZSwgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIFN0b3JlTW9kZWwpKTtcblxuICAvLyBiaW5kIHRoZSBzdG9yZSBsaXN0ZW5lcnNcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKFN0b3JlUHJvdG8uYmluZExpc3RlbmVycykge1xuICAgIF9TdG9yZU1peGluMlsnZGVmYXVsdCddLmJpbmRMaXN0ZW5lcnMuY2FsbChTdG9yZVByb3RvLCBTdG9yZVByb3RvLmJpbmRMaXN0ZW5lcnMpO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmIChTdG9yZVByb3RvLm9ic2VydmUpIHtcbiAgICBfU3RvcmVNaXhpbjJbJ2RlZmF1bHQnXS5iaW5kTGlzdGVuZXJzLmNhbGwoU3RvcmVQcm90bywgU3RvcmVQcm90by5vYnNlcnZlKGFsdCkpO1xuICB9XG5cbiAgLy8gYmluZCB0aGUgbGlmZWN5Y2xlIGV2ZW50c1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoU3RvcmVQcm90by5saWZlY3ljbGUpIHtcbiAgICBmbi5lYWNoT2JqZWN0KGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50KSB7XG4gICAgICBfU3RvcmVNaXhpbjJbJ2RlZmF1bHQnXS5vbi5jYWxsKFN0b3JlUHJvdG8sIGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgIH0sIFtTdG9yZVByb3RvLmxpZmVjeWNsZV0pO1xuICB9XG5cbiAgLy8gY3JlYXRlIHRoZSBpbnN0YW5jZSBhbmQgZm4uYXNzaWduIHRoZSBwdWJsaWMgbWV0aG9kcyB0byB0aGUgaW5zdGFuY2VcbiAgc3RvcmVJbnN0YW5jZSA9IGZuLmFzc2lnbihuZXcgX0FsdFN0b3JlMlsnZGVmYXVsdCddKGFsdCwgU3RvcmVQcm90bywgU3RvcmVQcm90by5zdGF0ZSAhPT0gdW5kZWZpbmVkID8gU3RvcmVQcm90by5zdGF0ZSA6IHt9LCBTdG9yZU1vZGVsKSwgU3RvcmVQcm90by5wdWJsaWNNZXRob2RzLCB7XG4gICAgZGlzcGxheU5hbWU6IGtleSxcbiAgICBjb25maWc6IFN0b3JlTW9kZWwuY29uZmlnXG4gIH0pO1xuXG4gIHJldHVybiBzdG9yZUluc3RhbmNlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTdG9yZUZyb21DbGFzcyhhbHQsIFN0b3JlTW9kZWwsIGtleSkge1xuICB2YXIgc3RvcmVJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgdmFyIGNvbmZpZyA9IFN0b3JlTW9kZWwuY29uZmlnO1xuXG4gIC8vIENyZWF0aW5nIGEgY2xhc3MgaGVyZSBzbyB3ZSBkb24ndCBvdmVybG9hZCB0aGUgcHJvdmlkZWQgc3RvcmUnc1xuICAvLyBwcm90b3R5cGUgd2l0aCB0aGUgbWl4aW4gYmVoYXZpb3VyIGFuZCBJJ20gZXh0ZW5kaW5nIGZyb20gU3RvcmVNb2RlbFxuICAvLyBzbyB3ZSBjYW4gaW5oZXJpdCBhbnkgZXh0ZW5zaW9ucyBmcm9tIHRoZSBwcm92aWRlZCBzdG9yZS5cblxuICB2YXIgU3RvcmUgPSAoZnVuY3Rpb24gKF9TdG9yZU1vZGVsKSB7XG4gICAgX2luaGVyaXRzKFN0b3JlLCBfU3RvcmVNb2RlbCk7XG5cbiAgICBmdW5jdGlvbiBTdG9yZSgpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdG9yZSk7XG5cbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RvcmUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0b3JlO1xuICB9KShTdG9yZU1vZGVsKTtcblxuICBjcmVhdGVQcm90b3R5cGUoU3RvcmUucHJvdG90eXBlLCBhbHQsIGtleSwge1xuICAgIHR5cGU6ICdBbHRTdG9yZScsXG4gICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uIGdldEluc3RhbmNlKCkge1xuICAgICAgcmV0dXJuIHN0b3JlSW5zdGFuY2U7XG4gICAgfSxcbiAgICBzZXRTdGF0ZTogZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgICBkb1NldFN0YXRlKHRoaXMsIHN0b3JlSW5zdGFuY2UsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9KTtcblxuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJnc0ZvckNsYXNzID0gQXJyYXkoX2xlbiA+IDMgPyBfbGVuIC0gMyA6IDApLCBfa2V5ID0gMzsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NGb3JDbGFzc1tfa2V5IC0gM10gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgc3RvcmUgPSBuZXcgKF9iaW5kLmFwcGx5KFN0b3JlLCBbbnVsbF0uY29uY2F0KGFyZ3NGb3JDbGFzcykpKSgpO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChjb25maWcuYmluZExpc3RlbmVycykgc3RvcmUuYmluZExpc3RlbmVycyhjb25maWcuYmluZExpc3RlbmVycyk7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChjb25maWcuZGF0YXNvdXJjZSkgc3RvcmUucmVnaXN0ZXJBc3luYyhjb25maWcuZGF0YXNvdXJjZSk7XG5cbiAgc3RvcmVJbnN0YW5jZSA9IGZuLmFzc2lnbihuZXcgX0FsdFN0b3JlMlsnZGVmYXVsdCddKGFsdCwgc3RvcmUsIHN0b3JlLnN0YXRlICE9PSB1bmRlZmluZWQgPyBzdG9yZS5zdGF0ZSA6IHN0b3JlLCBTdG9yZU1vZGVsKSwgdXRpbHMuZ2V0SW50ZXJuYWxNZXRob2RzKFN0b3JlTW9kZWwpLCBjb25maWcucHVibGljTWV0aG9kcywgeyBkaXNwbGF5TmFtZToga2V5IH0pO1xuXG4gIHJldHVybiBzdG9yZUluc3RhbmNlO1xufVxufSx7XCIuLi9mdW5jdGlvbnNcIjoxNSxcIi4uL3V0aWxzL0FsdFV0aWxzXCI6MjAsXCIuL0FsdFN0b3JlXCI6MTcsXCIuL1N0b3JlTWl4aW5cIjoxOH1dLDIwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZ2V0SW50ZXJuYWxNZXRob2RzID0gZ2V0SW50ZXJuYWxNZXRob2RzO1xuZXhwb3J0cy5nZXRQcm90b3R5cGVDaGFpbiA9IGdldFByb3RvdHlwZUNoYWluO1xuZXhwb3J0cy53YXJuID0gd2FybjtcbmV4cG9ydHMudWlkID0gdWlkO1xuZXhwb3J0cy5mb3JtYXRBc0NvbnN0YW50ID0gZm9ybWF0QXNDb25zdGFudDtcbmV4cG9ydHMuZGlzcGF0Y2hJZGVudGl0eSA9IGRpc3BhdGNoSWRlbnRpdHk7XG5leHBvcnRzLmZzYSA9IGZzYTtcbmV4cG9ydHMuZGlzcGF0Y2ggPSBkaXNwYXRjaDtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09ialsnZGVmYXVsdCddID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxudmFyIF9mdW5jdGlvbnMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMnKTtcblxudmFyIGZuID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2Z1bmN0aW9ucyk7XG5cbi8qZXNsaW50LWRpc2FibGUqL1xudmFyIGJ1aWx0SW5zID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTm9vcENsYXNzKTtcbnZhciBidWlsdEluUHJvdG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhOb29wQ2xhc3MucHJvdG90eXBlKTtcbi8qZXNsaW50LWVuYWJsZSovXG5cbmZ1bmN0aW9uIGdldEludGVybmFsTWV0aG9kcyhPYmosIGlzUHJvdG8pIHtcbiAgdmFyIGV4Y2x1ZGVkID0gaXNQcm90byA/IGJ1aWx0SW5Qcm90byA6IGJ1aWx0SW5zO1xuICB2YXIgb2JqID0gaXNQcm90byA/IE9iai5wcm90b3R5cGUgOiBPYmo7XG4gIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLnJlZHVjZShmdW5jdGlvbiAodmFsdWUsIG0pIHtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihtKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICB2YWx1ZVttXSA9IG9ialttXTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvdG90eXBlQ2hhaW4oX3gyKSB7XG4gIHZhciBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuICB2YXIgX2FnYWluID0gdHJ1ZTtcblxuICBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHtcbiAgICB2YXIgT2JqID0gX3gyO1xuICAgIG1ldGhvZHMgPSB1bmRlZmluZWQ7XG4gICAgX2FnYWluID0gZmFsc2U7XG4gICAgdmFyIG1ldGhvZHMgPSBfYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IF9hcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogX2FyZ3VtZW50c1sxXTtcbiAgICBpZiAoT2JqID09PSBGdW5jdGlvbi5wcm90b3R5cGUpIHtcbiAgICAgIHJldHVybiBtZXRob2RzO1xuICAgIH0gZWxzZSB7XG4gICAgICBfYXJndW1lbnRzID0gW194MiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmopLCBmbi5hc3NpZ24obWV0aG9kcywgZ2V0SW50ZXJuYWxNZXRob2RzKE9iaiwgdHJ1ZSkpXTtcbiAgICAgIF9hZ2FpbiA9IHRydWU7XG4gICAgICBjb250aW51ZSBfZnVuY3Rpb247XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHdhcm4obXNnKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIC8qZXNsaW50LWRpc2FibGUqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29uc29sZS53YXJuKG5ldyBSZWZlcmVuY2VFcnJvcihtc2cpKTtcbiAgfVxuICAvKmVzbGludC1lbmFibGUqL1xufVxuXG5mdW5jdGlvbiB1aWQoY29udGFpbmVyLCBuYW1lKSB7XG4gIHZhciBjb3VudCA9IDA7XG4gIHZhciBrZXkgPSBuYW1lO1xuICB3aGlsZSAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwoY29udGFpbmVyLCBrZXkpKSB7XG4gICAga2V5ID0gbmFtZSArIFN0cmluZygrK2NvdW50KTtcbiAgfVxuICByZXR1cm4ga2V5O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRBc0NvbnN0YW50KG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUucmVwbGFjZSgvW2Etel0oW0EtWl0pL2csIGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIGlbMF0gKyAnXycgKyBpWzFdLnRvTG93ZXJDYXNlKCk7XG4gIH0pLnRvVXBwZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoSWRlbnRpdHkoeCkge1xuICBpZiAoeCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcblxuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYSA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBhLmxlbmd0aCA/IFt4XS5jb25jYXQoYSkgOiB4O1xufVxuXG5mdW5jdGlvbiBmc2EoaWQsIHR5cGUsIHBheWxvYWQsIGRldGFpbHMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgbWV0YTogX2V4dGVuZHMoe1xuICAgICAgZGlzcGF0Y2hJZDogaWRcbiAgICB9LCBkZXRhaWxzKSxcblxuICAgIGlkOiBpZCxcbiAgICBhY3Rpb246IHR5cGUsXG4gICAgZGF0YTogcGF5bG9hZCxcbiAgICBkZXRhaWxzOiBkZXRhaWxzXG4gIH07XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoKGlkLCBhY3Rpb25PYmosIHBheWxvYWQsIGFsdCkge1xuICB2YXIgZGF0YSA9IGFjdGlvbk9iai5kaXNwYXRjaChwYXlsb2FkKTtcbiAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHR5cGUgPSBhY3Rpb25PYmouaWQ7XG4gIHZhciBuYW1lc3BhY2UgPSB0eXBlO1xuICB2YXIgbmFtZSA9IHR5cGU7XG4gIHZhciBkZXRhaWxzID0geyBpZDogdHlwZSwgbmFtZXNwYWNlOiBuYW1lc3BhY2UsIG5hbWU6IG5hbWUgfTtcblxuICB2YXIgZGlzcGF0Y2hMYXRlciA9IGZ1bmN0aW9uIGRpc3BhdGNoTGF0ZXIoeCkge1xuICAgIHJldHVybiBhbHQuZGlzcGF0Y2godHlwZSwgeCwgZGV0YWlscyk7XG4gIH07XG5cbiAgaWYgKGZuLmlzRnVuY3Rpb24oZGF0YSkpIHJldHVybiBkYXRhKGRpc3BhdGNoTGF0ZXIsIGFsdCk7XG5cbiAgLy8gWFhYIHN0YW5kYXJkaXplIHRoaXNcbiAgcmV0dXJuIGFsdC5kaXNwYXRjaGVyLmRpc3BhdGNoKGZzYShpZCwgdHlwZSwgZGF0YSwgZGV0YWlscykpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gTm9vcENsYXNzKCkge31cbn0se1wiLi4vZnVuY3Rpb25zXCI6MTV9XSwyMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5zZXRBcHBTdGF0ZSA9IHNldEFwcFN0YXRlO1xuZXhwb3J0cy5zbmFwc2hvdCA9IHNuYXBzaG90O1xuZXhwb3J0cy5zYXZlSW5pdGlhbFNuYXBzaG90ID0gc2F2ZUluaXRpYWxTbmFwc2hvdDtcbmV4cG9ydHMuZmlsdGVyU25hcHNob3RzID0gZmlsdGVyU25hcHNob3RzO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqWydkZWZhdWx0J10gPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG52YXIgX2Z1bmN0aW9ucyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucycpO1xuXG52YXIgZm4gPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZnVuY3Rpb25zKTtcblxuZnVuY3Rpb24gc2V0QXBwU3RhdGUoaW5zdGFuY2UsIGRhdGEsIG9uU3RvcmUpIHtcbiAgdmFyIG9iaiA9IGluc3RhbmNlLmRlc2VyaWFsaXplKGRhdGEpO1xuICBmbi5lYWNoT2JqZWN0KGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgdmFyIHN0b3JlID0gaW5zdGFuY2Uuc3RvcmVzW2tleV07XG4gICAgaWYgKHN0b3JlKSB7XG4gICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29uZmlnID0gc3RvcmUuU3RvcmVNb2RlbC5jb25maWc7XG5cbiAgICAgICAgdmFyIHN0YXRlID0gc3RvcmUuc3RhdGU7XG4gICAgICAgIGlmIChjb25maWcub25EZXNlcmlhbGl6ZSkgb2JqW2tleV0gPSBjb25maWcub25EZXNlcmlhbGl6ZSh2YWx1ZSkgfHwgdmFsdWU7XG4gICAgICAgIGlmIChmbi5pc011dGFibGVPYmplY3Qoc3RhdGUpKSB7XG4gICAgICAgICAgZm4uZWFjaE9iamVjdChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgcmV0dXJuIGRlbGV0ZSBzdGF0ZVtrXTtcbiAgICAgICAgICB9LCBbc3RhdGVdKTtcbiAgICAgICAgICBmbi5hc3NpZ24oc3RhdGUsIG9ialtrZXldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdG9yZS5zdGF0ZSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICAgIG9uU3RvcmUoc3RvcmUsIHN0b3JlLnN0YXRlKTtcbiAgICAgIH0pKCk7XG4gICAgfVxuICB9LCBbb2JqXSk7XG59XG5cbmZ1bmN0aW9uIHNuYXBzaG90KGluc3RhbmNlKSB7XG4gIHZhciBzdG9yZU5hbWVzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gW10gOiBhcmd1bWVudHNbMV07XG5cbiAgdmFyIHN0b3JlcyA9IHN0b3JlTmFtZXMubGVuZ3RoID8gc3RvcmVOYW1lcyA6IE9iamVjdC5rZXlzKGluc3RhbmNlLnN0b3Jlcyk7XG4gIHJldHVybiBzdG9yZXMucmVkdWNlKGZ1bmN0aW9uIChvYmosIHN0b3JlSGFuZGxlKSB7XG4gICAgdmFyIHN0b3JlTmFtZSA9IHN0b3JlSGFuZGxlLmRpc3BsYXlOYW1lIHx8IHN0b3JlSGFuZGxlO1xuICAgIHZhciBzdG9yZSA9IGluc3RhbmNlLnN0b3Jlc1tzdG9yZU5hbWVdO1xuICAgIHZhciBjb25maWcgPSBzdG9yZS5TdG9yZU1vZGVsLmNvbmZpZztcblxuICAgIHN0b3JlLmxpZmVjeWNsZSgnc25hcHNob3QnKTtcbiAgICB2YXIgY3VzdG9tU25hcHNob3QgPSBjb25maWcub25TZXJpYWxpemUgJiYgY29uZmlnLm9uU2VyaWFsaXplKHN0b3JlLnN0YXRlKTtcbiAgICBvYmpbc3RvcmVOYW1lXSA9IGN1c3RvbVNuYXBzaG90ID8gY3VzdG9tU25hcHNob3QgOiBzdG9yZS5nZXRTdGF0ZSgpO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gc2F2ZUluaXRpYWxTbmFwc2hvdChpbnN0YW5jZSwga2V5KSB7XG4gIHZhciBzdGF0ZSA9IGluc3RhbmNlLmRlc2VyaWFsaXplKGluc3RhbmNlLnNlcmlhbGl6ZShpbnN0YW5jZS5zdG9yZXNba2V5XS5zdGF0ZSkpO1xuICBpbnN0YW5jZS5faW5pdFNuYXBzaG90W2tleV0gPSBzdGF0ZTtcbiAgaW5zdGFuY2UuX2xhc3RTbmFwc2hvdFtrZXldID0gc3RhdGU7XG59XG5cbmZ1bmN0aW9uIGZpbHRlclNuYXBzaG90cyhpbnN0YW5jZSwgc3RhdGUsIHN0b3Jlcykge1xuICByZXR1cm4gc3RvcmVzLnJlZHVjZShmdW5jdGlvbiAob2JqLCBzdG9yZSkge1xuICAgIHZhciBzdG9yZU5hbWUgPSBzdG9yZS5kaXNwbGF5TmFtZSB8fCBzdG9yZTtcbiAgICBpZiAoIXN0YXRlW3N0b3JlTmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihzdG9yZU5hbWUgKyAnIGlzIG5vdCBhIHZhbGlkIHN0b3JlJyk7XG4gICAgfVxuICAgIG9ialtzdG9yZU5hbWVdID0gc3RhdGVbc3RvcmVOYW1lXTtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59XG59LHtcIi4uL2Z1bmN0aW9uc1wiOjE1fV0sMjI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbm1vZHVsZS5leHBvcnRzLkRpc3BhdGNoZXIgPSByZXF1aXJlKCcuL2xpYi9EaXNwYXRjaGVyJylcblxufSx7XCIuL2xpYi9EaXNwYXRjaGVyXCI6MjN9XSwyMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIERpc3BhdGNoZXJcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCcuL2ludmFyaWFudCcpO1xuXG52YXIgX2xhc3RJRCA9IDE7XG52YXIgX3ByZWZpeCA9ICdJRF8nO1xuXG4vKipcbiAqIERpc3BhdGNoZXIgaXMgdXNlZCB0byBicm9hZGNhc3QgcGF5bG9hZHMgdG8gcmVnaXN0ZXJlZCBjYWxsYmFja3MuIFRoaXMgaXNcbiAqIGRpZmZlcmVudCBmcm9tIGdlbmVyaWMgcHViLXN1YiBzeXN0ZW1zIGluIHR3byB3YXlzOlxuICpcbiAqICAgMSkgQ2FsbGJhY2tzIGFyZSBub3Qgc3Vic2NyaWJlZCB0byBwYXJ0aWN1bGFyIGV2ZW50cy4gRXZlcnkgcGF5bG9hZCBpc1xuICogICAgICBkaXNwYXRjaGVkIHRvIGV2ZXJ5IHJlZ2lzdGVyZWQgY2FsbGJhY2suXG4gKiAgIDIpIENhbGxiYWNrcyBjYW4gYmUgZGVmZXJyZWQgaW4gd2hvbGUgb3IgcGFydCB1bnRpbCBvdGhlciBjYWxsYmFja3MgaGF2ZVxuICogICAgICBiZWVuIGV4ZWN1dGVkLlxuICpcbiAqIEZvciBleGFtcGxlLCBjb25zaWRlciB0aGlzIGh5cG90aGV0aWNhbCBmbGlnaHQgZGVzdGluYXRpb24gZm9ybSwgd2hpY2hcbiAqIHNlbGVjdHMgYSBkZWZhdWx0IGNpdHkgd2hlbiBhIGNvdW50cnkgaXMgc2VsZWN0ZWQ6XG4gKlxuICogICB2YXIgZmxpZ2h0RGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG4gKlxuICogICAvLyBLZWVwcyB0cmFjayBvZiB3aGljaCBjb3VudHJ5IGlzIHNlbGVjdGVkXG4gKiAgIHZhciBDb3VudHJ5U3RvcmUgPSB7Y291bnRyeTogbnVsbH07XG4gKlxuICogICAvLyBLZWVwcyB0cmFjayBvZiB3aGljaCBjaXR5IGlzIHNlbGVjdGVkXG4gKiAgIHZhciBDaXR5U3RvcmUgPSB7Y2l0eTogbnVsbH07XG4gKlxuICogICAvLyBLZWVwcyB0cmFjayBvZiB0aGUgYmFzZSBmbGlnaHQgcHJpY2Ugb2YgdGhlIHNlbGVjdGVkIGNpdHlcbiAqICAgdmFyIEZsaWdodFByaWNlU3RvcmUgPSB7cHJpY2U6IG51bGx9XG4gKlxuICogV2hlbiBhIHVzZXIgY2hhbmdlcyB0aGUgc2VsZWN0ZWQgY2l0eSwgd2UgZGlzcGF0Y2ggdGhlIHBheWxvYWQ6XG4gKlxuICogICBmbGlnaHREaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAqICAgICBhY3Rpb25UeXBlOiAnY2l0eS11cGRhdGUnLFxuICogICAgIHNlbGVjdGVkQ2l0eTogJ3BhcmlzJ1xuICogICB9KTtcbiAqXG4gKiBUaGlzIHBheWxvYWQgaXMgZGlnZXN0ZWQgYnkgYENpdHlTdG9yZWA6XG4gKlxuICogICBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICBpZiAocGF5bG9hZC5hY3Rpb25UeXBlID09PSAnY2l0eS11cGRhdGUnKSB7XG4gKiAgICAgICBDaXR5U3RvcmUuY2l0eSA9IHBheWxvYWQuc2VsZWN0ZWRDaXR5O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogV2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgY291bnRyeSwgd2UgZGlzcGF0Y2ggdGhlIHBheWxvYWQ6XG4gKlxuICogICBmbGlnaHREaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAqICAgICBhY3Rpb25UeXBlOiAnY291bnRyeS11cGRhdGUnLFxuICogICAgIHNlbGVjdGVkQ291bnRyeTogJ2F1c3RyYWxpYSdcbiAqICAgfSk7XG4gKlxuICogVGhpcyBwYXlsb2FkIGlzIGRpZ2VzdGVkIGJ5IGJvdGggc3RvcmVzOlxuICpcbiAqICAgIENvdW50cnlTdG9yZS5kaXNwYXRjaFRva2VuID0gZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NvdW50cnktdXBkYXRlJykge1xuICogICAgICAgQ291bnRyeVN0b3JlLmNvdW50cnkgPSBwYXlsb2FkLnNlbGVjdGVkQ291bnRyeTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFdoZW4gdGhlIGNhbGxiYWNrIHRvIHVwZGF0ZSBgQ291bnRyeVN0b3JlYCBpcyByZWdpc3RlcmVkLCB3ZSBzYXZlIGEgcmVmZXJlbmNlXG4gKiB0byB0aGUgcmV0dXJuZWQgdG9rZW4uIFVzaW5nIHRoaXMgdG9rZW4gd2l0aCBgd2FpdEZvcigpYCwgd2UgY2FuIGd1YXJhbnRlZVxuICogdGhhdCBgQ291bnRyeVN0b3JlYCBpcyB1cGRhdGVkIGJlZm9yZSB0aGUgY2FsbGJhY2sgdGhhdCB1cGRhdGVzIGBDaXR5U3RvcmVgXG4gKiBuZWVkcyB0byBxdWVyeSBpdHMgZGF0YS5cbiAqXG4gKiAgIENpdHlTdG9yZS5kaXNwYXRjaFRva2VuID0gZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NvdW50cnktdXBkYXRlJykge1xuICogICAgICAgLy8gYENvdW50cnlTdG9yZS5jb3VudHJ5YCBtYXkgbm90IGJlIHVwZGF0ZWQuXG4gKiAgICAgICBmbGlnaHREaXNwYXRjaGVyLndhaXRGb3IoW0NvdW50cnlTdG9yZS5kaXNwYXRjaFRva2VuXSk7XG4gKiAgICAgICAvLyBgQ291bnRyeVN0b3JlLmNvdW50cnlgIGlzIG5vdyBndWFyYW50ZWVkIHRvIGJlIHVwZGF0ZWQuXG4gKlxuICogICAgICAgLy8gU2VsZWN0IHRoZSBkZWZhdWx0IGNpdHkgZm9yIHRoZSBuZXcgY291bnRyeVxuICogICAgICAgQ2l0eVN0b3JlLmNpdHkgPSBnZXREZWZhdWx0Q2l0eUZvckNvdW50cnkoQ291bnRyeVN0b3JlLmNvdW50cnkpO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIHVzYWdlIG9mIGB3YWl0Rm9yKClgIGNhbiBiZSBjaGFpbmVkLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiAgIEZsaWdodFByaWNlU3RvcmUuZGlzcGF0Y2hUb2tlbiA9XG4gKiAgICAgZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgICBzd2l0Y2ggKHBheWxvYWQuYWN0aW9uVHlwZSkge1xuICogICAgICAgICBjYXNlICdjb3VudHJ5LXVwZGF0ZSc6XG4gKiAgICAgICAgICAgZmxpZ2h0RGlzcGF0Y2hlci53YWl0Rm9yKFtDaXR5U3RvcmUuZGlzcGF0Y2hUb2tlbl0pO1xuICogICAgICAgICAgIEZsaWdodFByaWNlU3RvcmUucHJpY2UgPVxuICogICAgICAgICAgICAgZ2V0RmxpZ2h0UHJpY2VTdG9yZShDb3VudHJ5U3RvcmUuY291bnRyeSwgQ2l0eVN0b3JlLmNpdHkpO1xuICogICAgICAgICAgIGJyZWFrO1xuICpcbiAqICAgICAgICAgY2FzZSAnY2l0eS11cGRhdGUnOlxuICogICAgICAgICAgIEZsaWdodFByaWNlU3RvcmUucHJpY2UgPVxuICogICAgICAgICAgICAgRmxpZ2h0UHJpY2VTdG9yZShDb3VudHJ5U3RvcmUuY291bnRyeSwgQ2l0eVN0b3JlLmNpdHkpO1xuICogICAgICAgICAgIGJyZWFrO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIGBjb3VudHJ5LXVwZGF0ZWAgcGF5bG9hZCB3aWxsIGJlIGd1YXJhbnRlZWQgdG8gaW52b2tlIHRoZSBzdG9yZXMnXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcyBpbiBvcmRlcjogYENvdW50cnlTdG9yZWAsIGBDaXR5U3RvcmVgLCB0aGVuXG4gKiBgRmxpZ2h0UHJpY2VTdG9yZWAuXG4gKi9cblxuICBmdW5jdGlvbiBEaXNwYXRjaGVyKCkge1xuICAgIHRoaXMuJERpc3BhdGNoZXJfY2FsbGJhY2tzID0ge307XG4gICAgdGhpcy4kRGlzcGF0Y2hlcl9pc1BlbmRpbmcgPSB7fTtcbiAgICB0aGlzLiREaXNwYXRjaGVyX2lzSGFuZGxlZCA9IHt9O1xuICAgIHRoaXMuJERpc3BhdGNoZXJfaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIHRoaXMuJERpc3BhdGNoZXJfcGVuZGluZ1BheWxvYWQgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgd2l0aCBldmVyeSBkaXNwYXRjaGVkIHBheWxvYWQuIFJldHVybnNcbiAgICogYSB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYHdhaXRGb3IoKWAuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLnJlZ2lzdGVyPWZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdmFyIGlkID0gX3ByZWZpeCArIF9sYXN0SUQrKztcbiAgICB0aGlzLiREaXNwYXRjaGVyX2NhbGxiYWNrc1tpZF0gPSBjYWxsYmFjaztcbiAgICByZXR1cm4gaWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjYWxsYmFjayBiYXNlZCBvbiBpdHMgdG9rZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUudW5yZWdpc3Rlcj1mdW5jdGlvbihpZCkge1xuICAgIGludmFyaWFudChcbiAgICAgIHRoaXMuJERpc3BhdGNoZXJfY2FsbGJhY2tzW2lkXSxcbiAgICAgICdEaXNwYXRjaGVyLnVucmVnaXN0ZXIoLi4uKTogYCVzYCBkb2VzIG5vdCBtYXAgdG8gYSByZWdpc3RlcmVkIGNhbGxiYWNrLicsXG4gICAgICBpZFxuICAgICk7XG4gICAgZGVsZXRlIHRoaXMuJERpc3BhdGNoZXJfY2FsbGJhY2tzW2lkXTtcbiAgfTtcblxuICAvKipcbiAgICogV2FpdHMgZm9yIHRoZSBjYWxsYmFja3Mgc3BlY2lmaWVkIHRvIGJlIGludm9rZWQgYmVmb3JlIGNvbnRpbnVpbmcgZXhlY3V0aW9uXG4gICAqIG9mIHRoZSBjdXJyZW50IGNhbGxiYWNrLiBUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSB1c2VkIGJ5IGEgY2FsbGJhY2sgaW5cbiAgICogcmVzcG9uc2UgdG8gYSBkaXNwYXRjaGVkIHBheWxvYWQuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nPn0gaWRzXG4gICAqL1xuICBEaXNwYXRjaGVyLnByb3RvdHlwZS53YWl0Rm9yPWZ1bmN0aW9uKGlkcykge1xuICAgIGludmFyaWFudChcbiAgICAgIHRoaXMuJERpc3BhdGNoZXJfaXNEaXNwYXRjaGluZyxcbiAgICAgICdEaXNwYXRjaGVyLndhaXRGb3IoLi4uKTogTXVzdCBiZSBpbnZva2VkIHdoaWxlIGRpc3BhdGNoaW5nLidcbiAgICApO1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBpZHMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICB2YXIgaWQgPSBpZHNbaWldO1xuICAgICAgaWYgKHRoaXMuJERpc3BhdGNoZXJfaXNQZW5kaW5nW2lkXSkge1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgdGhpcy4kRGlzcGF0Y2hlcl9pc0hhbmRsZWRbaWRdLFxuICAgICAgICAgICdEaXNwYXRjaGVyLndhaXRGb3IoLi4uKTogQ2lyY3VsYXIgZGVwZW5kZW5jeSBkZXRlY3RlZCB3aGlsZSAnICtcbiAgICAgICAgICAnd2FpdGluZyBmb3IgYCVzYC4nLFxuICAgICAgICAgIGlkXG4gICAgICAgICk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaW52YXJpYW50KFxuICAgICAgICB0aGlzLiREaXNwYXRjaGVyX2NhbGxiYWNrc1tpZF0sXG4gICAgICAgICdEaXNwYXRjaGVyLndhaXRGb3IoLi4uKTogYCVzYCBkb2VzIG5vdCBtYXAgdG8gYSByZWdpc3RlcmVkIGNhbGxiYWNrLicsXG4gICAgICAgIGlkXG4gICAgICApO1xuICAgICAgdGhpcy4kRGlzcGF0Y2hlcl9pbnZva2VDYWxsYmFjayhpZCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGEgcGF5bG9hZCB0byBhbGwgcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXlsb2FkXG4gICAqL1xuICBEaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaD1mdW5jdGlvbihwYXlsb2FkKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgIXRoaXMuJERpc3BhdGNoZXJfaXNEaXNwYXRjaGluZyxcbiAgICAgICdEaXNwYXRjaC5kaXNwYXRjaCguLi4pOiBDYW5ub3QgZGlzcGF0Y2ggaW4gdGhlIG1pZGRsZSBvZiBhIGRpc3BhdGNoLidcbiAgICApO1xuICAgIHRoaXMuJERpc3BhdGNoZXJfc3RhcnREaXNwYXRjaGluZyhwYXlsb2FkKTtcbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy4kRGlzcGF0Y2hlcl9jYWxsYmFja3MpIHtcbiAgICAgICAgaWYgKHRoaXMuJERpc3BhdGNoZXJfaXNQZW5kaW5nW2lkXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJERpc3BhdGNoZXJfaW52b2tlQ2FsbGJhY2soaWQpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLiREaXNwYXRjaGVyX3N0b3BEaXNwYXRjaGluZygpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSXMgdGhpcyBEaXNwYXRjaGVyIGN1cnJlbnRseSBkaXNwYXRjaGluZy5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLmlzRGlzcGF0Y2hpbmc9ZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuJERpc3BhdGNoZXJfaXNEaXNwYXRjaGluZztcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCB0aGUgY2FsbGJhY2sgc3RvcmVkIHdpdGggdGhlIGdpdmVuIGlkLiBBbHNvIGRvIHNvbWUgaW50ZXJuYWxcbiAgICogYm9va2tlZXBpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLiREaXNwYXRjaGVyX2ludm9rZUNhbGxiYWNrPWZ1bmN0aW9uKGlkKSB7XG4gICAgdGhpcy4kRGlzcGF0Y2hlcl9pc1BlbmRpbmdbaWRdID0gdHJ1ZTtcbiAgICB0aGlzLiREaXNwYXRjaGVyX2NhbGxiYWNrc1tpZF0odGhpcy4kRGlzcGF0Y2hlcl9wZW5kaW5nUGF5bG9hZCk7XG4gICAgdGhpcy4kRGlzcGF0Y2hlcl9pc0hhbmRsZWRbaWRdID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0IHVwIGJvb2trZWVwaW5nIG5lZWRlZCB3aGVuIGRpc3BhdGNoaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGF5bG9hZFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLiREaXNwYXRjaGVyX3N0YXJ0RGlzcGF0Y2hpbmc9ZnVuY3Rpb24ocGF5bG9hZCkge1xuICAgIGZvciAodmFyIGlkIGluIHRoaXMuJERpc3BhdGNoZXJfY2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLiREaXNwYXRjaGVyX2lzUGVuZGluZ1tpZF0gPSBmYWxzZTtcbiAgICAgIHRoaXMuJERpc3BhdGNoZXJfaXNIYW5kbGVkW2lkXSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLiREaXNwYXRjaGVyX3BlbmRpbmdQYXlsb2FkID0gcGF5bG9hZDtcbiAgICB0aGlzLiREaXNwYXRjaGVyX2lzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhciBib29ra2VlcGluZyB1c2VkIGZvciBkaXNwYXRjaGluZy5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBEaXNwYXRjaGVyLnByb3RvdHlwZS4kRGlzcGF0Y2hlcl9zdG9wRGlzcGF0Y2hpbmc9ZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kRGlzcGF0Y2hlcl9wZW5kaW5nUGF5bG9hZCA9IG51bGw7XG4gICAgdGhpcy4kRGlzcGF0Y2hlcl9pc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gIH07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyO1xuXG59LHtcIi4vaW52YXJpYW50XCI6MjR9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChmYWxzZSkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxufSx7fV0sMjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBpc1Byb21pc2U7XG5cbmZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuICEhb2JqICYmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5cbn0se31dLDI2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdHJhbnNtaXR0ZXIoKSB7XG4gIHZhciBzdWJzY3JpcHRpb25zID0gW107XG4gIHZhciBwdXNoaW5nID0gZmFsc2U7XG4gIHZhciB0b1Vuc3Vic2NyaWJlID0gW107XG5cbiAgdmFyIHVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUob25DaGFuZ2UpIHtcbiAgICBpZiAocHVzaGluZykge1xuICAgICAgdG9VbnN1YnNjcmliZS5wdXNoKG9uQ2hhbmdlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGlkID0gc3Vic2NyaXB0aW9ucy5pbmRleE9mKG9uQ2hhbmdlKTtcbiAgICBpZiAoaWQgPj0gMCkgc3Vic2NyaXB0aW9ucy5zcGxpY2UoaWQsIDEpO1xuICB9O1xuXG4gIHZhciBzdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUob25DaGFuZ2UpIHtcbiAgICBzdWJzY3JpcHRpb25zLnB1c2gob25DaGFuZ2UpO1xuICAgIHZhciBkaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgIHJldHVybiB1bnN1YnNjcmliZShvbkNoYW5nZSk7XG4gICAgfTtcbiAgICByZXR1cm4geyBkaXNwb3NlOiBkaXNwb3NlIH07XG4gIH07XG5cbiAgdmFyIHB1c2ggPSBmdW5jdGlvbiBwdXNoKHZhbHVlKSB7XG4gICAgaWYgKHB1c2hpbmcpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHB1c2ggd2hpbGUgcHVzaGluZycpO1xuICAgIHB1c2hpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBzdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHN1YnNjcmlwdGlvbikge1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBwdXNoaW5nID0gZmFsc2U7XG4gICAgICB0b1Vuc3Vic2NyaWJlID0gdG9VbnN1YnNjcmliZS5maWx0ZXIodW5zdWJzY3JpYmUpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YnNjcmliZSwgcHVzaDogcHVzaCwgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlLCBzdWJzY3JpcHRpb25zOiBzdWJzY3JpcHRpb25zIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJhbnNtaXR0ZXI7XG5cblxufSx7fV0sMjc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cbn0se31dLDI4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgbmF2aWdhdGlvbiB3YXMgY2F1c2VkIGJ5IGEgY2FsbCB0byBoaXN0b3J5LnB1c2guXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBQVVNIID0gJ1BVU0gnO1xuXG5leHBvcnRzLlBVU0ggPSBQVVNIO1xuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCBuYXZpZ2F0aW9uIHdhcyBjYXVzZWQgYnkgYSBjYWxsIHRvIGhpc3RvcnkucmVwbGFjZS5cbiAqL1xudmFyIFJFUExBQ0UgPSAnUkVQTEFDRSc7XG5cbmV4cG9ydHMuUkVQTEFDRSA9IFJFUExBQ0U7XG4vKipcbiAqIEluZGljYXRlcyB0aGF0IG5hdmlnYXRpb24gd2FzIGNhdXNlZCBieSBzb21lIG90aGVyIGFjdGlvbiBzdWNoXG4gKiBhcyB1c2luZyBhIGJyb3dzZXIncyBiYWNrL2ZvcndhcmQgYnV0dG9ucyBhbmQvb3IgbWFudWFsbHkgbWFuaXB1bGF0aW5nXG4gKiB0aGUgVVJMIGluIGEgYnJvd3NlcidzIGxvY2F0aW9uIGJhci4gVGhpcyBpcyB0aGUgZGVmYXVsdC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd0V2ZW50SGFuZGxlcnMvb25wb3BzdGF0ZVxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKi9cbnZhciBQT1AgPSAnUE9QJztcblxuZXhwb3J0cy5QT1AgPSBQT1A7XG5leHBvcnRzWydkZWZhdWx0J10gPSB7XG4gIFBVU0g6IFBVU0gsXG4gIFJFUExBQ0U6IFJFUExBQ0UsXG4gIFBPUDogUE9QXG59O1xufSx7fV0sMjk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmxvb3BBc3luYyA9IGxvb3BBc3luYztcblxuZnVuY3Rpb24gbG9vcEFzeW5jKHR1cm5zLCB3b3JrLCBjYWxsYmFjaykge1xuICB2YXIgY3VycmVudFR1cm4gPSAwO1xuICB2YXIgaXNEb25lID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICBpc0RvbmUgPSB0cnVlO1xuICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIGlmIChpc0RvbmUpIHJldHVybjtcblxuICAgIGlmIChjdXJyZW50VHVybiA8IHR1cm5zKSB7XG4gICAgICB3b3JrLmNhbGwodGhpcywgY3VycmVudFR1cm4rKywgbmV4dCwgZG9uZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBuZXh0KCk7XG59XG59LHt9XSwzMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKmVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnNhdmVTdGF0ZSA9IHNhdmVTdGF0ZTtcbmV4cG9ydHMucmVhZFN0YXRlID0gcmVhZFN0YXRlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG52YXIgS2V5UHJlZml4ID0gJ0BASGlzdG9yeS8nO1xudmFyIFF1b3RhRXhjZWVkZWRFcnJvciA9ICdRdW90YUV4Y2VlZGVkRXJyb3InO1xuXG5mdW5jdGlvbiBjcmVhdGVLZXkoa2V5KSB7XG4gIHJldHVybiBLZXlQcmVmaXggKyBrZXk7XG59XG5cbmZ1bmN0aW9uIHNhdmVTdGF0ZShrZXksIHN0YXRlKSB7XG4gIHRyeSB7XG4gICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oY3JlYXRlS2V5KGtleSksIEpTT04uc3RyaW5naWZ5KHN0YXRlKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLm5hbWUgPT09IFF1b3RhRXhjZWVkZWRFcnJvciB8fCB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBQcm9iYWJseSBpbiBTYWZhcmkgXCJwcml2YXRlIG1vZGVcIiB3aGVyZSBzZXNzaW9uU3RvcmFnZSBxdW90YSBpcyAwLiAjNDJcbiAgICAgIF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnW2hpc3RvcnldIFVuYWJsZSB0byBzYXZlIHN0YXRlOyBzZXNzaW9uU3RvcmFnZSBpcyBub3QgYXZhaWxhYmxlIGluIFNhZmFyaSBwcml2YXRlIG1vZGUnKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlYWRTdGF0ZShrZXkpIHtcbiAgdmFyIGpzb24gPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShjcmVhdGVLZXkoa2V5KSk7XG5cbiAgaWYgKGpzb24pIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoanNvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIElnbm9yZSBpbnZhbGlkIEpTT04uXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG59LHtcIndhcm5pbmdcIjo0NH1dLDMxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuYWRkRXZlbnRMaXN0ZW5lciA9IGFkZEV2ZW50TGlzdGVuZXI7XG5leHBvcnRzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xuZXhwb3J0cy5nZXRIYXNoUGF0aCA9IGdldEhhc2hQYXRoO1xuZXhwb3J0cy5yZXBsYWNlSGFzaFBhdGggPSByZXBsYWNlSGFzaFBhdGg7XG5leHBvcnRzLmdldFdpbmRvd1BhdGggPSBnZXRXaW5kb3dQYXRoO1xuZXhwb3J0cy5nbyA9IGdvO1xuZXhwb3J0cy5nZXRVc2VyQ29uZmlybWF0aW9uID0gZ2V0VXNlckNvbmZpcm1hdGlvbjtcbmV4cG9ydHMuc3VwcG9ydHNIaXN0b3J5ID0gc3VwcG9ydHNIaXN0b3J5O1xuZXhwb3J0cy5zdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCA9IHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoO1xuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50LCBsaXN0ZW5lcikge1xuICBpZiAobm9kZS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIG5vZGUuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihub2RlLCBldmVudCwgbGlzdGVuZXIpIHtcbiAgaWYgKG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICBub2RlLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEhhc2hQYXRoKCkge1xuICAvLyBXZSBjYW4ndCB1c2Ugd2luZG93LmxvY2F0aW9uLmhhc2ggaGVyZSBiZWNhdXNlIGl0J3Mgbm90XG4gIC8vIGNvbnNpc3RlbnQgYWNyb3NzIGJyb3dzZXJzIC0gRmlyZWZveCB3aWxsIHByZS1kZWNvZGUgaXQhXG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzFdIHx8ICcnO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlSGFzaFBhdGgocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgJyMnICsgcGF0aCk7XG59XG5cbmZ1bmN0aW9uIGdldFdpbmRvd1BhdGgoKSB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG59XG5cbmZ1bmN0aW9uIGdvKG4pIHtcbiAgaWYgKG4pIHdpbmRvdy5oaXN0b3J5LmdvKG4pO1xufVxuXG5mdW5jdGlvbiBnZXRVc2VyQ29uZmlybWF0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGlzIHN1cHBvcnRlZC4gVGFrZW4gZnJvbSBtb2Rlcm5penIuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JhY2t0L3JlYWN0LXJvdXRlci9pc3N1ZXMvNTg2XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNIaXN0b3J5KCkge1xuICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICBpZiAoKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpICYmIHVhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSAhPT0gLTEgJiYgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuXG4vKipcbiAqIFJldHVybnMgZmFsc2UgaWYgdXNpbmcgZ28obikgd2l0aCBoYXNoIGhpc3RvcnkgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZC5cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpIHtcbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgcmV0dXJuIHVhLmluZGV4T2YoJ0ZpcmVmb3gnKSA9PT0gLTE7XG59XG59LHt9XSwzMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbmV4cG9ydHMuY2FuVXNlRE9NID0gY2FuVXNlRE9NO1xufSx7fV0sMzM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfQWN0aW9ucyA9IHJlcXVpcmUoJy4vQWN0aW9ucycpO1xuXG52YXIgX0V4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG52YXIgX0RPTVV0aWxzID0gcmVxdWlyZSgnLi9ET01VdGlscycpO1xuXG52YXIgX0RPTVN0YXRlU3RvcmFnZSA9IHJlcXVpcmUoJy4vRE9NU3RhdGVTdG9yYWdlJyk7XG5cbnZhciBfY3JlYXRlRE9NSGlzdG9yeSA9IHJlcXVpcmUoJy4vY3JlYXRlRE9NSGlzdG9yeScpO1xuXG52YXIgX2NyZWF0ZURPTUhpc3RvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlRE9NSGlzdG9yeSk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGhpc3Rvcnkgb2JqZWN0IHRoYXQgdXNlcyBIVE1MNSdzIGhpc3RvcnkgQVBJXG4gKiAocHVzaFN0YXRlLCByZXBsYWNlU3RhdGUsIGFuZCB0aGUgcG9wc3RhdGUgZXZlbnQpIHRvIG1hbmFnZSBoaXN0b3J5LlxuICogVGhpcyBpcyB0aGUgcmVjb21tZW5kZWQgbWV0aG9kIG9mIG1hbmFnaW5nIGhpc3RvcnkgaW4gYnJvd3NlcnMgYmVjYXVzZVxuICogaXQgcHJvdmlkZXMgdGhlIGNsZWFuZXN0IFVSTHMuXG4gKlxuICogTm90ZTogSW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCB0aGUgSFRNTDUgaGlzdG9yeSBBUEkgZnVsbFxuICogcGFnZSByZWxvYWRzIHdpbGwgYmUgdXNlZCB0byBwcmVzZXJ2ZSBVUkxzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCcm93c2VySGlzdG9yeSgpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICBfaW52YXJpYW50MlsnZGVmYXVsdCddKF9FeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00sICdCcm93c2VyIGhpc3RvcnkgbmVlZHMgYSBET00nKTtcblxuICB2YXIgZm9yY2VSZWZyZXNoID0gb3B0aW9ucy5mb3JjZVJlZnJlc2g7XG5cbiAgdmFyIGlzU3VwcG9ydGVkID0gX0RPTVV0aWxzLnN1cHBvcnRzSGlzdG9yeSgpO1xuICB2YXIgdXNlUmVmcmVzaCA9ICFpc1N1cHBvcnRlZCB8fCBmb3JjZVJlZnJlc2g7XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudExvY2F0aW9uKGhpc3RvcnlTdGF0ZSkge1xuICAgIGhpc3RvcnlTdGF0ZSA9IGhpc3RvcnlTdGF0ZSB8fCB3aW5kb3cuaGlzdG9yeS5zdGF0ZSB8fCB7fTtcblxuICAgIHZhciBwYXRoID0gX0RPTVV0aWxzLmdldFdpbmRvd1BhdGgoKTtcbiAgICB2YXIgX2hpc3RvcnlTdGF0ZSA9IGhpc3RvcnlTdGF0ZTtcbiAgICB2YXIga2V5ID0gX2hpc3RvcnlTdGF0ZS5rZXk7XG5cbiAgICB2YXIgc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGtleSkge1xuICAgICAgc3RhdGUgPSBfRE9NU3RhdGVTdG9yYWdlLnJlYWRTdGF0ZShrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZSA9IG51bGw7XG4gICAgICBrZXkgPSBoaXN0b3J5LmNyZWF0ZUtleSgpO1xuXG4gICAgICBpZiAoaXNTdXBwb3J0ZWQpIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShfZXh0ZW5kcyh7fSwgaGlzdG9yeVN0YXRlLCB7IGtleToga2V5IH0pLCBudWxsLCBwYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgdW5kZWZpbmVkLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRQb3BTdGF0ZUxpc3RlbmVyKF9yZWYpIHtcbiAgICB2YXIgdHJhbnNpdGlvblRvID0gX3JlZi50cmFuc2l0aW9uVG87XG5cbiAgICBmdW5jdGlvbiBwb3BTdGF0ZUxpc3RlbmVyKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuc3RhdGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuOyAvLyBJZ25vcmUgZXh0cmFuZW91cyBwb3BzdGF0ZSBldmVudHMgaW4gV2ViS2l0LlxuXG4gICAgICB0cmFuc2l0aW9uVG8oZ2V0Q3VycmVudExvY2F0aW9uKGV2ZW50LnN0YXRlKSk7XG4gICAgfVxuXG4gICAgX0RPTVV0aWxzLmFkZEV2ZW50TGlzdGVuZXIod2luZG93LCAncG9wc3RhdGUnLCBwb3BTdGF0ZUxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBfRE9NVXRpbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcih3aW5kb3csICdwb3BzdGF0ZScsIHBvcFN0YXRlTGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBmaW5pc2hUcmFuc2l0aW9uKGxvY2F0aW9uKSB7XG4gICAgdmFyIGJhc2VuYW1lID0gbG9jYXRpb24uYmFzZW5hbWU7XG4gICAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaDtcbiAgICB2YXIgaGFzaCA9IGxvY2F0aW9uLmhhc2g7XG4gICAgdmFyIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG4gICAgdmFyIGFjdGlvbiA9IGxvY2F0aW9uLmFjdGlvbjtcbiAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5O1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gX0FjdGlvbnMuUE9QKSByZXR1cm47IC8vIE5vdGhpbmcgdG8gZG8uXG5cbiAgICBfRE9NU3RhdGVTdG9yYWdlLnNhdmVTdGF0ZShrZXksIHN0YXRlKTtcblxuICAgIHZhciBwYXRoID0gKGJhc2VuYW1lIHx8ICcnKSArIHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcbiAgICB2YXIgaGlzdG9yeVN0YXRlID0ge1xuICAgICAga2V5OiBrZXlcbiAgICB9O1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gX0FjdGlvbnMuUFVTSCkge1xuICAgICAgaWYgKHVzZVJlZnJlc2gpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBwYXRoO1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIFByZXZlbnQgbG9jYXRpb24gdXBkYXRlLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoaGlzdG9yeVN0YXRlLCBudWxsLCBwYXRoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSRVBMQUNFXG4gICAgICBpZiAodXNlUmVmcmVzaCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShwYXRoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBQcmV2ZW50IGxvY2F0aW9uIHVwZGF0ZS5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKGhpc3RvcnlTdGF0ZSwgbnVsbCwgcGF0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IF9jcmVhdGVET01IaXN0b3J5MlsnZGVmYXVsdCddKF9leHRlbmRzKHt9LCBvcHRpb25zLCB7XG4gICAgZ2V0Q3VycmVudExvY2F0aW9uOiBnZXRDdXJyZW50TG9jYXRpb24sXG4gICAgZmluaXNoVHJhbnNpdGlvbjogZmluaXNoVHJhbnNpdGlvbixcbiAgICBzYXZlU3RhdGU6IF9ET01TdGF0ZVN0b3JhZ2Uuc2F2ZVN0YXRlXG4gIH0pKTtcblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDAsXG4gICAgICBzdG9wUG9wU3RhdGVMaXN0ZW5lciA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmUobGlzdGVuZXIpIHtcbiAgICBpZiAoKytsaXN0ZW5lckNvdW50ID09PSAxKSBzdG9wUG9wU3RhdGVMaXN0ZW5lciA9IHN0YXJ0UG9wU3RhdGVMaXN0ZW5lcihoaXN0b3J5KTtcblxuICAgIHZhciB1bmxpc3RlbiA9IGhpc3RvcnkubGlzdGVuQmVmb3JlKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB1bmxpc3RlbigpO1xuXG4gICAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wUG9wU3RhdGVMaXN0ZW5lcigpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICBpZiAoKytsaXN0ZW5lckNvdW50ID09PSAxKSBzdG9wUG9wU3RhdGVMaXN0ZW5lciA9IHN0YXJ0UG9wU3RhdGVMaXN0ZW5lcihoaXN0b3J5KTtcblxuICAgIHZhciB1bmxpc3RlbiA9IGhpc3RvcnkubGlzdGVuKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB1bmxpc3RlbigpO1xuXG4gICAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wUG9wU3RhdGVMaXN0ZW5lcigpO1xuICAgIH07XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vaykge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gc3RhcnRQb3BTdGF0ZUxpc3RlbmVyKGhpc3RvcnkpO1xuXG4gICAgaGlzdG9yeS5yZWdpc3RlclRyYW5zaXRpb25Ib29rKGhvb2spO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiB1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vaykge1xuICAgIGhpc3RvcnkudW5yZWdpc3RlclRyYW5zaXRpb25Ib29rKGhvb2spO1xuXG4gICAgaWYgKC0tbGlzdGVuZXJDb3VudCA9PT0gMCkgc3RvcFBvcFN0YXRlTGlzdGVuZXIoKTtcbiAgfVxuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgaGlzdG9yeSwge1xuICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgIGxpc3RlbjogbGlzdGVuLFxuICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2ssXG4gICAgdW5yZWdpc3RlclRyYW5zaXRpb25Ib29rOiB1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2tcbiAgfSk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZUJyb3dzZXJIaXN0b3J5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG59LHtcIi4vQWN0aW9uc1wiOjI4LFwiLi9ET01TdGF0ZVN0b3JhZ2VcIjozMCxcIi4vRE9NVXRpbHNcIjozMSxcIi4vRXhlY3V0aW9uRW52aXJvbm1lbnRcIjozMixcIi4vY3JlYXRlRE9NSGlzdG9yeVwiOjM0LFwiaW52YXJpYW50XCI6NDN9XSwzNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxudmFyIF9FeGVjdXRpb25FbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vRXhlY3V0aW9uRW52aXJvbm1lbnQnKTtcblxudmFyIF9ET01VdGlscyA9IHJlcXVpcmUoJy4vRE9NVXRpbHMnKTtcblxudmFyIF9jcmVhdGVIaXN0b3J5ID0gcmVxdWlyZSgnLi9jcmVhdGVIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlSGlzdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVIaXN0b3J5KTtcblxuZnVuY3Rpb24gY3JlYXRlRE9NSGlzdG9yeShvcHRpb25zKSB7XG4gIHZhciBoaXN0b3J5ID0gX2NyZWF0ZUhpc3RvcnkyWydkZWZhdWx0J10oX2V4dGVuZHMoe1xuICAgIGdldFVzZXJDb25maXJtYXRpb246IF9ET01VdGlscy5nZXRVc2VyQ29uZmlybWF0aW9uXG4gIH0sIG9wdGlvbnMsIHtcbiAgICBnbzogX0RPTVV0aWxzLmdvXG4gIH0pKTtcblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICBfaW52YXJpYW50MlsnZGVmYXVsdCddKF9FeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00sICdET00gaGlzdG9yeSBuZWVkcyBhIERPTScpO1xuXG4gICAgcmV0dXJuIGhpc3RvcnkubGlzdGVuKGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgaGlzdG9yeSwge1xuICAgIGxpc3RlbjogbGlzdGVuXG4gIH0pO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVET01IaXN0b3J5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG59LHtcIi4vRE9NVXRpbHNcIjozMSxcIi4vRXhlY3V0aW9uRW52aXJvbm1lbnRcIjozMixcIi4vY3JlYXRlSGlzdG9yeVwiOjM1LFwiaW52YXJpYW50XCI6NDN9XSwzNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9kZWVwRXF1YWwgPSByZXF1aXJlKCdkZWVwLWVxdWFsJyk7XG5cbnZhciBfZGVlcEVxdWFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZXBFcXVhbCk7XG5cbnZhciBfQXN5bmNVdGlscyA9IHJlcXVpcmUoJy4vQXN5bmNVdGlscycpO1xuXG52YXIgX0FjdGlvbnMgPSByZXF1aXJlKCcuL0FjdGlvbnMnKTtcblxudmFyIF9jcmVhdGVMb2NhdGlvbjIgPSByZXF1aXJlKCcuL2NyZWF0ZUxvY2F0aW9uJyk7XG5cbnZhciBfY3JlYXRlTG9jYXRpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlTG9jYXRpb24yKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vayA9IHJlcXVpcmUoJy4vcnVuVHJhbnNpdGlvbkhvb2snKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ydW5UcmFuc2l0aW9uSG9vayk7XG5cbnZhciBfZGVwcmVjYXRlID0gcmVxdWlyZSgnLi9kZXByZWNhdGUnKTtcblxudmFyIF9kZXByZWNhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVwcmVjYXRlKTtcblxuZnVuY3Rpb24gY3JlYXRlUmFuZG9tS2V5KGxlbmd0aCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGxvY2F0aW9uc0FyZUVxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIGEucGF0aG5hbWUgPT09IGIucGF0aG5hbWUgJiYgYS5zZWFyY2ggPT09IGIuc2VhcmNoICYmXG4gIC8vYS5hY3Rpb24gPT09IGIuYWN0aW9uICYmIC8vIERpZmZlcmVudCBhY3Rpb24gIT09IGxvY2F0aW9uIGNoYW5nZS5cbiAgYS5rZXkgPT09IGIua2V5ICYmIF9kZWVwRXF1YWwyWydkZWZhdWx0J10oYS5zdGF0ZSwgYi5zdGF0ZSk7XG59XG5cbnZhciBEZWZhdWx0S2V5TGVuZ3RoID0gNjtcblxuZnVuY3Rpb24gY3JlYXRlSGlzdG9yeSgpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcbiAgdmFyIGdldEN1cnJlbnRMb2NhdGlvbiA9IG9wdGlvbnMuZ2V0Q3VycmVudExvY2F0aW9uO1xuICB2YXIgZmluaXNoVHJhbnNpdGlvbiA9IG9wdGlvbnMuZmluaXNoVHJhbnNpdGlvbjtcbiAgdmFyIHNhdmVTdGF0ZSA9IG9wdGlvbnMuc2F2ZVN0YXRlO1xuICB2YXIgZ28gPSBvcHRpb25zLmdvO1xuICB2YXIga2V5TGVuZ3RoID0gb3B0aW9ucy5rZXlMZW5ndGg7XG4gIHZhciBnZXRVc2VyQ29uZmlybWF0aW9uID0gb3B0aW9ucy5nZXRVc2VyQ29uZmlybWF0aW9uO1xuXG4gIGlmICh0eXBlb2Yga2V5TGVuZ3RoICE9PSAnbnVtYmVyJykga2V5TGVuZ3RoID0gRGVmYXVsdEtleUxlbmd0aDtcblxuICB2YXIgdHJhbnNpdGlvbkhvb2tzID0gW107XG5cbiAgZnVuY3Rpb24gbGlzdGVuQmVmb3JlKGhvb2spIHtcbiAgICB0cmFuc2l0aW9uSG9va3MucHVzaChob29rKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB0cmFuc2l0aW9uSG9va3MgPSB0cmFuc2l0aW9uSG9va3MuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBob29rO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBhbGxLZXlzID0gW107XG4gIHZhciBjaGFuZ2VMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIGxvY2F0aW9uID0gdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnQoKSB7XG4gICAgaWYgKHBlbmRpbmdMb2NhdGlvbiAmJiBwZW5kaW5nTG9jYXRpb24uYWN0aW9uID09PSBfQWN0aW9ucy5QT1ApIHtcbiAgICAgIHJldHVybiBhbGxLZXlzLmluZGV4T2YocGVuZGluZ0xvY2F0aW9uLmtleSk7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbikge1xuICAgICAgcmV0dXJuIGFsbEtleXMuaW5kZXhPZihsb2NhdGlvbi5rZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYXRpb24obmV3TG9jYXRpb24pIHtcbiAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcblxuICAgIGxvY2F0aW9uID0gbmV3TG9jYXRpb247XG5cbiAgICBpZiAobG9jYXRpb24uYWN0aW9uID09PSBfQWN0aW9ucy5QVVNIKSB7XG4gICAgICBhbGxLZXlzID0gW10uY29uY2F0KGFsbEtleXMuc2xpY2UoMCwgY3VycmVudCArIDEpLCBbbG9jYXRpb24ua2V5XSk7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5hY3Rpb24gPT09IF9BY3Rpb25zLlJFUExBQ0UpIHtcbiAgICAgIGFsbEtleXNbY3VycmVudF0gPSBsb2NhdGlvbi5rZXk7XG4gICAgfVxuXG4gICAgY2hhbmdlTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICBsaXN0ZW5lcihsb2NhdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICBjaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgIGxpc3RlbmVyKGxvY2F0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9sb2NhdGlvbiA9IGdldEN1cnJlbnRMb2NhdGlvbigpO1xuICAgICAgYWxsS2V5cyA9IFtfbG9jYXRpb24ua2V5XTtcbiAgICAgIHVwZGF0ZUxvY2F0aW9uKF9sb2NhdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYW5nZUxpc3RlbmVycyA9IGNoYW5nZUxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGxpc3RlbmVyO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgX0FzeW5jVXRpbHMubG9vcEFzeW5jKHRyYW5zaXRpb25Ib29rcy5sZW5ndGgsIGZ1bmN0aW9uIChpbmRleCwgbmV4dCwgZG9uZSkge1xuICAgICAgX3J1blRyYW5zaXRpb25Ib29rMlsnZGVmYXVsdCddKHRyYW5zaXRpb25Ib29rc1tpbmRleF0sIGxvY2F0aW9uLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICAgIGRvbmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBpZiAoZ2V0VXNlckNvbmZpcm1hdGlvbiAmJiB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbihtZXNzYWdlLCBmdW5jdGlvbiAob2spIHtcbiAgICAgICAgICBjYWxsYmFjayhvayAhPT0gZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UgIT09IGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhciBwZW5kaW5nTG9jYXRpb24gPSB1bmRlZmluZWQ7XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvblRvKG5leHRMb2NhdGlvbikge1xuICAgIGlmIChsb2NhdGlvbiAmJiBsb2NhdGlvbnNBcmVFcXVhbChsb2NhdGlvbiwgbmV4dExvY2F0aW9uKSkgcmV0dXJuOyAvLyBOb3RoaW5nIHRvIGRvLlxuXG4gICAgcGVuZGluZ0xvY2F0aW9uID0gbmV4dExvY2F0aW9uO1xuXG4gICAgY29uZmlybVRyYW5zaXRpb25UbyhuZXh0TG9jYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKHBlbmRpbmdMb2NhdGlvbiAhPT0gbmV4dExvY2F0aW9uKSByZXR1cm47IC8vIFRyYW5zaXRpb24gd2FzIGludGVycnVwdGVkLlxuXG4gICAgICBpZiAob2spIHtcbiAgICAgICAgaWYgKGZpbmlzaFRyYW5zaXRpb24obmV4dExvY2F0aW9uKSAhPT0gZmFsc2UpIHVwZGF0ZUxvY2F0aW9uKG5leHRMb2NhdGlvbik7XG4gICAgICB9IGVsc2UgaWYgKGxvY2F0aW9uICYmIG5leHRMb2NhdGlvbi5hY3Rpb24gPT09IF9BY3Rpb25zLlBPUCkge1xuICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGxvY2F0aW9uLmtleSk7XG4gICAgICAgIHZhciBuZXh0SW5kZXggPSBhbGxLZXlzLmluZGV4T2YobmV4dExvY2F0aW9uLmtleSk7XG5cbiAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEgJiYgbmV4dEluZGV4ICE9PSAtMSkgZ28ocHJldkluZGV4IC0gbmV4dEluZGV4KTsgLy8gUmVzdG9yZSB0aGUgVVJMLlxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaFN0YXRlKHN0YXRlLCBwYXRoKSB7XG4gICAgdHJhbnNpdGlvblRvKGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBfQWN0aW9ucy5QVVNILCBjcmVhdGVLZXkoKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZVN0YXRlKHN0YXRlLCBwYXRoKSB7XG4gICAgdHJhbnNpdGlvblRvKGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBfQWN0aW9ucy5SRVBMQUNFLCBjcmVhdGVLZXkoKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIGdvKC0xKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICBnbygxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUtleSgpIHtcbiAgICByZXR1cm4gY3JlYXRlUmFuZG9tS2V5KGtleUxlbmd0aCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQYXRoKHBhdGgpIHtcbiAgICBpZiAocGF0aCA9PSBudWxsIHx8IHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgcmV0dXJuIHBhdGg7XG5cbiAgICB2YXIgcGF0aG5hbWUgPSBwYXRoLnBhdGhuYW1lO1xuICAgIHZhciBzZWFyY2ggPSBwYXRoLnNlYXJjaDtcbiAgICB2YXIgaGFzaCA9IHBhdGguaGFzaDtcblxuICAgIHZhciByZXN1bHQgPSBwYXRobmFtZTtcblxuICAgIGlmIChzZWFyY2gpIHJlc3VsdCArPSBzZWFyY2g7XG5cbiAgICBpZiAoaGFzaCkgcmVzdWx0ICs9IGhhc2g7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSHJlZihwYXRoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVBhdGgocGF0aCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgYWN0aW9uKSB7XG4gICAgdmFyIGtleSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IGNyZWF0ZUtleSgpIDogYXJndW1lbnRzWzNdO1xuXG4gICAgcmV0dXJuIF9jcmVhdGVMb2NhdGlvbjNbJ2RlZmF1bHQnXShwYXRoLCBzdGF0ZSwgYWN0aW9uLCBrZXkpO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgdXBkYXRlTG9jYXRpb25TdGF0ZShsb2NhdGlvbiwgc3RhdGUpO1xuICAgICAgdXBkYXRlTG9jYXRpb24obG9jYXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVMb2NhdGlvblN0YXRlKGdldEN1cnJlbnRMb2NhdGlvbigpLCBzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYXRpb25TdGF0ZShsb2NhdGlvbiwgc3RhdGUpIHtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbi5zdGF0ZSwgc3RhdGUpO1xuICAgIHNhdmVTdGF0ZShsb2NhdGlvbi5rZXksIGxvY2F0aW9uLnN0YXRlKTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaWYgKHRyYW5zaXRpb25Ib29rcy5pbmRleE9mKGhvb2spID09PSAtMSkgdHJhbnNpdGlvbkhvb2tzLnB1c2goaG9vayk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgdHJhbnNpdGlvbkhvb2tzID0gdHJhbnNpdGlvbkhvb2tzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0gIT09IGhvb2s7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgIGxpc3RlbjogbGlzdGVuLFxuICAgIHRyYW5zaXRpb25UbzogdHJhbnNpdGlvblRvLFxuICAgIHB1c2hTdGF0ZTogcHVzaFN0YXRlLFxuICAgIHJlcGxhY2VTdGF0ZTogcmVwbGFjZVN0YXRlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBjcmVhdGVLZXk6IGNyZWF0ZUtleSxcbiAgICBjcmVhdGVQYXRoOiBjcmVhdGVQYXRoLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgY3JlYXRlTG9jYXRpb246IGNyZWF0ZUxvY2F0aW9uLFxuXG4gICAgc2V0U3RhdGU6IF9kZXByZWNhdGUyWydkZWZhdWx0J10oc2V0U3RhdGUsICdzZXRTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgbG9jYXRpb24ua2V5IHRvIHNhdmUgc3RhdGUgaW5zdGVhZCcpLFxuICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IF9kZXByZWNhdGUyWydkZWZhdWx0J10ocmVnaXN0ZXJUcmFuc2l0aW9uSG9vaywgJ3JlZ2lzdGVyVHJhbnNpdGlvbkhvb2sgaXMgZGVwcmVjYXRlZDsgdXNlIGxpc3RlbkJlZm9yZSBpbnN0ZWFkJyksXG4gICAgdW5yZWdpc3RlclRyYW5zaXRpb25Ib29rOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vaywgJ3VucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayBpcyBkZXByZWNhdGVkOyB1c2UgdGhlIGNhbGxiYWNrIHJldHVybmVkIGZyb20gbGlzdGVuQmVmb3JlIGluc3RlYWQnKVxuICB9O1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVIaXN0b3J5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG59LHtcIi4vQWN0aW9uc1wiOjI4LFwiLi9Bc3luY1V0aWxzXCI6MjksXCIuL2NyZWF0ZUxvY2F0aW9uXCI6MzYsXCIuL2RlcHJlY2F0ZVwiOjM3LFwiLi9ydW5UcmFuc2l0aW9uSG9va1wiOjM5LFwiZGVlcC1lcXVhbFwiOjQwfV0sMzY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfQWN0aW9ucyA9IHJlcXVpcmUoJy4vQWN0aW9ucycpO1xuXG52YXIgX3BhcnNlUGF0aCA9IHJlcXVpcmUoJy4vcGFyc2VQYXRoJyk7XG5cbnZhciBfcGFyc2VQYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcnNlUGF0aCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKCkge1xuICB2YXIgcGF0aCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/ICcvJyA6IGFyZ3VtZW50c1swXTtcbiAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1sxXTtcbiAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IF9BY3Rpb25zLlBPUCA6IGFyZ3VtZW50c1syXTtcbiAgdmFyIGtleSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbM107XG5cbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgcGF0aCA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG5cbiAgdmFyIHBhdGhuYW1lID0gcGF0aC5wYXRobmFtZSB8fCAnLyc7XG4gIHZhciBzZWFyY2ggPSBwYXRoLnNlYXJjaCB8fCAnJztcbiAgdmFyIGhhc2ggPSBwYXRoLmhhc2ggfHwgJyc7XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBzZWFyY2gsXG4gICAgaGFzaDogaGFzaCxcbiAgICBzdGF0ZTogc3RhdGUsXG4gICAgYWN0aW9uOiBhY3Rpb24sXG4gICAga2V5OiBrZXlcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlTG9jYXRpb247XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbn0se1wiLi9BY3Rpb25zXCI6MjgsXCIuL3BhcnNlUGF0aFwiOjM4fV0sMzc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBkZXByZWNhdGUoZm4sIG1lc3NhZ2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBfd2FybmluZzJbJ2RlZmF1bHQnXShmYWxzZSwgJ1toaXN0b3J5XSAnICsgbWVzc2FnZSk7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGRlcHJlY2F0ZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xufSx7XCJ3YXJuaW5nXCI6NDR9XSwzODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbmZ1bmN0aW9uIGV4dHJhY3RQYXRoKHN0cmluZykge1xuICB2YXIgbWF0Y2ggPSBzdHJpbmcubWF0Y2goL15odHRwcz86XFwvXFwvW15cXC9dKi8pO1xuXG4gIGlmIChtYXRjaCA9PSBudWxsKSByZXR1cm4gc3RyaW5nO1xuXG4gIF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnQSBwYXRoIG11c3QgYmUgcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoIG9ubHksIG5vdCBhIGZ1bGx5IHF1YWxpZmllZCBVUkwgbGlrZSBcIiVzXCInLCBzdHJpbmcpO1xuXG4gIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKG1hdGNoWzBdLmxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoKSB7XG4gIHZhciBwYXRobmFtZSA9IGV4dHJhY3RQYXRoKHBhdGgpO1xuICB2YXIgc2VhcmNoID0gJyc7XG4gIHZhciBoYXNoID0gJyc7XG5cbiAgdmFyIGhhc2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJyMnKTtcbiAgaWYgKGhhc2hJbmRleCAhPT0gLTEpIHtcbiAgICBoYXNoID0gcGF0aG5hbWUuc3Vic3RyaW5nKGhhc2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHJpbmcoMCwgaGFzaEluZGV4KTtcbiAgfVxuXG4gIHZhciBzZWFyY2hJbmRleCA9IHBhdGhuYW1lLmluZGV4T2YoJz8nKTtcbiAgaWYgKHNlYXJjaEluZGV4ICE9PSAtMSkge1xuICAgIHNlYXJjaCA9IHBhdGhuYW1lLnN1YnN0cmluZyhzZWFyY2hJbmRleCk7XG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZS5zdWJzdHJpbmcoMCwgc2VhcmNoSW5kZXgpO1xuICB9XG5cbiAgaWYgKHBhdGhuYW1lID09PSAnJykgcGF0aG5hbWUgPSAnLyc7XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBzZWFyY2gsXG4gICAgaGFzaDogaGFzaFxuICB9O1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBwYXJzZVBhdGg7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbn0se1wid2FybmluZ1wiOjQ0fV0sMzk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBydW5UcmFuc2l0aW9uSG9vayhob29rLCBsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgdmFyIHJlc3VsdCA9IGhvb2sobG9jYXRpb24sIGNhbGxiYWNrKTtcblxuICBpZiAoaG9vay5sZW5ndGggPCAyKSB7XG4gICAgLy8gQXNzdW1lIHRoZSBob29rIHJ1bnMgc3luY2hyb25vdXNseSBhbmQgYXV0b21hdGljYWxseVxuICAgIC8vIGNhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIHJldHVybiB2YWx1ZS5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICB9IGVsc2Uge1xuICAgIF93YXJuaW5nMlsnZGVmYXVsdCddKHJlc3VsdCA9PT0gdW5kZWZpbmVkLCAnWW91IHNob3VsZCBub3QgXCJyZXR1cm5cIiBpbiBhIHRyYW5zaXRpb24gaG9vayB3aXRoIGEgY2FsbGJhY2sgYXJndW1lbnQ7IGNhbGwgdGhlIGNhbGxiYWNrIGluc3RlYWQnKTtcbiAgfVxufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBydW5UcmFuc2l0aW9uSG9vaztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xufSx7XCJ3YXJuaW5nXCI6NDR9XSw0MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzLmpzJyk7XG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2xpYi9pc19hcmd1bWVudHMuanMnKTtcblxudmFyIGRlZXBFcXVhbCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpIHtcbiAgaWYgKCFvcHRzKSBvcHRzID0ge307XG4gIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSBpZiAoYWN0dWFsIGluc3RhbmNlb2YgRGF0ZSAmJiBleHBlY3RlZCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMy4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICghYWN0dWFsIHx8ICFleHBlY3RlZCB8fCB0eXBlb2YgYWN0dWFsICE9ICdvYmplY3QnICYmIHR5cGVvZiBleHBlY3RlZCAhPSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvcHRzLnN0cmljdCA/IGFjdHVhbCA9PT0gZXhwZWN0ZWQgOiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gNy40LiBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkT3JOdWxsKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAoeCkge1xuICBpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnIHx8IHR5cGVvZiB4Lmxlbmd0aCAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiB4LmNvcHkgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHguc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHgubGVuZ3RoID4gMCAmJiB0eXBlb2YgeFswXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIG9wdHMpIHtcbiAgdmFyIGksIGtleTtcbiAgaWYgKGlzVW5kZWZpbmVkT3JOdWxsKGEpIHx8IGlzVW5kZWZpbmVkT3JOdWxsKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LlxuICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG4gIC8vfn5+SSd2ZSBtYW5hZ2VkIHRvIGJyZWFrIE9iamVjdC5rZXlzIHRocm91Z2ggc2NyZXd5IGFyZ3VtZW50cyBwYXNzaW5nLlxuICAvLyAgIENvbnZlcnRpbmcgdG8gYXJyYXkgc29sdmVzIHRoZSBwcm9ibGVtLlxuICBpZiAoaXNBcmd1bWVudHMoYSkpIHtcbiAgICBpZiAoIWlzQXJndW1lbnRzKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIGRlZXBFcXVhbChhLCBiLCBvcHRzKTtcbiAgfVxuICBpZiAoaXNCdWZmZXIoYSkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdHJ5IHtcbiAgICB2YXIga2EgPSBvYmplY3RLZXlzKGEpLFxuICAgICAgICBrYiA9IG9iamVjdEtleXMoYik7XG4gIH0gY2F0Y2ggKGUpIHsvL2hhcHBlbnMgd2hlbiBvbmUgaXMgYSBzdHJpbmcgbGl0ZXJhbCBhbmQgdGhlIG90aGVyIGlzbid0XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcbiAgLy8gaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT0ga2IubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy90aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIWRlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgb3B0cykpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIGEgPT09IHR5cGVvZiBiO1xufVxuXG59LHtcIi4vbGliL2lzX2FyZ3VtZW50cy5qc1wiOjQxLFwiLi9saWIva2V5cy5qc1wiOjQyfV0sNDE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHMpXG59KSgpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID8gc3VwcG9ydGVkIDogdW5zdXBwb3J0ZWQ7XG5cbmV4cG9ydHMuc3VwcG9ydGVkID0gc3VwcG9ydGVkO1xuZnVuY3Rpb24gc3VwcG9ydGVkKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG5leHBvcnRzLnVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG5mdW5jdGlvbiB1bnN1cHBvcnRlZChvYmplY3Qpe1xuICByZXR1cm4gb2JqZWN0ICYmXG4gICAgdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmplY3QubGVuZ3RoID09ICdudW1iZXInICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpICYmXG4gICAgIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsICdjYWxsZWUnKSB8fFxuICAgIGZhbHNlO1xufTtcblxufSx7fV0sNDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nXG4gID8gT2JqZWN0LmtleXMgOiBzaGltO1xuXG5leHBvcnRzLnNoaW0gPSBzaGltO1xuZnVuY3Rpb24gc2hpbSAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIGtleXMucHVzaChrZXkpO1xuICByZXR1cm4ga2V5cztcbn1cblxufSx7fV0sNDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKVxufSx7XCJfcHJvY2Vzc1wiOjI3fV0sNDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5sZW5ndGggPCAxMCB8fCAoL15bc1xcV10qJC8pLnRlc3QoZm9ybWF0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIHdhcm5pbmcgZm9ybWF0IHNob3VsZCBiZSBhYmxlIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgJyArXG4gICAgICAgICd3YXJuaW5nLiBQbGVhc2UsIHVzZSBhIG1vcmUgZGVzY3JpcHRpdmUgZm9ybWF0IHRoYW46ICcgKyBmb3JtYXRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCh4KSB7fVxuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcbn0se1wiX3Byb2Nlc3NcIjoyN31dfSx7fSxbMl0pO1xuIl0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
