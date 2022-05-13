const expect = require('chai').expect;
const tostring = require('../tostring');

describe(`tostring()`, function() {

    it(`should return the result of passing its argument to String()`,
        function () {
            const date = new Date();
            expect( tostring(42) ).to.be.equal( String(42) );
            expect( tostring(-42) ).to.be.equal( String(-42) );
            expect( tostring(true) ).to.be.equal( String(true) );
            expect( tostring(42n) ).to.be.equal( String(42n) );
            expect( tostring({}) ).to.be.equal( String({}) );
            expect( tostring([]) ).to.be.equal( String([]) );
            expect( tostring('foobar') ).to.be.equal( String('foobar') );
            expect( tostring(date) ).to.be.equal( String(date) );
            expect( tostring(Symbol('foobar')) ).to.be.equal( String(Symbol('foobar')) );
        }
    )

    it(`should return an empty string if its argument is undefined`,
        function () {
            expect( tostring(null) ).to.be.equal( "" );
            expect( tostring(undefined) ).to.be.equal( "" );
            expect( tostring() ).to.be.equal( "" );
        }
    )

    it(`should call its argument's toString() method if it has one`,
        function () {
            const obj = {
                toString(){
                    return 'foobar';
                }
            }
            expect( tostring(obj) ).to.be.equal( "foobar" );
        }
    )
})