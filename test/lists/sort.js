const sort = require('../../src/lists/sort');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const paths = ['/', '/home', '../'];
const numbers1to10 = [6,1,7,2,8,3,9,4,10,5];
const numbers1to10list = { [Symbol.iterator]:numbers1to10.values.bind(numbers1to10) }
const subtract = fake( (a,b) => (a-b) );
const subtractinverse = fake( (a,b)=>(b-a) );

describe( 'lists/sort()', function() {

        beforeEach(function () {
            subtract.resetHistory();
            subtractinverse.resetHistory();
        })

        it('should be curried with unary arity',
            function() {
                should.return.a.function(sort, subtract)
                should.return.an.iterable( sort(subtract), numbers1to10list );
            }
        )
        
        it('should throw if the predicate is not a function nor a string nor null/undefined', function() {
            
            should.throw(sort, 0, numbers1to10list);
            should.throw(sort, {}, numbers1to10list);
            should.throw(sort, -1, numbers1to10list);
            should.throw(sort, 1.3, numbers1to10list);
            should.throw(sort, 1n, numbers1to10list);
        })

        it('should throw if the predicate is a string that does not resolve to a function in a package or file module', function() {
            
            should.throw(sort, 'path#FuBar', numbers1to10list);
            should.throw(sort, 'path#delimiter', numbers1to10list);
        })

        it(`should throw if the source list has no sort()-method and is not iterable`, function() {
            
            should.throw(sort, subtract, {});
            should.throw(sort, subtract, null);
            should.throw(sort, subtract, sort);
            should.throw(sort, subtract, { filter:'notamethod' });
        })

        it(`should call the source list's sort() method if it has one and return the result`, function() {

            const fakesort = fake(x=>x);
            const sourcelist = { sort:fakesort }

            should.return(subtract, sort, subtract, sourcelist);
            should.be.called(fakesort);
        })

        it(`should pass the compare function to the list's sort()-method if it was passed`, function() {

            const fakesort = fake(x=>x);
            const sourcelist = { sort:fakesort }

            sort(subtract, sourcelist);

            should.be.called.with([subtract], fakesort);
        })

        it('should return an iterable, non-Array object if the source list does not have a sort() method', function() {

            const sortresult = sort(subtract, numbers1to10list);

            should.be.iterable(sortresult);
            should.not.be.an.Array(sortresult);
        })

        describe( 'The iterable returned by sort()', function() {

            it('should call the sort function at least once for each item in the source list', function() {

                Array.from( sort(subtract, numbers1to10list) );

                should.be.greater.than.or.equal.to(numbers1to10.length, subtract.callCount);
            })

            it('should produce the items from the source list sorted according to the sorting function', function() {
                
                const sorted = sort(subtract, numbers1to10list);
                should.be.like( numbers1to10.toSorted(subtract), [...sorted] );

                const reversesorted = sort(subtractinverse, sorted);
                should.be.like( numbers1to10.toSorted(subtract).reverse(), [...reversesorted] );

            })

            it('should be empty if the source list is empty', function() {
                should.be.empty( sort(subtract, []) );
            })

            it('should be a lazy iterable if the source list is not an array', function() {

                const numbers1to10copy = numbers1to10.slice();
                const numbers1to10listcopy = { [Symbol.iterator]:Array.prototype.values.bind(numbers1to10copy) };

                const sorted = sort(subtract, numbers1to10listcopy);
                
                should.be.like(numbers1to10copy.toSorted(subtract), [...sorted]);
                
                numbers1to10copy.push = -42;
                
                should.be.like( numbers1to10copy.toSorted(subtract), [...sorted]);
            })
        });

    }
);