/**
 * @module lists/flatmap
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return an iterable object that passes each value in *list* to the *mapfunc* function and flattens the result by one
 * level, meaning that if result is iterable, the result itself is expanded.
 * 
 * The returned iterable object is lazy, meaning it iterates over *list* only when it
 * is iterated over itself. If you change the contents of *list* after calling `flatmap()`
 * and before processing the returned iterable, the changes will be reflected in the
 * returned iterable. If this not the desired behaviour, iterate over the returned 
 * iterable immediately after calling `flatmap()` (e.g. by loading it into an array).
 * 
 * `flatmap()` is curried by default with binary arity.
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

    return {
        [Symbol.iterator] : function* () {

            for(const value of list) {

                const mapresult = mapfunc(value);

                isiterable(mapresult) ? yield* mapresult : yield mapresult;
            }
        }
    }
}

module.exports = curry2(flatmap);