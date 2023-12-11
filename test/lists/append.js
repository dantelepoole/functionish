const append = require('../../src/lists/append');
const dispatch = require('../../lib/test/dispatch');
const should = require('../../lib/test/should');

const UNIQTHING = {label:'UNIQTHING'}

const isiterable = obj => (typeof obj?.[Symbol.iterator] === 'function');
const appendandtoarray = (list, ...newitems) => [...append(list, ...newitems)];
const array1to10 = [1,2,3,4,5,6,7,8,9,10];
const array11to20 = [11,12,13,14,15,16,17,18,19,20];
const list1to10 = { [Symbol.iterator]:Array.prototype.values.bind(array1to10) }
const list11to20 = { [Symbol.iterator]:Array.prototype.values.bind(array11to20) }
const emptylist = { [Symbol.iterator]:Array.prototype.values.bind([]) }

describe( 'append()', function() {

        it('should throw if the first argument is not iterable', function() {
            
            should.throw(append);
            should.throw(append, {});
            should.throw(43);
        })

        it('should, if the first argument is a string, concatenate the arguments to a single new string', function() {
            
            should.return(
                'gotoconsideredharmful',
                append,
                'goto', 'considered', 'harmful'
            )
        })

        it('should not return an array even if the first argument is an array', function() {

            should.not.return.an.Array(append, list1to10, ...list11to20, ...array11to20);
            should.not.return.an.Array(append, array1to10, ...list1to10, ...array11to20);
        })
        
        describe( 'if the first argument is iterable, append()', function() {

            it('should return an iterable object', function() {
                should.return.iterable(append, list1to10, ...list11to20);
            })
            
            it('should return an iterable that produces the items of the first argument followed by the other arguments', function() {
                
                should.return.like(
                    [...list1to10, ...array11to20],
                    appendandtoarray,
                    list1to10, ...array11to20
                )
            })

            it('should not flatten the other arguments if they are iterable', function() {
                
                should.return.like(
                    [...list1to10, array11to20],
                    appendandtoarray,
                    list1to10, array11to20
                )
            })
        })
    }
);