const batch = require('../../src/lists/batch');
const should = require('../../lib/test/should');

const array1to10 = [1,2,3,4,5,6,7,8,9,10];
const array11to20 = [11,12,13,14,15,16,17,18,19,20];
const list1to20 = { [Symbol.iterator]:Array.prototype.values.bind( [...array1to10, ...array11to20 ]) }

describe( 'batch()', function() {

        it('should be curried with unary arity',
            function() {
                should.return.a.function(batch, 2)
                should.return.an.iterable( batch(2), list1to20 );
            }
        )
        
        it('should throw if the first argument is not an integer number of 1 or higher', function() {
            
            should.throw(batch, 0, list1to20);
            should.throw(batch, {}, list1to20);
            should.throw(batch, -1, list1to20);
            should.throw(batch, 1.3, list1to20);
            should.throw(batch, null, list1to20);
            should.throw(batch, undefined, list1to20);
            should.throw(batch, 1n, list1to20);
        })

        it('should throw if the second argument is not iterable', function() {
            
            should.throw(batch, 5, {});
            should.throw(batch, 5, null);
            should.throw(batch, 5, batch);
        })

        it('should return an iterable', function() {
            should.return.an.iterable(batch, 5, list1to20);
        })

        it('should return an iterable producing arrays', function() {

            const batches = batch(5, list1to20);

            for(const batch of batches) should.be.an.Array(batch);
        })

        it(`should return a lazy list`, function() {

            const numbers = array1to10.slice();
            const lazylist = batch(2, numbers);

            should.be(5, [...lazylist].length);

            numbers.length = 0;
            
            should.be.empty(lazylist);
        })

        describe( `if the number of list items is a multiple of the batch size`, function() {

            it(`the arrays produced by batch()'s return value should have a length equal to the batch size`, function() {
                
                const batches = batch(5, list1to20);

                for(const batch of batches) should.be(5, batch.length);
            })
        });
            
        describe( `if the number of list items is not a multiple of the batch size`, function() {

            it(`the arrays in the returned list should have a length equal to the batch size, except the last one`, function() {
                
                const batches = [...batch(7, list1to20)];
                
                batches.pop();

                for(const batch of batches) should.be(7, batch.length);
            })

            it(`the last array in the returned list should have a length equal to the remainder after dividing list's length by the batch size`, function() {
                
                let batches = [...batch(9, list1to20)];
                should.be( (20%9), batches.pop().length);

                batches = [...batch(8, list1to20)];
                should.be( (20%8), batches.pop().length);

                batches = [...batch(7, list1to20)];
                should.be( (20%7), batches.pop().length);

                batches = [...batch(6, list1to20)];
                should.be( (20%6), batches.pop().length);
            })
        });
    }
);