const expect = require('chai').expect;
const take = require('../take');

describe(`take()`, function() {

    it(`should be curried with binary arity`,
        function () {
            const curried = take(3);
            expect(curried).to.be.a('function');

            expect(curried('foobar')).to.be.equal('foo');
        }
    )

    it(`should call its second argument's slice() method with 0 and its first argument and return the result`,
        function () {

            let wasinvoked = false;
            
            const obj = {
                slice(...args) {
                    wasinvoked = true;
                    expect(args).to.be.deep.equal([0,3]);
                    return 'foo';
                }
            }

            const result = take(3, obj);

            expect(wasinvoked).to.be.true;
            expect(result).to.be.equal('foo');
        }
    )

    it(`should throw if its argument does not have a slice() method`,
        function () {
            expect( ()=>take(3,{}) ).to.throw();
        }
    )

    it(`should convert its first argument to 0 if it is negative`,
        function () {
            let wasinvoked = false;
            
            const obj = {
                slice(...args) {
                    wasinvoked = true;
                    expect(args).to.be.deep.equal([0,0]);
                    return '';
                }
            }

            const result = take(-3, obj);

            expect(wasinvoked).to.be.true;
            expect(result).to.be.equal('');
        }
    )
})