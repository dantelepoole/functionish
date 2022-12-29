/**
 * @module math/product
 */

'use strict';

const multiply = (a,b) => (a*b);

const calcproduct = (...factors) => factors.length ? factors.reduce(multiply, 1) : 0;

module.exports = function product(factors) {
    return calcproduct(...factors);
}