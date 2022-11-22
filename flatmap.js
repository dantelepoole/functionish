/**
 * @module flatmap
 */

'use strict';

const ERR_BAD_MAPFUNCTION = `FlatmapError~The mapping function has type %s. Expected function.`;
const ERR_BAD_LIST = `FlatmapError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const isiterable = require('./isiterable');
const notfunction = require('./notfunction');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

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

    notfunction(mapfunc) && fail(ERR_BAD_MAPFUNCTION, typeorclass(mapfunc));
    notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

    return {
        [Symbol.iterator] : function* () {

            for(const value of list) {

                const mapresult = mapfunc(value);

                if( isiterable(mapresult) ) yield* mapresult; else yield mapresult;
            }
        }
    }
}