const True = require('../src/True');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = {}
const id = sinon.fake(x => x);

describe( 'True()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            id.resetHistory();
        })
        
        it(`should always return boolean true`, function() {

            expect( True() ).to.be.true;
            expect( True(42) ).to.be.true;
            expect( True(true) ).to.be.true;
            expect( True(id, UNIQTHING) ).to.be.true;
        })

        it(`should call the expression if the expression is a function`, function() {

            expect(id.callCount).to.equal(0);
            True(id, UNIQTHING);
            expect(id.callCount).to.equal(1);
        })

        it(`should pass the args to the expression if the expression is a function`, function() {

            True(id, UNIQTHING, 42, 'fubar');
            expect(id.args[0]).to.deep.equal([UNIQTHING,42,'fubar']);
        })

    }
);