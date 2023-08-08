/**
 * @module lists/shuffle
 */

'use strict';

const randomcomparator = () => (Math.random() - 0.5);

/**
 * [to do]
 * 
 * @function shuffle
 */
function shuffle(list) {
    return Array.from(list).sort(randomcomparator);
}

module.exports = shuffle;