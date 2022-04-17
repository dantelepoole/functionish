/**
 * @module pmap
 */

'use strict';

module.exports = require('./curry2')(

    function pmap(func, promise) {
        return promise.then(func);
    }
)