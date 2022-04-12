/**
 * @module map
 */

'use strict';

const unary = require('./unary');

const asobject = Object;
const ismappable = value => (typeof value?.map === 'function');

/**
 * Functional variant of {@link external:Array.prototype.map Array.prototype.map()}, except that `map()` can
 * also map objects.
 * 
 * If *list* has a `map()` method, that method is invoked and its return value returned. Otherwise, *list* is treated
 * as an object and each property of the object is passed to *func*
 * as an array containing the property's key as its first element and the property's value as its second element, and
 * the return values are returned as an object with the same properties, though with each property's value set to 
 * *func*'s return value. Note that if *list* is a primitive value, this will result in an empty array.
 * 
 * *Important:* the *func* function is coerced to unary arity before it is passed to *list*'s `map()` method
 * (if it exists). This means that *func* will only ever receive a single argument (the item being mapped),
 * regardless of how many arguments *list*'s `map()` method actually passes.
 * 
 * `map()` is curried by default.
 * 
 * @example
 * 
 * const map = require('functionish/map');
 * 
 * const double = x => (x*2);
 * 
 * map(double, [1,2,3]); // returns [2,4,6]
 *     
 * const obj = { a:42, b:30 }
 * map(double, obj); // returns { a:84, b:60 }
 * 
 * @func map
 * @see {@link external:Array.prototype.map Array.prototype.map()}
 * @see {@link module:unary unary()}
 * @param {function} func The function to apply to each item in *list*
 * @param {(any[]|any)} list The list of items to apply *func* to
 * @returns {any}
 */

module.exports = require('./curry2')(

    function map(func, list) {
        return ismappable(list) ? list.map( unary(func) ) : mapobject(func, asobject(list));
    }
)

function mapobject(func, object) {

    const target = {}

    Object.entries(object).forEach(
        
        function(entry) {

            const [key, value] = entry;
            target[key] = func(value);
        }
    )

    return target;
}

