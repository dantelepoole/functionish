/**
 * @module product
 */

'use strict';

const ERR_BAD_NUMBERSLIST = `ProductError~The numbers argument has type %s. Expected an iterable of numbers.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

module.exports = function product(numbers) {

    notiterable(numbers) && fail(ERR_BAD_NUMBERSLIST, typeorclass(numbers));

    const iterator = numbers[Symbol.iterator]();
    
    const firstitem = iterator.next();
    if( firstitem.done ) return 0;
    
    let total = firstitem.value;

    for(const number of iterator) total *= number;

    return total;
}