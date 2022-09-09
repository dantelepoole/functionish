/**
 * @module repeat
 */

'use strict';

const ERR_BAD_COUNT = `RepeatError~The count %s. Expected a positive integer.`;
const ERR_BAD_FUNCTION = `RepeatError~The function has type %s. Expected a function.`;

const fail = require('./fail');
const islessthan = require('./islessthan');
const isnan = require('./isnan');
const or = require('./or');
const notfunction = require('./notfunction');
const notinteger = require('./notinteger');
const typeorclass = require('./typeorclass');
const notnumber = require('./notnumber');

const islessthanzero = islessthan(0);
const notpositiveinteger = or(notinteger, islessthanzero);

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

    notnumber(count) && failbadcount(count);
    notfunction(func) && fail(ERR_BAD_FUNCTION, typeorclass(func));

    while(count > 0) {
        func.call(this, ...args);
        count -= 1;
    }
}

function failbadcount(count) {
    isnan(count) ? fail(ERR_BAD_COUNT, 'is NaN') : fail(ERR_BAD_COUNT, `has type ${typeorclass(count)}`)
}