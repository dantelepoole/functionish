/**
 * @module lib/predicatetag
 * @ignore
 */

'use strict';

/**
 * Holds a symbol that {@link module:lib/tagaspredicate tagaspredicate()} uses to recognize a predicate function. Used
 * internally to allow {@link module:transform transform()} to discriminate between regular transformations and
 * filter transformations.
 * 
 * @constant
 * @see {@link module:transform transform()}
 */
module.exports = Symbol.for('dantelepoole/functionish/predicate/tag');