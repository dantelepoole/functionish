/**
 * @module promises/pcompose
 */

'use strict';

const PROMISE_NONE = undefined;

const promise = require('./promise');

const promisereducer = args => (p, f) => (p === PROMISE_NONE) ? promise(f, ...args) : p.then(f);

function pcompose(...funcs) {

    const _pcompose = (...args) => funcs.reduceRight(promisereducer(args), PROMISE_NONE);

    return _pcompose;
}

module.exports = pcompose;