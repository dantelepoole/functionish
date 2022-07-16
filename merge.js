/**
 * @module merge
 */

'use strict';

const curry2 = require('./curry2');

module.exports = curry2(

    function merge(...sources) {
        return Object.assign( {}, ...sources );
    }
)