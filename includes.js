/**
 * @module includes
 */

'use strict';

const ERR_BAD_LIST = `IncludesError~The list has type %s. Expected an object with an includes() method or an iterable object.`;

const fail = require('./fail');
const includeslist = require('./includeslist');
const isfunction = require('./isfunction');
const isiterable = require('./isiterable');
const typeorclass = require('./typeorclass');

/**
 * Functional variant of {@link external:Array.prototype.includes Array.prototype.includes()}. Pass *value* to *list*'s
 * `includes()` method and return the result. If *list* has no such method and *list* is iterable, compare *value* to
 * each item produced by list and return `true` when a match is found. If no matching item is found, return `false`.
 * 
 * Value comparison is performed by {@link external:Object#is Object.is()}.
 * 
 * `includes()` is curried by default.
 * 
 * @func includes
 * @see {@link external:Array.prototype.includes Array.prototype.includes()}
 * @param {any} value The value to look for
 * @param {(object|iterable)} list An iterable producing the items to search
 * @returns {boolean}
 */
module.exports = require('./curry2')(
    
    function includes(value, list) {

        return isfunction(list?.includes) ? list.includes(value) 
             : isiterable(list) ? includeslist(value, list)
             : fail(ERR_BAD_LIST, typeorclass(list));
    }
)