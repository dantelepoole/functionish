/**
 * @module math/runningaverage
 */

'use strict';

const add = (a,b) => (a+b);

function runningaverage() {

    let count = 0;
    let total = 0;

    return function _runningaverage(...values) {

        const valuecount = values.length;

        count += valuecount;
        
        total += (valuecount === 1)
               ? values[0]
               : values.reduce(add, 0);

        return (count > 0) ? (total/count) : 0;
    }
}

module.exports = runningaverage;