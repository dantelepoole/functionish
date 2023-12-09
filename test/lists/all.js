const all = require('../../src/lists/all');
const dispatch = require('../../lib/test/dispatch');
const expect = require('chai').expect;
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const numbers1to10_array = [1,2,3,4,5,6,7,8,9,10];
const numbers1to10_list = { [Symbol.iterator]:Array.prototype.values.bind(numbers1to10_array) }

const isnumber = fake( x => typeof x ==='number' );
const islessthan = fake( (num, x) => (x < num) );

const islessthan10 = islessthan.bind(null, 10);
const islessthan5 = islessthan.bind(null, 5);

describe('all()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            islessthan.resetHistory();
        }
    )

    it('should return true if the list is empty',
        function() {
            should.return.true(all, isnumber, []);
            should.return.true(all, isnumber, { [Symbol.iterator]:Array.prototype.values.bind([]) })
            should.not.be.called(isnumber);
        }
    )

    it('should return true if the predicate returns true for each item in the list',
        function() {
            should.return.true(all, isnumber, numbers1to10_array);
            should.return.true(all, isnumber,numbers1to10_list);
        }
    )

    it('should return false if the predicate returns false for one or more items in the list',
        function() {

            should.return.false(all, islessthan10, numbers1to10_array);
            should.return.false(all, islessthan10, numbers1to10_list);
        }
    )

    it('should call the predicate once for each item in the list if all() returns true',
        function() {
            should.return.true(all, isnumber, numbers1to10_array);
            should.be(10, isnumber.callCount);

            should.return.true(all, isnumber, numbers1to10_list);
            should.be(20, isnumber.callCount);
        }
    )

    it('should short-circuit if any predicate fails',
        function() {

            should.return.false(all, islessthan5, numbers1to10_array);
            should.be(5, islessthan.callCount);

            should.return.false(all, islessthan5, numbers1to10_list);
            should.be(10, islessthan.callCount);
        }
    )

    it('should be curried with unary arity',
        function () {

            should.be.a.function( all(isnumber) );
            should.be.a.boolean( dispatch( all(isnumber), numbers1to10_array ) );
            
        }
    )

    it('should throw if the predicate is not a function',
        function () {
            should.throw(all, 41, numbers1to10_array);
        }
    )

    it('should throw if the list is not iterable',
        function () {
            should.throw(all, isnumber, {});
        }
    )
})