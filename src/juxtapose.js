/**
 * module juxtapose
 */

const THIS_NULL = null;

'use strict';

const compose = require('./compose');
const head = require('./arrays/head');
const isarray = require('./types/isarray');
const isempty = require('./misc/isempty');
const pop = require('./arrays/pop');
const push = require('./arrays/push');
const tail = require('./arrays/tail');

const minvalue = (a, b) => (a <= b) ? a : b;

const hasrestfunc = compose(isarray, tail);
const poprestfunc = compose(head, pop);
const getrestfunc = funcs => hasrestfunc(funcs) ? poprestfunc(funcs) : null;

function juxtapose(...funcs) {
    return runjuxtapose.bind(THIS_NULL, getrestfunc(funcs), funcs);
}

function runjuxtapose(restfunc, funcs, ...args) {

    const stopshort = minvalue(funcs.length, args.length);

    if(funcs.length > args.length) args.length = funcs.length;

    let i;

    for( i = 0; i < stopshort; i += 1) args[i] = funcs[i]( args[i] );
    for( /* noop */; i < funcs.length; i += 1) args[i] = funcs[i]();

    if(restfunc !== null) {
        const restargs = restfunc( args.slice(i) );
        (args.length <= i) || (args.length = i);
        isempty(restargs) || push(args, ...restargs);
    }

    return args;
}

module.exports = juxtapose;