/**
 * @module misc/rolldice
 */

'use strict';

const DIE_MIN_VALUE_INCLUSIVE = 1;
const DIE_MAX_VALUE_EXCLUSIVE = 7;

const compose = require('../compose');
const defer = require('../defer');
const randominteger = require('./randominteger');

const throwdie = defer(randominteger, DIE_MIN_VALUE_INCLUSIVE, DIE_MAX_VALUE_EXCLUSIVE);
const throwdice = compose(Array.from, initializedice);

/**
 * [to do]
 * 
 * @example <caption>Example usage of `rolldice()`</caption>
 * 
 * to do
 * 
 * @function rolldice
 * @returns {number[]}
 */
function rolldice(diecount=1) {
    return throwdice(diecount);
}

function initializedice(diecount) {
    return {
        *[Symbol.iterator]() {
            for(let i = 0; i < diecount; i += 1) yield throwdie();
        }
    }
}

module.exports = rolldice;