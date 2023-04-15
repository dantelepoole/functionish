/**
 * @module promises/pcompose
 */

'use strict';

const PROMISE_NONE = Symbol('functionish/promises/pcompose#PROMISE_NONE');

const promisereducer = args => (promise, func) => (promise === PROMISE_NONE) ? func(...args) : promise.then(func);

function pcompose(...funcs) {

    const _pcompose = (funcs.length > 0)
                    ? (...args) => funcs.reduceRight( promisereducer(args), PROMISE_NONE )
                    : (...args) => Promise.resolve(args[0]);

    return _pcompose;
}

module.exports = pcompose;