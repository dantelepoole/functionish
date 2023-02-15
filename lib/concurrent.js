/**
 * @module lib/concurrent
 * @ignore
 */

'use strict';

const DEFAULT_THROTTLE = require('os').cpus().length;
const ERROR_NONE = null;
const THIS_NONE = null;

const atleastzero = value => Math.max(0, value);
const composereducer = (f,g) => f ? (...args) => f( g(...args) ) : g;
const compose = (...funcs) => funcs.compose(composereducer, undefined);
const defaultto = defaultvalue => value => (value ?? defaultvalue);
const hasitems = x = (x.length ?? x.size) > 0;
const isempty = x => (x.length ?? x.size === 0);
const newresult = () => ([]);
const promisify = func => (...args) => promise(func, ...args);
const tointeger = Math.trunc;

const validatethrottle = compose(atleastzero, tointeger, defaultto(DEFAULT_THROTTLE));

function concurrent(throttle, funcs, onfunccomplete, ...args) {

    const executor = (resolve, reject) => launch(throttle, funcs, onfunccomplete, args, resolve, reject);
    
    return new Promise(executor);
}

function launch(throttle, funcs, onfunccomplete, args, resolve, reject) {

    throttle = validatethrottle(throttle);

    const waitingfuncs = funcs.map(promisify);
    
    const pendingfuncs = new Set();
    const results = waitingfuncs.map(newresult);

    let nextresultindex = 0;
    let isfinished = false;

    function finish(error, data) {

        if(isfinished) return;
        
        isfinished = true;

        if(arguments.length === 0) [error, data] = [ERROR_NONE, results.slice()];

        error ? reject(error) : resolve(data);
    }

    function runnextfunc() {

        if(isfinished || isempty(waitingfuncs)) return;
        
        const context = { index:nextresultindex, result:results[nextresultindex] }
        nextresultindex += 1;

        const onsuccess = functioncompleted.bind(THIS_NONE, context, ERROR_NONE);
        const onerror = functioncompleted.bind(THIS_NONE, context);
        
        const nextfunc = waitingfuncs.shift();
        context.promise = nextfunc(...args).then(onsuccess, onerror);
        
        pendingfuncs.add(context);
    }

    function functioncompleted(context, error, data) {

        pendingfuncs.delete(context);
        context.promise = undefined;

        if(isfinished) return;

        context.result.push(error, data);

        onfunccomplete(context.index, finish, error, data);

        if(isfinished) return;

        if( hasitems(waitingfuncs) ) runnextfunc();
        else if( isempty(pendingfuncs) ) finish();
    }

    if( isempty(waitingfuncs) ) return finish();

    while(throttle > 0 && hasitems(waitingfuncs)) {
        runnextfunc();
        throttle -= 1;
    }
}

function promise(func, ...args) {

    try {
        return Promise.resolve( func(...args) );
    } catch(error) {
        return Promise.reject(error);
    }
}

module.exports = concurrent;