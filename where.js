/**
 * @module where
 */

'use strict';

/**
 * Match the *subject* object to the rules specified by the *specification* object and return an object reporting
 * the failed rules.
 * 
 * Each property of *specification* represents a rule. If a rule is a function, it is applied to the value of
 * corresponding property of *subject*. The rule matches if it returns a truthy value, otherwise the rule fails. If a
 * rule is not a function, it is compared to *subject*'s corresponding property for strict equality.
 * 
 * Only *specification*'s own, enumerable properties are matched.
 * 
 * The returned object has a property `error` which is an array containing an entry for each *specification* rule that
 * failed. Each entry is a two-element array containing the *specification* rule's key in the first element and the
 * corresponding *subject* value in the second element. If *subject* passed all rules, the errors array will be empty.
 * 
 * The return object also has a boolean property `success` which will be `true` if no errors were encountered or
 * `false` otherwise.
 * 
 * `where()` is curried by default.
 * 
 * @example
 *     
 * const where = require('functionish/where');
 * 
 * const iseven = x => (x%2) === 0;
 * const isstring = x => (typeof x === 'string');
 * 
 * const spec = { age:iseven, name:isstring };
 * const test = { age:41, name: 'Hari Seldon' }
 * 
 * const result = where(spec, test);
 * console.log( result.success ); // prints 'false'
 * console.log( result.errors ); // prints '[ ['age', 41] ]'
 * 
 * @func where
 * @param {object} specification The object providing the rules to match
 * @param {object} subject The object to match against *specification*'s rules
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function where(specification, subject) {

        if( typeof specification !== 'object' || specification === null ) {
            const spectype = (specification === null) ? 'null' : typeof specification;
            throw new TypeError(`where(): The specification has type ${spectype}. Expected an object`);
        }

        subject = Object(subject);

        const errors = testspec(specification, subject);

        return { 
            errors,
            success : (errors.length === 0)
        }
    }
)

function testspec(specification, subject) {

    const errors = [];

    for( const key in specification )  {

        const predicate = specification[key];
        const result = testproperty(predicate, subject, key);

        if( ! result ) errors.push( [ key, subject[key] ]);
    }

    return errors;
}

function testproperty(predicate, subject, key) {
    return (typeof predicate === 'function') ? !! predicate(subject[key]) : (predicate === subject[key]);
}