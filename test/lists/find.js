const find = require('../../src/lists/find');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const UNIQTHING = { label:'UNIQTHING' }

const paths = ['/', '/home', '../'];
const numbers1to5 = Object.freeze([1,2,3,4,5]);

const id = fake(x=>x);
const iseven = fake(x => (x%2)===0);
const isobject = fake(x => typeof x === 'object');

describe('lists/find()', function() {

    beforeEach(
        function() {
            id.resetHistory();
            iseven.resetHistory();
            isobject.resetHistory();
        }
    )

    it('should be curried with unary arity',
        function() {
            should.return.a.function(find, iseven)
            should.return(2, find(iseven), numbers1to5);
        }
    )

    it('should throw if the predicate is not a function or a string',
        function() {
            should.throw(find, null, numbers1to5)
            should.throw(find, {}, numbers1to5);
        }
    )

    it('should throw if the predicate is a string that does not resolve to a function in a package or file module', function() {
            
        should.throw(find, 'path#FuBar', paths);
        should.throw(find, 'path#delimiter', paths);
    })

    it('should throw if the list is not iterable',
        function() {
            should.throw(find, iseven, {});
            should.throw(find, iseven, null);
        }
    )

    it('should resolve a string predicate argument to a function in a package', function() {
            
        const sourcelist = { [Symbol.iterator]:paths.values.bind(paths) }
        const result = find('path#isAbsolute', sourcelist);

        should.be('/', result);
    })

    it(`should pass the predicate to the list's find() method if it has one`,
        function() {
            
            const fakefind = fake(x => x);
            const list = { find:fakefind }

            should.return(iseven, find, iseven, list);
            should.be.called(fakefind);
            should.be.called.with([iseven], fakefind);
        }
    )

    it('should return undefined if the list is empty without calling the predicate',
        function() {
            should.return.undefined(find, iseven, []);
            should.not.be.called(iseven);
        }
    )

    it(`should return the first list item for which the predicate function returns a truthy value`,
        function() {
            should.return(UNIQTHING, find, isobject, [42, 'fubar', UNIQTHING, id]);
            should.return(UNIQTHING, find, id, ['', null, 0, -0, undefined, false, UNIQTHING]);
        }
    )

    it(`should return undefined if the predicate function returns a falsy value for each list item`,
        function() {
            should.return.undefined(find, id, '', null, 0, -0, undefined, false);
        }
    )

    it(`should call the predicate function once for each item up to and including the item returned (if any)`,
        function() {

            should.not.be.called(iseven);

            find(iseven, numbers1to5);
            should.be(2, iseven.callCount);

            find(iseven, [1,1,1,1,1,6]);
            should.be(8, iseven.callCount);

            find(iseven, [1,1,1,1,1]);
            should.be(13, iseven.callCount);
        }
    )
})