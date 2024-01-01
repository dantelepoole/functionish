const reverse = require('../../src/lists/reverse');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);
const numbers1to10list = { [Symbol.iterator]:numbers1to10.values.bind(numbers1to10) }
const numbers1to10reversed = Object.freeze([...numbers1to10].reverse());

describe( 'lists/reverse()', function() {

        beforeEach(function () {
        })
        
        it(`should throw if the source list has no reverse()-method and is not iterable`, function() {
            
            should.throw(reverse, {});
            should.throw(reverse, null);
            should.throw(reverse, reverse);
            should.throw(reverse, { filter:'notamethod' });
        })

        it(`should call the source list's reverse() method if it has one and return the result`, function() {

            const fakereverse = fake(x=>x);

            const sourcelist = { reverse:fakereverse }
            reverse(sourcelist);

            should.be.called(fakereverse);
        })

        it(`should return a reversed string if the source list is a string`, function() {

            const reversed = reverse('fubar');

            should.be.a.string(reversed);
            should.be('rabuf', reversed);
        })

        it('should return an iterable, non-Array object if the source list does not have a reverse() method', function() {

            const reversedlist = reverse(numbers1to10list);

            should.be.iterable(reversedlist);
            should.not.be.an.Array(reversedlist);
        })

        describe( 'The iterable returned by reverse()', function() {

            it('should produce the items from the source list in reverse order', function() {
                should.be.like( numbers1to10reversed, [...reverse(numbers1to10list)] );
            })

            it('should be empty if the source list is empty', function() {
                should.be.empty( reverse([]) );
            })

            it('should be a lazy iterable if the source list is not an array', function() {

                const numbers1to10copy = [...numbers1to10];
                const numbers1to10listcopy = { [Symbol.iterator]:Array.prototype.values.bind(numbers1to10copy) };

                const reversedlist = reverse(numbers1to10listcopy);
                
                should.be.like(numbers1to10reversed, [...reversedlist]);
                
                numbers1to10copy.push(42);
                should.be.like( [42, ...numbers1to10reversed], [...reversedlist]);
            })
        });

    }
);