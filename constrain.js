/**
 * @module constrain
 */

'use strict';

/**
 * If *value* lies between *lowerlimit* and *upperlimit* (both inclusively), return *value*. Otherwise, return
 * *lowerlimit* if *value* is less than *lowerlimit* or *upperlimit* if *value* is greater than *upperlimit*.
 * 
 * @example
 * 
 * const constrain = require('functionish/constrain');
 * 
 * constrain(0, 10, 5); // returns 5
 * constrain(0, 10, -1); // returns 0
 * constrain(0, 10, 42); // returns 10
 * 
 * constrain('d', 'f', 'e'); // returns 'e'
 * constrain('d', 'f', 'a'); // returns 'd'
 * constrain('d', 'f', 'g'); // return 'f'
 * 
 * const startdate = new Date('2000-01-01');
 * const enddate = new Date('2020-01-01');
 * constrain(startdate, enddate, new Date('2010-01-01')); // returns Date('2010-01-01')
 * constrain(startdate, enddate, new Date('1999-01-01')); // returns startdate
 * * constrain(startdate, enddate, new Date('2022-01-01')); // returns enddate
 */
module.exports = require('./curry3') (

    function constrain(lowerlimit, upperlimit, value) {

        return (lowerlimit > value) ? lowerlimit
            : (upperlimit < value) ? upperlimit
            : value;
    }
)