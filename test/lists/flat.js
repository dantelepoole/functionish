const flat = require('../../src/lists/flat');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const multidimensionalarray = [1,2,3, [4,5, [6,7,8] ,9,10] ];

describe( 'flat()', function() {

        beforeEach(function () {
        })

        it(`should throw if the source list has no flat()-method and is not iterable`, function() {
            
            should.throw(flat, {});
            should.throw(flat, null);
            should.throw(flat, flat);
            should.throw(flat, { flat:'notamethod' });
        })

        it(`should call the source list's flat() method if it has one and return the result`, function() {

            const fakeflat = fake(x=>x);
            const sourcelist = { flat:fakeflat }

            flat(sourcelist);

            should.be.called(fakeflat);
        })

        it('should return an iterable, non-Array object if the source list does not have a flat() method', function() {

            const multidimensionallist = { [Symbol.iterator]:Array.prototype.values.bind(multidimensionalarray) };
            const flatlist = flat(multidimensionallist);

            should.be.iterable(flatlist);
            should.not.be.an.Array(flatlist);
        })

        describe( 'The iterable returned by flat()', function() {

            it('should flatten the sourcelist by one level', function() {
                
                const multidimensionallist = { [Symbol.iterator]:Array.prototype.values.bind(multidimensionalarray) };
                const flatlist = flat(multidimensionallist);

                should.be.like( multidimensionalarray.flat(), [...flatlist] );
            })

            it('should be empty if the sourcelist is empty', function() {

                const emptylist = { [Symbol.iterator]:Array.prototype.values.bind([]) };
                const flatlist = flat(emptylist);

                should.be.like( [], [...flatlist] );
            })

            it('should be a lazy iterable if the source list is not an array', function() {

                const multidimensionalarraycopy = multidimensionalarray.slice();
                const multidimensionallist = { [Symbol.iterator]:Array.prototype.values.bind(multidimensionalarraycopy) };

                const flatlist = flat(multidimensionallist);
                
                should.be.like( multidimensionalarraycopy.flat(), [...flatlist]);
                
                multidimensionalarraycopy.pop();
                
                should.be.like( multidimensionalarraycopy.flat(), [...flatlist]);
            })
        });

    }
);