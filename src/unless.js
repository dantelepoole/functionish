/**
 * @module unless
 */

'use strict';

const ERR_BAD_CONDITION = `functionish/unless(): The condition argument has type '%s'. Expected a function.`;

const always = require('./always)');
const curry1 = require('./curry1');
const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const typeorclassname = require('./types/typeorclassname');
const when = require('./when');

/**
 * Return a function that pass its arguments to the *condition* function and then calls the *branch* function (with the
 * same arguments) if and only if the condition returns a falsy value. If the *condition*'s return value is truthy, the
 * first argument is return unchanged.
 * 
 * The *condition* must be a function, otherwise an error is thrown. The *branch* may be any value. If the *branch* is
 * not a function and the *condition* returns a falsy value, the *branch*'s value is returned.
 * 
 * `unless()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `unless()`</caption> 
 *     
 * const { unless } = require('functionish');
 * 
 * const toarray = unless(Array.isArray, x => [x])
 * 
 * toarray( 42 ); // returns [42]
 * toarray( [1,2,3] ); // returns the argument array
 * 
 * @function unless
 * @see {@link module:unlessx unlessx()}
 * @see {@link module:when when()}
 * @param {function} condition The condition function
 * @param {any} branch The function to call or value to return if the *condition* evaluates to a truthy value
 * @returns {function}
 */
const unless = curry1(function unless(condition, branch) {

    validatecondition(condition);

    isfunction(branch) || (branch = always(branch));
    
    return (...args) => condition(...args)
                      ?  args[0]
                      : branch(...args);
});

function validatecondition(condition) {

    if( isfunction(condition) ) return condition;

    const errormessage = format(ERR_BAD_CONDITION, typeorclassname(condition));
    throw new TypeError(errormessage);
}

module.exports = unless;