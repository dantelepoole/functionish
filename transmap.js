/**
 * Apply a list of *transformations* to *list* and return the result as an array. 
 * 
 * Essentially, `transmap()` is to {@link module:map map()} (and {@link module:filter filter()}) what 
 * {@link module:transduce transduce()} is to {@link module:reduce reduce()}.
 * 
 * `transmap()` is curried by default.
 * 
 * @module transmap
 * @see {@link module:transduce transduce()}
 * @see {@link module:transform transform()}
 * @param {function[]} transformations The transformation functions to apply
 * @param {any[]} list The list of items to transform
 * @returns {any[]}
 * 
 */
'use strict';

const transduce = require('./transduce');

const arrayreducer = (array, nextitem) => ( array.push(nextitem), array );

module.exports = require('./curry2')(

    function transmap(transformations, list) {
        return transduce(transformations, arrayreducer, [], list);
    }

)