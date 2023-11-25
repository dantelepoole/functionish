/**
 * @module witharity
 */

'use strict';

const ERR_BAD_ARITY = `functionish/witharity(): The arity '%s'. Expected a positive integer.`;
const ERR_BAD_TARGETFUNCTION = `functionish/witharity(): The target function has type '%s'. Expected a function.`;

const curry1 = require('./curry1');
const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const isinteger = require('./types/isinteger');
const isnumberornan = require('./types/isnumberornan');
const ispositiveorzero = require('./math/ispositiveorzero');
const typeorclassname = require('./types/typeorclassname');

/**
 * Set the arity (number of parameters) for *func*. This function returns a new function that always passes *arity*
 * number of arguments to *func*, regardless of the number of arguments it actually receives. 
 * 
 * If *arity* is less than `5`, the returned function's `length` property will reflect its actual arity. Otherwise,
 * the returned function's `length` will be `0`, though it will still pass the specified number of arguments to the
 * target function.
 * 
 * The returned function will the same name as the target function, but tagged as having a specific arity.
 * 
 * `witharity()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `witharity()`</caption>
 * 
 * const { witharity } = require('functionish');
 * 
 * const returnargs = (...args) => args;
 * 
 * const ternary = witharity(3, returnargs);
 * 
 * ternary(); // returns [undefined, undefined, undefined]
 * ternary(1,2); // returns [1,2,undefined]
 * ternary(1,2,3,4,5); // returns [1,2,3]
 * 
 * @function witharity
 * @param {number} arity A positive integer specifying the desired arity
 * @param {function} func The target function
 * @returns {function}
 */
const witharity = curry1(function witharity(arity, targetfunc) {

    validatearity(arity);
    validatetargetfunction(targetfunc);

    return function _witharity(...args) {
    
        args.length = arity;

        return targetfunc(...args);
    }
})

function validatetargetfunction(targetfunc) {

    if( isfunction(targetfunc) ) return targetfunc;

    const errormessage = format(ERR_BAD_TARGETFUNCTION, typeorclassname(targetfunc));
    throw new TypeError(errormessage);
}

function validatearity(arity) {

    if( isinteger(arity) && ispositiveorzero(arity) ) return arity;

    const explanation = isnumberornan(arity) ? `is ${arity}` : `has type ${typeof arity}`;
    const errormessage = format(ERR_BAD_ARITY, explanation);

    throw new TypeError(errormessage);
}

module.exports = witharity;