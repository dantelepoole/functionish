/**
 * @module misc/where
 */

'use strict';

const TYPE_FUNCTION = 'function';

const curry2 = require('../curry2');

const testproperty = (predicate, property) => (typeof predicate === TYPE_FUNCTION)
                                            ? predicate(property)
                                            : (predicate === property);
/**
 * Match the *subject* object to the rules specified by the *specification* object and return an array
 * holding the keys and values for the failing properties.
 * 
 * Each property of *specification* represents a rule. If a rule is a function, it is applied to the value of
 * corresponding property of *subject*. The rule matches if it returns a truthy value, otherwise the rule fails. If a
 * rule is not a function, it is compared to *subject*'s corresponding property for strict equality.
 * 
 * Only *specification*'s own, enumerable properties are matched.
 * 
 * The function returns an array containing an entry for each failing property. Each entry is a two-element array containing
 * the *specification* rule's key in the first element and the corresponding *subject* value in the second element.
 * If *subject* passed all rules, the errors array will be empty.
 * 
 * `where()` is curried by default with binary arity.
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

    subject = Object(subject);

    const errors = [];

    for(const key in specification)  {
        
        const predicate = specification[key];
        const property = subject[key];

        const result = testproperty(predicate, property);

        if( ! result ) errors.push( [key, property] );
    }

    return errors;
}

module.exports = curry2(where);