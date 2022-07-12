const expect = require('chai').expect;
const separate = require('../separate');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const iseven = spy(
    function iseven(x) {
        return (x%2) === 0;
    }
)

const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];

describe(`separate()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should be curried with binary arity`,
        function () {
            const curried = separate(iseven);
            expect(curried).to.be.a('function');

            const result = curried(numbers1to10);
            expect(result).to.be.an('array');
        }
    )

    it(`should return a two-dimensional array with two items`,
        function () {
            const result = separate(iseven, numbers1to10);
            expect(result).to.be.an('array').with.length(2);
            expect(result[0]).to.be.an('array').with.length(5);
            expect(result[1]).to.be.an('array').with.length(5);
        }
    )

    it(`should call the predicate for each item in the list`,
        function () {
            separate(iseven, numbers1to10);
            expect(iseven.callCount).to.be.equal(numbers1to10.length);
        }
    )

    it(`should throw if the predicate is not a function`,
        function () {
            expect( ()=>separate({}, numbers1to10)).to.throw();
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>separate(iseven, {})).to.throw();
        }
    )

    describe(`the returned array`, function() {

        beforeEach(
            function() {
                sandbox.resetHistory();
            }
        )

        it(`should contain an array of all matching items in the first element`,
            function () {
                const result = separate(iseven, numbers1to10);
                expect(result[0]).to.deep.equal([2,4,6,8,10]);
            }
        )

        it(`should contain an array of all non-matching items in the second element`,
            function () {
                const result = separate(iseven, numbers1to10);
                expect(result[0]).to.deep.equal([2,4,6,8,10]);
            }
        )

    })
})