const expect = require('chai').expect;
const isempty = require('../isempty');

describe(`isempty()`, function() {

    it(`should return true if its argument has a length-property that is equal to 0`,
        function () {
            expect( isempty([]) ).to.be.true;
            expect( isempty('') ).to.be.true;
            expect( isempty( {length:0} )).to.be.true;
            expect( isempty( ()=>{} )).to.be.true;
        }
    )

    it(`should return false if its argument has a length-property that is not equal to 0`,
        function () {
            expect( isempty([1]) ).to.be.false;
            expect( isempty(' ') ).to.be.false;
            expect( isempty( {length:1} )).to.be.false;
            expect( isempty( (a,b)=>(a+b) )).to.be.false;
        }
    )

    it(`should return true if its argument has a size-property that is equal to 0`,
        function () {
            expect( isempty(new Map()) ).to.be.true;
            expect( isempty(new Set()) ).to.be.true;
            expect( isempty( {size:0} )).to.be.true;
        }
    )

    it(`should return false if its argument has a size-property that is not equal to 0`,
        function () {
            expect( isempty(new Map([[1],[2]])) ).to.be.false;
            expect( isempty(new Set([1])) ).to.be.false;
            expect( isempty( {size:1} )).to.be.false;
        }
    )

    it(`should return false if its argument does not have a length or size property`,
        function () {
            expect( isempty({}) ).to.be.false;
            expect( isempty(false) ).to.be.false;
            expect( isempty(null) ).to.be.false;
            expect( isempty(undefined) ).to.be.false;
            expect( isempty(0) ).to.be.false;
            expect( isempty(-0) ).to.be.false;
            expect( isempty(0n) ).to.be.false;
            expect( isempty(NaN) ).to.be.false;
        }
    )
})
