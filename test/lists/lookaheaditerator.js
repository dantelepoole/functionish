const lookaheaditerator = require('../../src/lists/lookaheaditerator');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const numbers1to5 = Object.freeze([1,2,3,4,5]);

const isiteratorobject = obj => (typeof obj?.next === 'function');

describe( 'lists/lookaheaditerator()', function() {

        beforeEach(function () {})
        
        it('should throw if the source is not an iterable object',
            function() {

                should.throw(lookaheaditerator, {});
                should.throw(lookaheaditerator, null);
                should.throw(lookaheaditerator);
                should.throw(lookaheaditerator, 42);

                should.not.throw(lookaheaditerator, numbers1to5);
            }
        )

        it('should return an iterator object', function() {
          
            const iterator = lookaheaditerator(numbers1to5);

            should.be.true( isiteratorobject(iterator) );
        })

        describe( 'The iterator object returned by lookaheaditerator()', function() {

            it(`should iterate over the source's items`, function() {
                should.be.like(numbers1to5, [...lookaheaditerator(numbers1to5)]);
            })

            it(`should be iterable`, function() {
                should.return.an.iterable(lookaheaditerator, numbers1to5);
            })

            it(`should be it's own iterator object`, function() {

                const iterator = lookaheaditerator(numbers1to5);
                should.be(iterator, iterator[Symbol.iterator]());
            })

            it(`should peek() the next object to be returned by it's next() method`, function() {

                const iterator = lookaheaditerator(numbers1to5);

                const obj = iterator.peek();
                should.be(1, obj.value);
                should.be(obj, iterator.next());
                should.not.be(obj, iterator.next());
            })

            it(`should have a done-property that is false until the last item has been produced`, function() {

                const iterator = lookaheaditerator(numbers1to5);

                should.be.false(iterator.done);
                iterator.next();

                should.be.false(iterator.done);
                iterator.next();

                should.be.false(iterator.done);
                iterator.next();

                should.be.false(iterator.done);
                iterator.next();

                should.be.false(iterator.done);
                iterator.next();

                should.be.true(iterator.done);
            })

            it(`should have a hasnext-property that is true until the last item has been produced`, function() {

                const iterator = lookaheaditerator(numbers1to5);

                should.be.true(iterator.hasnext);
                iterator.next();

                should.be.true(iterator.hasnext);
                iterator.next();

                should.be.true(iterator.hasnext);
                iterator.next();

                should.be.true(iterator.hasnext);
                iterator.next();

                should.be.true(iterator.hasnext);
                iterator.next();

                should.be.false(iterator.hasnext);
            })
            
            it(`should have a count-property that holds the index of the item returned by the next call to the next() method`, function() {

                const iterator = lookaheaditerator(numbers1to5);

                should.be(0, iterator.count);
                iterator.next();

                should.be(1, iterator.count);
                iterator.next();

                should.be(2, iterator.count);
                iterator.next();

                should.be(3, iterator.count);
                iterator.next();

                should.be(4, iterator.count);
                iterator.next();
            })

            it(`should have a count-property that holds the total number of items after the iteration is done`, function() {

                const iterator = lookaheaditerator(numbers1to5);

                iterator.next();
                iterator.next();
                iterator.next();
                iterator.next();
                iterator.next();

                should.be(5, iterator.count);
                iterator.next();
                should.be(5, iterator.count);
            })
        });

    }
);