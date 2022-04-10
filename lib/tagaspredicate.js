/**
 * @module lib/tagaspredicate
 * @ignore
 */

'use strict';

const ispredicate = require('./ispredicate');

const PREDICATE_TAG = require('./predicatetag');

const PREDICATE_TAG_PROPERTY_DESCRIPTOR = {
    configurable : false,
    enumerable   : true,
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
 */

module.exports = function tagaspredicate(func) {
    return ispredicate(func) ? func : setproperty(func, PREDICATE_TAG, PREDICATE_TAG_PROPERTY_DESCRIPTOR);
}