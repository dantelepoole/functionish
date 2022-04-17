/**
 * @module ppipe
 */

'use strict';

const isarray = require('./isarray');
const isundefined = require('./isundefined');
const papply = require('./papply');

const promisereducer = (promise, thenhandler) => promise.then(thenhandler);

module.exports = function ppipe(...funcs) {

    if( arguments.length === 1 && isarray(funcs[0]) ) funcs = funcs[0];

    const initialfunc = funcs.pop();

    return function pipedpromise(...args) {

        if( isundefined(initialfunc) ) return args[0];

        const promise = papply(initialfunc, ...args);

        return funcs.reduce(promisereducer, promise);
    }
}
 