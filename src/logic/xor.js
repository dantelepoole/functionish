/**
 * @module logic/xor
 */

'use strict';

const curry1 = require('../curry1');
const callable = require('../callable');

/**
 * Return a function that passes its arguments to both *predicate1* and *predicate2* returns `true` and only if
 * the return values are boolean complements, i.e. if either one returns a truthy value and the other returns a falsy
 * value. If both return the same boolish value, `false` is returned. If no predicates are passed, `false` is returned.
 * 
 * A *predicate* may be a function or non-function value. In the latter case, the *predicate*'s boolish value is
 * evaluated directly.
 * 
 * `xor()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `xor()`</caption>
 * 
 * const { xor } = require('functionish/logic');
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
const xor = curry1(function xor(predicate1, predicate2) {

    [predicate1, predicate2] = [ callable(predicate1), callable(predicate2)];

    return (...args) => predicate1(...args) 
                      ? !predicate2(...args)
                      : !!predicate2(...args);
});

module.exports = xor;