/**
 * @module promises/pcompose
 */

'use strict';

const compose = require('../compose');

const promisereducer = (promise, nextfunc) => promise.then(nextfunc);

function pcompose(...funcs) {

    const firstfunc = funcs.pop() ?? Promise.resolve.bind(Promise)

    const promisechain = funcs.reduceRight.bind(funcs, promisereducer);

    return compose(promisechain, firstfunc);
}

module.exports = pcompose;