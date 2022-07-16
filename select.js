/**
 * @module select
 */

'use strict';

const ERR_BAD_BRANCH = `SelectError~The branch at index %d has type %s. Expected a branch function or a default branch function.`;
const ERR_MULTIPLE_DEFAULT_BRANCHES = `SelectError~Only a single default branch may be passed to select().`;

const id = require('./id');
const fail = require('./fail');
const typeorclass = require('./typeorclass');

const selectreducer = (onreject, branch) => branch(onreject);

const isbranch = branch => (typeof branch === 'function' && (branch.name === '_branch_'));
const notdefaultbranch = branch => (typeof branch !== 'function' || (branch.name !== '_defaultbranch_'));

/**
 * This function emulates the Javascript `switch` statement (but without the fall through).
 * 
 * This function accepts one or more *branch* functions and returns a function that passes its arguments to each 
 * *branch* in order. A *branch* may accept the arguments, in which case the arguments will be passed to that
 * *branch*'s action-function and the result is returned. If the *branch* rejects the arguments, the next *branch*
 * is attempted. If no *branch* accepts the arguments and a default *branch* was provided, the arguments are passed
 * to the default *branch*'s action-function. If no default *branch* was provided, the first argument is returned
 * directly.
 * 
 * If any *branch* is neither a branch function nor a default branch function, an error is thrown. If multiple default
 * *branches* are provided, an error is also thrown.
 * 
 * The default branch may be passed at any position in the argument list, though by convention it should be passed as
 * the final argument.
 * 
 * Use {@link module:branch branch()} to create a branch function. Use {@link module:otherwise otherwise()} to create
 * a default branch function.
 * 
 * @example
 * 
 * const select = require('functionish/select')
 * const branch = require('functionish/branch')
 * const otherwise = require('functionish/otherwise')
 *  
 * const isstring = x => (typeof x === 'string');
 * const isnumber = x => (typeof x === 'number');
 * const uppercase = x => x.toUpperCase();
 * const double = x => (x*2);
 * 
 * const selector = select(
 *     branch( isstring, uppercase ),
 *     branch( isnumber, double ),
 *     otherwise( arg => console.log('Unknown argument type:', typeof arg) )
 * )
 * 
 * selector('foobar'); // returns 'FOOBAR'
 * selector(42); // returns 84
 * selector({}); // prints 'Unknown argument type: object'
 * 
 * @func select
 * @see {@link module:branch branch()}
 * @see {@link module:otherwise otherwise()}
 * @param  {...any} branches One or more branch functions. See {@link module:branch branch()}
 * @returns {function}
 */
module.exports = function select(...branches) {

    const branchselector = compile(branches);

    return function _select_(...args) {
        return branchselector(...args);
    }
}

function compile(branches) {

    let defaultbranch = undefined;
    const orderedbranches = [];

    for(let index = 0; index < branches.length; index += 1) {

        const branch = branches[index];

        if( isbranch(branch) ) orderedbranches.push(branch);
        else if( notdefaultbranch(branch) ) fail(ERR_BAD_BRANCH, index, typeorclass(branch));
        else if (defaultbranch === undefined) defaultbranch = branch;
        else fail(ERR_MULTIPLE_DEFAULT_BRANCHES);
    }

    if(defaultbranch !== undefined) orderedbranches.push(defaultbranch);

    return orderedbranches.reduceRight(selectreducer, id);
}