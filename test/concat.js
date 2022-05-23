const expect = require('chai').expect;
const concat = require('../concat');
const isiterable = require('../isiterable');
const range = require('../range');

const marker = Object.freeze({});

function toarray(iterable) {
    expect( isiterable(iterable) || (typeof iterable === 'string') ).to.be.true;
    return Array.from(iterable);
}

function* emptyiterable() {
    // noop
}

describe('concat()', function() {

    beforeEach(
        function() {

        }
    )

    it('should pass its second argument to the concat() method of its first argument and return the result',
        function () {
            const list1 = { concat: (arg) => { return arg } };
            const result = concat(list1, marker);

            expect(result).to.be.equal(marker);
        }
    )

    it('should return an iterable combining both arguments if the first argument does not have a concat() method',
        function () {
            expect( toarray( concat( range(3), range(3) ) ) ).to.be.deep.equal([1,2,3,1,2,3])
        }
    )

    it('should return a new array containing the items of its first argument followed by those of the second argument',
        function () {
            
            const list1 = [1,2,3];
            const list2 = [4,5,6];

            const result = concat(list1, list2);

            expect(result).to.be.deep.equal( [...list1, ...list2] );
            expect(result).not.to.be.equal(list1);
            expect(result).not.to.be.equal(list2);
        }
    )

    it('should return an empty array if both arguments are empty arrays',
        function () {
            expect( concat([], []) ).to.be.deep.equal( [] );
        }
    )

    it('should return an empty string if both arguments are empty strings',
        function () {
            expect( concat('', '') ).to.be.equal('');
        }
    )

    it('should return an empty iterable if both arguments are empty iterables',
        function () {
            expect( toarray( concat(emptyiterable(), []) ) ).to.be.deep.equal( [] );
        }
    )

    it('should be curried',
        function () {

            const curried = concat([1,2,3]);
            expect(curried).to.be.a('function');

            const result = curried([4,5,6]);
            expect(result).to.be.deep.equal([1,2,3,4,5,6])
        }
    )

    })