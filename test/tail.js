const expect = require('chai').expect;
const tail = require('../tail');

describe(`tail()`, function() {

    it(`should call its argument's slice() method with an argument of 1 and return the result`,
        function () {

            let wasinvoked = false;
            
            const obj = {
                slice(...args) {
                    wasinvoked = true;
                    expect(args).to.be.deep.equal([1]);
                    return 'foobar';
                }
            }

            const result = tail(obj);

            expect(wasinvoked).to.be.true;
            expect(result).to.be.equal('foobar');
        }
    )

    it(`should throw if its argument does not have a slice() method`,
        function () {
            expect( ()=>tail({}) ).to.throw();
        }
    )
})