/**
 * @module unlessx
 */

'use strict';

const ERR_BAD_CONDITION = `functionish/unlessx(): The condition argument has type '%s'. Expected a function.`;

const always = require('./always');
const curry1 = require('./curry1');
const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const typeorclassname = require('./types/typeorclassname');

/**
 * Operates the same as {@link module:unless unless()} except that the returned function only passes its first argument
 * to *condition* and passes its other arguments to the *branch*.
 * 
 * The *condition* must be a function, otherwise an error is thrown. The *branch* may be any value. If the *branch* is
 * not a function and the *condition* returns a falsy value, the *branch*'s value is returned.
 * 
 * `unlessx()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `unlessx()`</caption> 
 *     
 * const { unlessx } = require('functionish');
 * 
 * const iseven = x => (x%2 === 0);
 * const square = x => (x*x);
 * 
 * const squareifodd = unlessx(iseven, square);
 * 
 * squareifodd( 42, 3 ); // returns 3
 * squareifodd( 41, 3 ); // returns 9
 * 
 * @function unlessx
 * @see {@link module:unless unless()}
 * @see {@link module:whenx whenx()}
 * @param {function} condition The condition function
 * @param {any} branch The function to call or value to return if the *condition* evaluates to a falsy value
 * @returns {function}
 */
const unlessx = curry1(function unlessx(condition, branch) {

    validatecondition(condition);

    isfunction(branch) || (branch = always(branch));
    
    return (conditionarg, ...branchargs) => condition(conditionarg)
                                          ? branchargs[0]
                                          : branch(...branchargs);

});

function validatecondition(condition) {

    if( isfunction(condition) ) return condition;

    const errormessage = format(ERR_BAD_CONDITION, typeorclassname(condition));
    throw new TypeError(errormessage);
}

module.exports = unlessx;