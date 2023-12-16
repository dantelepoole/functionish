/**
 * @module misc/hashset
 */

'use strict';

const ERR_BAD_HASHFUNC = `functionish/misc/hashset(): The hashing function has type %s. Expected a function or null/undefined.`;

const HashSet = require('../../lib/HashSet');

const compose = require('../compose');
const curry1 = require('../curry1');
const format = require('./format');
const isfunction = require('../types/isfunction');
const typeorclassname = require('../types/typeorclassname');

const throwbadhashfuncerror = compose(format(ERR_BAD_HASHFUNC), typeorclassname);

const hashset = curry1(function hashset(hashfunc, initialitems=[]) {
    
    return isfunction(hashfunc) ? new HashSet(hashfunc, initialitems)
         : isvoid(hashfunc) ? new Set(initialitems)
         : throwbadhashfuncerror(hashfunc);
});

module.exports = hashset;