/**
 * @module groupby
 */

'use strict';

const isvoid = require('./isvoid');
const isdefined = require('./isdefined');

/**
 * Splits a list into sub-lists stored in an object, based on the result of calling a key-returning function on each
 * element, and grouping the results according to values returned.
 * 
 * Group the items in *list* into sub-lists stored in an object under keys returned by the *selectgroup* function for
 * each item in *list*. Each key on the returned object contains an array holding the items for which *selectgroup*
 * returned that key.
 * 
 * If *selectgroup* returns `null` or `undefined` for an item, that item is discarded.
 * 
 * @example
 * 
 * const groupby = require('functionish/groupby');
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
 * @func groupby
 * @param {func} keyselector A function that returns a key for a given item
 * @param {iterable} list An iterable object producing the items to group
 * @returns {object} An object containing the items grouped by their corresponding keys
 */
module.exports = require('./curry2') (

    function groupby(keyselector, list) {

        const target = {};

        for(const item of list) {

            const key = keyselector(item);
            const group = getgroup(target, key);
            
            if( isdefined(group) ) group.push(item);
        }

        return target;
    }
)

function getgroup(target, key) {

    return isvoid(key) ? undefined
         : isdefined(target[key]) ? target[key]
         : (target[key] = []);
}
