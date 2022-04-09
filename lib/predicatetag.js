'use strict';

/**
 * Holds a symbol that {@link module:lib/tagaspredicate tagaspredicate()} uses to recognize a predicate function. Used
 * internally to allow {@link module:transform transform()} to discriminate between regular transformations and
 * filter transformations.
 * 
 * @module lib/predicatetag
 * @ignore
 * @see {@link module:transform transform()}
 */
module.exports = Symbol.for('dantelepoole/functionish/predicate/tag');