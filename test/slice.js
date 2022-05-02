const expect = require('chai').expect;
const slice = require('../slice');

const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];

describe(`slice()`, function() {

    it(`should be curried with ternary arity`,
        function () {
            const curried = slice(0);
            expect(curried).to.be.a('function');

            const curried2 = curried(numbers1to10.length);
            expect(curried2).to.be.a('function');

            expect( curried2(numbers1to10) ).to.be.an('array');
        }
    )

    it(`should return the section of the input array between the startindex (inclusive) and the endindex (exclusive)`,
        function () {
            let result = slice(2, 7, numbers1to10);
            expect(result).to.be.deep.equal([3,4,5,6,7]);
        }
    )

    it(`should set endindex to the input array's length if endindex is a falsy value`,
        function () {
            expect( slice(0, 0, numbers1to10) ).to.be.deep.equal(numbers1to10);
            expect( slice(0, -0, numbers1to10) ).to.be.deep.equal(numbers1to10);
            expect( slice(0, null, numbers1to10) ).to.be.deep.equal(numbers1to10);
            expect( slice(0, undefined, numbers1to10) ).to.be.deep.equal(numbers1to10);
            expect( slice(0, NaN, numbers1to10) ).to.be.deep.equal(numbers1to10);
            expect( slice(0, 0n, numbers1to10) ).to.be.deep.equal(numbers1to10);
            expect( slice(0, '', numbers1to10) ).to.be.deep.equal(numbers1to10);
            expect( slice(0, false, numbers1to10) ).to.be.deep.equal(numbers1to10);
        }
    )

    it(`should accept negative endindices`,
        function () {
            expect( slice(0, -1, numbers1to10) ).to.be.deep.equal([1,2,3,4,5,6,7,8,9]);
            expect( slice(0, -10, numbers1to10) ).to.be.deep.equal([]);
            expect( slice(0, -7, numbers1to10) ).to.be.deep.equal([1,2,3]);
            expect( slice(0, -5, numbers1to10) ).to.be.deep.equal([1,2,3,4,5]);
            expect( slice(0, 5, numbers1to10) ).to.be.deep.equal([1,2,3,4,5]);
        }
    )

    it(`should the startindex and endindex to the slice() method of the list argument`,
        function () {
            let wasinvoked = false;
            const obj = {
                slice(arg1, arg2) {
                    wasinvoked = true;
                    expect(arg1).to.be.equal(42);
                    expect(arg2).to.be.equal(-42);
                    return 'foobar';
                }
            }

            slice(42,-42,obj);
            expect(wasinvoked).to.be.true;
        }
    )

    it(`should throw if the list argument has no slice() method`,
        function () {
            expect( () => slice(0,0,{}) ).to.throw();
        }
    )

    it(`should work with strings`,
        function () {
            expect( slice(0,3, 'Hari Seldon') ).to.be.equal('Har');
        }
    )
})