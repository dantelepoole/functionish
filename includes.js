/**
 * @module includes
 */

'use strict';

const isequal = require('./isequal');

const hasincludesmethod = value => (typeof value?.includes === 'function');

/**
 * Functional variant of {@link external:Array.prototype.includes Array.prototype.includes()}. Return `true` if *value*
 * matches any item in *list* using strict equality, otherwise return `false`.
 * 
 * If *list* has its own `includes()` method (e.g. an array or a string), that method is called. Otherwise, *value* is
 * compared against *list* itself using strict equality and the result is returned;
 * 
 * `includes()` is curried by default.
 * 
 * @func includes
 * @see {@link external:Array.prototype.includes Array.prototype.includes()}
 * @param {any} value The value to look for
 * @param {(any[]||any)} list The list of items to search
 * @returns {boolean}
 */
module.exports = require('./curry2')(
    
    function includes(value, list) {
        return hasincludesmethod(list) ? list.includes(value) : isequal(value, list);
    }
)