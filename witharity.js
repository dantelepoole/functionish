/**
 * @module witharity
 */

'use strict';

const ERR_BAD_ARITY = `WithArityError~The arity %s. Expected a positive integer.`;
const ERR_BAD_FUNCTION = `WithArityError~The function has type %s. Expected a function.`;

const curry2 = require('./curry2');
const fail = require('./fail');
const notinteger = require('./notinteger');
const notnumber = require('./notnumber');
const typeorclass = require('./typeorclass');

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
 * `witharity()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const witharity = require('functionish/witharity');
 * 
 * function returnargs(...args) { return args }
 * 
 * const ternary = witharity(3, returnargs);
 * 
 * ternary.name; // returns 'arity[3] returnargs';
 * 
 * ternary(); // returns [undefined, undefined, undefined]
 * ternary(1,2); // returns [1,2,undefined]
 * ternary(1,2,3,4,5); // returns [1,2,3]
 * 
 * @func witharity
 * @param {number} arity A positive integer specifying the desired arity
 * @param {function} func The target function
 * @returns {function}
 */
module.exports = curry2(

    function witharity(arity, func) {

        if( notnumber(arity) ) fail(ERR_BAD_ARITY, `has type ${ typeorclass(arity) }`);
        if( notinteger(arity) || arity < 0 ) fail(ERR_BAD_ARITY, `is ${arity}`);
        if(typeof func !== 'function') fail(ERR_BAD_FUNCTION, typeorclass(func));

        const witharityname = `arity[${arity}] ${func.name}`;

        return (arity === 0) ? setnullary(func, witharityname)
             : (arity === 1) ? setunary(func, witharityname)
             : (arity === 2) ? setbinary(func, witharityname)
             : (arity === 3) ? setternary(func, witharityname)
             : (arity === 4) ? setquaternary(func, witharityname)
             : setarity(arity, func, witharityname);

    }
)

function setnullary(func, funcname) {

    return {
        [funcname]() {
            return func.call(this);
        }
    }[funcname]
}

function setunary(func, funcname) {

    return {
        [funcname](a) {
            return func.call(this, a);
        }
    }[funcname]
}

function setbinary(func, funcname) {

    return {
        [funcname](a,b) {
            return func.call(this, a, b);
        }
    }[funcname]
}

function setternary(func, funcname) {

    return {
        [funcname](a,b,c) {
            return func.call(this, a, b, c);
        }
    }[funcname]
}

function setquaternary(func, funcname) {

    return {
        [funcname](a,b,c,d) {
            return func.call(this, a, b, c, d);
        }
    }[funcname]
}

function setarity(arity, func, funcname) {

    return {
        [funcname](...args) {
            args.length = arity;
            return func.call(this, ...args);
        }
    }[funcname]
}
