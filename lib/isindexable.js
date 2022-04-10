/**
 * @module lib/isindexable
 * @ignore
 */

'use strict';

const hasownproperty = require('../hasownproperty');
const isarray = require('./isarray');
const isobject = require('./isobject');
const isstring = require('./isstring');

/**
 * Return `true` if *object* can be indexed by numeric keys. Strings and arrays are indexable, as are objects that
 * have a `length` property when either of the following two conditions is true:
 * 1. its `length` property has the value `0`, or
 * 2. it has a property with the key `0` AND a property with the key equal to the value of its `length` property
 * minus 1.
 *  
 * @example
 * 
 * const isindexable = require('functionish/isindexable');
 * 
 * isindexable( [] ); // returns true
 * isindexable( '' ); // returns true
 * isindexable( {} ); // returns false
 * 
 * const obj = {
 *   length : 2,
 *   [0]    : 'foo',
 *   [1]    : 'bar'
 * }
 * 
 * isindexable( obj ); // returns true
 * 
 * @func isindexable
 * @param {(object|string)} object The value to check
 * @returns {boolean}
 */

module.exports = function isindexable(object) {
    return isarray(object) || isstring(object) || isindexableobject(object);
}

function isindexableobject(object) {

    return isobject(object)
           && (typeof object.length === 'number')
           && (
               object.length === 0
               ||
               (hasownproperty(0, object) && hasownproperty(object.length-1, object))
              )
}