/**
 * @module juxtapose
 */

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
    return runjuxtapose.bind(null, getrestfunc(funcs), funcs);
}

function runjuxtapose(restfunc, funcs, ...args) {

    const stopshort = minvalue(funcs.length, args.length);

    (funcs.length <= args.length) || (args.length = funcs.length);

    for(let i = 0; i < funcs.length; i += 1) args[i] = (i < stopshort) ? funcs[i]( args[i] ) : funcs[i]();

    if(restfunc) {
        const restindex = funcs.length;
        const restargs = restfunc( ...args.slice(restindex) );
        (args.length <= restindex) || (args.length = restindex);
        isempty(restargs) || push(args, ...restargs);
    }

    return args;
}

module.exports = juxtapose;