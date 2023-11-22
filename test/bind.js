const bind = require('../src/bind');
const expect = require('chai').expect;
const sinon = require("sinon");

const THIS = { label:'THIS' }
const UNIQTHING = { label:'UNIQTHING' }
const container = { collect:(...args) => args, getthis:function() { return this } }

const collect = (...args) => args;
function getthis() { return this }

const fakecontainercollect = sinon.replace(container, 'collect', sinon.fake(collect))
const fakecollect = sinon.fake(collect);
const fakegetthis = sinon.fake(getthis);
const fakecollectbind = sinon.replace(collect, 'bind', sinon.fake(collect.bind));

describe( 'bind()', function() {

        beforeEach(function () {
            sinon.reset();
        })

        it(`should return a function`, function() {

            expect( bind(collect, THIS) ).to.be.a('function');
            expect( bind('collect', container) ).to.be.a('function');
        })

        it(`should be curried with unary arity`, function() {

            const boundcollectcurried = bind('collect');
            expect( boundcollectcurried ).to.be.a('function');

            const boundcollect = boundcollectcurried(container);
            expect( boundcollect ).to.be.a('function');

            boundcollect();
            expect(fakecontainercollect.callCount).to.be.equal(1);
        })

        it(`should throw if the target is neither a function nor a method-key on the thisvalue`, function() {

            expect( () => bind(42, container) ).to.throw();
            expect( () => bind(null, container) ).to.throw();
        })

        describe( 'The result function', function() {

            it(`should call the target's bind() method if the target is a function`, function() {

                bind(collect, THIS);

                expect( fakecollectbind.callCount ).to.be.equal(1);
            })

            it(`should call 'bind()' on the target method of the thisvalue if target not a function`, function() {

                const boundcontainercollect = bind('collect', container);
                boundcontainercollect();

                expect( fakecontainercollect.callCount ).to.be.equal(1);
            })

            it(`should set the bound function's 'this' to the thisvalue`, function() {

                let retval = bind(getthis, THIS)();
                expect(retval).to.be.equal(THIS);

                retval = bind('getthis', container)();
                expect(retval).to.be.equal(container);
            })

            it(`should pass the bound arguments to the bound function`, function() {

                const boundargs = [UNIQTHING, 'fubar', 42];

                let retval = bind(collect, THIS, ...boundargs)();
                expect(retval).to.be.deep.equal(boundargs);
                retval = undefined;

                retval = bind('collect', container, ...boundargs)();
                expect(retval).to.be.deep.equal(boundargs);
            })

            it(`should pass its own arguments to the bound function after the bound arguments`, function() {

                const boundargs = [UNIQTHING, 'fubar', 42];

                let retval = bind(collect, THIS, ...boundargs)('additional', 'argument');
                expect(retval).to.be.deep.equal( [...boundargs, 'additional', 'argument'] );
                retval = undefined;

                retval = bind('collect', container, ...boundargs)('additional', 'argument');
                expect(retval).to.be.deep.equal( [...boundargs, 'additional', 'argument']);
            })
        })
    }
);
