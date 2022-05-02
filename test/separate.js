const expect = require('chai').expect;
const separate = require('../separate');

function iseven(x) {
    return (x%2) === 0;
}

function isvowel(char) {
    return ['a','e','i','o','u'].includes(char);
}

const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];

describe(`separate()`, function() {

    it(`should be curried with binary arity`,
        function () {
            const curried = separate(iseven);
            expect(curried).to.be.a('function');

            const result = curried(numbers1to10);
            expect(result).to.be.an('Array');
        }
    )

    it(`should return an array with two items`,
        function () {
            const result = separate(iseven, numbers1to10);
            expect(result).to.be.an('array').with.lengthOf(2);
        }
    )

    it(`should return an array with the array of all matching items in the first item`,
        function () {
            const result = separate(iseven, numbers1to10);
            expect(result[0]).to.be.deep.equal([2,4,6,8,10]);
        }
    )

    it(`should return an array with the array of all non-matching items in the second item`,
        function () {
            const result = separate(iseven, numbers1to10);
            expect(result[1]).to.be.deep.equal([1,3,5,7,9]);
        }
    )

    it(`should throw if the predicate is not a function`,
        function () {
            expect(
                () => separate({}, numbers1to10)
            ).to.throw();
        }
    )

    it(`should accept an iterable as the list`,
        function () {
            const result = separate(isvowel, 'dante le poole');
            expect(result[0]).to.be.deep.equal(['a', 'e', 'e', 'o', 'o', 'e']);
            expect(result[1]).to.be.deep.equal(['d', 'n', 't', ' ', 'l', ' ', 'p', 'l']);
        }
    )
})