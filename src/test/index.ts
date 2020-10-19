import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index'
chai.should()
chai.use(chaiHttp)

// get request

describe('Demo', () => {

    describe("/Get ",() => {
        it("it should work", (done) => {
            chai.request(app)
                .get('/')
                .end((_,res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    res.body.should.have.property("msg").eql("success")
                    done()
                })
        })
    })
})