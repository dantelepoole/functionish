/**
 * @module misc/hashset
 */

'use strict';

const ERR_BAD_HASHFUNC = `functionish/misc/hashset(): The hashing function has type %s. Expected a function or null/undefined.`;

const HashSet = require('../../lib/HashSet');

const compose = require('../compose');
const curry1 = require('../curry1');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isvoid = require('../types/isvoid');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const throwbadhashfuncerror = compose(raise, error.Type(ERR_BAD_HASHFUNC), typeorclassname);

const hashset = curry1(function hashset(hashfunc, initialitems=[]) {
    
    return isfunction(hashfunc) ? new HashSet(hashfunc, initialitems)
         : isvoid(hashfunc) ? new Set(initialitems)
         : throwbadhashfuncerror(hashfunc);
});

module.exports = hashset;