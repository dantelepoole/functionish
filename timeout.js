/**
 * @module timeout
 */

'use strict';

module.exports = require('./curry2') (timeout);

function timeout(delayms, func, ...args) {

    const timeoutid = setTimeout(func, delayms, ...args);

    return function canceltimeout() {
        clearTimeout(timeoutid);
    }
}