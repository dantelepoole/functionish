/**
 * @module maplist
 */

 'use strict';

const ERR_BAD_LIST = `MapListError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable object that produces teh result of applying *mapfunc* to each item in *list*.
 * 
 * `maplist()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const maplist = require('functionish/maplist')
 * 
 * const double = x => (x*2);
 * 
 * maplist(iseven, [1,2,3,4,5]); // return an iterable that produces 2,4,6,8 and 10
 * 
 * @func maplist
 * @param {function} mapfunc The function to apply to each *list* item
 * @param {iterable} list The list of items to map
 * @returns {iterable} 
 */

module.exports = require('./curry2')(

    function maplist(mapfunc, list) {

        mapfunc = resolvefunction(mapfunc);

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        return {

            [Symbol.iterator] : function* () {
                for(const item of list) yield mapfunc(item);
            }
        }
    }
)