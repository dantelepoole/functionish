const expect = require('chai').expect;
const tail = require('../tail');
const isiterable = require('../isiterable');

function* range(count) {

    let counter = 0;

    while( counter < count ) yield ++counter;

}

describe(`tail()`, function() {

    it(`should return an array without the iterable's first element if the iterable is an array`,
        function () {
            expect( tail([1,2,3,4,5]) ).to.be.deep.equal([2,3,4,5]);
        }
    )

    it(`should return a string without the iterable's first character if the iterable is a string`,
        function () {
            expect( tail('foobar') ).to.be.equal('oobar');
        }
    )

    it(`should return an iterable without the iterable's first item if the iterable is neither an array nor a string`,
        function () {
            const result = tail( range(5) );
            expect( isiterable(result) ).to.be.true;
            expect( Array.from(result) ).to.be.deep.equal([2,3,4,5]);
        }
    )
})