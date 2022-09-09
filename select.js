/**
 * @module select
 */

'use strict';

const BRANCH_FUNCTION_NAME = '_branch_';
const DEFAULTBRANCH_FUNCTION_NAME = '_defaultbranch_';

const ERR_BAD_BRANCH = `SelectError~The branch at index %d has type %s. Expected a branch function or a default branch function.`;
const ERR_MULTIPLE_DEFAULT_BRANCHES = `SelectError~Only a single default branch may be passed to select().`;

const PUSH_METHOD = 'push';

const bind = require('./bind');
const fail = require('./fail');
const id = require('./id');
const isundefined = require('./isundefined');
const isdefined = require('./isdefined');
const isequal = require('./isequal');
const isfunction = require('./isfunction');
const notequal = require('./notequal');
const notfunction = require('./notfunction');
const reduceright = require('./reduceright');
const typeorclass = require('./typeorclass');

const selectreducer = (onreject, branch) => branch(onreject);

const isbranchname = isequal(BRANCH_FUNCTION_NAME);
const isbranch = branch => isfunction(branch) && isbranchname(branch.name);

const notdefaultbranchname = notequal(DEFAULTBRANCH_FUNCTION_NAME);
const notdefaultbranch = branch => notfunction(branch) || notdefaultbranchname(DEFAULTBRANCH_FUNCTION_NAME);

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

    let defaultbranch = undefined;
    
    const orderedbranches = [];
    const addbranch = bind(PUSH_METHOD, orderedbranches);

    for(let index = 0; index < branches.length; index += 1) {

        const branch = branches[index];

        isbranch(branch) ? addbranch(branch)
        : notdefaultbranch(branch) ? fail(ERR_BAD_BRANCH, index, typeorclass(branch))
        : isundefined(defaultbranch) ? (defaultbranch = branch)
        : fail(ERR_MULTIPLE_DEFAULT_BRANCHES);
    }

    isdefined(defaultbranch) && addbranch(defaultbranch);

    return reduceright(selectreducer, id, orderedbranches);
}
