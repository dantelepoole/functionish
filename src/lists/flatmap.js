/**
 * @module lists/flatmap
 */

'use strict';

const TYPE_FUNCTION = 'function';
const TYPE_STRING = 'string';

const curry = require('../curry');

const isflatMappable = x => (typeof x.flatMap === TYPE_FUNCTION);
const isflatmappable = x => (typeof x.flatmap === TYPE_FUNCTION);
const isiterable = x => (typeof x?.[Symbol.iterator] === TYPE_FUNCTION) && (typeof x !== TYPE_STRING);

/**
 * Return an iterable object that passes each value in *list* to the *mapfunc* function and flattens the result by one
 * level, meaning that if result is iterable, the result itself is expanded.
 * 
 * If *list* is an array, this function calls its {@link external:Array.prototype.flatMap Array.prototype.flatMap()}
 * method and returns the result. However, the *mapfunc* function will only ever be called with a single
 * argument (the current list item), not the additional arguments that {@link external:Array.prototype.flatMap Array.prototype.flatMap()}
 * passes to its function.
 * 
 * If *list* is not an array, it is presumed to be iterable and an iterable object is returned
 * that operates lazily.
 * 
 * `flatmap()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `flatmap()`</caption>
 * 
 * const { flatmap } = require('functionish/lists');
 * 
 * const numbers = [4,5,6,9,12];
 * const getdivisors = value => (value === 4) ? [2]
 *                            : (value === 5) ? []
 *                            : (value === 6) ? [2,3]
 *                            : (value === 9) ? [3]
 *                            : (value === 12) ? [2,3,4,6];
 * 
 * const divisors = flatmap(getdivisors, numbers);
 * 
 * Array.from(divisors); // returns [2,2,3,3,2,3,4,6];
 * 
 * @function flatmap
 * @param {function} mapfunc The mapping function
 * @param {iterable} list An iterable object
 * @returns {iterable}
 */
function flatmap(mapfunc, list) {

    return isflatMappable(list) ? list.flatMap( x => mapfunc(x) )
         : isflatmappable(list) ? list.flatmap( x => mapfunc(x) )
         : flatmaplist(mapfunc, list);
}

function flatmaplist(mapfunc, list) {

    return {
        *[Symbol.iterator]() {

            for(const value of list) {

                const mapresult = mapfunc(value);

                isiterable(mapresult) ? yield* mapresult : yield mapresult;
            }
        }
    }
}

module.exports = curry(1, flatmap);