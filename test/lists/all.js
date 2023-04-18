const all = require('../../src/lists/all');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const numbers1to10_array = [1,2,3,4,5,6,7,8,9,10];

function* numbers1to10_list() {
    yield* numbers1to10_array;
}

const isnumber = spy( function isnumber(x) { return typeof x ==='number'; } )
const islessthan = spy( function islessthan(num, x) { return (x < num); } )

describe('all()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            islessthan.resetHistory();
        }
    )

    it('should return true if the list is empty',
        function() {
            expect( all(isnumber, []) ).to.be.true;
            expect( isnumber.callCount ).to.be.equal(0);
        }
    )

    it('should return true if the predicate returns true for each item in the list',
        function() {
            expect( all(isnumber, numbers1to10_array) ).to.be.true;
            expect( isnumber.callCount ).to.be.equal(10);
        }
    )

    it(`should always invoke the predicate with a single argument`,
        function() {

            const isnumber = spy((...args) => (throwifnotunary(args), typeof args[0] === 'number'));

            expect( ()=>all(isnumber, numbers1to10_array) ).not.to.throw();
            expect( ()=>all(isnumber, numbers1to10_list()) ).not.to.throw();
        }
    )

    it('should return false if the predicate returns false for one or more items in the list',
        function() {

            const islessthan10 = islessthan.bind(null, 10);
            expect( all(islessthan10, numbers1to10_array) ).to.be.false;
            expect( islessthan.callCount ).to.be.equal(10);

        }
    )

    it('should call the predicate once for each item in the list if the predicate returns true for each item',
        function() {
            const result = all(isnumber, numbers1to10_array);
            expect( result ).to.be.true;
            expect( isnumber.callCount ).to.be.equal(numbers1to10_array.length);
        }
    )

    it('should short-circuit if any predicate fails',
        function() {
            const islessthan5 = islessthan.bind(null, 5);
            const result = all(islessthan5, numbers1to10_array);
            expect( result ).to.be.false;
            expect( islessthan.callCount ).to.be.equal(5);
        }
    )

    it('should be curried with unary arity',
        function () {

            const result = all(isnumber);
            expect(result).to.be.a('function');
            expect( result(numbers1to10_array) ).to.be.true;
        }
    )

    it('should throw if the predicate is not a function',
        function () {
            expect( () => all(42, [1,2,3]) ).to.throw();
        }
    )

    it('should throw if the list is not iterable',
        function () {
            expect( () => all(isnumber, {}) ).to.throw();
        }
    )
})

function throwifnotunary(args) {
    if(args.length !== 1) throw new Error('The argument count is', args.length, '. Expected one argument.');
}