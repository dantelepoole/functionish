const flat = require('../../src/lists/flat');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const multidimensionalarray = [1,2,3, [4,5, [6,7,8] ,9,10] ];

describe( 'flat()', function() {

        beforeEach(function () {
        })

        it(`should be curried with unary arity`, function() {
            
            should.return.a.function(flat, 1);
            should.return.an.iterable( flat(1), multidimensionalarray );
        })

        it(`should throw if the depth is negative or not an integer number`, function() {
            
            should.throw(flat, {}, multidimensionalarray);
            should.throw(flat, flat, multidimensionalarray);
            should.throw(flat, { flat:'notamethod' }, multidimensionalarray);
        })

        it(`should throw if the source list has no flat()-method and is not iterable`, function() {
            
            should.throw(flat, {}, multidimensionalarray);
            should.throw(flat, null, multidimensionalarray);
            should.throw(flat, flat, multidimensionalarray);
            should.throw(flat, { flat:'notamethod' }, multidimensionalarray);
        })

        it(`should call the source list's flat() method if it has one and return the result`, function() {

            const fakeflat = fake(x=>x);
            const sourcelist = { flat:fakeflat }

            flat(1, sourcelist);

            should.be.called(fakeflat);
        })

        it('should return an iterable, non-Array object if the source list does not have a flat() method', function() {

            const multidimensionallist = { [Symbol.iterator]:Array.prototype.values.bind(multidimensionalarray) };
            const flatlist = flat(1, multidimensionallist);

            should.be.iterable(flatlist);
            should.not.be.an.Array(flatlist);
        })

        describe( 'The depth argument', function() {

            it('should default to 1', function() {
                
                const multidimensionallist = { [Symbol.iterator]:Array.prototype.values.bind(multidimensionalarray) };
                const flatlist = flat(undefined, multidimensionallist);

                should.be.like( multidimensionalarray.flat(1), [...flatlist] );
            })
        });

        describe( 'The iterable returned by flat()', function() {

            it('should flatten the sourcelist recursively as per the depth argument', function() {
                
                const multidimensionallist = { [Symbol.iterator]:Array.prototype.values.bind(multidimensionalarray) };

                should.be.like( multidimensionalarray.flat(0), [...flat(0, multidimensionallist)] );
                should.be.like( multidimensionalarray.flat(1), [...flat(1, multidimensionallist)] );
                should.be.like( multidimensionalarray.flat(2), [...flat(2, multidimensionallist)] );
            })

            it('should be empty if the sourcelist is empty', function() {

                const emptylist = { [Symbol.iterator]:Array.prototype.values.bind([]) };
                const flatlist = flat(1, emptylist);

                should.be.like( [], [...flatlist] );
            })

            it('should be a lazy iterable if the source list is not an array', function() {

                const multidimensionalarraycopy = multidimensionalarray.slice();
                const multidimensionallist = { [Symbol.iterator]:Array.prototype.values.bind(multidimensionalarraycopy) };

                const flatlist = flat(1, multidimensionallist);
                
                should.be.like( multidimensionalarraycopy.flat(1), [...flatlist]);
                
                multidimensionalarraycopy.pop();
                
                should.be.like( multidimensionalarraycopy.flat(1), [...flatlist]);
            })
        });

    }
);