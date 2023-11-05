/**
 * @module lists/zip
 */

'use strict';

const ERR_BAD_MODE = `functionish/lists/zip(): The mode argument is '%s'. Expected 'left', 'right', 'long' or 'short'.`;

const ZIP_MODES = {
    LEFT  : 'left',
    LONG  : 'long',
    RIGHT : 'right',
    SHORT : 'short'
}

const VALID_ZIP_MODES = [ZIP_MODES.LEFT, ZIP_MODES.LONG, ZIP_MODES.RIGHT, ZIP_MODES.SHORT];

const compose = require('../compose');
const curry = require('../curry');
const error = require('../errors/error');
const flip = require('../flip');
const includes = require('./includes');
const isstring = require('../types/isstring');
const list = require('./list');
const lowercase = require('../misc/lowercase');
const raise = require('../errors/raise');
const stringlimit = require('../misc/stringlimit');

const raisebadmode = compose(raise, error.Type(ERR_BAD_MODE), stringlimit('...', 32));

const isvalidmode = compose( flip(includes, VALID_ZIP_MODES), lowercase );
const validatemode = mode => isstring(mode) && isvalidmode(mode) || raisebadmode(mode);

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
function zip(mode=ZIP_MODES.SHORT, list1, list2) {

    validatemode(mode);
}

function zipleft(list1, list2) {

}

function zipright(list1, list2) {

}

function ziplong(list1, list2) {

}

function zipshort(list1, list2) {

}

module.exports = curry(1, zip);