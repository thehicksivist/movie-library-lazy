let should = require('should')
let sinon = require('sinon')

describe('Test POST', function() {
    it('should return 400 and send a response Title not found if no title is passed', function () {
        let Movie = function (movie) {
            this.save = function () {}
        };
        
        let req = {
            body: {
                year: "1999"
            }
        }

        let res = {
            status: sinon.spy(),
            send: sinon.spy()
        }

        let movieController = require('../controllers/movieController')(Movie)
        movieController.post(req, res)

        // the below is a test using calledWith (sinon method)
        res.status.calledWith(400).should.equal(true, `Wrong status: ${res.status.args}`)
        res.send.calledWith('Title is required').should.equal(true)

    })
})