/**
 * @module promises/pcompose
 */

'use strict';

const PROMISE_NONE = undefined;

const promisereducer = args => (promise, func) => (promise === PROMISE_NONE) ? func(...args) : promise.then(func);

function pcompose(...funcs) {

    const _pcompose = (...args) => funcs.reduceRight(promisereducer(args), PROMISE_NONE);

    return _pcompose;
}

module.exports = pcompose;