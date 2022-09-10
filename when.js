/**
 * @module when
 */

'use strict';

const callable = require('./callable');
const evaluate = require('./evaluate');
const id = require('./id');
const notfunction = require('./notfunction');

/**
 * Return a function that passes its arguments to *predicate*. If *predicate* returns a truthy value, the function
 * passes its arguments to *mainbranch* and returns the result. If *predicate* returns a falsy value, the function
 * passes its arguments to *alternativebranch* and returns the result. If no *alternativebranch* is provided, the
 * function returns its first argument. `unless()` therefore operates opposite to {@link module:unless unless()}.
 * 
 * If *predicate* or either branch are not functions, their value is evaluated directly and any arguments passed to
 * the returned function are ignored.
 * 
 * `when()` is curried by default with binary arity.
 * 
 * @example
 *     
 * const when = require('functionish/when');
 * 
 * const isodd = x => (x%2) === 1;
 * const increment = x => (x+1);
 * 
 * const coercetoeven = when(isodd, increment);
 * 
 * coercetoeven(42); // returns 42
 * coercetoeven(41); // returns 42
 * 
 * @func when
 * @see {@link module:unless unless()}
 * @param {(function|any)} predicate The predicate expression
 * @param {(function|any)} mainbranch The expression to evaluate if *predicate* is truthy
 * @param {(function|any)} [alternativebranch] The expression to evaluate if *predicate* is falsy
 * @returns {any}
 */
module.exports = require('./curry2')(

    function when(predicate, mainbranch, alternativebranch=id) {

        predicate = callable(predicate);

        return function conditionalfunction(...args) {

            const selectedbranch = predicate(...args) ? mainbranch : alternativebranch;
            
            return evaluate(selectedbranch, ...args);
        }
    }
)