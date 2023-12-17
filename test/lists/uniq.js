const uniq = require('../../src/lists/uniq');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const double = fake(x => (x*2));
const numbers1to6 = [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6];

describe( 'uniq()', function() {

        it('should be curried with unary arity',
            function() {
                should.return.a.function(uniq, double)
                should.return.an.iterable( uniq(double), numbers1to6 );
            }
        )
        
        it('should throw if the hash function is neither a function nor null or undefined', function() {
            
            should.throw(uniq, 0, numbers1to6);
            should.throw(uniq, {}, numbers1to6);
            should.throw(uniq, -1, numbers1to6);
            should.throw(uniq, 1.3, numbers1to6);

            should.not.throw(uniq, null, numbers1to6);
            should.not.throw(uniq, undefined, numbers1to6);
            should.not.throw(uniq, double, numbers1to6);
        })

        it(`should throw if the source list is not iterable`, function() {
            
            should.throw(uniq, double, {});
            should.throw(uniq, double, null);
            should.throw(uniq, double, uniq);
        })

        it('should return an iterable object', function() {
            should.return.an.iterable(uniq, null, numbers1to6);
        })

        describe( 'The iterable returned by uniq()', function() {
            
            it('should produce the non-duplicate items from the source list in order', function() {
                
                should.be.like([1], [...uniq(null, [1,1,1,1,1,1,1,1,1,1,1])]);
                should.be.like([1], [...uniq(double, [1,1,1,1,1,1,1,1,1,1,1])]);

                should.be.like( [1,2,3,4,5,6], [...uniq(null, numbers1to6)] );
                should.be.like( [1,2,3,4,5,6], [...uniq(double, numbers1to6)] );
            })

            it('should not contain duplicate items', function() {
                
                const uniqnumbers1to6 = [ ...uniq(null, numbers1to6) ];
                
                for(const number of uniqnumbers1to6) should.return.true(x => uniqnumbers1to6.filter(y=>y===x).length === 1, number);
            })

            it('should be empty if the source list is empty', function() {
                should.be.empty( uniq(double, []) );
            })

            it('should be lazy', function() {

                const numbers1to6copy = numbers1to6.slice();
                const numbers1to6list = { [Symbol.iterator]: () => numbers1to6copy.values() };

                const uniqnumbers = uniq(null, numbers1to6list);
                
                should.be.like([1,2,3,4,5,6], [...uniqnumbers]);
                
                numbers1to6copy.push(12, 12, 13);

                should.be.like([1,2,3,4,5,6,12,13], [...uniqnumbers]);
            })
        });

    }
);