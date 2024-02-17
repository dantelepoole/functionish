/**
 * @module promises/pcompose
 */

'use strict';

const compose = require('../compose');
const hasitems = require('../misc/hasitems');
const pid = require('./pid');
const pop = require('../arrays/pop');
const promisify = require('./promisify');

const getfirstfunc = compose(promisify, pop);
const promisecomposer = (promisefunc, thenfunc) => (...args) => promisefunc(...args).then(thenfunc);

function pcompose(...funcs) {

    return hasitems(funcs)
         ? funcs.reduceRight(promisecomposer, getfirstfunc(funcs))
         : pid;

}

module.exports = pcompose;

