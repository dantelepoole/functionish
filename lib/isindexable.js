'use strict';

const hasownproperty = require('../hasownproperty');
const isarray = require('./isarray');
const isobject = require('./isobject');
const isstring = require('./isstring');

/**
 * Return `true` if *object* can be indexed by numeric keys. An object is indexable if it is a string or an array. 
 * Otherwise, if an object has a `length` property, it is considered indexable if either of the following conditions
 * is met:
 * 1. its `length` property has the value `0`, or
 * 2. it has a property with the key `0` AND a property with the key equal to the value of its `length` property
 * minus 1.
 *  
 * @module lib/isindexable
 * @ignore
 * @param {(object|string)} object The value to check
 * @returns {boolean}
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