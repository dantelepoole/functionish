const all = require('../../src/lists/all');
const dispatch = require('../../lib/test/dispatch');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const paths = ['/', '/home', '../'];
const emptylist = { [Symbol.iterator]:Array.prototype.values.bind([]) }
const list1to10 = { [Symbol.iterator]:Array.prototype.values.bind([1,2,3,4,5,6,7,8,9,10]) }

const isnumber = fake( x => typeof x ==='number' );
const islessthan = fake( (num, x) => (x < num) );

const islessthan10 = islessthan.bind(null, 10);
const islessthan5 = islessthan.bind(null, 5);

describe('lists/all()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            islessthan.resetHistory();
        }
    )

    it('should return true if the list is empty',
        function() {
            should.return.true(all, isnumber, emptylist)
            should.not.be.called(isnumber);
        }
    )

    
    it('should throw if the predicate is not a function, a string or null/undefined', function() {
        should.throw(all, 42, paths);
        should.throw(all, {}, paths);
        should.throw(all, paths, paths);
    })
    
    it('should throw if the predicate is a string that does not resolve to a function in a package or file module', function() {
        
        should.throw(all, 'path#FuBar', paths);
        should.throw(all, 'path#delimiter', paths);
    })
    
    it('should throw if the list is not iterable',
        function () {
            should.throw(all, isnumber, {});
        }
    )

    it('should return true if the predicate returns true for each item in the list',
        function() {
            should.return.true(all, isnumber,list1to10);
        }
    )

    it('should return false if the predicate returns false for one or more items in the list',
        function() {
            should.return.false(all, islessthan10, list1to10);
        }
    )

    it('should call the predicate once for each item in the list if all() returns true',
        function() {
            should.return.true(all, isnumber, list1to10);
            should.be(10, isnumber.callCount);
        }
    )

    it('should short-circuit if any predicate fails',
        function() {

            should.return.false(all, islessthan5, list1to10);
            should.be(5, islessthan.callCount);
        }
    )

    it('should be curried with unary arity',
        function () {

            should.be.a.function( all(isnumber) );
            should.be.a.boolean( dispatch( all(isnumber), list1to10 ) );
            
        }
    )

    it(`should test the list item's boolish values if the predicate is null or undefined`,
        function () {

            should.return.true(all, null, list1to10);
            should.return.true(all, undefined, list1to10);
            should.return.false(all, null, [0, ...list1to10]);
            should.return.false(all, undefined, [0, ...list1to10]);
        }
    )
})