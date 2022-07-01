/**
 * @module repeat
 */

'use strict';

const ERR_BAD_COUNT = `RepeatError~The count has type %s. Expected a number.`;
const ERR_BAD_FUNCTION = `RepeatError~The function has type %s. Expected a function.`;

const fail = require('./fail');
const typeorclass = require('./fail');

/**
 * Invoke *func* *count* number of times, passing *args* at each invocation. The *func* function wil be called
 * with `repeat()`'s `this`-object on each invocation.
 * 
 * @func repeat
 * @param {number} count The number of times to repeat *func*
 * @param {function} func The function to repeat
 * @param {...any} args The arguments to pass to *func* at each invocation
 */
module.exports = function repeat(count, func, ...args) {

    if(typeof count !== 'number') fail(ERR_BAD_COUNT, typeorclass(count));
    if(typeof func !== 'function') fail(ERR_BAD_FUNCTION, typeorclass(func));

    while( count > 0 ) {
        func.call(this, ...args);
        count -= 1;
    }
}