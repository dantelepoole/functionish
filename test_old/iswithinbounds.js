const expect = require('chai').expect;
const iswithinbounds = require('../iswithinbounds');

const teststring = 'Hari Seldon';
const testarray = [1,2,3,4,5];

describe(`iswithinbounds()`, function() {

    it(`should be curried with binary arity`,
        function () {
            const curried = iswithinbounds(testarray);
            expect(curried).to.be.a('function');
            expect( curried(3) ).not.to.be.a('function');
            expect( curried(3) ).to.be.true;
        }
    )

    it(`should return true if the index lies between 0 (inclusive) and the indexable's length (exclusive)`,
        function () {
            expect( iswithinbounds(testarray, 0) ).to.be.true;
            expect( iswithinbounds(testarray, 1) ).to.be.true;
            expect( iswithinbounds(testarray, 2) ).to.be.true;
            expect( iswithinbounds(testarray, 3) ).to.be.true;
            expect( iswithinbounds(testarray, 4) ).to.be.true;
            expect( iswithinbounds(testarray, testarray.length-1) ).to.be.true;
        }
    )

    it(`should return false if the index is less than 0 and greater than or equal to the indexable's length`,
        function () {
            expect( iswithinbounds(testarray, -1) ).to.be.false;
            expect( iswithinbounds(testarray, testarray.length) ).to.be.false;
            expect( iswithinbounds(testarray, testarray.length + 1) ).to.be.false;
        }
    )

    it(`should work with arrays`,
        function () {
            expect( iswithinbounds(testarray, -1) ).to.be.false;
            expect( iswithinbounds(testarray, testarray.length) ).to.be.false;
            expect( iswithinbounds(testarray, 0) ).to.be.true;
            expect( iswithinbounds(testarray, testarray.length - 1) ).to.be.true;
        }
    )

    it(`should work with strings`,
        function () {
            expect( iswithinbounds(teststring, -1) ).to.be.false;
            expect( iswithinbounds(teststring, teststring.length) ).to.be.false;
            expect( iswithinbounds(teststring, 0) ).to.be.true;
            expect( iswithinbounds(teststring, teststring.length - 1) ).to.be.true;
        }
    )

    it(`should work with any indexable object that has a numeric 'length'-property`,
        function () {
            const indexable = { length:3 };

            expect( iswithinbounds(indexable, -1) ).to.be.false;
            expect( iswithinbounds(indexable, indexable.length) ).to.be.false;
            expect( iswithinbounds(indexable, 0) ).to.be.true;
            expect( iswithinbounds(indexable, indexable.length - 1) ).to.be.true;
        }
    )

    it(`should throw for an object that does not have a 'length'-property`,
        function () {
            expect( ()=>iswithinbounds({}, 0) ).to.throw();
        }
    )

    it(`should use indexable as the length if it is a number`,
        function () {
            expect( iswithinbounds(42, -1) ).to.be.false;
            expect( iswithinbounds(42, 42) ).to.be.false;
            expect( iswithinbounds(42, 0) ).to.be.true;
            expect( iswithinbounds(42, 41) ).to.be.true;
        }
    )

    it(`should throw if the argument is null or undefined or NaN`,
        function () {
            expect( ()=>iswithinbounds(null, 3) ).to.throw();
            expect( ()=>iswithinbounds(undefined, 3) ).to.throw();
            expect( ()=>iswithinbounds(NaN, 3) ).to.throw();
        }
    )
})