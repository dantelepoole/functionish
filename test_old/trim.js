const expect = require('chai').expect;
const trim = require('../trim');

describe(`trim()`, function() {

    it(`should trim the leading and trailing whitespace from its argument if ths argument is a string`,
        function () {
            expect( trim('   foobar   ') ).to.be.equal('foobar');
            expect( trim('\n\t\r\xa0foobar\n\t\r\xa0') ).to.be.equal('foobar');
        }
    )

    it(`should return an empty string if its argument is null or undefined`,
        function () {
            expect( trim(null) ).to.be.equal('');
            expect( trim(undefined) ).to.be.equal('');
            expect( trim() ).to.be.equal('');
        }
    )

    it(`should trim the result of passing its argument to String() if it is neither null, undefined nor a string`,
        function () {
            expect( trim(42) ).to.be.equal( String(42).trim() );
            expect( trim(true) ).to.be.equal( String(true).trim() );
            expect( trim(42.24) ).to.be.equal( String(42.24).trim() );
            expect( trim(-42) ).to.be.equal( String(-42).trim() );
            expect( trim(42n) ).to.be.equal( String(42n).trim() );
            expect( trim([1,2,3]) ).to.be.equal( String([1,2,3]).trim() );
            expect( trim({value:42}) ).to.be.equal( String({value:42}).trim() );
            expect( trim(x=>x) ).to.be.equal( String(x=>x).trim() );
            expect( trim(NaN) ).to.be.equal( String(NaN).trim() );

            const date = new Date();
            expect( trim(date) ).to.be.equal( String(date).trim() );
        }
    )

    it(`should call its argument's toString() method if it has one and trim the result`,
        function () {
            const obj = {
                toString() {
                    return ' foobar ';
                }
            }
            expect( trim(obj) ).to.be.equal('foobar');
        }
    )
})