/**
 * @module sum
 */

'use strict';

module.exports = function sum(numbers) {

    let total = 0;

    for(const number of numbers) total += number;
    
    return total;
}