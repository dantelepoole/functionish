/**
 * @module lists/iterator
 */

'use strict';

module.exports = function iterator(list) {
    return list[Symbol.iterator]();
}