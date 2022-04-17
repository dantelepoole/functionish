/**
 * @module pfinally
 */

'use strict';

module.exports = require('./curry2')(

    function pfinally(finallyhandler, promise) {
        return promise.finally(finallyhandler);
    }
)