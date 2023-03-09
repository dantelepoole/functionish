const collect = require('../collect');
const expect = require('chai').expect;
const intersection = require('../intersection');
const isiterable = require('../isiterable');

const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];
const evennumbers1to10 = [2,4,6,8,10];
const oddnumbers1to10 = [1,3,5,7,9];

describe(`intersection()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = intersection(numbers1to10);
            expect(curried).to.be.a('function');

            const result = curried(evennumbers1to10);
            expect( result ).not.to.be.a('function');
            expect( isiterable(result) ).to.be.true;
        }
    )

    it(`should throw if either argument is not iterable`,
        function () {
            expect( ()=>intersection([], null) ).to.throw();
            expect( ()=>intersection(null, []) ).to.throw();
            expect( ()=>intersection(null,null) ).to.throw();
            expect( ()=>intersection({}, {}) ).to.throw();

            expect( ()=>intersection([], []) ).not.to.throw();
        }
    )

    it(`should return an iterable`,
        function () {
            expect( isiterable( intersection([], []) ) ).to.be.true;
        }
    )

    it(`should return the intersection of its two arguments`,
        function () {
            let result = collect( intersection(numbers1to10, evennumbers1to10) );
            expect(result).to.deep.equal(evennumbers1to10);

            result = collect( intersection(oddnumbers1to10, numbers1to10) );
            expect(result).to.deep.equal(oddnumbers1to10);
        }
    )

    it(`should return an iterable without duplicate elements`,
        function () {
            let result = intersection([...numbers1to10, ...numbers1to10], [...evennumbers1to10, ...evennumbers1to10]);
            expect( collect(result) ).to.deep.equal(evennumbers1to10);

            result = intersection([...numbers1to10, ...numbers1to10], [...oddnumbers1to10, ...oddnumbers1to10]);
            expect( collect(result) ).to.deep.equal(oddnumbers1to10);
        }
    )

})
