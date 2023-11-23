const evaluate = require('../src/evaluate');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHING' }

const collect = (...args) => args;
const fakecollect = sinon.fake(collect);

describe( 'evaluate()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            fakecollect.resetHistory();
        })

        it('should return the expression if it is not a function', function() {
            expect( evaluate(UNIQTHING) ).to.be.equal(UNIQTHING);
        })

        it('should call the expression if it is a function', function() {

            expect(fakecollect.callCount).to.be.equal(0);
            evaluate(fakecollect, UNIQTHING);
            expect(fakecollect.callCount).to.be.equal(1);
        })

        it('should pass the arguments to the expression if the expression is a function', function() {

            evaluate(fakecollect, UNIQTHING, 42, 'fubar');
            expect(fakecollect.args[0]).to.deep.equal( [UNIQTHING, 42, 'fubar'] );
        })

        it(`should return the expression's return value if the expression is a function`, function() {

            let retval = evaluate(fakecollect, UNIQTHING, 42, 'fubar');
            expect(retval).to.deep.equal( [UNIQTHING, 42, 'fubar'] );

            retval = evaluate(fakecollect);
            expect(retval).to.deep.equal( [] );
        })
    }
);