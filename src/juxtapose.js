/**
 * module juxtapose
 */

'use strict';

const RESTFUNC_NULL = null;

const head = require('./arrays/head');
const id = require('./id');
const isarray = require('./types/isarray');
const isfunction = require('./types/isfunction');
const tail = require('./arrays/tail');

const functionmapper = funcs => applynextargument => funcs.map(applynextargument);

function juxtapose(...funcs) {

    const restfunc = isarray( tail(funcs) )
                   ? head( funcs.pop() )
                   : RESTFUNC_NULL;

    const mapfunctions = functionmapper(funcs);

    return function _juxtapose(...args) {

        let argindex = 0;
        const applynextargument = func => (func ?? id).call(this, args[argindex++]);

        const results = mapfunctions(applynextargument);

        if( isfunction(restfunc) ) {
            const restargs = args.slice(argindex);
            const restresults = restfunc.call(this, ...restargs);
            results.push(...restresults);
        }

        return results;
    }
}

module.exports = juxtapose;