const expect = require('chai').expect;
const isoutofbounds = require('../isoutofbounds');

const teststring = 'Hari Seldon';
const testarray = [1,2,3,4,5];

describe(`isoutofbounds()`, function() {

    it(`should be curried with binary arity`,
        function () {
            const curried = isoutofbounds(testarray);
            expect(curried).to.be.a('function');
            expect( curried(3) ).to.be.false;
        }
    )

    it(`should return false if the index lies between 0 (inclusive) and the indexable's length (exclusive)`,
        function () {
            expect( isoutofbounds(testarray, 0) ).to.be.false;
            expect( isoutofbounds(testarray, 1) ).to.be.false;
            expect( isoutofbounds(testarray, 2) ).to.be.false;
            expect( isoutofbounds(testarray, 3) ).to.be.false;
            expect( isoutofbounds(testarray, 4) ).to.be.false;
            expect( isoutofbounds(testarray, testarray.length-1) ).to.be.false;
        }
    )

    it(`should return true if the index is less than 0 and greater than or equal to the indexable's length`,
        function () {
            expect( isoutofbounds(testarray, -1) ).to.be.true;
            expect( isoutofbounds(testarray, testarray.length) ).to.be.true;
            expect( isoutofbounds(testarray, testarray.length + 1) ).to.be.true;
        }
    )

    it(`should work with arrays`,
        function () {
            expect( isoutofbounds(testarray, -1) ).to.be.true;
            expect( isoutofbounds(testarray, testarray.length) ).to.be.true;
            expect( isoutofbounds(testarray, 0) ).to.be.false;
            expect( isoutofbounds(testarray, testarray.length - 1) ).to.be.false;
        }
    )

    it(`should work with strings`,
        function () {
            expect( isoutofbounds(teststring, -1) ).to.be.true;
            expect( isoutofbounds(teststring, teststring.length) ).to.be.true;
            expect( isoutofbounds(teststring, 0) ).to.be.false;
            expect( isoutofbounds(teststring, teststring.length - 1) ).to.be.false;
        }
    )

    it(`should work any argument that has a numeric 'length'-property`,
        function () {
            const indexable = { length:3 };

            expect( isoutofbounds(indexable, -1) ).to.be.true;
            expect( isoutofbounds(indexable, indexable.length) ).to.be.true;
            expect( isoutofbounds(indexable, 0) ).to.be.false;
            expect( isoutofbounds(indexable, indexable.length - 1) ).to.be.false;
        }
    )

    it(`should always return true for an argument that does not have a 'length'-property`,
        function () {
            const indexable = {};

            expect( isoutofbounds(indexable, -1) ).to.be.true;
            expect( isoutofbounds(indexable, indexable.length) ).to.be.true;
            expect( isoutofbounds(indexable, 0) ).to.be.true;
            expect( isoutofbounds(indexable, indexable.length - 1) ).to.be.true;
        }
    )

    it(`should throw if the argument is null or undefined`,
        function () {
            expect( () => isoutofbounds(null, 3) ).to.throw();
            expect( () => isoutofbounds(undefined, 3) ).to.throw();
        }
    )
})