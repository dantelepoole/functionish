/**
 * Function variant of `Array.prototype.filter()`. Apply the *func* function to each item in *list* and return
 * an array containing only the items for which *func* returns a truthy value.
 * 
 * If *list* has a `filter()` method, this function passes *func* to it. Otherwise, if *list* is iterable, *func*
 * is applied to each item produced by the iterable and the results are returned as an array. If it is neither, *list*
 * is treated as an object and its properties are filtered, meaning that `filter()` will return a copy of *list* with
 * only the properties for which *func* returns a truthy value.
 * 
 * *Important:* as per the ECMA specification {@link external:Array.prototype.filter Array.prototype.filter()} passes
 * additional arguments to the filter function further to the item being filtered. This can lead to
 * unexpected behaviour in certain cases, especially if the filter function is curried or accepts spread
 * and/or default parameters. In such cases you can apply the {@link module:unary unary()} function to ensure
 * the filter function is always passed exactly one argument and no more.
 * 
 * `filter()` is curried by default.
 * 
 * @module filter
 * @see {@link external:Array.prototype.filter Array.prototype.filter()}
 * @param {function} func The predicate function
 * @param {(array|iterable|object)} list The items to filter
 * @returns {any[]}
 * @example
 * 
 * const filter = require('functionish/filter')
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * filter(iseven, [1,2,3,4,5]); // returns [2,4]
 * 
 * const object = {
 *    'a' : 42,
 *    'b' : 43,
 *    'c' : 44
 * }
 * 
 * filter(iseven, object); // returns { 'a':42, 'c':44 }
 * 
 */

'use strict';

const isiterable = require('./isiterable');

const asobject = Object;
const isfilterable = value => (typeof value?.filter === 'function');

module.exports = require('./curry2')(

    function filter(predicate, list) {

        return isfilterable(list) ? list.filter(predicate)
             : isiterable(list) ? filteriterable(predicate, list)
             : filterobject(predicate, asobject(list) );
    }
)

function filteriterable(predicate, iterable) {

    const buffer = [];

    for( const item of iterable ) if( predicate(item) ) buffer.push(item);

    return buffer;
}

function filterobject(predicate, object) {

    const target = {}

    Object.entries(object).forEach(
        
        function(entry) {

            const [key, value] = entry;

            if( predicate(value) ) target[key] = value;

        }
    )

    return target;
}
