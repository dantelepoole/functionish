const where = require('../src/where');
const expect = require('chai').expect;

const personspec = {
    'name': x => (typeof x === 'string') && (x.length > 0),
    'age' : x => (typeof x === 'number') && (x >= 0) && (x <= 100),
    'address' : x => (typeof x === 'object') && x?.street && x?.city && x?.country
}

const validperson = {
    'name' : 'Hari Seldon',
    'age'  : 42,
    'address' : {
        'street'  : 'Somestreet',
        'city'    : 'Somecity',
        'country' : 'Foundation'
    }
}

describe('where()', function() {

    beforeEach(
        function() {
        }
    )

    it('should be curried',
        function () {
            const curried = where(personspec);
            expect( curried ).to.be.a('function');
            expect( curried({}) ).to.be.an('object');
        }
    )

    it('should return an object with a boolean success-property and an array errors-property',
        function () {
            const result = where(personspec, {});
            expect( result.success ).to.be.false;
            expect( result.errors ).to.be.an('array').with.length(3);
            expect( Object.keys(result).length ).to.be.equal(2);
        }
    )

    it('should throw if the specification is null or not an object',
        function () {
            expect( ()=>where(null,{}) ).to.throw();
            expect( ()=>where(undefined,{}) ).to.throw();
            expect( ()=>where(42,{}) ).to.throw();
            expect( ()=>where('foobar',{}) ).to.throw();
            expect( ()=>where(true,{}) ).to.throw();
            expect( ()=>where(x=>x,{}) ).to.throw();
        }
    )

    it('should not throw if the subject is null or not an object',
        function () {
            expect( ()=>where(personspec, null) ).not.to.throw();
            expect( ()=>where(personspec, undefined) ).not.to.throw();
            expect( ()=>where(personspec, 42) ).not.to.throw();
            expect( ()=>where(personspec, 'foobar') ).not.to.throw();
            expect( ()=>where(personspec, true) ).not.to.throw();
            expect( ()=>where(personspec, x=>x) ).not.to.throw();
        }
    )

    describe('the returned object', function() {

        beforeEach(
            function() {
            }
        )
    
        it('should have an array errors-property',
            function () {
                expect( where(personspec, validperson).errors ).to.be.an('array');
                expect( where(personspec, {}).errors ).to.be.an('array');
            }
        )

        it('should have a boolean success-property that is true if the subject matches',
            function () {
                expect( where(personspec, validperson).success ).to.be.true;
            }
        )

        it('should have a boolean success-property that is false if any rule failed',
            function () {
                expect( where(personspec, {}).success ).to.be.false;
            }
        )

        describe("the returned object's errors-property", function() {

            beforeEach(
                function() {
                }
            )
        
            it('should be empty if the subject matches the specification',
                function () {
                    expect( where(personspec, validperson).errors ).to.be.an('array').with.length(0);
                }
            )
    
            it('should have an entry for each rule that failed',
                function () {
                    expect( where(personspec, {name:'foobar', age:42}).errors ).to.be.an('array').with.length(1);
                    expect( where(personspec, {name:'foobar'}).errors ).to.be.an('array').with.length(2);
                    expect( where(personspec, {}).errors ).to.be.an('array').with.length(3);
                }
            )

            it(`should have entries that contain the failed rule's key in the first element and the subject's corresponding value in the second element`,
                function () {
                    const invalidperson = { address:{street:'Somestreet'} }
                    const result = where(personspec, invalidperson);
                    expect( result.errors ).to.be.an('array').with.length(3);
                    expect( result.errors[0][1] ).to.be.equal( invalidperson[result.errors[0][0]]);
                    expect( result.errors[1][1] ).to.be.equal( invalidperson[result.errors[1][0]]);
                    expect( result.errors[2][1] ).to.be.equal( invalidperson[result.errors[2][0]]);
                }
            )
        })
    })
})