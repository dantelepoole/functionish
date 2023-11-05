/**
 * @module misc/hashmap
 */

'use strict';

const HashMap = require('../../lib/HashMap');

const curry = require('../curry');
const isfunction = require('../types/isfunction');

function hashmap(hashfunc, initialitems=[]) {
    
    return isfunction(hashfunc)
         ? new HashMap(hashfunc, initialitems)
         : new Map(initialitems);
}

module.exports = curry(1, hashmap);