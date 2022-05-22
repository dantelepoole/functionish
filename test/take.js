const expect = require('chai').expect;
const take = require('../take');
const isiterable = require('../isiterable');

describe(`take()`, function() {

    it(`should be curried with binary arity`,
        function () {
            const curried = take(3);
            expect(curried).to.be.a('function');

            expect(curried('foobar')).to.be.equal('foo');
        }
    )

    it(`should return a string with the first specified number of characters if the iterable argument is a string`,
        function () {
            expect( take(3, 'foobar') ).to.be.equal('foo');
        }
    )

    it(`should return an array with the first specified number of items if the iterable argument is an iterable`,
        function () {
            expect( take(3, [1,2,3,4,5]) ).to.be.deep.equal([1,2,3]);
        }
    )

    it(`should throw if the iterable argument is not iterable`,
        function () {
            expect( ()=>take(3,{}) ).to.throw();
        }
    )

    it(`should convert its first argument to 0 if it is negative`,
        function () {
            const result = take(-3, 'foobar');
            expect(result).to.be.equal('');
        }
    )
})