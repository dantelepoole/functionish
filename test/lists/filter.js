const filter = require('../../src/lists/filter');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const paths = ['/', '/home', '../'];
const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];
const iseven = fake( x => (x%2) === 0 );
const isnegative = fake(x => (x < 0));

describe( 'lists/filter()', function() {

        beforeEach(function () {
            iseven.resetHistory();
            isnegative.resetHistory();
        })

        it('should be curried with unary arity',
            function() {
                should.return.a.function(filter, iseven)
                should.return.an.iterable( filter(iseven), numbers1to10 );
            }
        )
        
        it('should throw if the predicate is not a function nor a string', function() {
            
            should.throw(filter, 0, numbers1to10);
            should.throw(filter, {}, numbers1to10);
            should.throw(filter, -1, numbers1to10);
            should.throw(filter, 1.3, numbers1to10);
            should.throw(filter, null, numbers1to10);
            should.throw(filter, undefined, numbers1to10);
            should.throw(filter, 1n, numbers1to10);
        })

        it('should throw if the predicate is a string that does not resolve to a function in a package or file module', function() {
            
            should.throw(filter, 'path#FuBar', numbers1to10);
            should.throw(filter, 'path#delimiter', numbers1to10);
        })

        it(`should throw if the source list has no filter()-method and is not iterable`, function() {
            
            should.throw(filter, iseven, {});
            should.throw(filter, iseven, null);
            should.throw(filter, iseven, filter);
            should.throw(filter, iseven, { filter:'notamethod' });
        })

        it(`should call the source list's filter() method if it has one and return the result`, function() {

            const fakefilter = fake(x=>x);
            const sourcelist = { filter:fakefilter }

            should.return(iseven, filter, iseven, sourcelist);
            should.be.called(fakefilter);
        })

        it('should return an iterable, non-Array object if the source list does not have a filter() method', function() {

            const numbers1to10list = { [Symbol.iterator]:Array.prototype.values.bind(numbers1to10) };
            const filterresult = filter(iseven, numbers1to10list);

            should.be.iterable(filterresult);
            should.not.be.an.Array(filterresult);
        })

        describe( 'The iterable returned by filter()', function() {

            it('should call the predicate for each item in the source list', function() {

                filter(iseven, numbers1to10);

                should.be(numbers1to10.length, iseven.callCount);
            })

            it('should produce only those items from the source list for which the predicate returns a truthy value', function() {
                
                for(const number of filter(iseven, numbers1to10)) {
                    should.conform(iseven, number);
                }
            })

            it('should be empty if the predicate never returns a truthy value', function() {
                should.be.empty( filter(isnegative, numbers1to10) );
            })

            it('should be a lazy iterable if the source list is not an array', function() {

                const numbers1to10copy = numbers1to10.slice();
                const numbers1to10list = { [Symbol.iterator]:Array.prototype.values.bind(numbers1to10copy) };

                const evennumbers = filter(iseven, numbers1to10list);
                
                should.be(5, [...evennumbers].length);
                
                numbers1to10copy.length = 5;
                
                should.be(2, [...evennumbers].length);
            })
        });

    }
);