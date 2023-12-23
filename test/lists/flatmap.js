const flatmap = require('../../src/lists/flatmap');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const multidimensionalarray = [1,2,3, [4,5, [6,7,8] ,9,10] ];
const id = fake(x => x);
const lift = fake(x => [x]);

describe( 'flatmap()', function() {

        beforeEach(function () {
            id.resetHistory();
            lift.resetHistory();
        })

        it(`should be curried with unary arity`, function() {
            
            should.return.a.function(flatmap, id);
            should.return.an.iterable( flatmap(id), multidimensionalarray );
        })

        it(`should throw if the mapping function is not a function`, function() {
            
            should.throw(flatmap, {}, multidimensionalarray);
            should.throw(flatmap, null, multidimensionalarray);
            should.throw(flatmap, 1, multidimensionalarray);
            should.throw(flatmap, 'fubar', multidimensionalarray);
        })

        it(`should throw if the source list has no flatMap()-method and is not iterable`, function() {
            
            should.throw(flatmap, id, {});
            should.throw(flatmap, id, null);
            should.throw(flatmap, id, flatmap);
            should.throw(flatmap, id, { flatMap:'notamethod' });
        })

        it(`should call the source list's flatMap() method if it has one and return the result`, function() {

            const source = { flatMap:fake(x=>x) }

            const result = flatmap(id, source);

            should.be.called(source.flatMap);
            should.be(id, result);
        })

        it('should return an iterable, non-Array object if the source list does not have a flatMap() method', function() {

            const multidimensionallist = { [Symbol.iterator]:Array.prototype.values.bind(multidimensionalarray) };
            const flatlist = flatmap(id, multidimensionallist);

            should.be.iterable(flatlist);
            should.not.be.an.Array(flatlist);
        })

        describe( 'The iterable returned by flat()', function() {

            it('should call the mapping function once for each top-level item in the source list', function() {
 
                should.not.be.called(id);

                flatmap(id, multidimensionalarray);

                should.be(4, id.callCount);
            })

            it('should flatten the result of the mapping function', function() {
                
                const multidimensionallist = { [Symbol.iterator]:Array.prototype.values.bind(multidimensionalarray) };

                should.be.like( multidimensionalarray.flat(1), [...flatmap(id, multidimensionallist)] );
            })

            it('should be empty if the sourcelist is empty', function() {

                const emptylist = { [Symbol.iterator]:Array.prototype.values.bind([]) };

                should.be.like( [], [...flatmap(id, emptylist)] );
            })

            it('should be a lazy iterable if the source list is not an array', function() {

                const multidimensionalarraycopy = multidimensionalarray.slice();
                const multidimensionallist = { [Symbol.iterator]:Array.prototype.values.bind(multidimensionalarraycopy) };

                const flatlist = flatmap(id, multidimensionallist);
                
                should.be.like( multidimensionalarraycopy.flat(1), [...flatlist]);
                
                multidimensionalarraycopy.pop();
                
                should.be.like( multidimensionalarraycopy.flat(1), [...flatlist]);
            })
        });

    }
);