'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ErrorHandler = require('../utils/ErrorHandler');

var elementIdText = function elementIdText(id) {
    if (typeof id !== 'string' && typeof id !== 'number') {
        throw new _ErrorHandler.ProtocolError('number or type of arguments don\'t agree with elementIdText protocol command');
    }

    return this.requestHandler.create('/session/:sessionId/element/' + id + '/text');
}; /**
    *
    * Returns the visible text for the element.
    *
    * @param {String} ID ID of a WebElement JSON object to route the command to
    * @returns {String} visible text for the element
    *
    * @see  https://w3c.github.io/webdriver/webdriver-spec.html#getelementtext
    * @type protocol
    *
    */

exports.default = elementIdText;
module.exports = exports['default'];
