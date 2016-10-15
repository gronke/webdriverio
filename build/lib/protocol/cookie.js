'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Protocol binding to operate with cookies on the current page.
 *
 * <example>
    :cookie.js
    // get all cookies
    client.cookie().then(function(res) { ... });

    // set cookie (sync)
    browser.cookie('post', {
        name: 'myCookie',
        value: 'some content'
    });

    // delete cookie (sync)
    client.cookie('delete','myCookie');
 * </example>
 *
 * @param {String=}         method  request method
 * @param {Object=|String=} args    contains cookie information if you want to set a cookie or contains name of cookie if you want to delete it
 *
 * @returns {Object}  cookie data
 *
 * @see  https://w3c.github.io/webdriver/webdriver-spec.html#cookies
 * @type protocol
 *
 */

var cookie = function cookie() {
    var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
    var args = arguments[1];

    var data = {};
    var requestOptions = {
        path: '/session/:sessionId/cookie',
        method: method
    };

    /**
     * set cookie param for POST method
     */
    if (method.toUpperCase() === 'POST' && (typeof args === 'undefined' ? 'undefined' : (0, _typeof3.default)(args)) === 'object') {
        data.cookie = args;
    }

    /**
     * add cookie name tp path URL to delete a specific cookie object
     */
    if (method.toUpperCase() === 'DELETE' && typeof args === 'string') {
        requestOptions.path += '/' + args;
    }

    return this.requestHandler.create(requestOptions, data);
};

exports.default = cookie;
module.exports = exports['default'];
