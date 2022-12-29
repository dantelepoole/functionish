/**
 * @module lists/flatmap
 */

'use strict';

const isfunction = require('../isfunction');
const resolvefunction = require('../resolvefunction');

/**
 * Return an iterable object that passes each value in *list* to the *mapfunc* function and flattens the result by one
 * level, meaning that if result is iterable, the result itself is expanded.
 * 
 * @func flatmap
 * @param {function} mapfunc The mapping function
 * @param {iterable} list An iterable object
 * @returns {iterable}
 */
module.exports = function flatmap(mapfunc, list) {

    isfunction(mapfunc) || (mapfunc = resolvefunction(mapfunc));

    return {
        [Symbol.iterator] : function* () {

            for(const value of list) {

                const mapresult = mapfunc(value);

                isiterable(mapresult) ? yield* mapresult : yield mapresult;
            }
        }
    }
}