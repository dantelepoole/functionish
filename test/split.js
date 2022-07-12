const expect = require('chai').expect;
const split = require('../split');

describe(`split()`, function() {

    it(`should be curried with binary arity`,
        function () {
            const curried = split('a');
            expect(curried).to.be.a('function');
            expect( curried('foobar') ).to.be.an('array');
        }
    )

    it(`should throw if the source is not a string`,
        function () {
            expect( ()=>split('a', {}) ).to.throw();
        }
    )

    it(`should split the source string on the separator string`,
        function () {
            expect( split(' ', 'Hari Seldon') ).to.be.deep.equal(['Hari', 'Seldon']);
            expect( split('3', '12345367389') ).to.be.deep.equal(['12', '45','67','89']);
        }
    )

    it(`should return a single item array containing the source if the source does not contain the separator string`,
        function () {
            expect( split('z', 'Hari Seldon') ).to.be.deep.equal(['Hari Seldon']);
        }
    )

    it(`should return an array containing source's individual characters if the separator is an empty string`,
        function () {
            expect( split('', 'Hari') ).to.be.deep.equal(['H','a','r','i']);
        }
    )

    it(`should convert the separator to a string if it is not a string already`,
        function () {
            expect( split(3, '12345367389') ).to.be.deep.equal(['12', '45','67','89']);
        }
    )

    it(`should return an array containing two empty strings if the separator and the source are equal`,
        function () {
            expect( split('Hari', 'Hari') ).to.be.deep.equal(['', '']);
        }
    )
})