/**
 * @module misc/where
 */

'use strict';

const curry = require('../curry');

/**
 * Match the *subject* object to the rules specified by the *specification* object and return an array
 * holding the keys and values for the failing properties.
 * 
 * Each property of *specification* represents a rule. The rule is applied to the value of
 * corresponding property of *subject*. The rule matches if it returns a truthy value, otherwise the rule fails.
 * 
 * Only *specification*'s own, enumerable properties are matched.
 * 
 * The function returns an array containing an entry for each failing property. Each entry is a two-element array containing
 * the *specification* rule's key in the first element and the corresponding *subject* value in the second element.
 * If *subject* passed all rules, the errors array will be empty.
 * 
 * `where()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `where()`</caption>
 *     
 * const { where } = require('functionish/misc');
 * 
 * const iseven = x => (x%2) === 0;
 * const isstring = x => (typeof x === 'string');
 * 
 * const spec = { age:iseven, name:isstring };
 * const user = { age:41, name: 'Hari Seldon' }
 * 
 * const errors = where(spec, user);
 * console.log(errors); // prints '[ ['age', 41] ]'
 * 
 * @function where
 * @param {object} specification The object providing the rules to match
 * @param {object} subject The object to match against *specification*'s rules
 * @returns {boolean}
 */
function where(specification, subject) {

    const errors = [];

    for(const key in specification)  {
        
        const rule = specification[key];
        const property = subject[key];

        rule(property) || errors.push( [key,property] );
    }

    return errors;
}

module.exports = curry(1, where);