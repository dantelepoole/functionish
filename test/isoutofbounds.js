const expect = require('chai').expect;
const isoutofbounds = require('../isoutofbounds');

const testarray = Object.freeze( [1,2,3,4,5] );
const teststring = 'foobar';

describe(`isoutofbounds()`, function() {

    it(`should be curried with binary arity`,
        function () {
            const curried = isoutofbounds(testarray);
            expect(curried).to.be.a('function');
            expect( curried(3) ).not.to.be.a('function');
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

    it(`should return true if the index is less than 0 or greater than or equal to the indexable's length`,
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

    it(`should work any object that has a numeric 'length'-property`,
        function () {
            const indexable = { length:3 };

            expect( isoutofbounds(indexable, -1) ).to.be.true;
            expect( isoutofbounds(indexable, indexable.length) ).to.be.true;
            expect( isoutofbounds(indexable, 0) ).to.be.false;
            expect( isoutofbounds(indexable, indexable.length - 1) ).to.be.false;
        }
    )

    it(`should throw if the indexable not have a 'length'-property`,
        function () {
            expect( () => isoutofbounds({}, 0) ).to.throw();
        }
    )

    it(`should throw if the indexable's 'length'-property is not numeric`,
        function () {
            expect( () => isoutofbounds({ length:'foobar'} , 0) ).to.throw();
        }
    )

    it(`should throw if the index is not a number or if it is NaN`,
        function () {
            expect( isoutofbounds(testarray, 'foobar') ).to.be.true;
            expect( isoutofbounds(teststring, 'foobar') ).to.be.true;
        }
    )
})