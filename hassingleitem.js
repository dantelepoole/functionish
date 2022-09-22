/**
* @module hassingleitem
*/

'use strict';

const isequal = require('./isequal');
const isundefined = require('./isundefined');

const isone = isequal(1);

/**
 * Return `true` if *value* has a `length` or `size` property that is equal to `1`.
 * 
 * @func hassingleitem
 * @param {any} value An object with a `length`-property
 * @returns {boolean}
 */
module.exports = function hassingleitem(value) {
    return isone(value?.length) || ( isundefined(value?.length) && isone(value?.size) );
}
