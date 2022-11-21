/**
 * @module includes
 */

'use strict';

const ERR_BAD_LIST = `IncludesError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return `true` if any item in the *list* is strictly equal to *value*. Otherwise, return `false`.
 * 
 * `includes()` is curried by default with binary arity.
 * 
 * @func includes
 * @param {any} value The value to look for
 * @param {iterable} list An iterable object
 * @returns {boolean}
 */
module.exports = require('./curry2')(
    
    function includes(value, list) {

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        for(const item of list) if(item === value) return true;

        return false;
    }
)