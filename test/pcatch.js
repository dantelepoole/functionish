const expect = require('chai').expect;
const pcatch = require('../pcatch');

function returnerror(error) {
    return error;
}

describe(`pcatch()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {

            const curried = pcatch(returnerror);
            expect(curried).to.be.a('function');
            
            const result = curried(Promise.reject(new Error('foobar')));
            expect(result).to.be.a('Promise');

            return result;
        }
    )

    it(`should return a promise`,
        function () {

            const result = pcatch(returnerror, Promise.reject(new Error('foobar')));
            expect(result).to.be.a('Promise');

            return result;
        }
    )

    it(`should return a promise that calls the first argument when it rejects`,
        function () {

            const result = pcatch(returnerror, Promise.reject(new Error('foobar')));

            return result.then(
                x => {
                    expect(x).to.be.an('Error');
                    expect(x.message).to.be.equal('foobar');
                }
            )
        }
    )
})