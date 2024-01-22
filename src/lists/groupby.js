/**
 * @module lists/groupby
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/groupby(): The sourcelist has type %s. Expected an iterable object.`;
const GROUP_BOGUS = { push:()=>{} }

const exception = require('../errors/exception');
const isdefined = require('../types/isdefined');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const issingleton = require('../arrays/issingleton');
const typeorclassname = require('../types/typeorclassname');
const validator = require('../errors/validator');

const selectgroup = (groups, groupname) => isdefined(groupname)
                                         ? groups[groupname] ?? (groups[groupname] = [])
                                         : GROUP_BOGUS;

const validatesourcelist = validator(
    exception('TypeError', ERR_BAD_LIST, typeorclassname),
    isiterable
);

/**
 * 
 * Split a list into sub-lists stored in an object, based on the result of calling a key-returning function on each
 * element, and grouping the results according to values returned. Each key on the returned object contains an array
 * holding the items for which *selectgroup* returned that key.
 * 
 * If *keyselector* returns <abbr title="null or undefined">void</abbr> for an item, that item is discarded.
 * 
 * `groupby()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `groupby()`</caption>
 * 
 * const groupby = require('functionish/lists/groupby');
 * 
 * function getstudentgrade(student) {
 * 
 *     return student?.score === undefined ? undefined
 *          : student.score < 65 ? 'F'
 *          : student.score < 70 ? 'D'
 *          : student.score < 80 ? 'C'
 *          : student.score < 90 ? 'B'
 *          : 'A';
 * }
 * 
 * const studentscores = [
 *     { name:'Anne', score:55 },
 *     { name:'Bruce', score:73 },
 *     { name:'Christine', score:82 },
 *     { name:'Donald', score:100 },
 *     { name:'Edward', score:0 },
 *     { name:'Francis' }
 * ]
 *
 * const studentgrades = groupby(getstudentgrade, studentscores);
 * 
 * // studentgrades:
 * // {
 * //    F : [{ name:'Anne', score:55 }, { name:'Edward', score:0 }],
 * //    C : [{ name:'Bruce', score:73 }],
 * //    B : [{ name:'Christine', score:82 }],
 * //    A : [{ name:'Donald', score:100 }]
 * // }
 * 
 * @function groupby
 * @see {@link module:misc/resolve resolve()}
 * @param {(function|string)} keyselector A function that returns a key for a given item
 * @param {iterable} sourcelist An iterable object producing the items to group
 * @returns {object} 
 */
function groupby(keyselector, sourcelist) {

    if( issingleton(arguments) ) return groupby.bind(null, keyselector);

    validatesourcelist(sourcelist);

    const groups = {};

    for(const item of sourcelist) {
        const key = keyselector(item);
        selectgroup(groups, key).push(item);
    }

    return groups;
}
                                 
module.exports = groupby;