const curry3 = require('../src/curry3');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHIS' }

const collect = (...args) => args;
const fakecollect = sinon.fake(collect);

describe( 'curry3()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            fakecollect.resetHistory();
        })

        it('should return a function', function() {
            expect( curry3(collect) ).to.be.a('function');
        })

        it('should throw if the targetfunction is not a function', function() {

            expect( () => curry3(null) ).to.throw();
            expect( () => curry3({}) ).to.throw();
            expect( () => curry3(42) ).to.throw();
        })

        describe( 'The result function', function() {

            it('should curry its first three arguments', function() {

                const currycollect = curry3(fakecollect);

                let retval = currycollect(42);
                expect(fakecollect.callCount).to.equal(0);
                expect(retval).to.be.a('function');

                retval = currycollect('fubar');
                expect(fakecollect.callCount).to.equal(0);
                expect(retval).to.be.a('function');

                retval = currycollect(UNIQTHING);
                expect(fakecollect.callCount).to.equal(0);
                expect(retval).to.be.a('function');
            })

            it('should call the targetfunction if it receives more than three arguments', function() {

                const currycollect = curry3(fakecollect);
                const retval = currycollect(42, 'fubar', UNIQTHING, UNIQTHING);

                expect(fakecollect.callCount).to.equal(1);
                expect(retval).to.deep.equal( [42,'fubar',UNIQTHING,UNIQTHING] );
            })

            it('should call the targetfunction with all arguments, including the curried arguments', function() {

                const currycollect = curry3(fakecollect);

                let retval = currycollect(42);
                expect(retval).to.be.a('function');

                retval = retval('fubar', UNIQTHING, UNIQTHING);
                expect(fakecollect.callCount).to.equal(1);
                expect(retval).to.deep.equal( [42,'fubar',UNIQTHING,UNIQTHING] );
            })

        })
    }
);