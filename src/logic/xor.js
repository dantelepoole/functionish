/**
 * @module logic/xor
 */

'use strict';

const TYPE_FUNCTION = 'function';

const always = require('./always');
const boolify = require('./boolify');

const prep = predicate => (typeof predicate === TYPE_FUNCTION)
                        ? boolify(predicate)
                        : boolify( always(predicate) );

/**
 * Return a function that passes its arguments to both *predicate1* and *predicate2* returns `true` and only if
 * the return values are boolean complements, i.e. if either one returns a truthy value and the other returns a falsy
 * value. If both return a truthy value or both return a falsy value, `false` is returned.
 * 
 * If either predicate is not a function, its value is evaluated directly instead.
 * 
 * @example <caption>Example usage of `xor()`</caption>
 * 
 * const xor = require('functionish/logic/xor');
 * 
 * function haveyourcake() {...}
 * function eatittoo() {...}
 * 
 * const ispermitted = xor(haveyourcake, eatittoo);
 * 
 * @function xor
 * @param {any} predicate1 The first predicate to evaluate
 * @param {any} predicate2 The second predicate to evaluate
 * @returns {boolean}
 */
function xor(predicate1, predicate2) {

    predicate1 = prep(predicate1);
    predicate2 = prep(predicate2);

    return (...args) => (predicate1(...args) !== predicate2(...args));
}

module.exports = xor;