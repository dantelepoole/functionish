/**
 * @module lists/zip
 */

'use strict';

const ERR_BAD_MODE = `functionish/lists/zip(): The mode argument is '%s'. Expected 'left', 'right', 'long' or 'short'.`;
const VALID_ZIP_MODES = ['left', 'long', 'right', 'short'];
const MISSING_VALUE = undefined;

const ZIPFUNCTIONS = {
    left  : zipleft,
    long  : ziplong,
    right : zipright,
    short : zipshort
}


const compose = require('../compose');
const curry = require('../curry');
const error = require('../errors/error');
const flip = require('../flip');
const includes = require('./includes');
const iterator = require('./iterator');
const list = require('./list');
const lowercase = require('../misc/lowercase');
const or = require('../logic/or');
const partial = require('../partial');
const raise = require('../errors/raise');
const stringlimit = require('../misc/stringlimit');

const normalizemode = compose(lowercase, String);

const isvalidmode = compose(flip(includes, VALID_ZIP_MODES));
const raisebadmode = compose(raise, error.Type(ERR_BAD_MODE), stringlimit('...', 10));
const validatemode = or(isvalidmode, raisebadmode);

/**
 * Return an iterable that produces 2-element arrays containing the next item from *list1* and
 * the next item from *list2*. The returned iterable has the same number of items as the longest *list*.
 * 
 * `zip()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `zip()`</caption>
 * 
 * const { zip } = require('functionish/lists');
 * 
 * const zipped = zip([1,2,3,4,5], [6,7,8]);
 * 
 * Array.from(zipped); // returns [ [1,6], [2,7], [3,8] ]
 * 
 * @function zip
 * @see {@link module:zipwith zipwith()}
 * @param {iterable} list1 The iterable to zip with the items from *list2* 
 * @param {iterable} list2 The iterable to zip the items from *list1* with
 * @returns {iterable}
 */
function zip(mode='short', list1, list2) {

    mode = normalizemode(mode);

    validatemode(mode);

    const ziplists = partial(ZIPFUNCTIONS[mode], list1, list2);
    
    return list(ziplists);
}

function* zipleft(left, right) {

    const leftiterator = iterator(left);
    const rightiterator = iterator(right);

    let leftitem = leftiterator.next();

    while( !leftitem.done ) {

        const rightitem = rightiterator.next();

        yield rightitem.done
            ? [leftitem.value, MISSING_VALUE]
            : [leftitem.value, rightitem.value];

        leftitem = leftiterator.next();
    }
}

function* zipright(left, right) {

    const leftiterator = iterator(left);
    const rightiterator = iterator(right);

    let rightitem = rightiterator.next();

    while( !rightitem.done ) {

        const leftitem = leftiterator.next();

        yield leftitem.done
            ? [MISSING_VALUE, rightitem.value]
            : [leftitem.value, rightitem.value];

        rightitem = rightiterator.next();
    }
}

function ziplong(list1, list2) {

    const iterator1 = iterator(list1);
    const iterator2 = iterator(list2);

    let item1 = iterator1.next();
    let item2 = iterator2.next();

    while( !item1.done ) {
        
        yield item2.done
            ? [item1.value, MISSING_VALUE]
            : [item1.value, item2.value];

        item1 = iterator1.next();
        item2 = iterator2.next();
    }

    while( !item2.done ) {
        yield [MISSING_VALUE, item2.value];
        item2 = iterator2.next();
    }

}

function zipshort(list1, list2) {

    const iterator1 = iterator(list1);
    const iterator2 = iterator(list2);

    let item1 = iterator1.next();
    let item2 = iterator2.next();

    while( ! (item1.done || item2.done) ) {
        
        yield [item1.value, item2.value];

        item1 = iterator1.next();
        item2 = iterator2.next();
    }

    while( !item2.done ) {
        yield [MISSING_VALUE, item2.value];
        item2 = iterator2.next();
    }
}

module.exports = curry(1, zip);