/**
 * @module lists/shuffle
 */

'use strict';

const coinflip = require('../misc/coinflip');

/**
 * [to do]
 * 
 * @function shuffle
 */
function shuffle(list) {
    return Array.from(list).sort(coinflip);
}

module.exports = shuffle;