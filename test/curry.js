const curry = require('../src/curry');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHIS' }

const collect = (...args) => args;
const fakecollect = sinon.fake(collect);

describe( 'curry()', function() {

        it('should return a function', function() {
            expect( curry(1, collect) ).to.be.a('function');
        })

        it('should throw if the arity is not a positive integer of at least 0', function() {

            expect( () => curry(-1, collect) ).to.throw();
            expect( () => curry(null, collect) ).to.throw();
            expect( () => curry('fubar', collect) ).to.throw();
        })

        it('should throw if the targetfunction is not a function', function() {

            expect( () => curry(1, null) ).to.throw();
            expect( () => curry(1, {}) ).to.throw();
            expect( () => curry(1, 42) ).to.throw();
        })

        describe( 'The result function', function() {

            beforeEach(function () {
                sinon.resetHistory();
                fakecollect.resetHistory();
            })

            it('should curry its arguments as long as the total number of arguments does not exceed the arity', function() {

                const currycollect = curry(3, fakecollect);

                let retval = currycollect(42);
                expect(fakecollect.callCount).to.equal(0);
                expect(retval).to.be.a('function');

                retval = retval('fubar');
                expect(fakecollect.callCount).to.equal(0);
                expect(retval).to.be.a('function');

                retval = retval(UNIQTHING);
                expect(fakecollect.callCount).to.equal(0);
                expect(retval).to.be.a('function');
            })

            it('should call the targetfunction if its number of arguments exceeds the arity', function() {

                const currycollect = curry(3, fakecollect);
                const retval = currycollect(42, 'fubar', UNIQTHING, UNIQTHING);

                expect(fakecollect.callCount).to.equal(1);
                expect(retval).to.deep.equal( [42,'fubar',UNIQTHING,UNIQTHING] );
            })

            it('should call the targetfunction with all arguments, including the curried arguments', function() {

                const currycollect = curry(3, fakecollect);

                let retval = currycollect(42);
                expect(retval).to.be.a('function');

                retval = retval('fubar');
                expect(retval).to.be.a('function');

                retval = retval(UNIQTHING);
                expect(retval).to.be.a('function');

                expect(fakecollect.callCount).to.equal(0);

                retval = retval(UNIQTHING);
                expect(fakecollect.callCount).to.equal(1);
                expect(retval).to.deep.equal( [42,'fubar',UNIQTHING,UNIQTHING] );
            })

        })
    }
);