'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _ErrorHandler = require('../utils/ErrorHandler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var waitForVisible = function waitForVisible(selector, ms, reverse) {
    var _this = this;

    /**
     * we can't use default values for function parameter here because this would
     * break the ability to chain the command with an element if reverse is used, like
     *
     * ```js
     * var elem = browser.element('#elem');
     * elem.waitForXXX(10000, true);
     * ```
     */
    reverse = typeof reverse === 'boolean' ? reverse : false;

    /*!
     * ensure that ms is set properly
     */
    if (typeof ms !== 'number') {
        ms = this.options.waitforTimeout;
    }

    return this.waitUntil(function () {
        return _this.isVisible(selector).then(function (isVisible) {
            if (!Array.isArray(isVisible)) {
                return isVisible !== reverse;
            }

            var result = reverse;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(isVisible), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var val = _step.value;

                    if (!reverse) {
                        result = result || val;
                    } else {
                        result = result && val;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return result !== reverse;
        });
    }, ms).catch(function (e) {
        selector = selector || _this.lastResult.selector;

        if ((0, _ErrorHandler.isTimeoutError)(e)) {
            var isReversed = reverse ? '' : 'not';
            throw new _ErrorHandler.WaitUntilTimeoutError('element (' + selector + ') still ' + isReversed + ' visible after ' + ms + 'ms');
        }
        throw e;
    });
}; /**
    *
    * Wait for an element (selected by css selector) for the provided amount of
    * milliseconds to be (in)visible. If multiple elements get queryied by given
    * selector, it returns true (or false if reverse flag is set) if at least one
    * element is visible.
    *
    * <example>
       :index.html
       <div id="elem" style="visibility: hidden;">Hello World!</div>
       <script type="text/javascript">
           setTimeout(function () {
               document.getElementById('elem').style.visibility = 'visible';
           }, 2000);
       </script>
   
       :waitForTextExample.js
       it('should detect when element has text', function () {
           elem = browser.element('#elem');
           elem.waitForVisible(3000)
       });
    * </example>
    *
    * @alias browser.waitForVisible
    * @param {String}   selector element to wait for
    * @param {Number=}  ms       time in ms (default: 500)
    * @param {Boolean=} reverse  if true it waits for the opposite (default: false)
    * @uses util/waitUntil, property/isVisible
    * @type utility
    *
    */

exports.default = waitForVisible;
module.exports = exports['default'];
