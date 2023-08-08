/**
 * @module types/isindexable
 */

'use strict';

const isempty = require('../arrays/isempty');
const isstring = require('../types/isstring');

const hasownproperty = Object.prototype.hasOwnProperty;
const isarray = Array.isArray;

/**
 * Return `true` if *value* is an indexable object
 * 
 * An object is considered indexable if it is an array or a string or if it is an non-null object that has a numeric
 * `length` property and, if the `length` property is not `0`, has a property with the numeric key `0` and a value that
 * is not `undefined`,  and a property with a numeric key equal to the value of its `length` property minus 1 with a 
 * value that is not `undefined`.
 *  
 * @example <caption>Example usage of `isindexable()`</caption>
 * 
 * const { isindexable } = require('functionish/types');
 * 
 * isindexable( [] ); // returns true
 * isindexable( '' ); // returns true
 * isindexable( { length:2, [0]:'foo', [1]:'bar' } ); // returns true
 * isindexable( { length:0 } ); // returns true
 * isindexable( { length:1, [0]:42 } ); // returns true
 * 
 * isindexable( {} ); // returns false
 * isindexable( { length:1 } ); // returns false
 * isindexable( { length:2, [0]:42 } ); // returns false
 * 
 * @function isindexable
 * @see {@link module:types/notindexable notindexable()}
 * @param {any} value The value to check
 * @returns {boolean}
 */

module.exports = function isindexable(indexable) {

    return isarray(indexable)
            ||
           isstring(indexable)
            ||
           iscustomindexable(indexable);
}

function hasnumericlengthproperty(indexable) {
    return (typeof indexable?.length === 'number' && (indexable.length === indexable.length));
}

function hasextremeindexproperties(indexable) {
    return hasownproperty(indexable, 0) && hasownproperty(indexable, indexable.length - 1);
}

function iscustomindexable(indexable) {

    return hasnumericlengthproperty(indexable)
            &&
           (isempty(indexable) || hasextremeindexproperties(indexable));
}
