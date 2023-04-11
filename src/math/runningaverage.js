/**
 * @module math/runningaverage
 */

'use strict';

const add = (a,b) => (a+b);
const sum = values => values.reduce(add, 0);

function runningaverage() {

    let count = 0;
    let total = 0;

    _runningaverage.reset = function reset_runningaverage() {
        count = 0;
        total = 0;
    }

    return _runningaverage;

    function _runningaverage(...values) {

        if(values.length > 0) {
            count += values.length;
            total += sum(values);
        }

        return (count > 0) ? (total/count) : 0;
    }
}

module.exports = runningaverage;