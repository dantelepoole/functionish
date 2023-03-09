const expect = require('chai').expect;
const fail = require('../fail');
const format = require('../format');
const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const ERR_MESSAGE = `The message is %s and the code is %d`;
const ERR_MESSAGE_NAMED = `%s~The message is %s and the code is %d`

const geterror = spy(
    function geterror(func, ...args) {
        
        let result = null;

        try {
            func(...args);
        } catch (error) {
            result = error;
        }

        return result;
    }
)

describe('fail()', function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it('should throw an Error-instance',
        function() {
            expect( ()=>fail() ).to.throw(Error);
        }
    )

    describe('the Error thrown by fail', function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
        
        beforeEach(function() {})

        it(`should be named 'Error' if no name was provided`,
            function() {
                const error = geterror(fail, ERR_MESSAGE, 'foobar', 42);
                expect(error).to.be.an('Error');
                expect(error.name).to.equal('Error');
            }    
        )

        it(`should have the specified name if one was provided`,
            function() {
                const error = geterror(fail, ERR_MESSAGE_NAMED, 'FailError', 'foobar', 42);
                expect(error.name).to.equal('FailError');
            }    
        )

        it(`should format the message printf() style with the further arguments`,
            function() {
                const error = geterror(fail, ERR_MESSAGE_NAMED, 'FailError', 'foobar', 42);
                expect(error.message).to.equal(format(ERR_MESSAGE, 'foobar', 42));
            }    
        )

        it(`should concat the message and the further arguments if the message has no formatting characters`,
            function() {
                const error = geterror(fail, 'Hello World', 'foobar', 42);
                expect(error.message).to.equal(format('Hello World', 'foobar', 42));
            }    
        )
    })
})