/**
 * @module lists/groupby
 */

'use strict';

const GROUP_NONE = undefined;

const curry2 = require('../curry2');
const isdefined = require('../types/isdefined');
const isvoid = require('../types/isvoid');

const getgroup = (target, key) => isvoid(key) ? GROUP_NONE
                                : isdefined(target[key]) ? target[key]
                                : (target[key] = []);

/**
 * Split a list into sub-lists stored in an object, based on the result of calling a key-returning function on each
 * element, and grouping the results according to values returned. Each key on the returned object contains an array
 * holding the items for which *selectgroup* returned that key.
 * 
 * If *keyselector* returns `null` or `undefined` for an item, that item is discarded.
 * 
 * `groupby()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `groupby()`</caption>
 * 
 * const groupby = require('functionish/lists/groupby');
 * 
 * function getstudentgrade(student) {
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
 * console.log(studentgrades)
 * 
 * // Prints:
 * // {
 * //    F : [{ name:'Anne', score:55 }, { name:'Edward', score:0 }],
 * //    C : [{ name:'Bruce', score:73 }],
 * //    B : [{ name:'Christine', score:82 }],
 * //    A : [{ name:'Donald', score:100 }]
 * // }
 * 
 * @function groupby
 * @param {func} keyselector A function that returns a key for a given item
 * @param {iterable} list An iterable object producing the items to group
 * @returns {object} 
 */
function groupby(keyselector, list) {

    const target = {};

    for(const item of list) {

        const key = keyselector(item);
        const group = getgroup(target, key);
        
        isdefined(group) && group.push(item);
    }

    return target;
}
                                 
module.exports = groupby;