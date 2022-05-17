const xor = require('../xor');
const expect = require('chai').expect;

const isodd = x => (Math.abs(x%2) === 1);
const ispositive = x => (x >= 0);

describe('xor()', function() {

    beforeEach(
        function() {
        }
    )

    it('should be curried with binary arity', 
        function() {

            const curried = xor(isodd);
            expect(curried).to.be.a('function');

            const curried2 = curried(ispositive);
            expect(curried2).to.be.a('function');

            expect(curried2(31)).to.be.a('boolean');
        }
    )

    it('should return a function', 
    function() {
        expect( xor(isodd,ispositive) ).to.be.a('function');
    }
)

    describe('its returned function()', function() {

        it('should return a boolean', 
            function() {
                const isoddorpositive = xor(isodd,ispositive);
                expect( isoddorpositive(42) ).to.be.true;
            }
        )

        it('should return true if one but not both clauses return true', 
            function() {
                const isoddorpositive = xor(isodd,ispositive);
                expect( isoddorpositive(42) ).to.be.true;
                expect( isoddorpositive(-41) ).to.be.true;
            }
        )

        it('should return false if neither clause or both clauses return true', 
            function() {
                const isoddorpositive = xor(isodd,ispositive);
                expect( isoddorpositive(41) ).to.be.false;
                expect( isoddorpositive(-42) ).to.be.false;
            }
        )

        it('should throw if either clause is not a function', 
            function() {
                let isoddorpositive = xor({},ispositive);
                expect( ()=>isoddorpositive(42) ).to.throw();

                isoddorpositive = xor(isodd,{});
                expect( ()=>isoddorpositive(42) ).to.throw();
            }
        )

    })

})