/**
 * @module tagaspredicate
 * @ignore
 */

'use strict';

const ispredicate = require('./ispredicate');

const PREDICATE_TAG = Symbol.for('functionish/predicate/tag');

const PREDICATE_TAG_PROPERTY_DESCRIPTOR = {
    configurable : false,
    enumerable   : false,
    value        : PREDICATE_TAG,
    writable     : false
}

const setproperty = Object.defineProperty;

/**
 * Add a non-configurable, non-enumerable and non-writable property to the *func* function that idenfities the function
 * as being a predicate function, i.e. a function that returns `true` or `false` to indicate whether or not its input
 * matches some criterium. This function is used internally.
 * 
 * @func tagaspredicate
 * @see {@link module:predicate predicate()}
 * @param {function} func The function to tag as a predicate function
 * @returns {function} *func*
 * @throws {TypeError} if *func* is not a function
 */

module.exports = function tagaspredicate(func) {
    
    return ispredicate(func) ? func 
         : (typeof func !== 'function') ? raisetypeerror(obj)
         : setproperty(func, PREDICATE_TAG, PREDICATE_TAG_PROPERTY_DESCRIPTOR);
}

function raisetypeerror(obj) {
    const message = `tagaspredicate(): The argument has type ${typeof obj}. Expected a function`;
    throw new TypeError(message);
}