const curry4 = require('../src/curry4');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHIS' }

const collect = (...args) => args;
const fakecollect = sinon.fake(collect);

describe( 'curry4()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            fakecollect.resetHistory();
        })

        it('should return a function', function() {
            expect( curry4(collect) ).to.be.a('function');
        })

        it('should throw if the targetfunction is not a function', function() {

            expect( () => curry4(null) ).to.throw();
            expect( () => curry4({}) ).to.throw();
            expect( () => curry4(42) ).to.throw();
        })

        describe( 'The result function', function() {

            it('should curry its first four arguments', function() {

                const currycollect = curry4(fakecollect);

                let retval = currycollect(42);
                expect(fakecollect.callCount).to.equal(0);
                expect(retval).to.be.a('function');

                retval = currycollect('fubar');
                expect(fakecollect.callCount).to.equal(0);
                expect(retval).to.be.a('function');

                retval = currycollect(UNIQTHING);
                expect(fakecollect.callCount).to.equal(0);
                expect(retval).to.be.a('function');

                retval = currycollect(UNIQTHING);
                expect(fakecollect.callCount).to.equal(0);
                expect(retval).to.be.a('function');
            })

            it('should call the targetfunction if it receives more than four arguments', function() {

                const currycollect = curry4(fakecollect);
                const retval = currycollect(42, 'fubar', UNIQTHING, UNIQTHING, 'bar');

                expect(fakecollect.callCount).to.equal(1);
                expect(retval).to.deep.equal( [42,'fubar',UNIQTHING,UNIQTHING,'bar'] );
            })

            it('should call the targetfunction with all arguments, including the curried arguments', function() {

                const currycollect = curry4(fakecollect);

                let retval = currycollect(42);
                expect(retval).to.be.a('function');

                retval = retval('fubar', UNIQTHING, UNIQTHING, 'bar');
                expect(fakecollect.callCount).to.equal(1);
                expect(retval).to.deep.equal( [42,'fubar',UNIQTHING,UNIQTHING, 'bar'] );
            })

        })
    }
);