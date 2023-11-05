/**
 * @module misc/hashset
 */

'use strict';

const HashSet = require('../../lib/HashSet');

const curry = require('../curry');
const isfunction = require('../types/isfunction');

function hashset(hashfunc, initialitems=[]) {
    
    return isfunction(hashfunc)
         ? new HashSet(hashfunc, initialitems)
         : new Set(initialitems);
}

module.exports = curry(1, hashset);