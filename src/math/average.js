/**
 * @module math/average
 */

'use strict';

module.exports = function average(numbers) {

    let total = 0;
    let count = 0;

    for(const number of numbers) (total += number, count += 1);

    return (total === 0) ? 0 : (total/count);
}