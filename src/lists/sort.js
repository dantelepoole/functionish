/**
 * @module lists/sort
 */

'use strict';

const ERR_BAD_COMPAREFUNC = `functionish/lists/sort(): The compare function has type %s. Expected a function or null/undefined.`;
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
const typeorclassname = require('../types/typeorclassname');

const isfunctionorvoid = or(isfunction, isvoid);
const issortable = obj => isfunction(obj?.sort);
const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);

const raisebadcomparefuncerror = compose(raise, error.Type(ERR_BAD_COMPAREFUNC), typeorclassname);
const validatecomparefunction = or(isfunctionorvoid, raisebadcomparefuncerror);

/**
 * If *sourcelist* has a `sort()` method, call it with the *comparefunc* function and return
 * the result. Otherwise, return a lazy list that iterates over *sourcelist*'s item in sorted order, using
 * *comparefunc* to compare items.
 * 
 * `sort()` is curried by default with unary arity.
 * 
 * @function sort
 * @see {@link module:misc/resolve resolve()}
 * @param {(function|string)} [comparefunc] The optional function for comparing two items
 * @param {iterable} sourcelist An iterable object producing the items to sort
 * @returns {iterable}
 */
function sort(comparefunc, sourcelist) {

    validatecomparefunction(comparefunc);

    return issingleton(arguments) ? sort.bind(null, comparefunc)
         : issortable(sourcelist) ? sourcelist.sort(comparefunc)
         : isiterable(sourcelist) ? sortlist(comparefunc, sourcelist)
         : raisebadlisterror(sourcelist);
}

function sortlist(comparefunc, sourcelist) {

    return list(

        function* () {
            
            yield* isfunction(comparefunc)
                 ? Array.from(sourcelist).sort(comparefunc)
                 : Array.from(sourcelist).sort();
        }
    )
}

module.exports = sort;