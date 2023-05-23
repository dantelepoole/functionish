/**
 * module juxtapose
 */

'use strict';

const collect = require('./arrays/collect');
const head = require('./arrays/head');
const id = require('./id');
const isarray = require('./types/isarray');
const tail = require('./arrays/tail');

function juxtapose(...funcs) {

    return function _juxtapose(...args) {

        const restfunc = isarray( tail(args) ) ? head( args.pop() ) : collect;

        let argindex = 0;
        const applynext = func => (func ?? id).call(this, args[argindex++]);

        const result = funcs.map(applynext);

        if(argindex < args.length) {
            const restargs = args.slice(argindex);
            const restresult = restfunc.call(this, ...restargs);
            result.push(...restresult);
        }

        return result;
    }
}

module.exports = juxtapose;