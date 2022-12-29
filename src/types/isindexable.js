/**
 * @module types/isindexable
 */

'use strict';

/**
 * Return `true` if *value* is an indexable object, i.e. an array or a string or an non-null object that has a numeric
 * `length` property and, if the `length` property is not `0`, has a property with the numeric key `0` and a value that
 * is not `undefined`,  and a property with a numeric key equal to the value of its `length` property minus 1 with a 
 * value that is not `undefined`.
 *  
 * @example
 * const isindexable = require('functionish/types/isindexable');
 * 
 * isindexable( [] ); // returns true
 * isindexable( '' ); // returns true
 * isindexable( {} ); // returns false
 * 
 * isindexable( { length:2, [0]:'foo', [1]:'bar' } ); // returns true
 * isindexable( { length:0 } ); // returns true
 * isindexable( { length:1, [0]:42 } ); // returns true
 * 
 * isindexable( { length:1 } ); // returns false
 * isindexable( { length:2, [0]:42 } ); // returns false
 * 
 * @function isindexable
 * @param {any} value The value to check
 * @returns {boolean}
 */

module.exports = function isindexable(indexable) {

    return Array.isArray(indexable)
            ||
           typeof indexable === 'string'
            ||
           iscustomindexable(indexable);
}

function hasnumericlengthproperty(indexable) {
    return (typeof indexable?.length === 'number' && (indexable.length === indexable.length));
}

function hasextremeindexproperties(indexable) {

    return (indexable.length === 0)
            ||
           ( (indexable[0] !== undefined) && (indexable[indexable.length - 1] !== undefined) )
}

function iscustomindexable(indexable) {

    return hasnumericlengthproperty(indexable)
            &&
           hasextremeindexproperties(indexable);
}
