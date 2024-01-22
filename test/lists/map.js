const map = require('../../src/lists/map');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const absolutepaths = ['/', '/home'];
const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];
const double = fake( x => (x*2) );

describe( 'lists/map()', function() {

        beforeEach(function () {
            double.resetHistory();
        })

        it('should be curried with unary arity',
            function() {
                should.return.a.function(map, double)
                should.return.an.iterable( map(double), numbers1to10 );
            }
        )
        
        it('should throw if the mapfunc is not a function', function() {
            
            should.throw(map, 0, numbers1to10);
            should.throw(map, {}, numbers1to10);
            should.throw(map, -1, numbers1to10);
            should.throw(map, 1.3, numbers1to10);
            should.throw(map, null, numbers1to10);
            should.throw(map, undefined, numbers1to10);
            should.throw(map, 1n, numbers1to10);
        })

        it(`should throw if the source list has no map()-method and is not iterable`, function() {
            
            should.throw(map, double, {});
            should.throw(map, double, null);
            should.throw(map, double, map);
            should.throw(map, double, { map:'notamethod' });
        })

        it(`should call the source list's map() method if it has one and return the result`, function() {

            const fakemap = fake(x=>x);
            const sourcelist = { map:fakemap }

            should.return(double, map, double, sourcelist);
            should.be.called(fakemap);
        })

        it('should return an iterable, non-Array object if the source list does not have a map() method', function() {

            const numbers1to10list = { [Symbol.iterator]:Array.prototype.values.bind(numbers1to10) };
            const mapresult = map(double, numbers1to10list);

            should.be.iterable(mapresult);
            should.not.be.an.Array(mapresult);
        })

        describe( 'The iterable returned by map()', function() {

            it('should call the mapfunc for each item in the source list', function() {

                map(double, numbers1to10);

                should.be(numbers1to10.length, double.callCount);
            })

            it('should produce an item foreach item in the source list', function() {
                
                map(double, numbers1to10);

                should.be(numbers1to10.length, double.callCount);
            })

            it('should be empty if the source list is empty', function() {
                should.be.empty( map(double, []) );
            })

            it('should be a lazy iterable if the source list is not an array', function() {

                const numbers1to10copy = numbers1to10.slice();
                const numbers1to10list = { [Symbol.iterator]:Array.prototype.values.bind(numbers1to10copy) };

                const doublednumbers = map(double, numbers1to10list);
                
                should.be(10, [...doublednumbers].length);
                
                numbers1to10copy.length = 5;
                
                should.be(5, [...doublednumbers].length);
            })
        });

    }
);