const nullary = require('../src/nullary');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHING' }

const collectargs = sinon.fake( (...args) => args );

describe( 'nullary()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collectargs.resetHistory();
        })

        it(`should return a function`, function() {
            expect( nullary(countargs) ).to.be.a('function');
        })

        describe( 'The result function', function() {

            it(`should throw if the target function is not a function`, function() {

                const badnullary = nullary();
                expect( () => badnullary() ).to.throw();
            })

            it(`should always invoke the target function without arguments`, function() {
                
                const nullarycollectargs = nullary(collectargs);
                
                nullarycollectargs(42, 'fubar', UNIQTHING);
                expect(collectargs.args[0].length).to.equal(0);

                nullarycollectargs();
                expect(collectargs.args[1].length).to.equal(0);

            })

            it(`should pass its own first two to arguments to the target function`, function() {
                
                const binarycollectargs = nullary(collectargs);

                let retval = binarycollectargs();
                expect(retval).to.be.deep.equal([undefined, undefined]);

                retval = binarycollectargs(ARG_A);
                expect(retval).to.be.deep.equal([ARG_A, undefined]);

                retval = binarycollectargs(ARG_A, ARG_B);
                expect(retval).to.be.deep.equal([ARG_A, ARG_B]);

                retval = binarycollectargs(ARG_A, ARG_B, ARG_A);
                expect(retval).to.be.deep.equal([ARG_A, ARG_B]);
            })

            it(`should return the target function's return value`, function() {
                
                const binarycollectargs = nullary(collectargs);

                let retval = binarycollectargs();
                expect(retval).to.be.deep.equal([undefined, undefined]);

                retval = binarycollectargs(ARG_A);
                expect(retval).to.be.deep.equal([ARG_A, undefined]);

                retval = binarycollectargs(ARG_A, ARG_B);
                expect(retval).to.be.deep.equal([ARG_A, ARG_B]);

                retval = binarycollectargs(ARG_A, ARG_B, ARG_A);
                expect(retval).to.be.deep.equal([ARG_A, ARG_B]);
            })
        })
    }
);
