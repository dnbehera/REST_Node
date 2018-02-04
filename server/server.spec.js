
var app = require('./server');
var request = require('supertest');
var chai = require('chai').expect;

describe('[LIONS]', () => {
    var lion = {
        id: 1,
        name: 'Dibya',
        pride: 'Behera',
        age: 3,
        gender: 4
    }

    //test get APIs
    it('should return all lions', (done) => {
        request(app)
            .get('/lions')
            .set('accept', 'application/json')//These things doesn't fail the test
            .expect('Content-Type', /json/)//these things doesn't fail the test
            .expect(200)
            .end((err, res) => {
                chai(res.body).to.be.an('array');
                done();
            });
    });

    //test post APIs
    it('shoud save a new lion', (done) => {
        request(app)
            .post('/lions')
            .send(lion)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end( (err, res) => {
                chai(res.body).to.be.an('object');
                chai(res.body).to.eql(lion);
                done();
            })
    });

    it ('should update lion', (done) => {
        var newLion = {
            name: 'Vaishali'
        }
        request(app)
        .post('/lions')
        .send(lion)
        .set('Accept', 'application/json')
        .end( (err, resp) => {
            chai(resp.body.name).to.equal('Dibya');
            request(app)
                .post('/lions/'+resp.body.id)
                .send(lion)
                .end( (err, res) => {
                    chai(res.body.name).to.equal('Vaishali');
                });
        });
    })
})