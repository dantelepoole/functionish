const False = require('../src/False');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = {}
const id = sinon.fake(x => x);

describe( 'False()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            id.resetHistory();
        })
        
        it(`should always return boolean false`, function() {

            expect( False() ).to.be.false;
            expect( False(42) ).to.be.false;
            expect( False(true) ).to.be.false;
            expect( False(id, UNIQTHING) ).to.be.false;
        })

        it(`should call the expression if the expression is a function`, function() {

            expect(id.callCount).to.equal(0);
            False(id, UNIQTHING);
            expect(id.callCount).to.equal(1);
        })

        it(`should pass the args to the expression if the expression is a function`, function() {

            False(id, UNIQTHING, 42, 'fubar');
            expect(id.args[0]).to.deep.equal([UNIQTHING,42,'fubar']);
        })

    }
);