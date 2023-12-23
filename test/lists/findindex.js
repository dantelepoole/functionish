const findindex = require('../../src/lists/findindex');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const UNIQTHING = { label:'UNIQTHING' }

const numbers1to5 = Object.freeze([1,2,3,4,5]);

const id = fake(x=>x);
const iseven = fake(x => (x%2)===0);
const isobject = fake(x => typeof x === 'object');

describe('lists/findindex()', function() {

    beforeEach(
        function() {
            id.resetHistory();
            iseven.resetHistory();
            isobject.resetHistory();
        }
    )

    it('should be curried with unary arity',
        function() {
            should.return.a.function(findindex, iseven)
            should.return(1, findindex(iseven), numbers1to5);
        }
    )

    it('should throw if the predicate is not a function',
        function() {
            should.throw(findindex, null, numbers1to5)
            should.throw(findindex, {}, numbers1to5);
        }
    )

    it('should throw if the list is not iterable',
        function() {
            should.throw(findindex, iseven, {});
            should.throw(findindex, iseven, null);
        }
    )

    it(`should pass the predicate to the list's findIndex() method if it has one`,
        function() {
            
            const fakefindIndex = fake(x => x);
            const list = { findIndex:fakefindIndex }

            should.return(iseven, findindex, iseven, list);
            should.be.called(fakefindIndex);
            should.be.called.with([iseven], fakefindIndex);
        }
    )

    it('should return -1 if the list is empty without calling the predicate',
        function() {
            should.return(-1, findindex, iseven, []);
            should.not.be.called(iseven);
        }
    )

    it(`should return the index of the first list item for which the predicate function returns a truthy value`,
        function() {
            should.return(2, findindex, isobject, [42, 'fubar', UNIQTHING, id]);
            should.return(6, findindex, id, ['', null, 0, -0, undefined, false, UNIQTHING]);
        }
    )

    it(`should return -1 if the predicate function returns a falsy value for each list item`,
        function() {
            should.return(-1, findindex, id, '', null, 0, -0, undefined, false);
        }
    )

    it(`should call the predicate function once for each item up to and including the item returned (if any)`,
        function() {

            should.not.be.called(iseven);

            findindex(iseven, numbers1to5);
            should.be(2, iseven.callCount);

            findindex(iseven, [1,1,1,1,1,6]);
            should.be(8, iseven.callCount);

            findindex(iseven, [1,1,1,1,1]);
            should.be(13, iseven.callCount);
        }
    )
})