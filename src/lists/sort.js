/**
 * @module lists/sort
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/sort(): The source list has type %s. Expected an iterable object.`;

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const issingleton = require('../arrays/issingleton');
const isvoid = require('../types/isvoid');
const list = require('./list');
const or = require('../logic/or');
const raise = require('../errors/raise');
const resolve = require('../misc/resolve');
const typeorclassname = require('../types/typeorclassname');

const isfunctionorvoid = or(isfunction, isvoid);
const issortable = obj => isfunction(obj?.sort);
const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);

/**
 * to do
 * 
 * @function sort
 * @param {(function|string)} [sortfunc] The optional sorting function
 * @param {iterable} sourcelist An iterable object producing the items to sort
 * @returns {iterable}
 */
function sort(sortfunc, sourcelist) {

    isfunctionorvoid(sortfunc) || (sortfunc = resolve(sortfunc));

    return issingleton(arguments) ? sort.bind(null, sortfunc)
         : issortable(sourcelist) ? sourcelist.sort(sortfunc)
         : isiterable(sourcelist) ? sortlist(sortfunc, sourcelist)
         : raisebadlisterror(sourcelist);
}

function sortlist(sortfunc, sourcelist) {

    return list(

        function* () {
            
            yield* isfunction(sortfunc)
                 ? Array.from(sourcelist).sort(sortfunc)
                 : Array.from(sourcelist).sort();
        }
    )
}

module.exports = sort;