/**
 * @module promises/ppipe
 */

'use strict';

const pcompose = require('./pcompose');

function ppipe(...funcs) {
    return pcompose( ...funcs.reverse() );
}

module.exports = ppipe;