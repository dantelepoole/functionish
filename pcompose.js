/**
 * @module pcompose
 */

'use strict';

const isarray = require('./isarray');
const isundefined = require('./isundefined');
const papply = require('./papply');

const promisereducer = (promise, thenhandler) => promise.then(thenhandler);

module.exports = function pcompose(...funcs) {

    if( arguments.length === 1 && isarray(funcs[0]) ) funcs = funcs[0];

    const initialfunc = funcs.pop();

    return function composedpromise(...args) {

        if( isundefined(initialfunc) ) return args[0];

        const promise = papply(initialfunc, ...args);

        return funcs.reduceRight(promisereducer, promise);
    }
}
