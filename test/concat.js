const expect = require('chai').expect;
const concat = require('../src/concat');
const isiterable = require('../src/isiterable');
const range = require('../src/range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

describe('concat()', function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it('should be curried',
        function () {

            const curried = concat([1,2,3]);
            expect(curried).to.be.a('function');
            expect( curried([4,5,6]) ).to.be.an('array').with.length(6);
        }
    )

    it('should throw if the concatable has no concat() method and is not iterable',
        function () {
            expect( ()=>concat({}, 1,2,3) ).to.throw();
        }
    )

    it(`should invoke the concatable's concat() method if it has one and return the result`,
        function () {
            let concatable = {
                concat : function concat(...items) { return ['a','b','c', ...items] }
            }
            spy( concatable, 'concat' );

            expect( concat(concatable, 1,2,3) ).to.deep.equal( ['a','b','c',1,2,3] );
            expect(concatable.concat.callCount).to.equal(1);

            expect( concat([1,2,3], 4,5,6) ).to.deep.equal([1,2,3,4,5,6]);
            expect( concat('foo', 'bar') ).to.equal( 'foo'.concat('bar') );

        }
    )

    it(`should, if the concatable has no concat() method but is iterable, return an iterable object concats the items to concatable's items`,
        function () {

            const result = concat( range(3), 1,2,3 );            
            expect( isiterable(result) ).to.be.true;
            expect( Array.from(result) ).to.deep.equal([1,2,3,1,2,3]);
        }
    )

})