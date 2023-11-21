const apply = require('../src/apply');
const expect = require('chai').expect;
const sinon = require("sinon");

const collectargs = (...args) => args;
const fakeapply = sinon.replace(collectargs, 'apply', sinon.fake( (THIS, args) => collectargs(THIS, ...args) ));

describe( 'apply()', function() {

        beforeEach(function () {
            sinon.reset();
        })

        it(`should call the 'apply()' method of its first argument`,

            function() {
                expect(fakeapply.callCount).to.equal(0);
                apply(collectargs, []);
                expect(fakeapply.callCount).to.equal(1);
            }
        )

        it(`TO DO: implement additional tests`);
    }
);
