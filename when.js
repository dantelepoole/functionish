'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

const callable = require('./callable');
const evaluate = require('./evaluate');
const id = require('./id');

/**
 * Return a function that passes its arguments to *predicate*. If *predicate* returns a truthy value, the function
 * passes its arguments to *mainbranch* and returns the result. If *predicate* returns a falsy value, the function
 * passes its arguments to *alternativebranch* and returns the result. If no *alternativebranch* is provided, the
 * function returns its first argument. `unless()` therefore operates opposite to {@link module:unless unless()}.
 * 
 * If *predicate* or either branch are not functions, their value is evaluated directly and any arguments passed to
 * the returned function are ignored.
 * 
 * `whem()` is curried by default.
 * 
 * @module when
 * @see {@link module:unless unless()}
 * @param {(function|any)} predicate The predicate expression
 * @param {(function|any)} mainbranch The expression to evaluate if *predicate* is truthy
 * @param {(function|any)} [alternativebranch] The expression to evaluate if *predicate* is falsy
 * @returns {any}
 * @example
 *     const when = require('functionish/when');
 * 
 *     const isodd = x => (x%2) === 1;
 *     const increment = x => (x+1);
 * 
 *     const coercetoeven = when(isodd, increment);
 * 
 *     coercetoeven(42); // returns 42
 *     coercetoeven(41); // returns 42
 */
module.exports = require('./curry2')(NAMED_FUNCTIONS ? when_named : when )

function when(predicate, mainbranch, alternativebranch=id) {

    predicate = callable(predicate);

    function when_conditional(...args) {
        
        const predicateresult = !! predicate(...args);
        const selectedbranch = predicateresult ? mainbranch : alternativebranch;

        return evaluate(selectedbranch, ...args);
    }

    return when_conditional;
}

function when_named(predicate, mainbranch, alternativebranch=id) {

    const whenname = `when[${predicate?.name ?? typeof predicate}]`;

    predicate = callable(predicate);

    const container = {
        [whenname] : function (...args) {

            const predicateresult = !! predicate(...args);
            const selectedbranch = predicateresult ? mainbranch : alternativebranch;
            
            return evaluate(selectedbranch, ...args);
        }
    }

    return container[whenname];
}