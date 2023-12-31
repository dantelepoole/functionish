const separate = require('../../src/lists/separate');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const paths = ['/', '/home', '../'];

const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];
const numbers1to10list = { [Symbol.iterator]:numbers1to10.values.bind(numbers1to10) }

const evenumbers1to10 = [2,4,6,8,10];
const oddnumbers1to10 = [1,3,5,7,9];

const iseven = fake( x => (x%2) === 0 );

describe( 'lists/separate()', function() {

        beforeEach(function () {
            iseven.resetHistory();
        })

        it('should be curried with unary arity',
            function() {
                should.return.a.function(separate, iseven)
                should.return.an.Array(separate(iseven), numbers1to10list);
            }
        )
        
        it('should throw if the predicate is not a function nor a string', function() {
            
            should.throw(separate, 0, numbers1to10);
            should.throw(separate, {}, numbers1to10);
            should.throw(separate, -1, numbers1to10);
            should.throw(separate, 1.3, numbers1to10);
            should.throw(separate, null, numbers1to10);
            should.throw(separate, undefined, numbers1to10);
            should.throw(separate, 1n, numbers1to10);
        })

        it('should throw if the predicate is a string that does not resolve to a function in a package or file module', function() {
            
            should.throw(separate, 'path#FuBar', numbers1to10);
            should.throw(separate, 'path#delimiter', numbers1to10);
        })

        it(`should throw if the source list is not iterable`, function() {
            
            should.throw(separate, iseven, {});
            should.throw(separate, iseven, null);
            should.throw(separate, iseven, separate);
        })

        it('should call the predicate once for each item in the source list', function() {

            should.not.be.called(iseven);
            
            separate(iseven, numbers1to10);

            should.be(numbers1to10.length, iseven.callCount);

        })

        it('should return a two-element array with the predicate-matching items in the first element-array and the others in the second element-array', function() {

            const [evenitems, odditems] = separate(iseven, numbers1to10list);

            should.be.like(evenumbers1to10, evenitems);
            should.be.like(oddnumbers1to10, odditems);

        })
    }
);