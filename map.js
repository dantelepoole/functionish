/**
 * @module map
 */

'use strict';

const flip = require('./flip');
const isiterable = require('./isiterable');

const asobject = Object;
const ismappable = value => (typeof value?.map === 'function');
const mapiterable = flip(Array.from);

/**
 * Functional variant of {@link external:Array.prototype.map Array.prototype.map()}, except that `map()` can
 * also map objects.
 * 
 * If *list* has a `map()` method, that method is invoked and its return value returned. If *list* is
 * iterable, each item in *list* is passed to *func* in order and the return values are returned as an array.
 * Otherwise, if *list* is an object, each property of the object is passed to *func*
 * as an array containing the property's key as its first element and the property's value as its second element, and
 * the return values are returned as an object with the same properties, though with each property's value set to 
 * *func*'s return value. If *list* is none of the above, it is mapped as an object (usually resulting in a returned
 * object without any properties).
 * 
 * *Important:* as per the ECMA specification {@link external:Array.prototype.map Array.prototype.map()} passes
 * additional arguments to the mapping function further to the item being mapped. This can lead to
 * unexpected behaviour in certain cases, especially if the mapping function is curried or accepts spread
 * and/or default parameters. In such cases you can apply the {@link module:unary unary()} function to ensure
 * the mapping function is always passed exactly one argument and no more.
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
 * @param {(array|iterable|object)} list The list of items to apply *func* to
 */

module.exports = require('./curry2')(

    function map(func, list) {
        
        return ismappable(list) ? list.map(func)
             : isiterable(list) ? mapiterable(func, list)
             : mapobject(func, asobject(list));
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

