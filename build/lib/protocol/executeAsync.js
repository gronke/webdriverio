'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ErrorHandler = require('../utils/ErrorHandler');

var executeAsync = function executeAsync() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var script = args.shift();

    /*!
     * parameter check
     */
    if (typeof script !== 'string' && typeof script !== 'function') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with execute protocol command');
    }

    /*!
     * instances started as multibrowserinstance can't getting called with
     * a function parameter, therefor we need to check if it starts with "function () {"
     */
    if (typeof script === 'function' || this.inMultibrowserMode && script.indexOf('function (') === 0) {
        script = 'return (' + script + ').apply(null, arguments)';
    }

    // ToDo change this according to new Webdriver specs to:
    // /session/{session id}/execute/async
    return this.requestHandler.create('/session/:sessionId/execute_async', {
        script: script,
        args: args
    });
}; /**
    *
    * Inject a snippet of JavaScript into the page for execution in the context of the currently selected
    * frame. The executed script is assumed to be asynchronous and must signal that is done by invoking
    * the provided callback, which is always provided as the final argument to the function. The value
    * to this callback will be returned to the client.
    *
    * Asynchronous script commands may not span page loads. If an unload event is fired while waiting
    * for a script result, an error should be returned to the client.
    *
    * The script argument defines the script to execute in the form of a function body. The function will
    * be invoked with the provided args array and the values may be accessed via the arguments object
    * in the order specified. The final argument will always be a callback function that must be invoked
    * to signal that the script has finished.
    *
    * Arguments may be any JSON-primitive, array, or JSON object. JSON objects that define a WebElement
    * reference will be converted to the corresponding DOM element. Likewise, any WebElements in the script
    * result will be returned to the client as WebElement JSON objects.
    *
    * <example>
       :executeAsync.js
       client
           .timeoutsAsyncScript(5000)
           .executeAsync(function(a, b, c, d, done) {
               // browser context - you may access neither client nor console
               setTimeout(function() {
                   done(a + b + c + d);
               }, 3000);
           }, 1, 2, 3, 4).then(function(ret) {
               // node.js context - client and console are available
               console.log(ret.value); // outputs: 10
           });
    * </example>
    *
    * @param {String|Function} script     The script to execute.
    * @param {*}               arguments  script arguments
    *
    * @returns {*}             The script result.
    *
    * @see  https://w3c.github.io/webdriver/webdriver-spec.html#dfn-execute-async-script
    * @type protocol
    *
    */

exports.default = executeAsync;
module.exports = exports['default'];
