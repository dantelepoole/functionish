/**
 * @module map
 */

'use strict';

const ERR_BAD_LIST = `MapError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const isfunction = require('./isfunction');
const isiterable = require('./isiterable');
const notiterable = require('./notiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable object that passes each value to the *mapfunc* function and produces the results.
 * 
 * `map()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const map = require('functionish/map');
 * 
 * const double = x => (x*2);
 * 
 * map(double, [1,2,3]); // returns [2,4,6]
 *     
 * @func map
 * @param {function} mapfunc The function to apply to each item in *list*
 * @param {iterable} list An iterable object
 * @returns {any}
 */

module.exports = require('./curry2')(

    function map(mapfunc, list) {
        
        mapfunc = resolvefunction(mapfunc);

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        return {
            [Symbol.iterator] : function* () {
                for(const value of list) yield mapfunc(value);
            }
        }
    }
)