'use strict';

const KEY_STRICT = '_strict_';

const isobject = require('./lib/isobject');

const asobject = Object;
const islenient = spec => ! spec?.[KEY_STRICT];

/**
 * Return `true` if the *subject* object matches the rules specified by the *specification* object, otherwise return
 * `false`. If either argument is not an object, return `false`.
 * 
 * Each property of *specification* represents a rule. If a rule is a function, it is applied to the value of
 * corresponding property of *subject*. The rule matches if it returns a truthy value, otherwise the rule fails. If a
 * rule is not a function, it is compared to *subject*'s corresponding property using strict equality.
 * 
 * Only *specification*'s own, enumerable properties are matched.
 * 
 * If *specification* has a `_strict_` property set to a truthy value (default: `false`), *subject* must have exactly
 * the same properties as *specificiation*. If *subject* has any additional values, the match fails.
 * 
 * `where()` is curried by default.
 * 
 * @module where
 * @param {object} specification The object providing the rules to match
 * @param {object} subject The object to match against *specification*'s rules
 * @returns {boolean}
 * @example
 *     
 * const where = require('functionish/where');
 * 
 * const iseven = x => (x%2) === 0;
 * const isstring = x => (typeof x === 'string');
 * 
 * const spec = { age:iseven, name:isstring };
 * const test = { age:42, name: 'Hari Seldon' }
 * 
 * where(spec, test); // returns true
 * 
 * spec._strict_ = true;
 * test.city = 'Trantor';
 * 
 * where(spec, test); // returns false
 * 
 */
module.exports = require('./curry2')(

    function where(specification, subject) {

        specification = asobject(specification);
        subject = asobject(subject);

        return isobject(specification) && isobject(subject)
               &&
               (islenient(specification) || strictequalkeycount(specification, subject))
               &&
               testspec(specification, subject);
    }
)

function strictequalkeycount(specification, subject) {

    const speckeycount = Object.keys(specification).length - 1; // adjust for _strict_ property
    const subjectkeycount = Object.keys(subject).length;

    return (speckeycount === subjectkeycount);
}

function testspec(specification, subject) {

    for( const key in specification )  {

        if( key === KEY_STRICT ) continue;

        const predicate = specification[key];

        const result = (typeof predicate === 'function') 
                       ? !! predicate( subject[key] )
                       : (predicate === subject[key]);

        if( ! result ) return false;
    }

    return true;
}