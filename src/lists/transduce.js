/**
 * @module lists/transduce
 */

'use strict';

const isfunction = require('./isfunction');
const reduce = require('./reduce');
const buildtransducer = require('./transducer');

module.exports = function transduce(transducer, reducer, initialvalue, list) {

    isfunction(transducer) || (transducer = buildtransducer(...transducer));
    
    return reduce( transducer(reducer), initialvalue, list );
}