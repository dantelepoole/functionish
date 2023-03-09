const constrain = require('../constrain');
const expect = require('chai').expect;
const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

describe('constrain()', function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should be curried`,
        function() {
            const curried = constrain(0, 10);

            expect(curried).to.be.a('function');
            expect( curried(5) ).not.to.be.a('function');
            expect( curried(5) ).to.be.a('number');
        }
    )

    it(`should return the lower limit if the value is less than the lower limit`,
        function() {
            expect( constrain(5, 10, 4) ).to.equal(5);
        }
    )

    it(`should return the upper limit if the value is greater than the upper limit`,
        function() {
            expect( constrain(5, 10, 11) ).to.equal(10);
        }
    )

    it(`should return the value if it is greater than or equal to the lower limit and less than or equal to the upper limit`,
        function() {
            expect( constrain(5, 10, 5) ).to.equal(5);
            expect( constrain(5, 10, 6) ).to.equal(6);
            expect( constrain(5, 10, 7) ).to.equal(7);
            expect( constrain(5, 10, 8) ).to.equal(8);
            expect( constrain(5, 10, 9) ).to.equal(9);
            expect( constrain(5, 10, 10) ).to.equal(10);
        }
    )

    it(`should return the value if it is null, undefined or NaN`,
        function() {
            expect( constrain(5, 10, null) ).to.be.null;
            expect( constrain(5, 10, undefined) ).to.be.undefined;
            expect( constrain(5, 10, NaN) ).to.be.NaN;
        }
    )

    it(`should work with string arguments`,
        function() {
            expect( constrain('d', 'f', 'e') ).to.equal('e');
            expect( constrain('d', 'f', 'g') ).to.equal('f');
            expect( constrain('d', 'f', 'c') ).to.equal('d');
            expect( constrain('d', 'f', null) ).to.be.null;
            expect( constrain('d', 'f', undefined) ).to.be.undefined;
            expect( constrain('d', 'f', NaN) ).to.be.NaN;
        }
    )

    it(`should work with Date arguments`,
        function() {
            const startdate = new Date('1999-01-01');
            const enddate = new Date('2000-01-01');

            expect( constrain(startdate, enddate, new Date('1999-07-01')) ).to.deep.equal(new Date('1999-07-01'));
            expect( constrain(startdate, enddate, new Date('2000-07-01')) ).to.equal(enddate);
            expect( constrain(startdate, enddate, new Date('1998-07-01')) ).to.equal(startdate);
            expect( constrain(startdate, enddate, null) ).to.be.null;
            expect( constrain(startdate, enddate, undefined) ).to.be.undefined;
            expect( constrain(startdate, enddate, NaN) ).to.be.NaN;
        }
    )
})