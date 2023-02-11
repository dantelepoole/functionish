/**
 * @module lib/runconcurrent
 * @ignore
 */

'use strict';

const DEFAULT_THROTTLE = require('os').cpus().length;
const ERROR_BAD_THROTTLE = `The throttle must be a positive number.`;
const ERROR_NONE = null;
const THIS_NONE = null;

function runconcurrent(throttle, funcs, onfunccomplete, onfinish, ...args) {

    throttle = validatethrottle(throttle);

    if(funcs.length === 0) return finish();

    funcs = funcs.slice();
    
    const pendingfuncs = new Set();
    let results = [];
    let isfinished = false;

    function finish(error, data) {

        if(isfinished) return;
        
        isfinished = true;

        if(arguments.length === 0) [error, data] = [ERROR_NONE, results];

        onfinish(error, data);
    }

    function runnextfunc() {

        if(isfinished || funcs.length === 0) return;

        const context = { result:[] }
        
        const onsuccess = functioncompleted.bind(THIS_NONE, context, ERROR_NONE);
        const onerror = functioncompleted.bind(THIS_NONE, context);
        
        const nextfunc = promise(funcs.shift(), ...args);
        context.promise = nextfunc.then(onsuccess, onerror);
        
        results.push(context.result);
        pendingfuncs.add(context);
    }

    function functioncompleted(context, error, data) {

        pendingfuncs.delete(context);
        context.promise = undefined;

        if(isfinished) return;

        context.result.push(error, data);

        onfunccomplete(finish, error, data);

        if(isfinished) return;

        if(funcs.length > 0) runnextfunc();
        else if(pendingfuncs.size === 0) finish();
    }

    while(throttle-- && funcs.length) runnextfunc();
}

function validatethrottle(throttle=DEFAULT_THROTTLE) {

    throttle = Math.max(0, throttle);

    if( Number.isNaN(throttle) ) throw new TypeError(ERROR_BAD_THROTTLE);

    throttle = Math.trunc(throttle);

    return (throttle || DEFAULT_THROTTLE);
}

function promise(func, ...args) {

    try {
        return Promise.resolve( func(...args) );
    } catch(error) {
        return Promise.reject(error);
    }
}

module.exports = runconcurrent;