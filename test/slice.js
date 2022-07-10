const expect = require('chai').expect;
const slice = require('../src/slice');

const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];
const numbers1to10_typed = new Uint8Array(numbers1to10);

describe(`slice()`, function() {

    it(`should return a shallow copy of the slicable if called with one argument`,
        function () {
            
            const copy = slice(numbers1to10);
            expect(copy).to.be.deep.equal(numbers1to10);
            expect(copy).not.to.equal(numbers1to10);
        }
    )

    it(`should return a shallow copy of the slicable beginning at the specified start index if called with two argument`,
        function () {
            
            const copy = slice(5, numbers1to10);
            expect(copy).to.be.deep.equal([6,7,8,9,10]);
        }
    )

    it(`should return a shallow copy of the section of the sliceable between the specified start (inclusive) and the end (exclusive) indices if called with three arguments`,
        function () {
            const copy = slice(5, -1, numbers1to10);
            expect(copy).to.be.deep.equal([6,7,8,9]);
        }
    )

    it(`should accept strings, arrays and TypedArray instances for the slicable argument`,
        function () {
            expect( slice(5, -1, numbers1to10) ).to.be.deep.equal([6,7,8,9]);
            expect( slice(4, -1, 'Foobar' ) ).to.equal('a');
            expect( slice(5, -1, new Uint8Array(numbers1to10)) ).to.deep.equal(new Uint8Array([6,7,8,9]));
        }
    )

    it(`should throw if the slicable is not a string, an array or a TypeArray instance`,
        function () {
            expect( ()=>slice({}) ).to.throw();
            expect( ()=>slice() ).to.throw();

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
})